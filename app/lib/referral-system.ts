
/**
 * Enhanced Referral & Affiliate System
 * Handles tracking, commissions, and payouts (20-35% commission)
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with fallback for missing credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

const supabase = createClient(supabaseUrl, supabaseKey);

export interface ReferralCode {
  id: string;
  code: string;
  userId: string;
  commissionRate: number; // 0.20 to 0.35 (20-35%)
  totalReferrals: number;
  totalRevenue: number;
  totalCommissions: number;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
}

export interface ReferralConversion {
  id: string;
  referralCode: string;
  referrerId: string;
  referredUserId: string;
  subscriptionTier: string;
  revenue: number;
  commission: number;
  status: 'pending' | 'approved' | 'paid';
  createdAt: string;
}

export interface CommissionPayout {
  id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'processing' | 'paid' | 'failed';
  paymentMethod: 'stripe' | 'paypal' | 'bank_transfer';
  paymentDetails?: string;
  paidAt?: string;
  createdAt: string;
}

export class ReferralSystem {
  /**
   * Generate unique referral code
   */
  static async generateReferralCode(userId: string, commissionRate: number = 0.25): Promise<string> {
    const code = `AC-${userId.slice(0, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    const { data, error } = await supabase
      .from('referral_codes')
      .insert({
        code,
        user_id: userId,
        commission_rate: commissionRate,
        total_referrals: 0,
        total_revenue: 0,
        total_commissions: 0,
        status: 'active',
      })
      .select()
      .single();

    if (error) throw error;
    return code;
  }

  /**
   * Track referral signup
   */
  static async trackReferral(referralCode: string, newUserId: string): Promise<boolean> {
    try {
      // Verify referral code exists
      const { data: codeData, error: codeError } = await supabase
        .from('referral_codes')
        .select('*')
        .eq('code', referralCode)
        .eq('status', 'active')
        .single();

      if (codeError || !codeData) return false;

      // Create referral tracking record
      const { error: trackError } = await supabase
        .from('referral_tracking')
        .insert({
          referral_code: referralCode,
          referrer_id: codeData.user_id,
          referred_user_id: newUserId,
          status: 'pending',
        });

      if (trackError) throw trackError;

      // Increment referral count
      await supabase
        .from('referral_codes')
        .update({ total_referrals: codeData.total_referrals + 1 })
        .eq('code', referralCode);

      return true;
    } catch (error) {
      console.error('Error tracking referral:', error);
      return false;
    }
  }

  /**
   * Process referral conversion (when referred user subscribes)
   */
  static async processConversion(
    referredUserId: string,
    subscriptionTier: string,
    revenue: number
  ): Promise<void> {
    try {
      // Find referral tracking record
      const { data: tracking, error: trackingError } = await supabase
        .from('referral_tracking')
        .select('*, referral_codes(*)')
        .eq('referred_user_id', referredUserId)
        .eq('status', 'pending')
        .single();

      if (trackingError || !tracking) return;

      const commissionRate = tracking.referral_codes?.commission_rate || 0.25;
      const commission = revenue * commissionRate;

      // Create conversion record
      const { error: conversionError } = await supabase
        .from('referral_conversions')
        .insert({
          referral_code: tracking.referral_code,
          referrer_id: tracking.referrer_id,
          referred_user_id: referredUserId,
          subscription_tier: subscriptionTier,
          revenue,
          commission,
          status: 'approved',
        });

      if (conversionError) throw conversionError;

      // Update referral code stats
      const { data: codeData } = await supabase
        .from('referral_codes')
        .select('*')
        .eq('code', tracking.referral_code)
        .single();

      if (codeData) {
        await supabase
          .from('referral_codes')
          .update({
            total_revenue: (codeData.total_revenue || 0) + revenue,
            total_commissions: (codeData.total_commissions || 0) + commission,
          })
          .eq('code', tracking.referral_code);
      }

      // Update tracking status
      await supabase
        .from('referral_tracking')
        .update({ status: 'converted' })
        .eq('id', tracking.id);

    } catch (error) {
      console.error('Error processing conversion:', error);
      throw error;
    }
  }

  /**
   * Calculate commission for payout
   */
  static async calculatePayout(userId: string): Promise<number> {
    const { data, error } = await supabase
      .from('referral_conversions')
      .select('commission')
      .eq('referrer_id', userId)
      .eq('status', 'approved');

    if (error) throw error;

    return data?.reduce((total, item) => total + item.commission, 0) || 0;
  }

  /**
   * Process payout
   */
  static async processPayout(
    userId: string,
    amount: number,
    paymentMethod: 'stripe' | 'paypal' | 'bank_transfer',
    paymentDetails?: string
  ): Promise<string> {
    const { data, error } = await supabase
      .from('commission_payouts')
      .insert({
        user_id: userId,
        amount,
        status: 'pending',
        payment_method: paymentMethod,
        payment_details: paymentDetails,
      })
      .select()
      .single();

    if (error) throw error;

    // Mark conversions as paid
    await supabase
      .from('referral_conversions')
      .update({ status: 'paid' })
      .eq('referrer_id', userId)
      .eq('status', 'approved');

    return data.id;
  }

  /**
   * Get referral stats for user
   */
  static async getReferralStats(userId: string): Promise<{
    totalReferrals: number;
    totalRevenue: number;
    totalCommissions: number;
    pendingPayout: number;
    conversionRate: number;
  }> {
    const { data: codeData } = await supabase
      .from('referral_codes')
      .select('*')
      .eq('user_id', userId)
      .single();

    const { data: conversions } = await supabase
      .from('referral_conversions')
      .select('*')
      .eq('referrer_id', userId);

    const pendingPayout = await this.calculatePayout(userId);

    const totalReferrals = codeData?.total_referrals || 0;
    const converted = conversions?.length || 0;
    const conversionRate = totalReferrals > 0 ? (converted / totalReferrals) * 100 : 0;

    return {
      totalReferrals,
      totalRevenue: codeData?.total_revenue || 0,
      totalCommissions: codeData?.total_commissions || 0,
      pendingPayout,
      conversionRate,
    };
  }

  /**
   * Get top referrers (leaderboard)
   */
  static async getTopReferrers(limit: number = 10): Promise<any[]> {
    const { data, error } = await supabase
      .from('referral_codes')
      .select('*')
      .eq('status', 'active')
      .order('total_revenue', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
}

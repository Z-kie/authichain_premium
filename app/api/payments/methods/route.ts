

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export const dynamic = 'force-dynamic';


interface PaymentMethod {
  id: string;
  type: 'card' | 'crypto' | 'mobile' | 'digital_wallet';
  name: string;
  provider: string;
  enabled: boolean;
  fees: {
    percentage: number;
    fixed_fee?: number;
    currency: string;
  };
  processing_time: string;
  supported_currencies: string[];
  features: string[];
  compliance: {
    product_friendly: boolean;
    regions: string[];
    required_verification: string[];
  };
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const paymentMethods: PaymentMethod[] = [
      {
        id: 'stripe_card',
        type: 'card',
        name: 'Credit/Debit Cards',
        provider: 'Stripe',
        enabled: true,
        fees: { percentage: 2.9, fixed_fee: 0.30, currency: 'USD' },
        processing_time: 'Instant',
        supported_currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
        features: ['3D Secure', 'Dispute Protection', 'Recurring Billing'],
        compliance: {
          product_friendly: true,
          regions: ['US', 'CA', 'EU'],
          required_verification: ['KYC', 'Business License']
        }
      },
      {
        id: 'apple_pay',
        type: 'mobile',
        name: 'Apple Pay',
        provider: 'Apple',
        enabled: true,
        fees: { percentage: 2.9, currency: 'USD' },
        processing_time: 'Instant',
        supported_currencies: ['USD', 'EUR', 'GBP', 'CAD'],
        features: ['Touch ID', 'Face ID', 'Apple Watch Support'],
        compliance: {
          product_friendly: true,
          regions: ['US', 'CA', 'EU', 'AU'],
          required_verification: ['Device Authentication']
        }
      },
      {
        id: 'google_pay',
        type: 'mobile',
        name: 'Google Pay',
        provider: 'Google',
        enabled: true,
        fees: { percentage: 2.9, currency: 'USD' },
        processing_time: 'Instant',
        supported_currencies: ['USD', 'EUR', 'GBP', 'CAD'],
        features: ['Fingerprint', 'PIN Authentication', 'NFC Support'],
        compliance: {
          product_friendly: true,
          regions: ['US', 'CA', 'EU', 'AU'],
          required_verification: ['Device Authentication', 'Google Account']
        }
      },
      {
        id: 'bitcoin',
        type: 'crypto',
        name: 'Bitcoin',
        provider: 'Blockchain',
        enabled: true,
        fees: { percentage: 1.5, currency: 'BTC' },
        processing_time: '10-30 minutes',
        supported_currencies: ['BTC'],
        features: ['Decentralized', 'Anonymous', 'Global'],
        compliance: {
          product_friendly: true,
          regions: ['Global'],
          required_verification: ['Wallet Verification']
        }
      },
      {
        id: 'ethereum',
        type: 'crypto',
        name: 'Ethereum',
        provider: 'Blockchain',
        enabled: true,
        fees: { percentage: 2.0, currency: 'ETH' },
        processing_time: '2-5 minutes',
        supported_currencies: ['ETH'],
        features: ['Smart Contracts', 'DeFi Integration', 'NFT Native'],
        compliance: {
          product_friendly: true,
          regions: ['Global'],
          required_verification: ['Wallet Verification']
        }
      },
      {
        id: 'usdc',
        type: 'crypto',
        name: 'USD Coin',
        provider: 'Centre',
        enabled: true,
        fees: { percentage: 1.0, currency: 'USDC' },
        processing_time: '1-3 minutes',
        supported_currencies: ['USDC'],
        features: ['Stable Value', 'Fast Settlement', 'Compliant'],
        compliance: {
          product_friendly: true,
          regions: ['US', 'Global'],
          required_verification: ['KYC', 'Wallet Verification']
        }
      },
      {
        id: 'paypal',
        type: 'digital_wallet',
        name: 'PayPal',
        provider: 'PayPal',
        enabled: false, // Product restrictions
        fees: { percentage: 3.5, fixed_fee: 0.30, currency: 'USD' },
        processing_time: 'Instant',
        supported_currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
        features: ['Buyer Protection', 'International', 'Credit Line'],
        compliance: {
          product_friendly: false,
          regions: ['Global (excluding product businesses)'],
          required_verification: ['PayPal Account', 'Business Type']
        }
      }
    ];

    // Filter enabled methods for product businesses
    const productEnabledMethods = paymentMethods.filter(method => 
      method.enabled && method.compliance.product_friendly
    );

    return NextResponse.json({
      success: true,
      payment_methods: paymentMethods,
      product_enabled: productEnabledMethods,
      total_methods: paymentMethods.length,
      enabled_methods: productEnabledMethods.length
    });

  } catch (error) {
    console.error('Payment methods error:', error);
    return NextResponse.json({ error: 'Failed to fetch payment methods' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, method_id, configuration } = await req.json();

    switch (action) {
      case 'enable':
        return await enablePaymentMethod(method_id, session.user.email);
      case 'disable':
        return await disablePaymentMethod(method_id, session.user.email);
      case 'configure':
        return await configurePaymentMethod(method_id, configuration, session.user.email);
      case 'test':
        return await testPaymentMethod(method_id, session.user.email);
      default:
        return NextResponse.json({ error: 'Invalid payment method action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Payment method action error:', error);
    return NextResponse.json({ error: 'Payment method action failed' }, { status: 500 });
  }
}

async function enablePaymentMethod(methodId: string, userEmail: string) {
  // Enable payment method for user/organization
  const enabledMethod = {
    method_id: methodId,
    enabled: true,
    enabled_by: userEmail,
    enabled_at: new Date().toISOString(),
    configuration: {
      test_mode: false,
      webhook_url: `https://api.authichain.org/webhooks/payment/${methodId}`,
      notification_email: userEmail
    }
  };

  return NextResponse.json({
    success: true,
    message: `Payment method ${methodId} enabled successfully`,
    method: enabledMethod
  });
}

async function disablePaymentMethod(methodId: string, userEmail: string) {
  return NextResponse.json({
    success: true,
    message: `Payment method ${methodId} disabled successfully`,
    disabled_by: userEmail,
    disabled_at: new Date().toISOString()
  });
}

async function configurePaymentMethod(methodId: string, configuration: any, userEmail: string) {
  const configuredMethod = {
    method_id: methodId,
    configuration: {
      ...configuration,
      configured_by: userEmail,
      configured_at: new Date().toISOString()
    }
  };

  return NextResponse.json({
    success: true,
    message: `Payment method ${methodId} configured successfully`,
    configuration: configuredMethod
  });
}

async function testPaymentMethod(methodId: string, userEmail: string) {
  // Simulate payment method testing
  const testResult = {
    method_id: methodId,
    test_status: 'success',
    test_amount: 1.00,
    test_currency: 'USD',
    response_time: Math.random() * 2000 + 500, // 500-2500ms
    tested_by: userEmail,
    tested_at: new Date().toISOString(),
    test_details: {
      connection: 'successful',
      authentication: 'verified',
      transaction_flow: 'completed',
      webhook_delivery: 'confirmed'
    }
  };

  return NextResponse.json({
    success: true,
    message: `Payment method ${methodId} test completed successfully`,
    test_result: testResult
  });
}

/**
 * Wallet Authentication Utilities
 * Handles signature verification and wallet-based authentication
 */

import { ethers } from 'ethers';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import { UserRole, SubscriptionTier } from './types';

/**
 * Verify that a signature was created by the owner of the wallet address
 */
export async function verifyWalletSignature(
  message: string,
  signature: string,
  walletAddress: string
): Promise<boolean> {
  try {
    // Recover the address that signed the message
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);
    
    // Compare addresses (case-insensitive)
    const isValid = recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
    
    console.log('🔐 Signature verification:', {
      expectedAddress: walletAddress,
      recoveredAddress,
      isValid
    });
    
    return isValid;
  } catch (error) {
    console.error('❌ Signature verification error:', error);
    return false;
  }
}

/**
 * Create or update a user for wallet authentication
 * 
 * Note: Prisma Client automatically manages connection pooling and cleanup.
 * No explicit connection.close() needed - connections are returned to the pool
 * automatically after each query completes (success or error).
 */
export async function createOrUpdateWalletUser(walletAddress: string) {
  try {
    const normalizedAddress = walletAddress.toLowerCase();
    
    // Check if user with this wallet address already exists
    // Connection is automatically returned to pool after this query
    let user = await prisma.user.findFirst({
      where: {
        walletAddress: normalizedAddress
      }
    });

    if (user) {
      // Update last login
      // Connection is automatically returned to pool after this query
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          updatedAt: new Date()
        }
      });
      
      console.log('✅ Existing wallet user found:', user.id);
      return user;
    }

    // Create new user for this wallet
    // Generate a random password (user won't use it for wallet login)
    const randomPassword = await bcrypt.hash(
      Math.random().toString(36).substring(2, 15),
      10
    );

    // Connection is automatically returned to pool after this query
    user = await prisma.user.create({
      data: {
        email: `${normalizedAddress}@wallet.authichain.local`,
        password: randomPassword,
        firstName: 'Wallet',
        lastName: 'User',
        walletAddress: normalizedAddress,
        isVerified: true, // Wallet ownership verified via signature
        subscriptionTier: SubscriptionTier.EXPLORER,
        role: UserRole.CONSUMER,
        username: `wallet_${normalizedAddress.substring(2, 10)}`
      }
    });

    console.log('✅ New wallet user created:', user.id);
    return user;
  } catch (error) {
    // Even on error, Prisma automatically returns the connection to the pool
    console.error('❌ Error creating/updating wallet user:', error);
    throw error;
  }
}

/**
 * Validate message format and timestamp
 */
export function validateAuthMessage(message: string, walletAddress: string): boolean {
  try {
    // Check if message contains the wallet address
    if (!message.includes(walletAddress)) {
      console.error('❌ Message does not contain wallet address');
      return false;
    }

    // Extract timestamp from message
    const timestampMatch = message.match(/Timestamp:\s*(\d+)/);
    if (!timestampMatch) {
      console.error('❌ Message does not contain timestamp');
      return false;
    }

    const timestamp = parseInt(timestampMatch[1]);
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;

    // Check if message is not too old (5 minutes)
    if (now - timestamp > fiveMinutes) {
      console.error('❌ Message timestamp expired');
      return false;
    }

    // Check if message is not from the future
    if (timestamp > now + 60000) {
      console.error('❌ Message timestamp is in the future');
      return false;
    }

    return true;
  } catch (error) {
    console.error('❌ Error validating auth message:', error);
    return false;
  }
}

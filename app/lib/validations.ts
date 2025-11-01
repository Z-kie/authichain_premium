/**
 * Input Validation Schemas for AuthiChain
 * Uses Zod for runtime type validation and sanitization
 */

import { z } from 'zod';

// ============================================
// Common Validation Schemas
// ============================================

/**
 * Ethereum wallet address validation
 */
export const walletAddressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum wallet address')
  .transform((val) => val.toLowerCase());

/**
 * Email validation
 */
export const emailSchema = z
  .string()
  .email('Invalid email address')
  .max(255, 'Email must be less than 255 characters')
  .transform((val) => val.toLowerCase().trim());

/**
 * URL validation
 */
export const urlSchema = z
  .string()
  .url('Invalid URL')
  .max(2048, 'URL must be less than 2048 characters');

/**
 * UUID validation
 */
export const uuidSchema = z
  .string()
  .uuid('Invalid UUID');

/**
 * Positive integer validation
 */
export const positiveIntSchema = z
  .number()
  .int('Must be an integer')
  .positive('Must be positive');

/**
 * Positive number validation (can be decimal)
 */
export const positiveNumberSchema = z
  .number()
  .positive('Must be positive');

/**
 * Pagination schema
 */
export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// ============================================
// User & Authentication Schemas
// ============================================

/**
 * User registration
 */
export const userRegistrationSchema = z.object({
  email: emailSchema,
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    ),
  walletAddress: walletAddressSchema.optional(),
});

/**
 * User login
 */
export const userLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

/**
 * User profile update
 */
export const userProfileUpdateSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  bio: z.string().max(500).optional(),
  website: urlSchema.optional(),
  twitter: z.string().max(100).optional(),
  discord: z.string().max(100).optional(),
});

/**
 * Wallet connection
 */
export const walletConnectionSchema = z.object({
  address: walletAddressSchema,
  signature: z.string().min(1, 'Signature is required'),
  message: z.string().min(1, 'Message is required'),
});

// ============================================
// NFT Schemas
// ============================================

/**
 * NFT metadata validation
 */
export const nftMetadataSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  description: z
    .string()
    .max(2000, 'Description must be less than 2000 characters')
    .optional(),
  image: z.string().url('Invalid image URL').optional(),
  externalUrl: urlSchema.optional(),
  attributes: z
    .array(
      z.object({
        traitType: z.string().min(1).max(100),
        value: z.union([z.string(), z.number()]),
        displayType: z.string().optional(),
      })
    )
    .max(50, 'Maximum 50 attributes allowed')
    .optional(),
  properties: z.record(z.any()).optional(),
});

/**
 * NFT minting request
 */
export const nftMintSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  description: z.string().max(2000).optional(),
  price: positiveNumberSchema.optional(),
  royaltyPercentage: z.number().min(0).max(50).optional().default(10),
  category: z.string().min(1).max(50).optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
  attributes: z
    .array(
      z.object({
        traitType: z.string().min(1).max(100),
        value: z.union([z.string(), z.number()]),
      })
    )
    .max(50)
    .optional(),
  collectionId: uuidSchema.optional(),
});

/**
 * NFT purchase
 */
export const nftPurchaseSchema = z.object({
  nftId: z.string().min(1, 'NFT ID is required'),
  paymentMethod: z.enum(['card', 'crypto'], {
    required_error: 'Payment method is required',
  }),
  amount: positiveNumberSchema,
  currency: z
    .string()
    .length(3, 'Currency must be 3 characters')
    .toUpperCase()
    .default('USD'),
  walletAddress: walletAddressSchema.optional(),
});

/**
 * NFT transfer
 */
export const nftTransferSchema = z.object({
  nftId: z.string().min(1, 'NFT ID is required'),
  toAddress: walletAddressSchema,
  fromAddress: walletAddressSchema.optional(),
});

/**
 * NFT search/filter
 */
export const nftSearchSchema = paginationSchema.extend({
  query: z.string().max(200).optional(),
  category: z.string().max(50).optional(),
  minPrice: positiveNumberSchema.optional(),
  maxPrice: positiveNumberSchema.optional(),
  verified: z.boolean().optional(),
  collectionId: uuidSchema.optional(),
  tags: z.array(z.string().max(50)).optional(),
});

// ============================================
// Collection Schemas
// ============================================

/**
 * Collection creation
 */
export const collectionCreateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).trim(),
  description: z.string().max(2000).optional(),
  symbol: z
    .string()
    .min(1, 'Symbol is required')
    .max(10, 'Symbol must be less than 10 characters')
    .regex(/^[A-Z0-9]+$/, 'Symbol must be uppercase alphanumeric')
    .trim(),
  category: z.string().max(50).optional(),
  bannerImage: urlSchema.optional(),
  logoImage: urlSchema.optional(),
  externalUrl: urlSchema.optional(),
  royaltyPercentage: z.number().min(0).max(50).default(10),
});

/**
 * Collection update
 */
export const collectionUpdateSchema = collectionCreateSchema
  .partial()
  .extend({
    id: uuidSchema,
  });

// ============================================
// Subscription Schemas
// ============================================

/**
 * Subscription tiers
 */
export const subscriptionTierSchema = z.enum([
  'explorer',
  'creator',
  'pro',
  'enterprise',
  'agency',
]);

/**
 * Subscription creation
 */
export const subscriptionCreateSchema = z.object({
  tier: subscriptionTierSchema,
  billingPeriod: z.enum(['month', 'year']).default('month'),
  paymentMethod: z.enum(['card', 'crypto']).default('card'),
});

/**
 * Subscription update
 */
export const subscriptionUpdateSchema = z.object({
  tier: subscriptionTierSchema.optional(),
  billingPeriod: z.enum(['month', 'year']).optional(),
  autoRenew: z.boolean().optional(),
});

/**
 * Subscription cancellation
 */
export const subscriptionCancelSchema = z.object({
  reason: z.string().max(500).optional(),
  feedback: z.string().max(1000).optional(),
  cancelImmediately: z.boolean().default(false),
});

// ============================================
// Payment Schemas
// ============================================

/**
 * Payment intent creation
 */
export const paymentIntentSchema = z.object({
  amount: positiveNumberSchema,
  currency: z.string().length(3).toUpperCase().default('USD'),
  paymentMethod: z.enum(['card', 'crypto']),
  description: z.string().max(500).optional(),
  metadata: z.record(z.any()).optional(),
});

/**
 * Crypto payment
 */
export const cryptoPaymentSchema = z.object({
  walletAddress: walletAddressSchema,
  amount: positiveNumberSchema,
  currency: z.enum(['ETH', 'MATIC', 'USDC', 'USDT']),
  transactionHash: z
    .string()
    .regex(/^0x[a-fA-F0-9]{64}$/, 'Invalid transaction hash'),
});

// ============================================
// File Upload Schemas
// ============================================

/**
 * File upload metadata
 */
export const fileUploadSchema = z.object({
  fileName: z.string().min(1).max(255),
  fileSize: z.number().positive().max(50 * 1024 * 1024), // 50MB max
  fileType: z
    .string()
    .regex(/^[a-zA-Z0-9]+\/[a-zA-Z0-9\+\-\.]+$/, 'Invalid MIME type'),
  purpose: z.enum(['nft-image', 'nft-metadata', 'profile-avatar', 'collection-banner', 'other']),
});

/**
 * Allowed file types
 */
export const imageFileTypesSchema = z.enum([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
]);

// ============================================
// Auction & Bidding Schemas
// ============================================

/**
 * Auction creation
 */
export const auctionCreateSchema = z.object({
  nftId: z.string().min(1, 'NFT ID is required'),
  startPrice: positiveNumberSchema,
  reservePrice: positiveNumberSchema.optional(),
  startTime: z.date().or(z.string().datetime()),
  endTime: z.date().or(z.string().datetime()),
  currency: z.string().length(3).toUpperCase().default('USD'),
}).refine(
  (data) => {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    return end > start;
  },
  { message: 'End time must be after start time', path: ['endTime'] }
);

/**
 * Bid placement
 */
export const bidPlacementSchema = z.object({
  auctionId: z.string().min(1, 'Auction ID is required'),
  amount: positiveNumberSchema,
  currency: z.string().length(3).toUpperCase().default('USD'),
  walletAddress: walletAddressSchema.optional(),
});

// ============================================
// Referral & Affiliate Schemas
// ============================================

/**
 * Referral code generation
 */
export const referralCodeSchema = z.object({
  code: z
    .string()
    .min(4, 'Code must be at least 4 characters')
    .max(20, 'Code must be less than 20 characters')
    .regex(/^[A-Z0-9_-]+$/i, 'Code can only contain letters, numbers, hyphens, and underscores')
    .optional(),
});

/**
 * Referral tracking
 */
export const referralTrackingSchema = z.object({
  referralCode: z.string().min(1),
  action: z.enum(['signup', 'purchase', 'subscription']),
  metadata: z.record(z.any()).optional(),
});

// ============================================
// Analytics & Reporting Schemas
// ============================================

/**
 * Analytics query
 */
export const analyticsQuerySchema = z.object({
  startDate: z.string().datetime().or(z.date()),
  endDate: z.string().datetime().or(z.date()),
  metrics: z.array(z.string()).min(1, 'At least one metric is required'),
  groupBy: z.enum(['day', 'week', 'month']).optional(),
  filters: z.record(z.any()).optional(),
});

// ============================================
// Validation Helper Functions
// ============================================

/**
 * Validate request body against schema
 */
export async function validateRequest<T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<{
  success: boolean;
  data?: T;
  errors?: z.ZodError;
  response?: Response;
}> {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);
    
    if (!result.success) {
      return {
        success: false,
        errors: result.error,
        response: new Response(
          JSON.stringify({
            error: 'Validation failed',
            details: result.error.errors.map((err) => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        ),
      };
    }
    
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      response: new Response(
        JSON.stringify({
          error: 'Invalid request body',
          message: 'Request body must be valid JSON',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      ),
    };
  }
}

/**
 * Validate query parameters
 */
export function validateQuery<T>(
  searchParams: URLSearchParams,
  schema: z.ZodSchema<T>
): {
  success: boolean;
  data?: T;
  errors?: z.ZodError;
  response?: Response;
} {
  try {
    const params = Object.fromEntries(searchParams.entries());
    const result = schema.safeParse(params);
    
    if (!result.success) {
      return {
        success: false,
        errors: result.error,
        response: new Response(
          JSON.stringify({
            error: 'Invalid query parameters',
            details: result.error.errors.map((err) => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        ),
      };
    }
    
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      response: new Response(
        JSON.stringify({
          error: 'Invalid query parameters',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      ),
    };
  }
}

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitize object recursively
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeHtml(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = Array.isArray(value)
        ? value.map((item) => (typeof item === 'object' ? sanitizeObject(item) : item))
        : sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized as T;
}

export default {
  // Export all schemas
  walletAddressSchema,
  emailSchema,
  urlSchema,
  uuidSchema,
  positiveIntSchema,
  positiveNumberSchema,
  paginationSchema,
  userRegistrationSchema,
  userLoginSchema,
  userProfileUpdateSchema,
  walletConnectionSchema,
  nftMetadataSchema,
  nftMintSchema,
  nftPurchaseSchema,
  nftTransferSchema,
  nftSearchSchema,
  collectionCreateSchema,
  collectionUpdateSchema,
  subscriptionTierSchema,
  subscriptionCreateSchema,
  subscriptionUpdateSchema,
  subscriptionCancelSchema,
  paymentIntentSchema,
  cryptoPaymentSchema,
  fileUploadSchema,
  imageFileTypesSchema,
  auctionCreateSchema,
  bidPlacementSchema,
  referralCodeSchema,
  referralTrackingSchema,
  analyticsQuerySchema,
  // Export helper functions
  validateRequest,
  validateQuery,
  sanitizeHtml,
  sanitizeObject,
};

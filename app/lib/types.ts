
export interface User {
  id: string;
  email: string;
  username?: string | null;
  firstName: string;
  lastName: string;
  walletAddress?: string | null;
  image?: string | null;
  subscriptionTier: SubscriptionTier;
  customUsername?: string | null;
  isVerified: boolean;
  stripeCustomerId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Define enums locally to avoid Prisma import issues
// These must match the Prisma schema enums
export enum SubscriptionTier {
  EXPLORER = 'EXPLORER',
  CREATOR = 'CREATOR',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
  AGENCY = 'AGENCY',
  // Legacy tiers (deprecated but kept for backwards compatibility)
  FREE = 'FREE',
  BASIC = 'BASIC',
  BRAND = 'BRAND',
  CORPORATE = 'CORPORATE'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  CONSUMER = 'CONSUMER'
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  PAST_DUE = 'PAST_DUE',
  UNPAID = 'UNPAID'
}

export enum NftStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED'
}

export enum UsageType {
  NFT_UPLOAD = 'NFT_UPLOAD',
  CUSTOM_USERNAME = 'CUSTOM_USERNAME',
  ANALYTICS_VIEW = 'ANALYTICS_VIEW'
}

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  price: number;
  nfts_per_month: number;
  features: string[];
  stripePriceId?: string;
}

export interface NftUpload {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  imageUrl: string;
  tokenId?: string | null;
  contractAddress?: string | null;
  blockchain: string;
  status: NftStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsageRecord {
  id: string;
  userId: string;
  action: UsageType;
  count: number;
  month: number;
  year: number;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  stripeSubscriptionId?: string | null;
  stripePriceId?: string | null;
  currentPeriodStart?: Date | null;
  currentPeriodEnd?: Date | null;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Environment bindings
export interface Env {
  DB?: D1Database; // Optional until D1 permissions are configured
  RATE_LIMITER: DurableObjectNamespace;
  ENVIRONMENT: string;
  CONTRACT_ADDRESS: string;
  ALLOWED_ORIGINS: string;
  ANTHROPIC_API_KEY?: string;
  STRIPE_SECRET_KEY?: string;
}

// Database models
export interface Manufacturer {
  id: string;
  company_name: string;
  contact_email: string;
  tier: string;
  status: string;
  onboarded_at: string;
}

export interface Deal {
  id: string;
  manufacturer_id: string;
  deal_name: string;
  deal_value: number;
  stage: string;
  owner_email: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  manufacturer_id: string;
  plan_name: string;
  amount: number;
  status: string;
  created_at: string;
}

export interface NFTMint {
  id: number;
  token_id: string;
  to_address: string;
  tx_hash: string;
  block_number: number;
  timestamp: number;
  processed_at: string;
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Request types
export interface CreateManufacturerRequest {
  company_name: string;
  contact_email: string;
  tier?: string;
}

export interface CreateDealRequest {
  manufacturer_id: string;
  deal_name: string;
  deal_value: number;
  stage: string;
  owner_email: string;
}

export interface CreateSubscriptionRequest {
  manufacturer_id: string;
  plan_name: string;
  amount: number;
  status: string;
}

export interface RecordNFTMintRequest {
  token_id: string;
  to_address: string;
  tx_hash: string;
  block_number: number;
  timestamp: number;
}

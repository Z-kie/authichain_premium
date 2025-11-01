
-- Add missing marketing-related tables and enhancements

-- Add affiliate program enhancements
ALTER TABLE "ReferralCode" 
ADD COLUMN IF NOT EXISTS "tier" TEXT DEFAULT 'BRONZE',
ADD COLUMN IF NOT EXISTS "performanceData" JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS "lastPayoutDate" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "nextPayoutAmount" DECIMAL(10,2) DEFAULT 0;

-- Create affiliate performance tracking table
CREATE TABLE IF NOT EXISTS "AffiliatePerformance" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "affiliateId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "clicks" INTEGER DEFAULT 0,
    "conversions" INTEGER DEFAULT 0,
    "revenue" DECIMAL(10,2) DEFAULT 0,
    "commission" DECIMAL(10,2) DEFAULT 0,
    "conversionRate" DECIMAL(5,2) DEFAULT 0,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT "AffiliatePerformance_affiliateId_fkey" 
    FOREIGN KEY ("affiliateId") REFERENCES "ReferralCode"("id") ON DELETE CASCADE
);

-- Create unique index for affiliate performance
CREATE UNIQUE INDEX IF NOT EXISTS "AffiliatePerformance_affiliateId_month_year_key" 
ON "AffiliatePerformance"("affiliateId", "month", "year");

-- Add lead magnet tracking
CREATE TABLE IF NOT EXISTS "LeadMagnetDownload" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "magnetId" TEXT NOT NULL,
    "magnetTitle" TEXT NOT NULL,
    "downloadUrl" TEXT,
    "campaign" TEXT DEFAULT 'general',
    "source" TEXT DEFAULT 'organic',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "referralCode" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT "LeadMagnetDownload_email_fkey" 
    FOREIGN KEY ("email") REFERENCES "MarketingLead"("email") ON DELETE CASCADE
);

-- Add indexes for lead magnet tracking
CREATE INDEX IF NOT EXISTS "LeadMagnetDownload_email_idx" ON "LeadMagnetDownload"("email");
CREATE INDEX IF NOT EXISTS "LeadMagnetDownload_magnetId_idx" ON "LeadMagnetDownload"("magnetId");
CREATE INDEX IF NOT EXISTS "LeadMagnetDownload_campaign_idx" ON "LeadMagnetDownload"("campaign");

-- Add promotional campaign tracking
CREATE TABLE IF NOT EXISTS "PromotionalCampaign" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL, -- 'launch_special', 'lead_magnet', 'affiliate_promo', etc.
    "status" TEXT NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'PAUSED', 'COMPLETED'
    "startDate" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP,
    "targetMetrics" JSONB DEFAULT '{}',
    "actualMetrics" JSONB DEFAULT '{}',
    "configuration" JSONB DEFAULT '{}',
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create promotional campaign interaction tracking
CREATE TABLE IF NOT EXISTS "CampaignInteraction" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "campaignId" TEXT NOT NULL,
    "email" TEXT,
    "action" TEXT NOT NULL, -- 'view', 'click', 'conversion', 'dismiss'
    "value" DECIMAL(10,2) DEFAULT 0,
    "metadata" JSONB DEFAULT '{}',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT "CampaignInteraction_campaignId_fkey" 
    FOREIGN KEY ("campaignId") REFERENCES "PromotionalCampaign"("id") ON DELETE CASCADE
);

-- Add indexes for campaign interactions
CREATE INDEX IF NOT EXISTS "CampaignInteraction_campaignId_idx" ON "CampaignInteraction"("campaignId");
CREATE INDEX IF NOT EXISTS "CampaignInteraction_email_idx" ON "CampaignInteraction"("email");
CREATE INDEX IF NOT EXISTS "CampaignInteraction_action_idx" ON "CampaignInteraction"("action");

-- Enhance marketing leads table
ALTER TABLE "MarketingLead"
ADD COLUMN IF NOT EXISTS "firstName" TEXT,
ADD COLUMN IF NOT EXISTS "lastName" TEXT,
ADD COLUMN IF NOT EXISTS "interests" TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS "leadScore" INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS "lifecycleStage" TEXT DEFAULT 'LEAD', -- 'LEAD', 'QUALIFIED', 'CUSTOMER', 'ADVOCATE'
ADD COLUMN IF NOT EXISTS "lastEngagementDate" TIMESTAMP,
ADD COLUMN IF NOT EXISTS "totalEngagements" INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS "averageEngagementScore" DECIMAL(5,2) DEFAULT 0;

-- Add bonus package tracking
CREATE TABLE IF NOT EXISTS "BonusPackageAssignment" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "packageTier" TEXT NOT NULL, -- 'CREATOR', 'PRO', 'ENTERPRISE'
    "packageValue" DECIMAL(10,2) NOT NULL,
    "components" JSONB NOT NULL DEFAULT '{}',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'CLAIMED', 'EXPIRED'
    "expiresAt" TIMESTAMP,
    "claimedAt" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT "BonusPackageAssignment_userId_fkey" 
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Create unique index for bonus packages (one per user per tier)
CREATE UNIQUE INDEX IF NOT EXISTS "BonusPackageAssignment_userId_packageTier_key" 
ON "BonusPackageAssignment"("userId", "packageTier");

-- Add webhook event logging
CREATE TABLE IF NOT EXISTS "WebhookEvent" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "eventType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "signature" TEXT,
    "processed" BOOLEAN DEFAULT FALSE,
    "processingError" TEXT,
    "retryCount" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "processedAt" TIMESTAMP
);

-- Add indexes for webhook events
CREATE INDEX IF NOT EXISTS "WebhookEvent_eventType_idx" ON "WebhookEvent"("eventType");
CREATE INDEX IF NOT EXISTS "WebhookEvent_processed_idx" ON "WebhookEvent"("processed");
CREATE INDEX IF NOT EXISTS "WebhookEvent_createdAt_idx" ON "WebhookEvent"("createdAt");

-- Update ReferralCode type enum if needed
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'referraltype') THEN
        CREATE TYPE "ReferralType" AS ENUM ('USER', 'AFFILIATE', 'PARTNER', 'INFLUENCER');
    ELSE
        -- Add new enum values if they don't exist
        BEGIN
            ALTER TYPE "ReferralType" ADD VALUE IF NOT EXISTS 'AFFILIATE';
            ALTER TYPE "ReferralType" ADD VALUE IF NOT EXISTS 'PARTNER';  
            ALTER TYPE "ReferralType" ADD VALUE IF NOT EXISTS 'INFLUENCER';
        EXCEPTION
            WHEN duplicate_object THEN NULL;
        END;
    END IF;
END $$;

-- Insert initial promotional campaigns
INSERT INTO "PromotionalCampaign" ("name", "type", "startDate", "endDate", "configuration") VALUES
(
    'Launch Week Specials',
    'launch_special',
    NOW(),
    NOW() + INTERVAL '7 days',
    '{"bonusValue": 15947, "slotsRemaining": 127, "urgencyMessage": "Limited to first 500 creators"}'
) ON CONFLICT DO NOTHING;

INSERT INTO "PromotionalCampaign" ("name", "type", "startDate", "configuration") VALUES
(
    'Affiliate Program Launch',
    'affiliate_promo', 
    NOW(),
    '{"commissionRates": {"BRONZE": 25, "SILVER": 30, "GOLD": 35, "PLATINUM": 40}}'
) ON CONFLICT DO NOTHING;

-- Add trigger to update marketing lead engagement tracking
CREATE OR REPLACE FUNCTION update_lead_engagement()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE "MarketingLead" 
    SET 
        "lastEngagementDate" = NOW(),
        "totalEngagements" = "totalEngagements" + 1
    WHERE "email" = NEW.email;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for marketing events
DROP TRIGGER IF EXISTS trigger_update_lead_engagement ON "MarketingEvent";
CREATE TRIGGER trigger_update_lead_engagement
    AFTER INSERT ON "MarketingEvent"
    FOR EACH ROW
    EXECUTE FUNCTION update_lead_engagement();

COMMIT;

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('EXPLORER', 'CREATOR', 'PRO', 'ENTERPRISE', 'AGENCY', 'FREE', 'BASIC', 'BRAND', 'CORPORATE');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELED', 'PAST_DUE', 'UNPAID');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CONSUMER');

-- CreateEnum
CREATE TYPE "NftStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED', 'LISTED', 'UNLISTED', 'IN_AUCTION', 'SOLD', 'BURNED');

-- CreateEnum
CREATE TYPE "UsageType" AS ENUM ('NFT_UPLOAD', 'CUSTOM_USERNAME', 'ANALYTICS_VIEW');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('ACTIVE', 'CONVERTED', 'UNSUBSCRIBED', 'BOUNCED');

-- CreateEnum
CREATE TYPE "CampaignType" AS ENUM ('EMAIL_SEQUENCE', 'LANDING_PAGE', 'SOCIAL_MEDIA', 'REFERRAL_PROGRAM', 'AFFILIATE_PROMOTION');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('ACTIVE', 'PAUSED', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ReferralType" AS ENUM ('USER', 'AFFILIATE', 'INFLUENCER');

-- CreateEnum
CREATE TYPE "ConversionStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "StrainType" AS ENUM ('INDICA', 'SATIVA', 'HYBRID');

-- CreateEnum
CREATE TYPE "PackageStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'RECALLED', 'DESTROYED');

-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "SeedToSaleStage" AS ENUM ('SEED', 'CLONE', 'VEGETATIVE', 'FLOWERING', 'HARVEST', 'PROCESSING', 'PACKAGING', 'DISTRIBUTION', 'RETAIL', 'CONSUMED');

-- CreateEnum
CREATE TYPE "LicenseType" AS ENUM ('GROWER', 'PROCESSOR', 'DISTRIBUTOR', 'RETAILER', 'TESTING_LAB', 'DELIVERY', 'EXCLUSIVE', 'NON_EXCLUSIVE');

-- CreateEnum
CREATE TYPE "ProfessionalStatus" AS ENUM ('PENDING', 'VERIFIED', 'SUSPENDED', 'REVOKED');

-- CreateEnum
CREATE TYPE "ArtistLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'EXPERT', 'MASTER');

-- CreateEnum
CREATE TYPE "ArtworkCategory" AS ENUM ('PACKAGE_DESIGN', 'STRAIN_ART', 'CHARACTER_DESIGN', 'LOGO_DESIGN', 'BANNER_DESIGN', 'SOCIAL_MEDIA', 'PROMOTIONAL', 'NFT_ART');

-- CreateEnum
CREATE TYPE "ArtworkStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'PRIVATE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "CommissionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'IN_PROGRESS', 'REVISION_REQUESTED', 'COMPLETED', 'CANCELLED', 'DISPUTED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('LISTED', 'SOLD', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "WhiteLabelStatus" AS ENUM ('SETUP', 'DEVELOPMENT', 'TESTING', 'ACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "IntegrationStatus" AS ENUM ('PENDING', 'DEVELOPMENT', 'TESTING', 'ACTIVE', 'FAILED');

-- CreateEnum
CREATE TYPE "ApiTier" AS ENUM ('DEVELOPER', 'BUSINESS', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "PartnerStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "LaunchBonusType" AS ENUM ('FOUNDERS_CIRCLE', 'LAUNCH_WEEK_BONANZA', 'PIONEER_PROGRAM', 'CREATOR_LAUNCH_KIT', 'PRO_LAUNCH_BUNDLE', 'ENTERPRISE_DOMINATION_SUITE', 'AGENCY_EMPIRE_BUILDER');

-- CreateEnum
CREATE TYPE "CommercialLicenseType" AS ENUM ('BASIC', 'ADVANCED', 'AGENCY');

-- CreateEnum
CREATE TYPE "AffiliateStatus" AS ENUM ('PENDING', 'APPROVED', 'ACTIVE', 'SUSPENDED', 'TERMINATED');

-- CreateEnum
CREATE TYPE "CollectionCategory" AS ENUM ('ART', 'PHOTOGRAPHY', 'MUSIC', 'VIDEO', 'GAMING', 'SPORTS', 'COLLECTIBLES', 'UTILITY', 'DOMAIN_NAMES', 'VIRTUAL_WORLDS', 'TRADING_CARDS', 'MEMBERSHIP', 'OTHER');

-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('FIXED_PRICE', 'AUCTION', 'NOT_FOR_SALE');

-- CreateEnum
CREATE TYPE "AuctionStatus" AS ENUM ('PENDING', 'ACTIVE', 'ENDED', 'SETTLED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "BidStatus" AS ENUM ('ACTIVE', 'OUTBID', 'WINNING', 'WON', 'LOST', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "TransferType" AS ENUM ('MINT', 'SALE', 'TRANSFER', 'BURN');

-- CreateEnum
CREATE TYPE "PriceEventType" AS ENUM ('LISTING', 'SALE', 'DELISTING', 'PRICE_CHANGE');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('NFT_PURCHASE', 'NFT_SALE', 'SUBSCRIPTION_PAYMENT', 'AUCTION_BID', 'AUCTION_SETTLEMENT', 'ESCROW_DEPOSIT', 'ESCROW_RELEASE', 'ROYALTY_PAYMENT', 'AFFILIATE_COMMISSION', 'REFUND', 'WITHDRAWAL', 'DEPOSIT');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('STRIPE', 'CRYPTO_ETH', 'CRYPTO_MATIC', 'CRYPTO_USDC', 'BANK_TRANSFER', 'PAYPAL');

-- CreateEnum
CREATE TYPE "EscrowStatus" AS ENUM ('CREATED', 'FUNDED', 'IN_REVIEW', 'APPROVED', 'DISPUTED', 'RELEASED', 'REFUNDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "APIKeyStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'REVOKED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('NFT_SOLD', 'NFT_PURCHASED', 'BID_RECEIVED', 'BID_OUTBID', 'BID_WON', 'AUCTION_ENDING_SOON', 'AUCTION_ENDED', 'OFFER_RECEIVED', 'OFFER_ACCEPTED', 'OFFER_REJECTED', 'COLLECTION_UPDATE', 'SUBSCRIPTION_EXPIRING', 'SUBSCRIPTION_RENEWED', 'PAYMENT_RECEIVED', 'PAYMENT_FAILED', 'PAYOUT_PROCESSED', 'AFFILIATE_CONVERSION', 'SYSTEM_ALERT');

-- CreateEnum
CREATE TYPE "PayoutMethod" AS ENUM ('BANK_TRANSFER', 'PAYPAL', 'CRYPTO_ETH', 'CRYPTO_USDC', 'STRIPE_TRANSFER');

-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "walletAddress" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "acceptTerms" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionTier" "SubscriptionTier" NOT NULL DEFAULT 'EXPLORER',
    "customUsername" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "stripeCustomerId" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'CONSUMER',
    "signupNumber" INTEGER,
    "referredBy" TEXT,
    "totalReferrals" INTEGER NOT NULL DEFAULT 0,
    "referralEarnings" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tier" "SubscriptionTier" NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "stripeSubscriptionId" TEXT,
    "stripePriceId" TEXT,
    "currentPeriodStart" TIMESTAMP(3),
    "currentPeriodEnd" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NftUpload" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT NOT NULL,
    "tokenId" TEXT,
    "contractAddress" TEXT,
    "blockchain" TEXT NOT NULL DEFAULT 'ethereum',
    "status" "NftStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NftUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsageRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" "UsageType" NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsageRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingLead" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "campaign" TEXT NOT NULL,
    "lastCampaign" TEXT NOT NULL,
    "lastSource" TEXT NOT NULL,
    "touchCount" INTEGER NOT NULL DEFAULT 1,
    "status" "LeadStatus" NOT NULL DEFAULT 'ACTIVE',
    "tags" TEXT[],
    "lastConversion" TEXT,
    "lastConversionValue" DOUBLE PRECISION,
    "lastConversionDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketingLead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingEvent" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "event" TEXT NOT NULL,
    "campaign" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "subscriptionTier" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarketingEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingCampaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CampaignType" NOT NULL,
    "status" "CampaignStatus" NOT NULL DEFAULT 'ACTIVE',
    "description" TEXT,
    "targetRevenue" DOUBLE PRECISION,
    "actualRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "conversionGoal" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "settings" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketingCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "userId" TEXT,
    "type" "ReferralType" NOT NULL DEFAULT 'USER',
    "commission" DOUBLE PRECISION NOT NULL DEFAULT 0.2,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "totalEarnings" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferralCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralConversion" (
    "id" TEXT NOT NULL,
    "referralCodeId" TEXT NOT NULL,
    "convertedEmail" TEXT NOT NULL,
    "subscriptionTier" TEXT NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "commission" DOUBLE PRECISION NOT NULL,
    "status" "ConversionStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferralConversion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CannabisStrain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "StrainType" NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "genetics" JSONB NOT NULL,
    "heritage" JSONB NOT NULL,
    "characteristics" JSONB NOT NULL,
    "rarityScore" DOUBLE PRECISION NOT NULL DEFAULT 50,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CannabisStrain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CannabisPackage" (
    "id" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "qrCode" TEXT NOT NULL,
    "strainId" TEXT NOT NULL,
    "growerId" TEXT NOT NULL,
    "harvestDate" TIMESTAMP(3) NOT NULL,
    "packageDate" TIMESTAMP(3) NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "netWeight" DOUBLE PRECISION NOT NULL,
    "batchNumber" TEXT NOT NULL,
    "labTestId" TEXT,
    "stateTrackingNumber" TEXT,
    "location" JSONB,
    "cultivationData" JSONB,
    "status" "PackageStatus" NOT NULL DEFAULT 'ACTIVE',
    "scannedCount" INTEGER NOT NULL DEFAULT 0,
    "lastScanned" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CannabisPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CannabisNFT" (
    "id" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT NOT NULL,
    "animationUrl" TEXT,
    "metadataUrl" TEXT,
    "packageId" TEXT NOT NULL,
    "strainId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "artistId" TEXT,
    "blockchain" TEXT NOT NULL DEFAULT 'ethereum',
    "contractAddress" TEXT,
    "price" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'ETH',
    "rarityScore" DOUBLE PRECISION NOT NULL DEFAULT 50,
    "rarityRank" INTEGER,
    "traits" JSONB NOT NULL,
    "royaltyPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isMinted" BOOLEAN NOT NULL DEFAULT false,
    "mintTransactionHash" TEXT,
    "status" "NftStatus" NOT NULL DEFAULT 'ACTIVE',
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CannabisNFT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabTest" (
    "id" TEXT NOT NULL,
    "testNumber" TEXT NOT NULL,
    "testDate" TIMESTAMP(3) NOT NULL,
    "labId" TEXT NOT NULL,
    "packageId" TEXT,
    "batchNumber" TEXT NOT NULL,
    "cannabinoids" JSONB NOT NULL,
    "terpenes" JSONB,
    "contaminants" JSONB,
    "moisture" DOUBLE PRECISION,
    "waterActivity" DOUBLE PRECISION,
    "certificateUrl" TEXT,
    "qrCodeData" TEXT,
    "status" "TestStatus" NOT NULL DEFAULT 'PENDING',
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeedToSaleEvent" (
    "id" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "stage" "SeedToSaleStage" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "operatorLicense" TEXT,
    "operatorId" TEXT,
    "notes" TEXT,
    "gpsCoordinates" JSONB,
    "environmentData" JSONB,
    "photoUrls" TEXT[],
    "blockchainHash" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeedToSaleEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CannabisProfessional" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "businessName" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "licenseType" "LicenseType" NOT NULL,
    "licenseExpiry" TIMESTAMP(3) NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT,
    "address" JSONB NOT NULL,
    "status" "ProfessionalStatus" NOT NULL DEFAULT 'PENDING',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationDate" TIMESTAMP(3),
    "monthlyPackages" INTEGER NOT NULL DEFAULT 0,
    "totalRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "profileImageUrl" TEXT,
    "bannerImageUrl" TEXT,
    "description" TEXT,
    "specialties" TEXT[],
    "certifications" JSONB,
    "socialLinks" JSONB,
    "joinedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CannabisProfessional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CannabisArtist" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "artistName" TEXT NOT NULL,
    "bio" TEXT,
    "walletAddress" TEXT,
    "portfolioUrl" TEXT,
    "socialLinks" JSONB,
    "specializations" TEXT[],
    "experienceLevel" "ArtistLevel" NOT NULL DEFAULT 'BEGINNER',
    "totalArtworks" INTEGER NOT NULL DEFAULT 0,
    "totalRoyalties" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "commissionRate" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "minCommission" DOUBLE PRECISION NOT NULL DEFAULT 50,
    "profileImageUrl" TEXT,
    "bannerImageUrl" TEXT,
    "featuredWorkUrl" TEXT,
    "joinedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CannabisArtist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artwork" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "artistId" TEXT NOT NULL,
    "category" "ArtworkCategory" NOT NULL,
    "tags" TEXT[],
    "isForSale" BOOLEAN NOT NULL DEFAULT false,
    "price" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "licenseType" "LicenseType" NOT NULL DEFAULT 'EXCLUSIVE',
    "usageRights" JSONB,
    "dimensions" JSONB,
    "fileFormat" TEXT,
    "fileSize" INTEGER,
    "isNSFW" BOOLEAN NOT NULL DEFAULT false,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "status" "ArtworkStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtCommission" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "artworkId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "deadline" TIMESTAMP(3),
    "status" "CommissionStatus" NOT NULL DEFAULT 'PENDING',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "artworkFiles" JSONB,
    "revisionCount" INTEGER NOT NULL DEFAULT 0,
    "maxRevisions" INTEGER NOT NULL DEFAULT 3,
    "communicationLog" JSONB,
    "contractUrl" TEXT,
    "finalPrice" DOUBLE PRECISION,
    "paidAmount" DOUBLE PRECISION,
    "royaltyPercentage" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "ArtCommission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QRScan" (
    "id" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "scannerId" TEXT,
    "scannerIp" TEXT NOT NULL,
    "deviceInfo" JSONB,
    "location" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wasSuccessful" BOOLEAN NOT NULL DEFAULT true,
    "nftCreated" BOOLEAN NOT NULL DEFAULT false,
    "nftId" TEXT,

    CONSTRAINT "QRScan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoyaltyPayment" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'ETH',
    "transactionHash" TEXT,
    "blockchainNetwork" TEXT NOT NULL DEFAULT 'ethereum',
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "saleId" TEXT,

    CONSTRAINT "RoyaltyPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFTSale" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "buyerId" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'ETH',
    "transactionHash" TEXT,
    "blockchainNetwork" TEXT NOT NULL DEFAULT 'ethereum',
    "saleDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "SaleStatus" NOT NULL DEFAULT 'LISTED',
    "marketplaceFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "royaltyFee" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "NFTSale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFTLike" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NFTLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtworkLike" (
    "id" TEXT NOT NULL,
    "artworkId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArtworkLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhiteLabelClient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT,
    "logo" TEXT,
    "status" "WhiteLabelStatus" NOT NULL DEFAULT 'SETUP',
    "tier" "SubscriptionTier" NOT NULL DEFAULT 'ENTERPRISE',
    "locations" INTEGER NOT NULL DEFAULT 1,
    "monthlyRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "setupFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "monthlyFee" DOUBLE PRECISION NOT NULL DEFAULT 499,
    "customBranding" BOOLEAN NOT NULL DEFAULT true,
    "apiAccess" BOOLEAN NOT NULL DEFAULT true,
    "mobileApp" BOOLEAN NOT NULL DEFAULT false,
    "dedicatedSupport" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhiteLabelClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhiteLabelIntegration" (
    "id" TEXT NOT NULL,
    "whiteLabelId" TEXT NOT NULL,
    "integrationType" TEXT NOT NULL,
    "status" "IntegrationStatus" NOT NULL DEFAULT 'PENDING',
    "apiEndpoint" TEXT,
    "credentials" JSONB,
    "monthlyUsage" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhiteLabelIntegration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiUsage" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "calls" INTEGER NOT NULL DEFAULT 0,
    "revenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tier" "ApiTier" NOT NULL DEFAULT 'DEVELOPER',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "ApiUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DispensaryPartner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "locations" INTEGER NOT NULL DEFAULT 1,
    "monthlyScans" INTEGER NOT NULL DEFAULT 0,
    "revenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "PartnerStatus" NOT NULL DEFAULT 'ACTIVE',
    "partnershipType" TEXT NOT NULL DEFAULT 'STANDARD',
    "contactEmail" TEXT,
    "integrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DispensaryPartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabPartner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "monthlyTests" INTEGER NOT NULL DEFAULT 0,
    "revenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "integrationType" TEXT NOT NULL DEFAULT 'API',
    "status" "PartnerStatus" NOT NULL DEFAULT 'ACTIVE',
    "accuracy" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabPartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaunchBonus" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bonusType" "LaunchBonusType" NOT NULL,
    "tier" "SubscriptionTier" NOT NULL,
    "claimed" BOOLEAN NOT NULL DEFAULT true,
    "claimedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bonusValue" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "resources" JSONB,
    "metadata" JSONB,

    CONSTRAINT "LaunchBonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommercialLicense" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "licenseType" "CommercialLicenseType" NOT NULL,
    "licenseKey" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "clientLimit" INTEGER NOT NULL DEFAULT 5,
    "whiteLabelEnabled" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,

    CONSTRAINT "CommercialLicense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AffiliatePartner" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "AffiliateStatus" NOT NULL DEFAULT 'PENDING',
    "commissionRate" DOUBLE PRECISION NOT NULL DEFAULT 0.3,
    "totalEarnings" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalConversions" INTEGER NOT NULL DEFAULT 0,
    "payoutThreshold" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "availableBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "paidBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "affiliateCode" TEXT NOT NULL,
    "website" TEXT,
    "socialLinks" JSONB,
    "notes" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AffiliatePartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "transactionType" "TransactionType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'STRIPE',
    "stripePaymentId" TEXT,
    "stripeSessionId" TEXT,
    "cryptoAddress" TEXT,
    "cryptoTxHash" TEXT,
    "description" TEXT,
    "metadata" JSONB,
    "referenceId" TEXT,
    "referenceType" TEXT,
    "escrowId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "errorMessage" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escrow" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT,
    "buyerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "EscrowStatus" NOT NULL DEFAULT 'CREATED',
    "releaseCondition" TEXT,
    "buyerApproved" BOOLEAN NOT NULL DEFAULT false,
    "sellerApproved" BOOLEAN NOT NULL DEFAULT false,
    "adminApproved" BOOLEAN NOT NULL DEFAULT false,
    "releasedAmount" DOUBLE PRECISION,
    "disputeReason" TEXT,
    "resolutionNotes" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "releasedAt" TIMESTAMP(3),
    "disputedAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "Escrow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnterpriseAPIKey" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clientId" TEXT,
    "name" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "apiSecret" TEXT NOT NULL,
    "tier" "ApiTier" NOT NULL DEFAULT 'DEVELOPER',
    "status" "APIKeyStatus" NOT NULL DEFAULT 'ACTIVE',
    "permissions" TEXT[],
    "rateLimit" INTEGER NOT NULL DEFAULT 1000,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "lastUsedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "ipWhitelist" TEXT[],
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "EnterpriseAPIKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalyticsEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "eventType" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "category" TEXT,
    "properties" JSONB,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "country" TEXT,
    "city" TEXT,
    "referrer" TEXT,
    "path" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnalyticsEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "link" TEXT,
    "metadata" JSONB,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payout" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "affiliateId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "method" "PayoutMethod" NOT NULL DEFAULT 'BANK_TRANSFER',
    "status" "PayoutStatus" NOT NULL DEFAULT 'PENDING',
    "stripeTransferId" TEXT,
    "bankDetails" JSONB,
    "cryptoAddress" TEXT,
    "cryptoTxHash" TEXT,
    "notes" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "errorMessage" TEXT,

    CONSTRAINT "Payout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MultiCurrencyPrice" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "exchangeRate" DOUBLE PRECISION,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MultiCurrencyPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteNFT" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteNFT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchlistCollection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchlistCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "coverImage" TEXT,
    "bannerImage" TEXT,
    "creatorId" TEXT NOT NULL,
    "category" "CollectionCategory" NOT NULL DEFAULT 'ART',
    "floorPrice" DOUBLE PRECISION,
    "totalVolume" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "itemCount" INTEGER NOT NULL DEFAULT 0,
    "ownerCount" INTEGER NOT NULL DEFAULT 0,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "royaltyPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "blockchain" TEXT NOT NULL DEFAULT 'ethereum',
    "contractAddress" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "tags" TEXT[],
    "socialLinks" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFT" (
    "id" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "blockchain" TEXT NOT NULL DEFAULT 'ethereum',
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "imageIpfs" TEXT,
    "animationUrl" TEXT,
    "externalUrl" TEXT,
    "metadata" JSONB,
    "metadataIpfs" TEXT,
    "collectionId" TEXT,
    "creatorId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'ETH',
    "royaltyPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "NftStatus" NOT NULL DEFAULT 'ACTIVE',
    "listingType" "ListingType" NOT NULL DEFAULT 'FIXED_PRICE',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "authenticityScore" INTEGER,
    "attributes" JSONB,
    "rarityScore" DOUBLE PRECISION,
    "rarityRank" INTEGER,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "isMinted" BOOLEAN NOT NULL DEFAULT false,
    "mintTransactionHash" TEXT,
    "mintedAt" TIMESTAMP(3),
    "lastSalePrice" DOUBLE PRECISION,
    "lastSaleDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NFT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auction" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "startPrice" DOUBLE PRECISION NOT NULL,
    "reservePrice" DOUBLE PRECISION,
    "currentBid" DOUBLE PRECISION,
    "currentBidderId" TEXT,
    "bidIncrement" DOUBLE PRECISION NOT NULL DEFAULT 0.01,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "AuctionStatus" NOT NULL DEFAULT 'ACTIVE',
    "winnerId" TEXT,
    "winningBid" DOUBLE PRECISION,
    "settledAt" TIMESTAMP(3),
    "transactionHash" TEXT,
    "bidCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bid" (
    "id" TEXT NOT NULL,
    "auctionId" TEXT,
    "nftId" TEXT,
    "bidderId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "BidStatus" NOT NULL DEFAULT 'ACTIVE',
    "transactionHash" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "offererId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'ETH',
    "message" TEXT,
    "status" "OfferStatus" NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "transactionHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFTTransfer" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "blockchain" TEXT NOT NULL DEFAULT 'ethereum',
    "transferType" "TransferType" NOT NULL DEFAULT 'SALE',
    "price" DOUBLE PRECISION,
    "currency" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NFTTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceHistory" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'ETH',
    "eventType" "PriceEventType" NOT NULL DEFAULT 'LISTING',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_customUsername_key" ON "User"("customUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");

-- CreateIndex
CREATE INDEX "NftUpload_userId_idx" ON "NftUpload"("userId");

-- CreateIndex
CREATE INDEX "NftUpload_createdAt_idx" ON "NftUpload"("createdAt");

-- CreateIndex
CREATE INDEX "UsageRecord_userId_month_year_idx" ON "UsageRecord"("userId", "month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "UsageRecord_userId_action_month_year_key" ON "UsageRecord"("userId", "action", "month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "MarketingLead_email_key" ON "MarketingLead"("email");

-- CreateIndex
CREATE INDEX "MarketingLead_email_idx" ON "MarketingLead"("email");

-- CreateIndex
CREATE INDEX "MarketingLead_campaign_idx" ON "MarketingLead"("campaign");

-- CreateIndex
CREATE INDEX "MarketingLead_createdAt_idx" ON "MarketingLead"("createdAt");

-- CreateIndex
CREATE INDEX "MarketingEvent_event_idx" ON "MarketingEvent"("event");

-- CreateIndex
CREATE INDEX "MarketingEvent_campaign_idx" ON "MarketingEvent"("campaign");

-- CreateIndex
CREATE INDEX "MarketingEvent_createdAt_idx" ON "MarketingEvent"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "MarketingCampaign_name_key" ON "MarketingCampaign"("name");

-- CreateIndex
CREATE INDEX "MarketingCampaign_type_idx" ON "MarketingCampaign"("type");

-- CreateIndex
CREATE INDEX "MarketingCampaign_status_idx" ON "MarketingCampaign"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralCode_code_key" ON "ReferralCode"("code");

-- CreateIndex
CREATE INDEX "ReferralCode_code_idx" ON "ReferralCode"("code");

-- CreateIndex
CREATE INDEX "ReferralCode_userId_idx" ON "ReferralCode"("userId");

-- CreateIndex
CREATE INDEX "ReferralConversion_referralCodeId_idx" ON "ReferralConversion"("referralCodeId");

-- CreateIndex
CREATE INDEX "ReferralConversion_convertedEmail_idx" ON "ReferralConversion"("convertedEmail");

-- CreateIndex
CREATE UNIQUE INDEX "CannabisStrain_name_key" ON "CannabisStrain"("name");

-- CreateIndex
CREATE INDEX "CannabisStrain_type_idx" ON "CannabisStrain"("type");

-- CreateIndex
CREATE INDEX "CannabisStrain_rarityScore_idx" ON "CannabisStrain"("rarityScore");

-- CreateIndex
CREATE INDEX "CannabisStrain_isVerified_idx" ON "CannabisStrain"("isVerified");

-- CreateIndex
CREATE UNIQUE INDEX "CannabisPackage_packageId_key" ON "CannabisPackage"("packageId");

-- CreateIndex
CREATE UNIQUE INDEX "CannabisPackage_qrCode_key" ON "CannabisPackage"("qrCode");

-- CreateIndex
CREATE INDEX "CannabisPackage_packageId_idx" ON "CannabisPackage"("packageId");

-- CreateIndex
CREATE INDEX "CannabisPackage_strainId_idx" ON "CannabisPackage"("strainId");

-- CreateIndex
CREATE INDEX "CannabisPackage_growerId_idx" ON "CannabisPackage"("growerId");

-- CreateIndex
CREATE INDEX "CannabisPackage_harvestDate_idx" ON "CannabisPackage"("harvestDate");

-- CreateIndex
CREATE INDEX "CannabisPackage_status_idx" ON "CannabisPackage"("status");

-- CreateIndex
CREATE UNIQUE INDEX "CannabisNFT_tokenId_key" ON "CannabisNFT"("tokenId");

-- CreateIndex
CREATE INDEX "CannabisNFT_tokenId_idx" ON "CannabisNFT"("tokenId");

-- CreateIndex
CREATE INDEX "CannabisNFT_packageId_idx" ON "CannabisNFT"("packageId");

-- CreateIndex
CREATE INDEX "CannabisNFT_creatorId_idx" ON "CannabisNFT"("creatorId");

-- CreateIndex
CREATE INDEX "CannabisNFT_ownerId_idx" ON "CannabisNFT"("ownerId");

-- CreateIndex
CREATE INDEX "CannabisNFT_rarityScore_idx" ON "CannabisNFT"("rarityScore");

-- CreateIndex
CREATE INDEX "CannabisNFT_createdAt_idx" ON "CannabisNFT"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "LabTest_testNumber_key" ON "LabTest"("testNumber");

-- CreateIndex
CREATE INDEX "LabTest_testNumber_idx" ON "LabTest"("testNumber");

-- CreateIndex
CREATE INDEX "LabTest_labId_idx" ON "LabTest"("labId");

-- CreateIndex
CREATE INDEX "LabTest_testDate_idx" ON "LabTest"("testDate");

-- CreateIndex
CREATE INDEX "LabTest_status_idx" ON "LabTest"("status");

-- CreateIndex
CREATE INDEX "SeedToSaleEvent_packageId_idx" ON "SeedToSaleEvent"("packageId");

-- CreateIndex
CREATE INDEX "SeedToSaleEvent_stage_idx" ON "SeedToSaleEvent"("stage");

-- CreateIndex
CREATE INDEX "SeedToSaleEvent_timestamp_idx" ON "SeedToSaleEvent"("timestamp");

-- CreateIndex
CREATE INDEX "SeedToSaleEvent_operatorId_idx" ON "SeedToSaleEvent"("operatorId");

-- CreateIndex
CREATE UNIQUE INDEX "CannabisProfessional_userId_key" ON "CannabisProfessional"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CannabisProfessional_licenseNumber_key" ON "CannabisProfessional"("licenseNumber");

-- CreateIndex
CREATE INDEX "CannabisProfessional_licenseNumber_idx" ON "CannabisProfessional"("licenseNumber");

-- CreateIndex
CREATE INDEX "CannabisProfessional_licenseType_idx" ON "CannabisProfessional"("licenseType");

-- CreateIndex
CREATE INDEX "CannabisProfessional_status_idx" ON "CannabisProfessional"("status");

-- CreateIndex
CREATE INDEX "CannabisProfessional_isVerified_idx" ON "CannabisProfessional"("isVerified");

-- CreateIndex
CREATE UNIQUE INDEX "CannabisArtist_userId_key" ON "CannabisArtist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CannabisArtist_artistName_key" ON "CannabisArtist"("artistName");

-- CreateIndex
CREATE INDEX "CannabisArtist_artistName_idx" ON "CannabisArtist"("artistName");

-- CreateIndex
CREATE INDEX "CannabisArtist_isVerified_idx" ON "CannabisArtist"("isVerified");

-- CreateIndex
CREATE INDEX "CannabisArtist_isActive_idx" ON "CannabisArtist"("isActive");

-- CreateIndex
CREATE INDEX "CannabisArtist_totalRoyalties_idx" ON "CannabisArtist"("totalRoyalties");

-- CreateIndex
CREATE INDEX "Artwork_artistId_idx" ON "Artwork"("artistId");

-- CreateIndex
CREATE INDEX "Artwork_category_idx" ON "Artwork"("category");

-- CreateIndex
CREATE INDEX "Artwork_isForSale_idx" ON "Artwork"("isForSale");

-- CreateIndex
CREATE INDEX "Artwork_status_idx" ON "Artwork"("status");

-- CreateIndex
CREATE INDEX "Artwork_createdAt_idx" ON "Artwork"("createdAt");

-- CreateIndex
CREATE INDEX "ArtCommission_clientId_idx" ON "ArtCommission"("clientId");

-- CreateIndex
CREATE INDEX "ArtCommission_artistId_idx" ON "ArtCommission"("artistId");

-- CreateIndex
CREATE INDEX "ArtCommission_status_idx" ON "ArtCommission"("status");

-- CreateIndex
CREATE INDEX "ArtCommission_paymentStatus_idx" ON "ArtCommission"("paymentStatus");

-- CreateIndex
CREATE INDEX "QRScan_packageId_idx" ON "QRScan"("packageId");

-- CreateIndex
CREATE INDEX "QRScan_scannerId_idx" ON "QRScan"("scannerId");

-- CreateIndex
CREATE INDEX "QRScan_timestamp_idx" ON "QRScan"("timestamp");

-- CreateIndex
CREATE INDEX "RoyaltyPayment_nftId_idx" ON "RoyaltyPayment"("nftId");

-- CreateIndex
CREATE INDEX "RoyaltyPayment_artistId_idx" ON "RoyaltyPayment"("artistId");

-- CreateIndex
CREATE INDEX "RoyaltyPayment_paymentDate_idx" ON "RoyaltyPayment"("paymentDate");

-- CreateIndex
CREATE INDEX "RoyaltyPayment_status_idx" ON "RoyaltyPayment"("status");

-- CreateIndex
CREATE INDEX "NFTSale_nftId_idx" ON "NFTSale"("nftId");

-- CreateIndex
CREATE INDEX "NFTSale_sellerId_idx" ON "NFTSale"("sellerId");

-- CreateIndex
CREATE INDEX "NFTSale_buyerId_idx" ON "NFTSale"("buyerId");

-- CreateIndex
CREATE INDEX "NFTSale_saleDate_idx" ON "NFTSale"("saleDate");

-- CreateIndex
CREATE INDEX "NFTSale_status_idx" ON "NFTSale"("status");

-- CreateIndex
CREATE INDEX "NFTLike_nftId_idx" ON "NFTLike"("nftId");

-- CreateIndex
CREATE INDEX "NFTLike_userId_idx" ON "NFTLike"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NFTLike_nftId_userId_key" ON "NFTLike"("nftId", "userId");

-- CreateIndex
CREATE INDEX "ArtworkLike_artworkId_idx" ON "ArtworkLike"("artworkId");

-- CreateIndex
CREATE INDEX "ArtworkLike_userId_idx" ON "ArtworkLike"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ArtworkLike_artworkId_userId_key" ON "ArtworkLike"("artworkId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "WhiteLabelClient_domain_key" ON "WhiteLabelClient"("domain");

-- CreateIndex
CREATE INDEX "WhiteLabelClient_status_idx" ON "WhiteLabelClient"("status");

-- CreateIndex
CREATE INDEX "WhiteLabelClient_tier_idx" ON "WhiteLabelClient"("tier");

-- CreateIndex
CREATE INDEX "WhiteLabelIntegration_whiteLabelId_idx" ON "WhiteLabelIntegration"("whiteLabelId");

-- CreateIndex
CREATE INDEX "WhiteLabelIntegration_integrationType_idx" ON "WhiteLabelIntegration"("integrationType");

-- CreateIndex
CREATE INDEX "ApiUsage_clientId_idx" ON "ApiUsage"("clientId");

-- CreateIndex
CREATE INDEX "ApiUsage_endpoint_idx" ON "ApiUsage"("endpoint");

-- CreateIndex
CREATE INDEX "ApiUsage_date_idx" ON "ApiUsage"("date");

-- CreateIndex
CREATE INDEX "DispensaryPartner_status_idx" ON "DispensaryPartner"("status");

-- CreateIndex
CREATE INDEX "DispensaryPartner_partnershipType_idx" ON "DispensaryPartner"("partnershipType");

-- CreateIndex
CREATE INDEX "LabPartner_status_idx" ON "LabPartner"("status");

-- CreateIndex
CREATE INDEX "LabPartner_integrationType_idx" ON "LabPartner"("integrationType");

-- CreateIndex
CREATE INDEX "LaunchBonus_userId_idx" ON "LaunchBonus"("userId");

-- CreateIndex
CREATE INDEX "LaunchBonus_bonusType_idx" ON "LaunchBonus"("bonusType");

-- CreateIndex
CREATE INDEX "LaunchBonus_tier_idx" ON "LaunchBonus"("tier");

-- CreateIndex
CREATE UNIQUE INDEX "CommercialLicense_licenseKey_key" ON "CommercialLicense"("licenseKey");

-- CreateIndex
CREATE INDEX "CommercialLicense_userId_idx" ON "CommercialLicense"("userId");

-- CreateIndex
CREATE INDEX "CommercialLicense_licenseType_idx" ON "CommercialLicense"("licenseType");

-- CreateIndex
CREATE INDEX "CommercialLicense_licenseKey_idx" ON "CommercialLicense"("licenseKey");

-- CreateIndex
CREATE UNIQUE INDEX "AffiliatePartner_email_key" ON "AffiliatePartner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AffiliatePartner_affiliateCode_key" ON "AffiliatePartner"("affiliateCode");

-- CreateIndex
CREATE INDEX "AffiliatePartner_userId_idx" ON "AffiliatePartner"("userId");

-- CreateIndex
CREATE INDEX "AffiliatePartner_email_idx" ON "AffiliatePartner"("email");

-- CreateIndex
CREATE INDEX "AffiliatePartner_status_idx" ON "AffiliatePartner"("status");

-- CreateIndex
CREATE INDEX "AffiliatePartner_affiliateCode_idx" ON "AffiliatePartner"("affiliateCode");

-- CreateIndex
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");

-- CreateIndex
CREATE INDEX "Transaction_transactionType_idx" ON "Transaction"("transactionType");

-- CreateIndex
CREATE INDEX "Transaction_status_idx" ON "Transaction"("status");

-- CreateIndex
CREATE INDEX "Transaction_stripePaymentId_idx" ON "Transaction"("stripePaymentId");

-- CreateIndex
CREATE INDEX "Transaction_cryptoTxHash_idx" ON "Transaction"("cryptoTxHash");

-- CreateIndex
CREATE INDEX "Transaction_referenceId_idx" ON "Transaction"("referenceId");

-- CreateIndex
CREATE INDEX "Transaction_createdAt_idx" ON "Transaction"("createdAt");

-- CreateIndex
CREATE INDEX "Escrow_buyerId_idx" ON "Escrow"("buyerId");

-- CreateIndex
CREATE INDEX "Escrow_sellerId_idx" ON "Escrow"("sellerId");

-- CreateIndex
CREATE INDEX "Escrow_status_idx" ON "Escrow"("status");

-- CreateIndex
CREATE INDEX "Escrow_createdAt_idx" ON "Escrow"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "EnterpriseAPIKey_apiKey_key" ON "EnterpriseAPIKey"("apiKey");

-- CreateIndex
CREATE INDEX "EnterpriseAPIKey_userId_idx" ON "EnterpriseAPIKey"("userId");

-- CreateIndex
CREATE INDEX "EnterpriseAPIKey_clientId_idx" ON "EnterpriseAPIKey"("clientId");

-- CreateIndex
CREATE INDEX "EnterpriseAPIKey_apiKey_idx" ON "EnterpriseAPIKey"("apiKey");

-- CreateIndex
CREATE INDEX "EnterpriseAPIKey_status_idx" ON "EnterpriseAPIKey"("status");

-- CreateIndex
CREATE INDEX "EnterpriseAPIKey_tier_idx" ON "EnterpriseAPIKey"("tier");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_userId_idx" ON "AnalyticsEvent"("userId");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_sessionId_idx" ON "AnalyticsEvent"("sessionId");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_eventType_idx" ON "AnalyticsEvent"("eventType");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_eventName_idx" ON "AnalyticsEvent"("eventName");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_timestamp_idx" ON "AnalyticsEvent"("timestamp");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_category_idx" ON "AnalyticsEvent"("category");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_type_idx" ON "Notification"("type");

-- CreateIndex
CREATE INDEX "Notification_isRead_idx" ON "Notification"("isRead");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- CreateIndex
CREATE INDEX "Payout_userId_idx" ON "Payout"("userId");

-- CreateIndex
CREATE INDEX "Payout_affiliateId_idx" ON "Payout"("affiliateId");

-- CreateIndex
CREATE INDEX "Payout_status_idx" ON "Payout"("status");

-- CreateIndex
CREATE INDEX "Payout_requestedAt_idx" ON "Payout"("requestedAt");

-- CreateIndex
CREATE INDEX "MultiCurrencyPrice_entityType_entityId_idx" ON "MultiCurrencyPrice"("entityType", "entityId");

-- CreateIndex
CREATE UNIQUE INDEX "MultiCurrencyPrice_entityType_entityId_currency_key" ON "MultiCurrencyPrice"("entityType", "entityId", "currency");

-- CreateIndex
CREATE INDEX "FavoriteNFT_userId_idx" ON "FavoriteNFT"("userId");

-- CreateIndex
CREATE INDEX "FavoriteNFT_nftId_idx" ON "FavoriteNFT"("nftId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteNFT_userId_nftId_key" ON "FavoriteNFT"("userId", "nftId");

-- CreateIndex
CREATE INDEX "WatchlistCollection_userId_idx" ON "WatchlistCollection"("userId");

-- CreateIndex
CREATE INDEX "WatchlistCollection_collectionId_idx" ON "WatchlistCollection"("collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistCollection_userId_collectionId_key" ON "WatchlistCollection"("userId", "collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_slug_key" ON "Collection"("slug");

-- CreateIndex
CREATE INDEX "Collection_creatorId_idx" ON "Collection"("creatorId");

-- CreateIndex
CREATE INDEX "Collection_category_idx" ON "Collection"("category");

-- CreateIndex
CREATE INDEX "Collection_floorPrice_idx" ON "Collection"("floorPrice");

-- CreateIndex
CREATE INDEX "Collection_totalVolume_idx" ON "Collection"("totalVolume");

-- CreateIndex
CREATE INDEX "Collection_isVerified_idx" ON "Collection"("isVerified");

-- CreateIndex
CREATE INDEX "Collection_createdAt_idx" ON "Collection"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "NFT_tokenId_key" ON "NFT"("tokenId");

-- CreateIndex
CREATE INDEX "NFT_tokenId_idx" ON "NFT"("tokenId");

-- CreateIndex
CREATE INDEX "NFT_contractAddress_idx" ON "NFT"("contractAddress");

-- CreateIndex
CREATE INDEX "NFT_collectionId_idx" ON "NFT"("collectionId");

-- CreateIndex
CREATE INDEX "NFT_creatorId_idx" ON "NFT"("creatorId");

-- CreateIndex
CREATE INDEX "NFT_ownerId_idx" ON "NFT"("ownerId");

-- CreateIndex
CREATE INDEX "NFT_status_idx" ON "NFT"("status");

-- CreateIndex
CREATE INDEX "NFT_listingType_idx" ON "NFT"("listingType");

-- CreateIndex
CREATE INDEX "NFT_price_idx" ON "NFT"("price");

-- CreateIndex
CREATE INDEX "NFT_createdAt_idx" ON "NFT"("createdAt");

-- CreateIndex
CREATE INDEX "NFT_isVerified_idx" ON "NFT"("isVerified");

-- CreateIndex
CREATE INDEX "Auction_nftId_idx" ON "Auction"("nftId");

-- CreateIndex
CREATE INDEX "Auction_sellerId_idx" ON "Auction"("sellerId");

-- CreateIndex
CREATE INDEX "Auction_status_idx" ON "Auction"("status");

-- CreateIndex
CREATE INDEX "Auction_endTime_idx" ON "Auction"("endTime");

-- CreateIndex
CREATE INDEX "Auction_createdAt_idx" ON "Auction"("createdAt");

-- CreateIndex
CREATE INDEX "Bid_auctionId_idx" ON "Bid"("auctionId");

-- CreateIndex
CREATE INDEX "Bid_nftId_idx" ON "Bid"("nftId");

-- CreateIndex
CREATE INDEX "Bid_bidderId_idx" ON "Bid"("bidderId");

-- CreateIndex
CREATE INDEX "Bid_status_idx" ON "Bid"("status");

-- CreateIndex
CREATE INDEX "Bid_createdAt_idx" ON "Bid"("createdAt");

-- CreateIndex
CREATE INDEX "Offer_nftId_idx" ON "Offer"("nftId");

-- CreateIndex
CREATE INDEX "Offer_offererId_idx" ON "Offer"("offererId");

-- CreateIndex
CREATE INDEX "Offer_status_idx" ON "Offer"("status");

-- CreateIndex
CREATE INDEX "Offer_expiresAt_idx" ON "Offer"("expiresAt");

-- CreateIndex
CREATE INDEX "Offer_createdAt_idx" ON "Offer"("createdAt");

-- CreateIndex
CREATE INDEX "NFTTransfer_nftId_idx" ON "NFTTransfer"("nftId");

-- CreateIndex
CREATE INDEX "NFTTransfer_fromAddress_idx" ON "NFTTransfer"("fromAddress");

-- CreateIndex
CREATE INDEX "NFTTransfer_toAddress_idx" ON "NFTTransfer"("toAddress");

-- CreateIndex
CREATE INDEX "NFTTransfer_transactionHash_idx" ON "NFTTransfer"("transactionHash");

-- CreateIndex
CREATE INDEX "NFTTransfer_timestamp_idx" ON "NFTTransfer"("timestamp");

-- CreateIndex
CREATE INDEX "PriceHistory_nftId_idx" ON "PriceHistory"("nftId");

-- CreateIndex
CREATE INDEX "PriceHistory_timestamp_idx" ON "PriceHistory"("timestamp");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NftUpload" ADD CONSTRAINT "NftUpload_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsageRecord" ADD CONSTRAINT "UsageRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingEvent" ADD CONSTRAINT "MarketingEvent_email_fkey" FOREIGN KEY ("email") REFERENCES "MarketingLead"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralCode" ADD CONSTRAINT "ReferralCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralConversion" ADD CONSTRAINT "ReferralConversion_referralCodeId_fkey" FOREIGN KEY ("referralCodeId") REFERENCES "ReferralCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CannabisPackage" ADD CONSTRAINT "CannabisPackage_growerId_fkey" FOREIGN KEY ("growerId") REFERENCES "CannabisProfessional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CannabisPackage" ADD CONSTRAINT "CannabisPackage_labTestId_fkey" FOREIGN KEY ("labTestId") REFERENCES "LabTest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CannabisPackage" ADD CONSTRAINT "CannabisPackage_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "CannabisStrain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CannabisNFT" ADD CONSTRAINT "CannabisNFT_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "CannabisArtist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CannabisNFT" ADD CONSTRAINT "CannabisNFT_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CannabisNFT" ADD CONSTRAINT "CannabisNFT_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CannabisNFT" ADD CONSTRAINT "CannabisNFT_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "CannabisPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CannabisNFT" ADD CONSTRAINT "CannabisNFT_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "CannabisStrain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabTest" ADD CONSTRAINT "LabTest_labId_fkey" FOREIGN KEY ("labId") REFERENCES "LabPartner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeedToSaleEvent" ADD CONSTRAINT "SeedToSaleEvent_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "CannabisProfessional"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeedToSaleEvent" ADD CONSTRAINT "SeedToSaleEvent_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "CannabisPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CannabisProfessional" ADD CONSTRAINT "CannabisProfessional_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CannabisArtist" ADD CONSTRAINT "CannabisArtist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "CannabisArtist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtCommission" ADD CONSTRAINT "ArtCommission_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "CannabisArtist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtCommission" ADD CONSTRAINT "ArtCommission_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtCommission" ADD CONSTRAINT "ArtCommission_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QRScan" ADD CONSTRAINT "QRScan_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "CannabisPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QRScan" ADD CONSTRAINT "QRScan_scannerId_fkey" FOREIGN KEY ("scannerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoyaltyPayment" ADD CONSTRAINT "RoyaltyPayment_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "CannabisArtist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoyaltyPayment" ADD CONSTRAINT "RoyaltyPayment_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "CannabisNFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoyaltyPayment" ADD CONSTRAINT "RoyaltyPayment_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "NFTSale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFTSale" ADD CONSTRAINT "NFTSale_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFTSale" ADD CONSTRAINT "NFTSale_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "CannabisNFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFTSale" ADD CONSTRAINT "NFTSale_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFTLike" ADD CONSTRAINT "NFTLike_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "CannabisNFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFTLike" ADD CONSTRAINT "NFTLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtworkLike" ADD CONSTRAINT "ArtworkLike_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtworkLike" ADD CONSTRAINT "ArtworkLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhiteLabelIntegration" ADD CONSTRAINT "WhiteLabelIntegration_whiteLabelId_fkey" FOREIGN KEY ("whiteLabelId") REFERENCES "WhiteLabelClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_escrowId_fkey" FOREIGN KEY ("escrowId") REFERENCES "Escrow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFT"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFTTransfer" ADD CONSTRAINT "NFTTransfer_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

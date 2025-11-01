import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive database seed...\n');

  // ============================================
  // 1. CREATE TEST USERS
  // ============================================
  console.log('👤 Creating test users...');
  
  const hashedPassword = await hash('Test123!', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@authichain.com' },
    update: {},
    create: {
      email: 'admin@authichain.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      username: 'admin',
      subscriptionTier: 'ENTERPRISE',
      role: 'ADMIN',
      isVerified: true,
      acceptTerms: true,
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
    }
  });

  const creatorUser = await prisma.user.upsert({
    where: { email: 'creator@authichain.com' },
    update: {},
    create: {
      email: 'creator@authichain.com',
      password: hashedPassword,
      firstName: 'Creative',
      lastName: 'Creator',
      username: 'creator1',
      subscriptionTier: 'CREATOR',
      role: 'CONSUMER',
      isVerified: true,
      acceptTerms: true,
      walletAddress: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    }
  });

  const proUser = await prisma.user.upsert({
    where: { email: 'pro@authichain.com' },
    update: {},
    create: {
      email: 'pro@authichain.com',
      password: hashedPassword,
      firstName: 'Professional',
      lastName: 'Trader',
      username: 'protrader',
      subscriptionTier: 'PRO',
      role: 'CONSUMER',
      isVerified: true,
      acceptTerms: true,
      walletAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    }
  });

  const explorerUser = await prisma.user.upsert({
    where: { email: 'explorer@authichain.com' },
    update: {},
    create: {
      email: 'explorer@authichain.com',
      password: hashedPassword,
      firstName: 'Explorer',
      lastName: 'Enthusiast',
      username: 'explorer1',
      subscriptionTier: 'EXPLORER',
      role: 'CONSUMER',
      isVerified: true,
      acceptTerms: true,
      walletAddress: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    }
  });

  console.log(`✅ Created 4 test users\n`);

  // ============================================
  // 2. CREATE SUBSCRIPTIONS
  // ============================================
  console.log('💳 Creating subscriptions...');
  
  await prisma.subscription.createMany({
    data: [
      {
        userId: adminUser.id,
        tier: 'ENTERPRISE',
        status: 'ACTIVE',
        stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
      },
      {
        userId: creatorUser.id,
        tier: 'CREATOR',
        status: 'ACTIVE',
        stripePriceId: process.env.STRIPE_CREATOR_PRICE_ID,
      },
      {
        userId: proUser.id,
        tier: 'PRO',
        status: 'ACTIVE',
        stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
      },
      {
        userId: explorerUser.id,
        tier: 'EXPLORER',
        status: 'ACTIVE',
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created subscriptions for all users\n`);

  // ============================================
  // 3. CREATE COLLECTIONS
  // ============================================
  console.log('📦 Creating NFT collections...');
  
  const collection1 = await prisma.collection.create({
    data: {
      name: 'Verified Art Collection',
      slug: 'verified-art',
      description: 'Premium authenticated art pieces from verified creators',
      creatorId: creatorUser.id,
      category: 'ART',
      isVerified: true,
      royaltyPercentage: 10,
      blockchain: 'ethereum',
      tags: ['art', 'verified', 'premium'],
      itemCount: 0,
    }
  });

  const collection2 = await prisma.collection.create({
    data: {
      name: 'Digital Photography',
      slug: 'digital-photography',
      description: 'Stunning digital photography NFTs',
      creatorId: proUser.id,
      category: 'PHOTOGRAPHY',
      isVerified: true,
      royaltyPercentage: 5,
      blockchain: 'ethereum',
      tags: ['photography', 'digital', 'nature'],
      itemCount: 0,
    }
  });

  const collection3 = await prisma.collection.create({
    data: {
      name: 'Gaming Collectibles',
      slug: 'gaming-collectibles',
      description: 'Exclusive gaming-themed NFT collectibles',
      creatorId: creatorUser.id,
      category: 'GAMING',
      isVerified: false,
      royaltyPercentage: 7.5,
      blockchain: 'polygon',
      tags: ['gaming', 'collectibles', 'esports'],
      itemCount: 0,
    }
  });

  console.log(`✅ Created 3 collections\n`);

  // ============================================
  // 4. CREATE NFTs
  // ============================================
  console.log('🎨 Creating NFTs...');
  
  const nfts = [];
  
  for (let i = 1; i <= 5; i++) {
    const nft = await prisma.nFT.create({
      data: {
        tokenId: `TOKEN_${i}_${Date.now()}`,
        contractAddress: process.env.CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
        blockchain: 'ethereum',
        name: `Verified Art Piece #${i}`,
        description: `This is a verified digital art NFT authenticated on AuthiChain. Edition ${i} of limited series.`,
        image: `https://kunstplaza.b-cdn.net/wp-content/uploads/2025/02/jonathan-borba-wJ79V3J8jJA-unsplash.jpg + i}?w=800`,
        collectionId: collection1.id,
        creatorId: creatorUser.id,
        ownerId: creatorUser.id,
        price: 0.5 + (i * 0.1),
        currency: 'ETH',
        royaltyPercentage: 10,
        status: 'ACTIVE',
        listingType: 'FIXED_PRICE',
        isVerified: true,
        attributes: {
          rarity: i <= 2 ? 'Legendary' : 'Rare',
          edition: i,
          artist: 'Creative Creator',
        },
        isMinted: true,
      }
    });
    nfts.push(nft);
  }

  console.log(`✅ Created ${nfts.length} NFTs\n`);

  // ============================================
  // 5. CREATE AUCTIONS
  // ============================================
  console.log('⚡ Creating auctions...');
  
  const auction = await prisma.auction.create({
    data: {
      nftId: nfts[0].id,
      sellerId: creatorUser.id,
      startPrice: 0.5,
      reservePrice: 1.0,
      currentBid: 0.6,
      currentBidderId: proUser.id,
      bidIncrement: 0.05,
      startTime: new Date(),
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      status: 'ACTIVE',
      bidCount: 1,
    }
  });

  console.log(`✅ Created 1 active auction\n`);

  // ============================================
  // 6. CREATE BIDS
  // ============================================
  console.log('💰 Creating bids...');
  
  await prisma.bid.createMany({
    data: [
      {
        auctionId: auction.id,
        nftId: nfts[0].id,
        bidderId: proUser.id,
        amount: 0.6,
        status: 'WINNING',
      },
      {
        auctionId: auction.id,
        nftId: nfts[0].id,
        bidderId: explorerUser.id,
        amount: 0.55,
        status: 'OUTBID',
      },
    ]
  });

  console.log(`✅ Created 2 bids\n`);

  // ============================================
  // 7. CREATE REFERRAL CODES
  // ============================================
  console.log('🎫 Creating referral codes...');
  
  await prisma.referralCode.createMany({
    data: [
      {
        code: 'CREATOR10',
        userId: creatorUser.id,
        type: 'USER',
        commission: 0.2,
        isActive: true,
      },
      {
        code: 'PROTRADER20',
        userId: proUser.id,
        type: 'USER',
        commission: 0.2,
        isActive: true,
      },
      {
        code: 'AFFILIATE50',
        type: 'AFFILIATE',
        commission: 0.3,
        isActive: true,
      },
    ]
  });

  console.log(`✅ Created 3 referral codes\n`);

  // ============================================
  // 8. CREATE AFFILIATE PARTNER
  // ============================================
  console.log('🤝 Creating affiliate partner...');
  
  const affiliate = await prisma.affiliatePartner.create({
    data: {
      userId: proUser.id,
      name: 'Pro NFT Marketing',
      email: 'affiliate@pronft.com',
      status: 'APPROVED',
      commissionRate: 0.3,
      affiliateCode: 'PRONFT2024',
      website: 'https://pronft.marketing',
      approvedAt: new Date(),
    }
  });

  console.log(`✅ Created 1 affiliate partner\n`);

  // ============================================
  // 9. CREATE TRANSACTIONS
  // ============================================
  console.log('💳 Creating transactions...');
  
  await prisma.transaction.createMany({
    data: [
      {
        userId: creatorUser.id,
        transactionType: 'SUBSCRIPTION_PAYMENT',
        amount: 49.99,
        currency: 'USD',
        status: 'COMPLETED',
        paymentMethod: 'STRIPE',
        stripePaymentId: 'pi_test_' + crypto.randomBytes(16).toString('hex'),
        description: 'Creator Plan - Monthly',
        completedAt: new Date(),
      },
      {
        userId: proUser.id,
        transactionType: 'NFT_PURCHASE',
        amount: 0.5,
        currency: 'ETH',
        status: 'COMPLETED',
        paymentMethod: 'CRYPTO_ETH',
        description: 'Purchase: Verified Art Piece #2',
        referenceId: nfts[1].id,
        referenceType: 'nft',
        completedAt: new Date(),
      },
    ]
  });

  console.log(`✅ Created 2 transactions\n`);

  // ============================================
  // 10. CREATE ENTERPRISE API KEY
  // ============================================
  console.log('🔑 Creating enterprise API key...');
  
  const apiKey = await prisma.enterpriseAPIKey.create({
    data: {
      userId: adminUser.id,
      name: 'AuthiChain Enterprise API',
      apiKey: 'ak_' + crypto.randomBytes(32).toString('hex'),
      apiSecret: 'as_' + crypto.randomBytes(32).toString('hex'),
      tier: 'ENTERPRISE',
      status: 'ACTIVE',
      permissions: ['read:nfts', 'write:nfts', 'read:collections', 'write:collections', 'read:auctions'],
      rateLimit: 10000,
      ipWhitelist: [],
    }
  });

  console.log(`✅ Created enterprise API key\n`);

  // ============================================
  // 11. CREATE NOTIFICATIONS
  // ============================================
  console.log('🔔 Creating notifications...');
  
  await prisma.notification.createMany({
    data: [
      {
        userId: creatorUser.id,
        type: 'BID_RECEIVED',
        title: 'New Bid Received',
        message: 'Your NFT "Verified Art Piece #1" received a new bid of 0.6 ETH',
        link: `/nft/${nfts[0].id}`,
      },
      {
        userId: proUser.id,
        type: 'BID_OUTBID',
        title: 'You Were Outbid',
        message: 'Someone placed a higher bid on "Verified Art Piece #1"',
        link: `/auction/${auction.id}`,
      },
    ]
  });

  console.log(`✅ Created 2 notifications\n`);

  // ============================================
  // 12. CREATE MARKETING LEAD
  // ============================================
  console.log('📊 Creating marketing lead...');
  
  await prisma.marketingLead.create({
    data: {
      email: 'lead@example.com',
      source: 'google',
      campaign: 'nft_launch_2024',
      lastCampaign: 'nft_launch_2024',
      lastSource: 'google',
      status: 'ACTIVE',
      tags: ['interested', 'creator'],
    }
  });

  console.log(`✅ Created 1 marketing lead\n`);

  // ============================================
  // SUMMARY
  // ============================================
  console.log('\n' + '='.repeat(50));
  console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
  console.log('='.repeat(50));
  console.log('\n📊 Summary:');
  console.log(`  👤 Users: 4 (1 Admin, 1 Creator, 1 Pro, 1 Explorer)`);
  console.log(`  💳 Subscriptions: 4`);
  console.log(`  📦 Collections: 3`);
  console.log(`  🎨 NFTs: ${nfts.length}`);
  console.log(`  ⚡ Auctions: 1`);
  console.log(`  💰 Bids: 2`);
  console.log(`  🎫 Referral Codes: 3`);
  console.log(`  🤝 Affiliate Partners: 1`);
  console.log(`  💳 Transactions: 2`);
  console.log(`  🔑 API Keys: 1`);
  console.log(`  🔔 Notifications: 2`);
  console.log(`  📊 Marketing Leads: 1`);
  console.log('\n🔐 Test Login Credentials:');
  console.log('  Admin: admin@authichain.com / Test123!');
  console.log('  Creator: creator@authichain.com / Test123!');
  console.log('  Pro: pro@authichain.com / Test123!');
  console.log('  Explorer: explorer@authichain.com / Test123!');
  console.log('\n');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

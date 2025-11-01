
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { SubscriptionTier, SubscriptionStatus, NftStatus } from '../lib/types';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create test user (required for testing)
  const hashedPassword = await hash('johndoe123', 12);
  
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      subscriptionTier: SubscriptionTier.BRAND,
      isVerified: true,
      acceptTerms: true,
      walletAddress: '0xc3a8e14643461a54074a09821edc418d2aa9e11c',
    }
  });

  // Create subscription for test user
  await prisma.subscription.create({
    data: {
      userId: testUser.id,
      tier: SubscriptionTier.BRAND,
      status: SubscriptionStatus.ACTIVE,
    }
  });

  // Create some sample NFTs for the Myles High collection
  const sampleNfts = [
    {
      title: 'Cosmic Myles #001',
      description: 'The first in the legendary Myles High collection featuring cosmic themes and ethereal vibes.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
      tokenId: '1',
      contractAddress: '0x1234567890123456789012345678901234567890',
      blockchain: 'ethereum'
    },
    {
      title: 'Neon Dreams #002',
      description: 'Vibrant neon aesthetics meet digital artistry in this stunning piece.',
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
      tokenId: '2',
      contractAddress: '0x1234567890123456789012345678901234567890',
      blockchain: 'ethereum'
    },
    {
      title: 'Galactic Voyage #003',
      description: 'Journey through space with this mesmerizing galactic artwork.',
      imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800',
      tokenId: '3',
      contractAddress: '0x1234567890123456789012345678901234567890',
      blockchain: 'ethereum'
    },
    {
      title: 'Digital Genesis #004',
      description: 'The birth of digital consciousness captured in stunning detail.',
      imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800',
      tokenId: '4',
      contractAddress: '0x1234567890123456789012345678901234567890',
      blockchain: 'ethereum'
    },
    {
      title: 'Cyber Punk #005',
      description: 'Retro-futuristic vibes with a cyberpunk twist.',
      imageUrl: 'https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?w=800',
      tokenId: '5',
      contractAddress: '0x1234567890123456789012345678901234567890',
      blockchain: 'ethereum'
    }
  ];

  for (const nft of sampleNfts) {
    await prisma.nftUpload.create({
      data: {
        ...nft,
        userId: testUser.id,
        status: NftStatus.ACTIVE
      }
    });
  }

  // Create usage tracking record
  await prisma.usageRecord.upsert({
    where: {
      userId_action_month_year: {
        userId: testUser.id,
        action: 'NFT_UPLOAD',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      }
    },
    update: {},
    create: {
      userId: testUser.id,
      action: 'NFT_UPLOAD',
      count: 5,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log(`👤 Test user created: ${testUser.email}`);
  console.log(`🎨 Created ${sampleNfts.length} sample NFTs`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌟 Seeding luxury NFT examples...');

  // Create demo users (creators/collectors)
  const demoUsers = await createDemoUsers();
  
  // Create collections for different categories
  const collections = await createCollections(demoUsers);
  
  // Create luxury NFTs across all categories
  await createLuxuryNFTs(demoUsers, collections);
  
  // Create some auction and offer examples
  await createAuctionsAndOffers();
  
  console.log('✅ Luxury examples seeded successfully!');
}

async function createDemoUsers() {
  console.log('👥 Creating demo users...');
  
  const users = [];
  
  // Luxury watch collector
  const watchCollector = await prisma.user.upsert({
    where: { email: 'timepiece.master@example.com' },
    update: {},
    create: {
      email: 'timepiece.master@example.com',
      password: await hash('demo123', 12),
      firstName: 'Marcus',
      lastName: 'Timewell',
      username: 'TimepieceMaster',
      customUsername: 'timepiece-master',
      subscriptionTier: 'PRO',
      role: 'CONSUMER',
      isVerified: true,
      acceptTerms: true
    }
  });
  users.push(watchCollector);

  // Fine art dealer
  const artDealer = await prisma.user.upsert({
    where: { email: 'art.curator@example.com' },
    update: {},
    create: {
      email: 'art.curator@example.com',
      password: await hash('demo123', 12),
      firstName: 'Isabella',
      lastName: 'Artsworth',
      username: 'ArtCurator',
      customUsername: 'art-curator',
      subscriptionTier: 'ENTERPRISE',
      role: 'CONSUMER',
      isVerified: true,
      acceptTerms: true
    }
  });
  users.push(artDealer);

  // Fashion authenticator
  const fashionExpert = await prisma.user.upsert({
    where: { email: 'luxury.fashion@example.com' },
    update: {},
    create: {
      email: 'luxury.fashion@example.com',
      password: await hash('demo123', 12),
      firstName: 'Victoria',
      lastName: 'Luxmont',
      username: 'LuxuryFashion',
      customUsername: 'luxury-fashion',
      subscriptionTier: 'PRO',
      role: 'CONSUMER',
      isVerified: true,
      acceptTerms: true
    }
  });
  users.push(fashionExpert);

  // Tech collector
  const techCollector = await prisma.user.upsert({
    where: { email: 'tech.collector@example.com' },
    update: {},
    create: {
      email: 'tech.collector@example.com',
      password: await hash('demo123', 12),
      firstName: 'David',
      lastName: 'Technos',
      username: 'TechCollector',
      customUsername: 'tech-collector',
      subscriptionTier: 'CREATOR',
      role: 'CONSUMER',
      isVerified: true,
      acceptTerms: true
    }
  });
  users.push(techCollector);

  // Jewelry specialist
  const jewelryExpert = await prisma.user.upsert({
    where: { email: 'gems.expert@example.com' },
    update: {},
    create: {
      email: 'gems.expert@example.com',
      password: await hash('demo123', 12),
      firstName: 'Diana',
      lastName: 'Gemheart',
      username: 'GemsExpert',
      customUsername: 'gems-expert',
      subscriptionTier: 'PRO',
      role: 'CONSUMER',
      isVerified: true,
      acceptTerms: true
    }
  });
  users.push(jewelryExpert);

  // Sports memorabilia expert
  const sportsExpert = await prisma.user.upsert({
    where: { email: 'sports.legend@example.com' },
    update: {},
    create: {
      email: 'sports.legend@example.com',
      password: await hash('demo123', 12),
      firstName: 'Michael',
      lastName: 'Champion',
      username: 'SportsLegend',
      customUsername: 'sports-legend',
      subscriptionTier: 'PRO',
      role: 'CONSUMER',
      isVerified: true,
      acceptTerms: true
    }
  });
  users.push(sportsExpert);

  // Sneaker authenticator
  const sneakerHead = await prisma.user.upsert({
    where: { email: 'sneaker.head@example.com' },
    update: {},
    create: {
      email: 'sneaker.head@example.com',
      password: await hash('demo123', 12),
      firstName: 'Jordan',
      lastName: 'Kickster',
      username: 'SneakerHead',
      customUsername: 'sneaker-head',
      subscriptionTier: 'CREATOR',
      role: 'CONSUMER',
      isVerified: true,
      acceptTerms: true
    }
  });
  users.push(sneakerHead);

  // Vintage collector
  const vintageCollector = await prisma.user.upsert({
    where: { email: 'vintage.collector@example.com' },
    update: {},
    create: {
      email: 'vintage.collector@example.com',
      password: await hash('demo123', 12),
      firstName: 'Eleanor',
      lastName: 'Vintage',
      username: 'VintageCollector',
      customUsername: 'vintage-collector',
      subscriptionTier: 'ENTERPRISE',
      role: 'CONSUMER',
      isVerified: true,
      acceptTerms: true
    }
  });
  users.push(vintageCollector);

  return users;
}

async function createCollections(users: any[]) {
  console.log('🏛️ Creating collections...');
  
  const collections = [];

  // Luxury Timepieces Collection
  const watchCollection = await prisma.collection.upsert({
    where: { slug: 'luxury-timepieces' },
    update: {},
    create: {
      name: 'Luxury Timepieces',
      slug: 'luxury-timepieces',
      description: 'Authenticated luxury watches from the world\'s most prestigious manufacturers. Each timepiece verified for authenticity, provenance, and condition.',
      coverImage: 'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_3000,h_3000,g_auto/f_auto/q_auto/v1744077876/product/0b76a8cfc2050c5e459aed2aec089cc8/a3e109e430ae6d57e16c4c98fb588818?_a=BAVAfVDW0',
      bannerImage: 'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_3000,h_3000,g_auto/f_auto/q_auto/v1744077876/product/0b76a8cfc2050c5e459aed2aec089cc8/a3e109e430ae6d57e16c4c98fb588818?_a=BAVAfVDW0',
      creatorId: users[0].id,
      category: 'COLLECTIBLES',
      floorPrice: 15000,
      totalVolume: 2500000,
      itemCount: 12,
      ownerCount: 8,
      isVerified: true,
      royaltyPercentage: 2.5,
      tags: ['luxury', 'watches', 'timepieces', 'rolex', 'patek-philippe'],
      socialLinks: JSON.stringify({
        website: 'https://luxury-timepieces.com',
        instagram: '@luxurytimepieces'
      })
    }
  });
  collections.push(watchCollection);

  // Contemporary Art Collection
  const artCollection = await prisma.collection.upsert({
    where: { slug: 'contemporary-masters' },
    update: {},
    create: {
      name: 'Contemporary Masters',
      slug: 'contemporary-masters',
      description: 'Curated contemporary artworks from emerging and established artists. Each piece authenticated with full provenance documentation.',
      coverImage: 'https://artesty.com/cdn/shop/products/1_330a1b46-7617-415a-bdde-57dd9d4048a3.jpg?v=1644528112',
      bannerImage: 'https://artesty.com/cdn/shop/products/1_330a1b46-7617-415a-bdde-57dd9d4048a3.jpg?v=1644528112',
      creatorId: users[1].id,
      category: 'ART',
      floorPrice: 25000,
      totalVolume: 15000000,
      itemCount: 15,
      ownerCount: 12,
      isVerified: true,
      royaltyPercentage: 10,
      tags: ['art', 'contemporary', 'basquiat', 'street-art', 'modern'],
      socialLinks: JSON.stringify({
        website: 'https://contemporary-masters.art',
        instagram: '@contemporarymasters'
      })
    }
  });
  collections.push(artCollection);

  // Designer Fashion Collection
  const fashionCollection = await prisma.collection.upsert({
    where: { slug: 'haute-couture' },
    update: {},
    create: {
      name: 'Haute Couture',
      slug: 'haute-couture',
      description: 'Authenticated luxury fashion items from the world\'s most prestigious houses. From Hermès to Chanel, every piece verified.',
      coverImage: 'http://www.redeluxe.com/cdn/shop/files/hermes-handbag-gold-vintage-birkin-30-gold-ardennes-gold-plated-c-square-stamp-redeluxe-45771055628598.jpg?v=1706261980',
      bannerImage: 'http://www.redeluxe.com/cdn/shop/files/hermes-handbag-gold-vintage-birkin-30-gold-ardennes-gold-plated-c-square-stamp-redeluxe-45771055628598.jpg?v=1706261980',
      creatorId: users[2].id,
      category: 'COLLECTIBLES',
      floorPrice: 5000,
      totalVolume: 8500000,
      itemCount: 18,
      ownerCount: 14,
      isVerified: true,
      royaltyPercentage: 5,
      tags: ['fashion', 'luxury', 'hermes', 'chanel', 'louis-vuitton'],
      socialLinks: JSON.stringify({
        website: 'https://haute-couture.luxury',
        instagram: '@hautecouture'
      })
    }
  });
  collections.push(fashionCollection);

  // Tech Rarities Collection
  const techCollection = await prisma.collection.upsert({
    where: { slug: 'tech-rarities' },
    update: {},
    create: {
      name: 'Tech Rarities',
      slug: 'tech-rarities',
      description: 'Limited edition electronics and tech collectibles. From rare gaming consoles to prototype devices.',
      coverImage: 'http://flitit.com/cdn/shop/files/ghost-of-yotei-le-product-imagery-02-en-03jul25.webp?v=1758528219',
      bannerImage: 'http://flitit.com/cdn/shop/files/ghost-of-yotei-le-product-imagery-02-en-03jul25.webp?v=1758528219',
      creatorId: users[3].id,
      category: 'GAMING',
      floorPrice: 1500,
      totalVolume: 2800000,
      itemCount: 8,
      ownerCount: 6,
      isVerified: true,
      royaltyPercentage: 3,
      tags: ['technology', 'gaming', 'limited-edition', 'electronics'],
      socialLinks: JSON.stringify({
        website: 'https://tech-rarities.com',
        twitter: '@techrarities'
      })
    }
  });
  collections.push(techCollection);

  // Precious Gems Collection
  const jewelryCollection = await prisma.collection.upsert({
    where: { slug: 'precious-gems' },
    update: {},
    create: {
      name: 'Precious Gems',
      slug: 'precious-gems',
      description: 'Certified diamonds, gemstones, and fine jewelry. Each piece comes with complete certification and authentication.',
      coverImage: 'https://cdn.shopify.com/s/files/1/0252/5265/9286/files/1428.-ClubRingwithRadiantcutyellow.jpg?v=1724791218',
      bannerImage: 'https://cdn.shopify.com/s/files/1/0252/5265/9286/files/1428.-ClubRingwithRadiantcutyellow.jpg?v=1724791218',
      creatorId: users[4].id,
      category: 'COLLECTIBLES',
      floorPrice: 8000,
      totalVolume: 5200000,
      itemCount: 10,
      ownerCount: 7,
      isVerified: true,
      royaltyPercentage: 4,
      tags: ['jewelry', 'diamonds', 'gems', 'luxury', 'precious-stones'],
      socialLinks: JSON.stringify({
        website: 'https://precious-gems.jewelry',
        instagram: '@preciousgems'
      })
    }
  });
  collections.push(jewelryCollection);

  // Sports Legends Collection
  const sportsCollection = await prisma.collection.upsert({
    where: { slug: 'sports-legends' },
    update: {},
    create: {
      name: 'Sports Legends',
      slug: 'sports-legends',
      description: 'Authenticated sports memorabilia from legendary athletes and historic moments. Every item verified with full documentation.',
      coverImage: 'https://m.media-amazon.com/images/I/61fUJH8CoYS.jpg',
      bannerImage: 'https://m.media-amazon.com/images/I/61fUJH8CoYS.jpg',
      creatorId: users[5].id,
      category: 'SPORTS',
      floorPrice: 2500,
      totalVolume: 12500000,
      itemCount: 20,
      ownerCount: 16,
      isVerified: true,
      royaltyPercentage: 7.5,
      tags: ['sports', 'memorabilia', 'baseball', 'basketball', 'authenticated'],
      socialLinks: JSON.stringify({
        website: 'https://sports-legends.com',
        instagram: '@sportslegends'
      })
    }
  });
  collections.push(sportsCollection);

  // Sneaker Culture Collection
  const sneakerCollection = await prisma.collection.upsert({
    where: { slug: 'sneaker-culture' },
    update: {},
    create: {
      name: 'Sneaker Culture',
      slug: 'sneaker-culture',
      description: 'Limited edition and rare sneakers from the most coveted releases. Every pair authenticated by experts.',
      coverImage: 'https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_ba2a414c-59bc-45aa-bdd3-03ba3aaa2dc2_1080x.jpg?=75&v=1708676901',
      bannerImage: 'https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_ba2a414c-59bc-45aa-bdd3-03ba3aaa2dc2_1080x.jpg?=75&v=1708676901',
      creatorId: users[6].id,
      category: 'COLLECTIBLES',
      floorPrice: 800,
      totalVolume: 3200000,
      itemCount: 25,
      ownerCount: 20,
      isVerified: true,
      royaltyPercentage: 6,
      tags: ['sneakers', 'jordan', 'yeezy', 'nike', 'limited-edition'],
      socialLinks: JSON.stringify({
        website: 'https://sneaker-culture.com',
        instagram: '@sneakerculture'
      })
    }
  });
  collections.push(sneakerCollection);

  // Vintage Treasures Collection
  const vintageCollection = await prisma.collection.upsert({
    where: { slug: 'vintage-treasures' },
    update: {},
    create: {
      name: 'Vintage Treasures',
      slug: 'vintage-treasures',
      description: 'Carefully curated vintage items and antiques with verified provenance and authenticity documentation.',
      coverImage: 'http://vintage-pocket-watch.com/cdn/shop/products/Square-Pocket-Watch_1200x1200.jpg?v=1636127966',
      bannerImage: 'http://vintage-pocket-watch.com/cdn/shop/products/Square-Pocket-Watch_1200x1200.jpg?v=1636127966',
      creatorId: users[7].id,
      category: 'COLLECTIBLES',
      floorPrice: 3500,
      totalVolume: 7800000,
      itemCount: 14,
      ownerCount: 10,
      isVerified: true,
      royaltyPercentage: 8,
      tags: ['vintage', 'antiques', 'collectibles', 'rare', 'historical'],
      socialLinks: JSON.stringify({
        website: 'https://vintage-treasures.com',
        instagram: '@vintagetreasures'
      })
    }
  });
  collections.push(vintageCollection);

  return collections;
}

async function createLuxuryNFTs(users: any[], collections: any[]) {
  console.log('💎 Creating luxury NFTs...');

  const nftData: {
    tokenId: string;
    contractAddress: string;
    name: string;
    description: string;
    image: string;
    collectionId: string;
    creatorId: string;
    ownerId: string;
    price: number;
    currency: string;
    isVerified: boolean;
    authenticityScore: number;
    attributes: string;
    rarityScore: number;
    rarityRank: number;
    viewCount: number;
    likeCount: number;
    isMinted: boolean;
    status: 'ACTIVE' | 'LISTED' | 'IN_AUCTION';
  }[] = [
    // Luxury Watches
    {
      tokenId: 'TK-ROLEX-DAYTONA-001',
      contractAddress: '0x1234567890123456789012345678901234567890',
      name: 'Rolex Cosmograph Daytona 116500LN',
      description: 'Rare white dial Cosmograph Daytona in Oystersteel with Cerachrom bezel. This iconic racing chronograph features the caliber 4130 movement and comes with full box and papers. Authenticated with complete service history.',
      image: 'https://res.cloudinary.com/wc-photo/image/upload/c_fill,w_3000,h_3000,g_auto/f_auto/q_auto/v1744077876/product/0b76a8cfc2050c5e459aed2aec089cc8/a3e109e430ae6d57e16c4c98fb588818?_a=BAVAfVDW0',
      collectionId: collections[0].id,
      creatorId: users[0].id,
      ownerId: users[0].id,
      price: 18.5,
      currency: 'ETH',
      isVerified: true,
      authenticityScore: 98,
      attributes: JSON.stringify({
        brand: 'Rolex',
        model: 'Cosmograph Daytona',
        reference: '116500LN',
        dialColor: 'White',
        movement: 'Caliber 4130',
        caseMaterial: 'Oystersteel',
        braceletMaterial: 'Oystersteel',
        waterResistance: '100m',
        yearOfManufacture: '2019',
        serialNumber: 'Verified',
        boxAndPapers: 'Yes',
        serviceHistory: 'Complete'
      }),
      rarityScore: 92.5,
      rarityRank: 1,
      viewCount: 1847,
      likeCount: 234,
      isMinted: true,
      status: 'LISTED'
    },
    {
      tokenId: 'TK-PATEK-NAUTILUS-002',
      contractAddress: '0x1234567890123456789012345678901234567890',
      name: 'Patek Philippe Nautilus 5711/1A',
      description: 'The holy grail of luxury sports watches. Blue dial Nautilus in stainless steel, discontinued in 2021. Features the ultra-thin caliber 324 S C movement. Complete with Extract from Archives.',
      image: 'https://cdn2.jomashop.com/media/catalog/product/cache/0ee3019724ce73007b606b54ba535a23/p/a/patek-philippe-nautilus-automatic-blue-dial-unisex-watch-57111a010.jpg?width=546&height=546',
      collectionId: collections[0].id,
      creatorId: users[0].id,
      ownerId: users[1].id,
      price: 85.2,
      currency: 'ETH',
      isVerified: true,
      authenticityScore: 99,
      attributes: JSON.stringify({
        brand: 'Patek Philippe',
        model: 'Nautilus',
        reference: '5711/1A-010',
        dialColor: 'Blue',
        movement: 'Caliber 324 S C',
        caseMaterial: 'Stainless Steel',
        braceletMaterial: 'Stainless Steel',
        waterResistance: '120m',
        yearOfManufacture: '2020',
        serialNumber: 'Verified',
        extractFromArchives: 'Yes',
        genevaSeal: 'Yes'
      }),
      rarityScore: 98.8,
      rarityRank: 2,
      viewCount: 3241,
      likeCount: 567,
      isMinted: true,
      status: 'LISTED'
    },
    {
      tokenId: 'TK-OMEGA-PLANET-003',
      contractAddress: '0x1234567890123456789012345678901234567890',
      name: 'Omega Seamaster Planet Ocean',
      description: 'Professional diving watch with Master Chronometer certification. Orange ceramic bezel and Co-Axial Master Chronometer caliber 8900. METAS certified for precision and magnetic resistance.',
      image: 'https://content.thewosgroup.com/productimage/17331285/17331285_1.jpg?impolicy=zoom',
      collectionId: collections[0].id,
      creatorId: users[0].id,
      ownerId: users[0].id,
      price: 3.8,
      currency: 'ETH',
      isVerified: true,
      authenticityScore: 96,
      attributes: JSON.stringify({
        brand: 'Omega',
        model: 'Seamaster Planet Ocean',
        reference: '215.32.44.21.01.002',
        dialColor: 'Black',
        movement: 'Co-Axial Master Chronometer 8900',
        caseMaterial: 'Stainless Steel',
        braceletMaterial: 'Stainless Steel',
        waterResistance: '600m',
        yearOfManufacture: '2021',
        certification: 'METAS Master Chronometer',
        boxAndPapers: 'Yes'
      }),
      rarityScore: 78.5,
      rarityRank: 8,
      viewCount: 892,
      likeCount: 143,
      isMinted: true,
      status: 'LISTED'
    },

    // Fine Art
    {
      tokenId: 'TK-BASQUIAT-ART-004',
      contractAddress: '0x1234567890123456789012345678901234567890',
      name: 'Neo-Expressionist Composition #47',
      description: 'Contemporary artwork in the style of Jean-Michel Basquiat. Mixed media on canvas featuring bold colors, primitive figuration, and social commentary. Authenticated by leading art experts with full provenance.',
      image: 'https://artesty.com/cdn/shop/products/1_330a1b46-7617-415a-bdde-57dd9d4048a3.jpg?v=1644528112',
      collectionId: collections[1].id,
      creatorId: users[1].id,
      ownerId: users[1].id,
      price: 125.0,
      currency: 'ETH',
      isVerified: true,
      authenticityScore: 94,
      attributes: JSON.stringify({
        artist: 'Contemporary Master',
        medium: 'Mixed media on canvas',
        dimensions: '72 x 60 inches',
        year: '2023',
        style: 'Neo-Expressionist',
        provenance: 'Gallery documented',
        condition: 'Excellent',
        frameIncluded: 'Yes',
        certificateOfAuthenticity: 'Yes'
      }),
      rarityScore: 89.2,
      rarityRank: 3,
      viewCount: 2156,
      likeCount: 378,
      isMinted: true,
      status: 'LISTED'
    },
    {
      tokenId: 'TK-MODERN-SCULPTURE-005',
      contractAddress: '0x1234567890123456789012345678901234567890',
      name: 'Stainless Steel Abstract Form',
      description: 'Contemporary stainless steel sculpture with mirror finish. Geometric abstract form that plays with light and reflection. Hand-polished by master craftsmen.',
      image: 'https://finestsculpture.com/cdn/shop/files/FINEST-FS-109-custom-modern-art-sculpture-contemporary-stainless-steel-abstract-square-base.jpg?v=1733550125&width=1024',
      collectionId: collections[1].id,
      creatorId: users[1].id,
      ownerId: users[1].id,
      price: 45.5,
      currency: 'ETH',
      isVerified: true,
      authenticityScore: 97,
      attributes: JSON.stringify({
        artist: 'Modern Sculptor',
        medium: 'Stainless steel',
        dimensions: '48 x 24 x 24 inches',
        year: '2023',
        finish: 'Mirror polished',
        weight: '250 lbs',
        baseIncluded: 'Yes',
        installationGuide: 'Included'
      }),
      rarityScore: 85.7,
      rarityRank: 5,
      viewCount: 1234,
      likeCount: 187,
      isMinted: true,
      status: 'LISTED'
    },

    // Designer Fashion
    {
      tokenId: 'TK-HERMES-BIRKIN-006',
      contractAddress: '0x1234567890123456789012345678901234567890',
      name: 'Hermès Birkin 30 Gold Togo',
      description: 'Authentic Hermès Birkin 30 in Gold Togo leather with gold plated hardware. Includes original box, dustbag, lock, keys, and clochette. Crafted by skilled artisans in France.',
      image: 'http://www.redeluxe.com/cdn/shop/files/hermes-handbag-gold-vintage-birkin-30-gold-ardennes-gold-plated-c-square-stamp-redeluxe-45771055628598.jpg?v=1706261980',
      collectionId: collections[2].id,
      creatorId: users[2].id,
      ownerId: users[2].id,
      price: 22.8,
      currency: 'ETH',
      isVerified: true,
      authenticityScore: 99,
      attributes: JSON.stringify({
        brand: 'Hermès',
        model: 'Birkin 30',
        leather: 'Togo',
        color: 'Gold',
        hardware: 'Gold plated',
        dateStamp: 'C (2018)',
        artisanCode: 'Verified',
        dimensions: '30 x 22 x 16 cm',
        originalBoxIncluded: 'Yes',
        lockAndKeys: 'Yes',
        clochette: 'Yes',
        dustbag: 'Yes'
      }),
      rarityScore: 94.3,
      rarityRank: 4,
      viewCount: 2847,
      likeCount: 456,
      isMinted: true,
      status: 'LISTED'
    },
    {
      tokenId: 'TK-LV-MONOGRAM-007',
      contractAddress: '0x1234567890123456789012345678901234567890',
      name: 'Louis Vuitton Neverfull MM Monogram',
      description: 'Classic Louis Vuitton Neverfull MM in iconic Monogram canvas. Features natural cowhide leather trim and gold-color hardware. Comes with removable pochette.',
      image: 'https://cdn.theluxurycloset.com/uploads/opt/products/750x750/luxury-women-louis-vuitton-used-handbags-p329387-001.jpg',
      collectionId: collections[2].id,
      creatorId: users[2].id,
      ownerId: users[3].id,
      price: 1.8,
      currency: 'ETH',
      isVerified: true,
      authenticityScore: 96,
      attributes: JSON.stringify({
        brand: 'Louis Vuitton',
        model: 'Neverfull MM',
        canvas: 'Monogram',
        trim: 'Natural cowhide leather',
        hardware: 'Gold-color',
        dateCode: 'Verified',
        dimensions: '32 x 29 x 17 cm',
        pochette: 'Included',
        dustbag: 'Yes',
        careCard: 'Included'
      }),
      rarityScore: 72.1,
      rarityRank: 12,
      viewCount: 1654,
      likeCount: 298,
      isMinted: true,
      status: 'LISTED'
    },

    // Tech Collectibles
    {
      tokenId: 'TK-PS5-ANNIVERSARY-008',
      contractAddress: '0x1234567890123456789012345678901234567890',
      name: 'PlayStation 5 30th Anniversary Edition',
      description: 'Ultra-rare PlayStation 5 30th Anniversary Limited Edition. Only 12,300 units produced globally. Features retro gray colorway inspired by the original PlayStation.',
      image: 'http://flitit.com/cdn/shop/files/ghost-of-yotei-le-product-imagery-02-en-03jul25.webp?v=1758528219',
      collectionId: collections[3].id,
      creatorId: users[3].id,
      ownerId: users[3].id,
      price: 2.4,
      currency: 'ETH',
      isVerified: true,
      authenticityScore: 98,
      attributes: JSON.stringify({
        brand: 'Sony',
        model: 'PlayStation 5 30th Anniversary',
        colorway: 'Original Gray',
        productionRun: '12,300 units',
        serialNumber: 'Verified',
        region: 'Global',
        accessories: 'All included',
        originalPackaging: 'Mint condition',
        warranty: 'Valid'
      }),
      rarityScore: 96.8,
      rarityRank: 1,
      viewCount: 3456,
      likeCount: 678,
      isMinted: true,
      status: 'LISTED'
    },

    // Jewelry
    {
      tokenId: 'TK-DIAMOND-RING-009',
      contractAddress: '0x1234567890123456789012345678901234567890',
      name: '1.5ct VVS1 Diamond Solitaire Ring',
      description: 'Stunning 1.5 carat VVS1 clarity diamond in F color grade. Set in 18k white gold with classic 6-prong setting. GIA certified with laser inscription.',
      image: 'https://cdn.shopify.com/s/files/1/0252/5265/9286/files/1428.-ClubRingwithRadiantcutyellow.jpg?v=1724791218',
      collectionId: collections[4].id,
      creatorId: users[4].id,
      ownerId: users[4].id,
      price: 8.9,
      currency: 'ETH',
      isVerified: true,
      authenticityScore: 99,
      attributes: JSON.stringify({
        caratWeight: '1.50',
        cut: 'Round Brilliant',
        color: 'F',
        clarity: 'VVS1',
        certification: 'GIA',
        certificateNumber: 'Verified',
        setting: '18k White Gold',
        laserInscription: 'Yes',
        fluorescence: 'None',
        dimensions: '7.35 x 7.40 x 4.52 mm'
      }),
      rarityScore: 91.4,
      rarityRank: 6,
      viewCount: 1987,
      likeCount: 334,
      isMinted: true,
      status: 'LISTED'
    },

    // Sports Memorabilia
    {
      tokenId: 'TK-BABE-RUTH-010',
      contractAddress: '0x1234567890123456789012345678901234567890',
      name: 'Babe Ruth Signed Baseball 1927',
      description: 'Extremely rare Babe Ruth single signed baseball from his legendary 60 home run season in 1927. PSA/DNA authenticated with full letter of authenticity.',
      image: 'https://m.media-amazon.com/images/I/61fUJH8CoYS.jpg',
      collectionId: collections[5].id,
      creatorId: users[5].id,
      ownerId: users[5].id,
      price: 156.0,
      currency: 'ETH',
      isVerified: true,
      authenticityScore: 97,
      attributes: JSON.stringify({
        athlete: 'Babe Ruth',
        sport: 'Baseball',
        year: '1927',
        item: 'Single signed baseball',
        authentication: 'PSA/DNA',
        condition: 'EX-MT',
        signature: 'Bold blue ink',
        provenance: 'Documented',
        rarity: 'Museum quality'
      }),
      rarityScore: 98.9,
      rarityRank: 2,
      viewCount: 4567,
      likeCount: 789,
      isMinted: true,
      status: 'IN_AUCTION'
    },

    // Sneakers
    {
      tokenId: 'TK-JORDAN-CHICAGO-011',
      contractAddress: '0x1234567890123456789012345678901234567890',
      name: 'Air Jordan 1 "Chicago" 1985 Original',
      description: 'Original 1985 Air Jordan 1 "Chicago" in deadstock condition. Extremely rare find with original box and tissue paper. Nike Air branding on sole.',
      image: 'https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_ba2a414c-59bc-45aa-bdd3-03ba3aaa2dc2_1080x.jpg?=75&v=1708676901',
      collectionId: collections[6].id,
      creatorId: users[6].id,
      ownerId: users[6].id,
      price: 12.5,
      currency: 'ETH',
      isVerified: true,
      authenticityScore: 95,
      attributes: JSON.stringify({
        brand: 'Nike',
        model: 'Air Jordan 1',
        colorway: 'Chicago',
        year: '1985',
        size: 'US 9',
        condition: 'Deadstock',
        originalBox: 'Yes',
        productionCode: 'Verified',
        nikeAirBranding: 'Yes',
        authentication: 'StockX Verified'
      }),
      rarityScore: 93.7,
      rarityRank: 7,
      viewCount: 2345,
      likeCount: 567,
      isMinted: true,
      status: 'LISTED'
    },

    // Vintage Items
    {
      tokenId: 'TK-POCKET-WATCH-012',
      contractAddress: '0x1234567890123456789012345678901234567890',
      name: 'Vintage Pocket Watch 18k Gold 1920',
      description: 'Beautiful vintage 18k gold pocket watch from the 1920s. Mechanical movement in excellent working condition. Engraved case with original chain.',
      image: 'http://vintage-pocket-watch.com/cdn/shop/products/Square-Pocket-Watch_1200x1200.jpg?v=1636127966',
      collectionId: collections[7].id,
      creatorId: users[7].id,
      ownerId: users[7].id,
      price: 5.2,
      currency: 'ETH',
      isVerified: true,
      authenticityScore: 92,
      attributes: JSON.stringify({
        type: 'Pocket Watch',
        material: '18k Gold',
        era: '1920s',
        movement: 'Mechanical',
        condition: 'Excellent',
        case: 'Engraved',
        chain: 'Original',
        serviceHistory: 'Recently serviced',
        appraisal: 'Certified'
      }),
      rarityScore: 87.3,
      rarityRank: 9,
      viewCount: 1456,
      likeCount: 234,
      isMinted: true,
      status: 'LISTED'
    }
  ];

  for (const nft of nftData) {
    await prisma.nFT.upsert({
      where: { tokenId: nft.tokenId },
      update: {},
      create: {
        tokenId: nft.tokenId,
        contractAddress: nft.contractAddress,
        name: nft.name,
        description: nft.description,
        image: nft.image,
        collectionId: nft.collectionId,
        creatorId: nft.creatorId,
        ownerId: nft.ownerId,
        price: nft.price,
        currency: nft.currency,
        isVerified: nft.isVerified,
        authenticityScore: nft.authenticityScore,
        attributes: JSON.parse(nft.attributes),
        rarityScore: nft.rarityScore,
        rarityRank: nft.rarityRank,
        viewCount: nft.viewCount,
        likeCount: nft.likeCount,
        isMinted: nft.isMinted,
        status: nft.status as any
      }
    });
  }

  console.log(`Created ${nftData.length} luxury NFTs`);
}

async function createAuctionsAndOffers() {
  console.log('🔨 Creating auctions and offers...');

  // Get some NFTs for auctions
  const nfts = await prisma.nFT.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  // Create an auction for the Babe Ruth baseball
  const babeRuthNft = await prisma.nFT.findFirst({
    where: { name: { contains: 'Babe Ruth' } }
  });

  if (babeRuthNft) {
    await prisma.auction.create({
      data: {
        nftId: babeRuthNft.id,
        sellerId: babeRuthNft.ownerId,
        startPrice: 100.0,
        reservePrice: 150.0,
        currentBid: 156.0,
        bidIncrement: 5.0,
        startTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
        endTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
        status: 'ACTIVE',
        bidCount: 12
      }
    });
  }

  // Create some offers
  const watchNft = await prisma.nFT.findFirst({
    where: { name: { contains: 'Rolex' } }
  });

  if (watchNft) {
    await prisma.offer.create({
      data: {
        nftId: watchNft.id,
        offererId: watchNft.ownerId, // In real app, this would be different user
        amount: 16.8,
        currency: 'ETH',
        message: 'Serious collector interested in this piece',
        status: 'PENDING',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      }
    });
  }

  console.log('Created auctions and offers');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

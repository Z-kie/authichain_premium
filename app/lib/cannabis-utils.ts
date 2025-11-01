
import { PackageQRData, ProductNFT, ProductStrain, LabTest, SeedToSaleTracking } from '@/types/product';

// Mock data for demonstration - in production, this would connect to real product databases
const mockStrainDatabase: Record<string, ProductStrain> = {
  'myles-high': {
    id: 'myles-high-001',
    name: 'Myles High',
    type: 'HYBRID',
    genetics: {
      parentStrains: ['Amber Slice', 'Smokers Club'],
      dominance: 60, // 60% indica
      thcContent: 23.4,
      cbdContent: 0.8
    },
    heritage: {
      breeder: 'The Pressure Creator',
      seedBank: 'Exclusive Collection',
      originCountry: 'USA',
      firstCrossed: '2023'
    },
    characteristics: {
      floweringTime: '8-9 weeks',
      yield: 'High',
      difficulty: 'INTERMEDIATE',
      climate: ['Indoor', 'Greenhouse'],
      effects: ['Relaxing', 'Euphoric', 'Creative', 'Focused'],
      flavors: ['Sweet', 'Fruity', 'Citrus', 'Pine'],
      aromas: ['Diesel', 'Earthy', 'Spicy']
    }
  }
};

const mockLabTests: Record<string, LabTest> = {
  'default': {
    id: 'LAB-001',
    testDate: new Date('2024-08-15'),
    labName: 'Product Testing Lab',
    labLicense: 'LAB-12345',
    batch: 'MH-001-2024',
    cannabinoids: {
      thc: 23.4,
      thca: 26.8,
      cbd: 0.8,
      cbda: 0.2,
      cbg: 1.2,
      cbn: 0.3,
      total: 28.5
    },
    terpenes: [
      { name: 'Myrcene', percentage: 0.8 },
      { name: 'Limonene', percentage: 0.6 },
      { name: 'Pinene', percentage: 0.4 },
      { name: 'Caryophyllene', percentage: 0.3 }
    ],
    contaminants: {
      pesticides: 'PASS',
      heavyMetals: 'PASS',
      microbials: 'PASS',
      residualSolvents: 'PASS'
    },
    moisture: 12.5
  }
};

export async function createProductNFTFromQR(qrData: PackageQRData): Promise<ProductNFT> {
  // Simulate API calls to product databases
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Get item information
  const itemKey = qrData.item.toLowerCase().replace(/\s+/g, '-');
  const item = mockStrainDatabase[itemKey] || createDefaultStrain(qrData);

  // Get lab test results
  const labTest = mockLabTests['default'];
  labTest.cannabinoids.thc = qrData.thc;
  labTest.cannabinoids.cbd = qrData.cbd;

  // Create seed-to-sale tracking
  const seedToSale: SeedToSaleTracking = {
    seedId: `SEED-${qrData.packageId}`,
    plantId: `PLANT-${qrData.packageId}`,
    harvestDate: new Date(qrData.harvestDate),
    packageId: qrData.packageId,
    stateTrackingNumber: qrData.stateId,
    growerLicense: 'GRW-12345',
    chain: [
      {
        stage: 'SEED',
        timestamp: new Date(qrData.cultivationDate),
        location: 'Cultivation Facility',
        operatorLicense: 'GRW-12345',
        notes: 'Seed germination'
      },
      {
        stage: 'FLOWERING',
        timestamp: new Date(qrData.harvestDate),
        location: 'Growing Room A',
        operatorLicense: 'GRW-12345',
        notes: 'Harvest ready'
      },
      {
        stage: 'PACKAGING',
        timestamp: new Date(),
        location: 'Processing Facility',
        operatorLicense: 'PRO-12345',
        notes: 'Final packaging for retail'
      }
    ]
  };

  // Calculate rarity based on item characteristics and test results
  const rarityScore = calculateRarity(item, labTest);

  const nft: ProductNFT = {
    id: `nft-${qrData.packageId}`,
    tokenId: qrData.packageId,
    name: `${qrData.item} #${qrData.packageId.slice(-3).toUpperCase()}`,
    description: `${item.type} item featuring ${item.genetics.parentStrains.join(' x ')} genetics. THC: ${qrData.thc}%, CBD: ${qrData.cbd}%. Lab tested and verified.`,
    imageUrl: `/api/generate-nft-image/${qrData.packageId}`, // Will generate item-specific imagery
    item,
    labTests: [labTest],
    seedToSale,
    packaging: {
      qrCode: JSON.stringify(qrData),
      harvestDate: new Date(qrData.harvestDate),
      packageDate: new Date(),
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      netWeight: qrData.weight,
      thcWarning: qrData.thc > 0.3
    },
    rarity: {
      score: rarityScore,
      rank: Math.floor(Math.random() * 1000) + 1, // Mock ranking
      traits: generateRarityTraits(item, labTest)
    },
    creator: {
      address: '0x...', // Will be set by user's wallet
      growerName: qrData.grower,
      license: 'GRW-12345'
    },
    owner: '0x...', // Will be set by user's wallet
    currency: 'ETH',
    blockchain: 'Ethereum',
    contractAddress: '0x...' // Mock contract address
  };

  return nft;
}

function createDefaultStrain(qrData: PackageQRData): ProductStrain {
  return {
    id: qrData.item.toLowerCase().replace(/\s+/g, '-'),
    name: qrData.item,
    type: 'HYBRID',
    genetics: {
      parentStrains: ['Unknown Genetics'],
      dominance: 50,
      thcContent: qrData.thc,
      cbdContent: qrData.cbd
    },
    heritage: {
      breeder: qrData.grower
    },
    characteristics: {
      floweringTime: 'Unknown',
      yield: 'Unknown',
      difficulty: 'INTERMEDIATE',
      climate: ['Indoor'],
      effects: ['Relaxing'],
      flavors: ['Natural'],
      aromas: ['Earthy']
    }
  };
}

function calculateRarity(item: ProductStrain, labTest: LabTest): number {
  let score = 50; // Base score

  // THC content rarity
  if (labTest.cannabinoids.thc > 30) score += 25;
  else if (labTest.cannabinoids.thc > 25) score += 15;
  else if (labTest.cannabinoids.thc > 20) score += 10;

  // CBD content rarity
  if (labTest.cannabinoids.cbd > 15) score += 20;
  else if (labTest.cannabinoids.cbd > 10) score += 10;

  // Strain type rarity
  if (item.type === 'SATIVA') score += 5;

  // Genetics complexity
  if (item.genetics.parentStrains.length > 2) score += 10;

  return Math.min(score, 100);
}

function generateRarityTraits(item: ProductStrain, labTest: LabTest) {
  return [
    {
      trait: 'THC Level',
      value: `${labTest.cannabinoids.thc}%`,
      rarity: labTest.cannabinoids.thc > 25 ? 15 : 35
    },
    {
      trait: 'CBD Level',
      value: `${labTest.cannabinoids.cbd}%`,
      rarity: labTest.cannabinoids.cbd > 10 ? 10 : 60
    },
    {
      trait: 'Strain Type',
      value: item.type,
      rarity: item.type === 'SATIVA' ? 30 : item.type === 'INDICA' ? 35 : 35
    },
    {
      trait: 'Genetics',
      value: item.genetics.parentStrains.join(' x '),
      rarity: item.genetics.parentStrains.length > 2 ? 20 : 45
    },
    {
      trait: 'Difficulty',
      value: item.characteristics.difficulty,
      rarity: item.characteristics.difficulty === 'EXPERT' ? 15 : 50
    }
  ];
}

export function formatCannabinoidProfile(cannabinoids: any) {
  return Object.entries(cannabinoids)
    .filter(([key, value]) => key !== 'total' && (value as number) > 0)
    .map(([key, value]) => `${key.toUpperCase()}: ${value}%`)
    .join(', ');
}

export function getStrainTypeColor(type: string) {
  switch (type) {
    case 'INDICA':
      return 'text-purple-400';
    case 'SATIVA':
      return 'text-green-400';
    case 'HYBRID':
      return 'text-orange-400';
    default:
      return 'text-gray-400';
  }
}

export function getRarityColor(score: number) {
  if (score >= 90) return 'text-yellow-400 border-yellow-400';
  if (score >= 70) return 'text-purple-400 border-purple-400';
  if (score >= 50) return 'text-blue-400 border-blue-400';
  return 'text-gray-400 border-gray-400';
}

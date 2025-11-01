
// Product-specific types and interfaces
export interface ProductStrain {
  id: string;
  name: string;
  type: 'INDICA' | 'SATIVA' | 'HYBRID';
  genetics: {
    parentStrains: string[];
    dominance: number; // percentage of indica vs sativa
    thcContent?: number;
    cbdContent?: number;
  };
  heritage: {
    breeder?: string;
    seedBank?: string;
    originCountry?: string;
    firstCrossed?: string;
  };
  characteristics: {
    floweringTime: string;
    yield: string;
    difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';
    climate: string[];
    effects: string[];
    flavors: string[];
    aromas: string[];
  };
}

export interface LabTest {
  id: string;
  testDate: Date;
  labName: string;
  labLicense: string;
  batch: string;
  cannabinoids: {
    thc: number;
    thca: number;
    cbd: number;
    cbda: number;
    cbg: number;
    cbn: number;
    total: number;
  };
  terpenes?: {
    name: string;
    percentage: number;
  }[];
  contaminants?: {
    pesticides: 'PASS' | 'FAIL';
    heavyMetals: 'PASS' | 'FAIL';
    microbials: 'PASS' | 'FAIL';
    residualSolvents: 'PASS' | 'FAIL';
  };
  moisture?: number;
  certificationUrl?: string;
}

export interface SeedToSaleTracking {
  seedId: string;
  plantId: string;
  harvestDate: Date;
  packageId: string;
  stateTrackingNumber: string;
  growerLicense: string;
  processorLicense?: string;
  distributorLicense?: string;
  retailerLicense?: string;
  chain: {
    stage: 'SEED' | 'CLONE' | 'VEGETATIVE' | 'FLOWERING' | 'HARVEST' | 'PROCESSING' | 'PACKAGING' | 'DISTRIBUTION' | 'RETAIL';
    timestamp: Date;
    location: string;
    operatorLicense: string;
    notes?: string;
  }[];
}

export interface ProductNFT {
  id: string;
  tokenId: string;
  name: string;
  description: string;
  imageUrl: string;
  item: ProductStrain;
  labTests: LabTest[];
  seedToSale: SeedToSaleTracking;
  packaging: {
    qrCode: string;
    packageArtist?: string;
    artistWallet?: string;
    royaltyPercentage?: number;
    harvestDate: Date;
    packageDate: Date;
    expirationDate: Date;
    netWeight: number;
    thcWarning: boolean;
  };
  rarity: {
    score: number;
    rank: number;
    traits: {
      trait: string;
      value: string;
      rarity: number;
    }[];
  };
  creator: {
    address: string;
    growerName: string;
    license: string;
  };
  owner: string;
  price?: number;
  currency: 'ETH' | 'SOL' | 'MATIC';
  blockchain: string;
  contractAddress: string;
}

export interface PackageQRData {
  packageId: string;
  item: string;
  grower: string;
  harvestDate: string;
  thc: number;
  cbd: number;
  labTestId: string;
  stateId: string;
  weight: number;
  cultivationDate: string;
}

export interface ArtistRoyalty {
  artistId: string;
  artistName: string;
  walletAddress: string;
  royaltyPercentage: number;
  artworkUrl?: string;
  signature?: string;
}

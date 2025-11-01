import { Manufacturer, Deal, Subscription, NFTMint, CreateManufacturerRequest, CreateDealRequest, CreateSubscriptionRequest, RecordNFTMintRequest } from '../types';

// Manufacturers
export async function getAllManufacturers(db: D1Database): Promise<Manufacturer[]> {
  const result = await db.prepare('SELECT * FROM manufacturers ORDER BY onboarded_at DESC').all();
  return result.results as Manufacturer[];
}

export async function getManufacturerById(db: D1Database, id: string): Promise<Manufacturer | null> {
  const result = await db.prepare('SELECT * FROM manufacturers WHERE id = ?').bind(id).first();
  return result as Manufacturer | null;
}

export async function createManufacturer(db: D1Database, data: CreateManufacturerRequest): Promise<Manufacturer> {
  const id = `mfr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const tier = data.tier || 'free';
  
  await db.prepare(
    'INSERT INTO manufacturers (id, company_name, contact_email, tier) VALUES (?, ?, ?, ?)'
  ).bind(id, data.company_name, data.contact_email, tier).run();
  
  const manufacturer = await getManufacturerById(db, id);
  if (!manufacturer) throw new Error('Failed to create manufacturer');
  return manufacturer;
}

export async function updateManufacturerTier(db: D1Database, id: string, tier: string): Promise<Manufacturer> {
  await db.prepare('UPDATE manufacturers SET tier = ? WHERE id = ?').bind(tier, id).run();
  const manufacturer = await getManufacturerById(db, id);
  if (!manufacturer) throw new Error('Manufacturer not found');
  return manufacturer;
}

// Deals
export async function getAllDeals(db: D1Database): Promise<Deal[]> {
  const result = await db.prepare('SELECT * FROM deals ORDER BY created_at DESC').all();
  return result.results as Deal[];
}

export async function getDealsByManufacturer(db: D1Database, manufacturerId: string): Promise<Deal[]> {
  const result = await db.prepare('SELECT * FROM deals WHERE manufacturer_id = ? ORDER BY created_at DESC')
    .bind(manufacturerId).all();
  return result.results as Deal[];
}

export async function createDeal(db: D1Database, data: CreateDealRequest): Promise<Deal> {
  const id = `deal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  await db.prepare(
    'INSERT INTO deals (id, manufacturer_id, deal_name, deal_value, stage, owner_email) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(id, data.manufacturer_id, data.deal_name, data.deal_value, data.stage, data.owner_email).run();
  
  const result = await db.prepare('SELECT * FROM deals WHERE id = ?').bind(id).first();
  if (!result) throw new Error('Failed to create deal');
  return result as Deal;
}

export async function updateDealStage(db: D1Database, id: string, stage: string): Promise<Deal> {
  await db.prepare('UPDATE deals SET stage = ? WHERE id = ?').bind(stage, id).run();
  const result = await db.prepare('SELECT * FROM deals WHERE id = ?').bind(id).first();
  if (!result) throw new Error('Deal not found');
  return result as Deal;
}

// Subscriptions
export async function getAllSubscriptions(db: D1Database): Promise<Subscription[]> {
  const result = await db.prepare('SELECT * FROM subscriptions ORDER BY created_at DESC').all();
  return result.results as Subscription[];
}

export async function getSubscriptionsByManufacturer(db: D1Database, manufacturerId: string): Promise<Subscription[]> {
  const result = await db.prepare('SELECT * FROM subscriptions WHERE manufacturer_id = ? ORDER BY created_at DESC')
    .bind(manufacturerId).all();
  return result.results as Subscription[];
}

export async function createSubscription(db: D1Database, data: CreateSubscriptionRequest): Promise<Subscription> {
  const id = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  await db.prepare(
    'INSERT INTO subscriptions (id, manufacturer_id, plan_name, amount, status) VALUES (?, ?, ?, ?, ?)'
  ).bind(id, data.manufacturer_id, data.plan_name, data.amount, data.status).run();
  
  const result = await db.prepare('SELECT * FROM subscriptions WHERE id = ?').bind(id).first();
  if (!result) throw new Error('Failed to create subscription');
  return result as Subscription;
}

export async function updateSubscriptionStatus(db: D1Database, id: string, status: string): Promise<Subscription> {
  await db.prepare('UPDATE subscriptions SET status = ? WHERE id = ?').bind(status, id).run();
  const result = await db.prepare('SELECT * FROM subscriptions WHERE id = ?').bind(id).first();
  if (!result) throw new Error('Subscription not found');
  return result as Subscription;
}

// NFT Mints
export async function getAllNFTMints(db: D1Database, limit: number = 100): Promise<NFTMint[]> {
  const result = await db.prepare('SELECT * FROM nft_mints ORDER BY timestamp DESC LIMIT ?').bind(limit).all();
  return result.results as NFTMint[];
}

export async function getNFTMintByTxHash(db: D1Database, txHash: string): Promise<NFTMint | null> {
  const result = await db.prepare('SELECT * FROM nft_mints WHERE tx_hash = ?').bind(txHash).first();
  return result as NFTMint | null;
}

export async function recordNFTMint(db: D1Database, data: RecordNFTMintRequest): Promise<NFTMint> {
  // Check if already exists
  const existing = await getNFTMintByTxHash(db, data.tx_hash);
  if (existing) return existing;
  
  await db.prepare(
    'INSERT INTO nft_mints (token_id, to_address, tx_hash, block_number, timestamp) VALUES (?, ?, ?, ?, ?)'
  ).bind(data.token_id, data.to_address, data.tx_hash, data.block_number, data.timestamp).run();
  
  const result = await getNFTMintByTxHash(db, data.tx_hash);
  if (!result) throw new Error('Failed to record NFT mint');
  return result;
}

// Analytics
export async function getAnalytics(db: D1Database) {
  const [manufacturers, deals, subscriptions, nfts] = await Promise.all([
    db.prepare('SELECT COUNT(*) as count FROM manufacturers').first(),
    db.prepare('SELECT COUNT(*) as count, SUM(deal_value) as total_value FROM deals').first(),
    db.prepare('SELECT COUNT(*) as count, SUM(amount) as mrr FROM subscriptions WHERE status = ?').bind('active').first(),
    db.prepare('SELECT COUNT(*) as count FROM nft_mints').first(),
  ]);

  return {
    manufacturers: manufacturers?.count || 0,
    deals: {
      count: deals?.count || 0,
      total_value: deals?.total_value || 0,
    },
    subscriptions: {
      count: subscriptions?.count || 0,
      mrr: subscriptions?.mrr || 0,
    },
    nfts: {
      count: nfts?.count || 0,
    },
  };
}

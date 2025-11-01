-- Manufacturers
CREATE TABLE manufacturers (
  id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  tier TEXT DEFAULT 'free',
  status TEXT DEFAULT 'active',
  onboarded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Deals
CREATE TABLE deals (
  id TEXT PRIMARY KEY,
  manufacturer_id TEXT NOT NULL,
  deal_name TEXT NOT NULL,
  deal_value REAL NOT NULL,
  stage TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(id)
);

-- Subscriptions
CREATE TABLE subscriptions (
  id TEXT PRIMARY KEY,
  manufacturer_id TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  amount REAL NOT NULL,
  status TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(id)
);

-- NFT Mints
CREATE TABLE nft_mints (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token_id TEXT NOT NULL,
  to_address TEXT NOT NULL,
  tx_hash TEXT NOT NULL UNIQUE,
  block_number INTEGER NOT NULL,
  timestamp INTEGER NOT NULL,
  processed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Test data
INSERT INTO manufacturers (id, company_name, contact_email) VALUES 
  ('mfr_001', 'Test Company', 'test@example.com');

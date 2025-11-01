// Test environment variable loading
require('dotenv').config();

console.log('\n=== Environment Variables Test ===\n');

const requiredVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'STRIPE_SECRET_KEY',
  'NFT_STORAGE_API_KEY',
  'PRIVATE_KEY',
  'CONTRACT_ADDRESS'
];

let allPresent = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`❌ ${varName}: MISSING`);
    allPresent = false;
  }
});

console.log('\n=== Blockchain Config ===');
console.log(`Contract Address: ${process.env.CONTRACT_ADDRESS}`);
console.log(`RPC URL: ${process.env.POLYGON_AMOY_RPC_URL}`);
console.log(`Polygonscan API: ${process.env.POLYGONSCAN_API_KEY ? 'SET' : 'MISSING'}`);

console.log('\n=== Storage Config ===');
console.log(`NFT.Storage: ${process.env.NFT_STORAGE_API_KEY ? 'SET' : 'MISSING'}`);
console.log(`R2 Endpoint: ${process.env.R2_ENDPOINT || 'NOT SET'}`);

console.log('\n=== Result ===');
console.log(allPresent ? '✅ All required variables loaded!' : '❌ Some variables missing!');

process.exit(allPresent ? 0 : 1);

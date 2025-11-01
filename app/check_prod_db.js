const { Pool } = require('pg');

// Use the CORRECT Supabase connection from the final migration
const connectionString = "postgresql://postgres.axkmyfopuxtxzmivbvaw:jr5lGv0nKFhRW6gwS94gDF2l@aws-0-us-west-1.pooler.supabase.com:5432/postgres";

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

async function checkDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('===== PRODUCTION SUPABASE DATABASE CHECK =====\n');
    
    // List all tables
    const result = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `);
    
    console.log(`✓ Found ${result.rows.length} tables\n`);
    
    // Check for key tables
    const hasTransaction = result.rows.some(r => r.tablename === 'Transaction');
    const hasUser = result.rows.some(r => r.tablename === 'User');
    const hasCryptoPayment = result.rows.some(r => r.tablename === 'CryptoPayment');
    
    console.log('Key Tables:');
    console.log(`  Transaction:    ${hasTransaction ? '✅' : '❌'}`);
    console.log(`  User:           ${hasUser ? '✅' : '❌'}`);
    console.log(`  CryptoPayment:  ${hasCryptoPayment ? '✅' : '❌'}`);
    
    // Show first 10 tables
    console.log('\nFirst 10 tables:');
    result.rows.slice(0, 10).forEach((row, i) => {
      console.log(`  ${i+1}. ${row.tablename}`);
    });
    
    return { hasTransaction, hasUser, hasCryptoPayment, totalTables: result.rows.length };
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

checkDatabase()
  .then(result => {
    console.log('\n===== CHECK COMPLETE =====');
    process.exit(result.hasCryptoPayment ? 0 : 1);
  })
  .catch(error => {
    console.error('\n❌ Check failed');
    process.exit(1);
  });

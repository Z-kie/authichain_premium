const { Pool } = require('pg');

// Try the other Supabase connection from .env
const connectionString = "postgresql://postgres.gylpoobkjycadwjioohz:SNndjJY3Jj8qoSwE@aws-0-us-east-1.pooler.supabase.com:5432/postgres";

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

async function checkTables() {
  const client = await pool.connect();
  
  try {
    console.log('Checking second database...\n');
    
    const result = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `);
    
    console.log(`Found ${result.rows.length} tables:`);
    result.rows.slice(0, 20).forEach((row, index) => {
      console.log(`${index + 1}. ${row.tablename}`);
    });
    
    if (result.rows.length > 20) {
      console.log(`... and ${result.rows.length - 20} more tables`);
    }
    
    const hasTransaction = result.rows.some(r => r.tablename === 'Transaction');
    const hasUser = result.rows.some(r => r.tablename === 'User');
    const hasCryptoPayment = result.rows.some(r => r.tablename === 'CryptoPayment');
    
    console.log(`\n✓ Transaction table exists: ${hasTransaction}`);
    console.log(`✓ User table exists: ${hasUser}`);
    console.log(`✓ CryptoPayment table exists: ${hasCryptoPayment}`);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

checkTables();

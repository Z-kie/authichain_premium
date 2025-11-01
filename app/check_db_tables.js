const { Pool } = require('pg');

const connectionString = "postgresql://postgres.axkmyfopuxtxzmivbvaw:zT6UiLSrAHIguLwc@aws-1-us-east-1.pooler.supabase.com:5432/postgres";

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

async function checkTables() {
  const client = await pool.connect();
  
  try {
    console.log('Checking database tables...\n');
    
    const result = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `);
    
    console.log(`Found ${result.rows.length} tables:`);
    result.rows.forEach((row, index) => {
      console.log(`${index + 1}. ${row.tablename}`);
    });
    
    // Check for Transaction table specifically
    const hasTransaction = result.rows.some(r => r.tablename === 'Transaction');
    const hasUser = result.rows.some(r => r.tablename === 'User');
    
    console.log(`\n✓ Transaction table exists: ${hasTransaction}`);
    console.log(`✓ User table exists: ${hasUser}`);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

checkTables();

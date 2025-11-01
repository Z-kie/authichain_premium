const { Pool } = require('pg');
const fs = require('fs');

// Use the DATABASE_URL from .env.local (more recent Supabase config)
const connectionString = "postgresql://postgres.axkmyfopuxtxzmivbvaw:zT6UiLSrAHIguLwc@aws-1-us-east-1.pooler.supabase.com:5432/postgres";

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

async function applyMigration() {
  const client = await pool.connect();
  
  try {
    console.log('Connecting to Supabase database...');
    
    // Check if CryptoPayment table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'CryptoPayment'
      );
    `);
    
    const tableExists = tableCheck.rows[0].exists;
    console.log(`CryptoPayment table exists: ${tableExists}`);
    
    if (!tableExists) {
      console.log('\nApplying migration...');
      const migrationSQL = fs.readFileSync('/home/ubuntu/authichain_premium/app/prisma/migrations/add_nowpayments_support.sql', 'utf8');
      
      await client.query(migrationSQL);
      console.log('✅ Migration applied successfully!');
      
      // Verify the table was created
      const verifyCheck = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'CryptoPayment'
        );
      `);
      
      console.log(`✅ CryptoPayment table verified: ${verifyCheck.rows[0].exists}`);
      
      // Get column count
      const columns = await client.query(`
        SELECT COUNT(*) as count
        FROM information_schema.columns 
        WHERE table_name = 'CryptoPayment';
      `);
      
      console.log(`✅ Table has ${columns.rows[0].count} columns`);
    } else {
      console.log('ℹ️  Migration already applied, skipping...');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

applyMigration()
  .then(() => {
    console.log('\n✅ Database migration check complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  });

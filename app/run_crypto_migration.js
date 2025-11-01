const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

async function runMigration() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Running CryptoPayment table migration...\n');
    
    // Check if table exists
    const result = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'CryptoPayment'
      );
    `;
    
    const tableExists = result[0].exists;
    
    if (tableExists) {
      console.log('✅ CryptoPayment table already exists');
      return { success: true, alreadyExists: true };
    }
    
    console.log('📝 Creating CryptoPayment table...');
    
    // Read and execute migration SQL
    const migrationSQL = fs.readFileSync('./prisma/migrations/add_nowpayments_support.sql', 'utf8');
    
    // Split by semicolons and execute each statement
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    for (const statement of statements) {
      if (statement.trim()) {
        await prisma.$executeRawUnsafe(statement + ';');
      }
    }
    
    console.log('✅ CryptoPayment table created successfully');
    
    // Verify creation
    const verifyResult = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'CryptoPayment'
      );
    `;
    
    if (verifyResult[0].exists) {
      console.log('✅ Migration verified successfully\n');
      return { success: true, alreadyExists: false };
    } else {
      throw new Error('Table creation verification failed');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

runMigration()
  .then(result => {
    console.log('Migration result:', JSON.stringify(result, null, 2));
    process.exit(result.success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

  try {
    console.log('Testing Supabase database connection...');
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Try a simple query
    const userCount = await prisma.user.count();
    console.log(`✅ Query successful. User count: ${userCount}`);
    
    await prisma.$disconnect();
    console.log('✅ Database disconnected successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();

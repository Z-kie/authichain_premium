const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    // Test connection by counting users
    const userCount = await prisma.user.count();
    console.log('✅ Successfully connected to Supabase!');
    console.log(`📊 Current user count: ${userCount}`);
    
    // List all tables
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    console.log(`\n📋 Tables created: ${tables.length}`);
    console.log('Sample tables:', tables.slice(0, 10).map(t => t.table_name).join(', '));
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

const { PrismaClient } = require('./node_modules/.prisma/client');

async function test() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    console.log('🔌 Testing database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50) + '...');
    
    const startTime = Date.now();
    const result = await prisma.$queryRaw`SELECT 1 as connection_test`;
    const duration = Date.now() - startTime;
    
    console.log('✅ Connection successful!');
    console.log('   Duration:', duration, 'ms');
    console.log('   Result:', result);
    
    // Test User table access
    console.log('📊 Checking User table...');
    const userCount = await prisma.user.count();
    console.log('✅ User table accessible. Count:', userCount);
    
    // Test a more complex query
    console.log('📊 Testing find query...');
    const testUser = await prisma.user.findFirst({
      where: { email: 'nonexistent@test.com' }
    });
    console.log('✅ Find query successful (result:', testUser === null ? 'null' : 'found', ')');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('   Code:', error.code);
    console.error('   Meta:', error.meta);
    if (error.stack) {
      console.error('   Stack:', error.stack.split('\n').slice(0, 3).join('\n'));
    }
  } finally {
    await prisma.$disconnect();
  }
}

test();

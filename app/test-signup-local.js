const bcrypt = require('bcryptjs');
const { PrismaClient } = require('./node_modules/.prisma/client');

async function testSignup() {
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });

  try {
    const testEmail = `test${Date.now()}@authichain.test`;
    const testData = {
      email: testEmail,
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'User',
      subscriptionTier: 'EXPLORER'
    };

    console.log('🧪 Testing signup process locally...');
    console.log('   Email:', testEmail);
    
    // 1. Check if user exists (should not)
    console.log('\n1️⃣ Checking for existing user...');
    const existing = await prisma.user.findUnique({
      where: { email: testEmail }
    });
    console.log('   Result:', existing ? 'Found (unexpected!)' : 'Not found (good!)');

    // 2. Hash password
    console.log('\n2️⃣ Hashing password...');
    const startHash = Date.now();
    const hashedPassword = await bcrypt.hash(testData.password, 12);
    console.log('   Duration:', Date.now() - startHash, 'ms');
    console.log('   Hash length:', hashedPassword.length);

    // 3. Create user
    console.log('\n3️⃣ Creating user...');
    const startCreate = Date.now();
    const user = await prisma.user.create({
      data: {
        email: testData.email,
        password: hashedPassword,
        firstName: testData.firstName,
        lastName: testData.lastName,
        subscriptionTier: testData.subscriptionTier,
        acceptTerms: true
      }
    });
    console.log('   Duration:', Date.now() - startCreate, 'ms');
    console.log('   User ID:', user.id);

    // 4. Create usage record
    console.log('\n4️⃣ Creating usage record...');
    const startUsage = Date.now();
    const now = new Date();
    await prisma.usageRecord.create({
      data: {
        userId: user.id,
        action: 'NFT_UPLOAD',
        count: 0,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      }
    });
    console.log('   Duration:', Date.now() - startUsage, 'ms');

    console.log('\n✅ Signup process completed successfully!');
    console.log('   Total users in DB:', await prisma.user.count());

  } catch (error) {
    console.error('\n❌ Signup failed:', error.message);
    console.error('   Code:', error.code);
    if (error.meta) console.error('   Meta:', error.meta);
  } finally {
    await prisma.$disconnect();
  }
}

testSignup();

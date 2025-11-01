// Simulate the signup API endpoint logic
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('./node_modules/.prisma/client');

// Retry logic
async function retryOperation(operation, maxRetries = 2, delayMs = 100) {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      console.log(`  [Retry] Attempt ${attempt + 1} failed:`, error.message);
      
      // Don't retry on validation errors
      if (error.code === 'P2002') {
        throw error;
      }
      
      // Wait before retrying (except on last attempt)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delayMs * (attempt + 1)));
      }
    }
  }
  
  throw lastError;
}

async function testUpdatedSignup() {
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });

  const startTime = Date.now();
  
  try {
    const testEmail = `test${Date.now()}@authichain.test`;
    console.log('🧪 Testing UPDATED signup with retry logic...');
    console.log('   Email:', testEmail);
    console.log('');
    
    // 1. Check existing user with retry
    console.log('1️⃣ Checking for existing user (with retry)...');
    const existing = await retryOperation(() =>
      prisma.user.findUnique({ where: { email: testEmail } })
    );
    console.log('   ✅ Check completed:', existing ? 'Found' : 'Not found');
    console.log('');
    
    // 2. Hash password
    console.log('2️⃣ Hashing password...');
    const hashedPassword = await bcrypt.hash('TestPassword123!', 12);
    console.log('   ✅ Password hashed');
    console.log('');
    
    // 3. Create user with retry
    console.log('3️⃣ Creating user (with retry)...');
    const user = await retryOperation(() =>
      prisma.user.create({
        data: {
          email: testEmail,
          password: hashedPassword,
          firstName: 'Test',
          lastName: 'User',
          subscriptionTier: 'EXPLORER',
          acceptTerms: true
        }
      })
    );
    console.log('   ✅ User created:', user.id);
    console.log('');
    
    // 4. Create usage record with retry
    console.log('4️⃣ Creating usage record (with retry)...');
    const now = new Date();
    await retryOperation(() =>
      prisma.usageRecord.create({
        data: {
          userId: user.id,
          action: 'NFT_UPLOAD',
          count: 0,
          month: now.getMonth() + 1,
          year: now.getFullYear(),
        }
      })
    );
    console.log('   ✅ Usage record created');
    console.log('');
    
    const duration = Date.now() - startTime;
    console.log('✅ SIGNUP COMPLETED SUCCESSFULLY!');
    console.log('   Total duration:', duration, 'ms');
    console.log('   Total users:', await prisma.user.count());

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('\n❌ SIGNUP FAILED!');
    console.error('   Error:', error.message);
    console.error('   Code:', error.code);
    console.error('   Duration:', duration, 'ms');
  } finally {
    await prisma.$disconnect();
  }
}

testUpdatedSignup();

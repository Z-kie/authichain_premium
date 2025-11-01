import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function testPasswordVerification() {
  try {
    const testCases = [
      { email: 'admin@authichain.com', password: 'Admin123!' },
      { email: 'user@authichain.com', password: 'User123!' },
      { email: 'john@doe.com', password: 'johndoe123' }
    ];

    for (const testCase of testCases) {
      console.log(`\n========================================`);
      console.log(`Testing: ${testCase.email}`);
      console.log(`Password: ${testCase.password}`);
      
      const user = await prisma.user.findUnique({
        where: { email: testCase.email }
      });

      if (!user) {
        console.log('❌ User not found');
        continue;
      }

      console.log(`✓ User found in database`);
      console.log(`  - Name: ${user.firstName} ${user.lastName}`);
      console.log(`  - Role: ${user.role}`);
      console.log(`  - Password hash: ${user.password.substring(0, 20)}...`);

      const isPasswordValid = await bcrypt.compare(testCase.password, user.password);
      
      if (isPasswordValid) {
        console.log('✅ Password verification: SUCCESS');
      } else {
        console.log('❌ Password verification: FAILED');
      }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPasswordVerification();

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createDemoAccounts() {
  try {
    // Check if admin account exists
    const adminExists = await prisma.user.findUnique({
      where: { email: 'admin@authichain.com' }
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      await prisma.user.create({
        data: {
          email: 'admin@authichain.com',
          password: hashedPassword,
          username: 'admin',
          firstName: 'Admin',
          lastName: 'User',
          isVerified: true,
          acceptTerms: true,
        }
      });
      console.log('✅ Admin account created: admin@authichain.com / Admin123!');
    } else {
      console.log('ℹ️  Admin account already exists');
    }

    // Check if user account exists
    const userExists = await prisma.user.findUnique({
      where: { email: 'user@authichain.com' }
    });

    if (!userExists) {
      const hashedPassword = await bcrypt.hash('User123!', 10);
      await prisma.user.create({
        data: {
          email: 'user@authichain.com',
          password: hashedPassword,
          username: 'user',
          firstName: 'Standard',
          lastName: 'User',
          isVerified: true,
          acceptTerms: true,
        }
      });
      console.log('✅ User account created: user@authichain.com / User123!');
    } else {
      console.log('ℹ️  User account already exists');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createDemoAccounts();


import dotenv from 'dotenv';
import { prisma } from '../lib/prisma';

// Load environment variables
dotenv.config();

async function makeUserAdmin(email: string) {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
    });
    
    console.log(`Successfully made ${email} an admin:`, {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    });
  } catch (error) {
    console.error('Error making user admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Make the demo user an admin
makeUserAdmin('john@doe.com');

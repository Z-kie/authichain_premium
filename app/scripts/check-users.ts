import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      where: {
        email: {
          in: ['admin@authichain.com', 'user@authichain.com', 'john@doe.com']
        }
      },
      select: {
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        role: true
      }
    });
    
    console.log('Found users:', JSON.stringify(users, null, 2));
    
    // Check if passwords look like bcrypt hashes
    users.forEach(user => {
      console.log(`\nUser: ${user.email}`);
      console.log(`Password starts with: ${user.password.substring(0, 10)}`);
      console.log(`Password length: ${user.password.length}`);
      console.log(`Looks like bcrypt: ${user.password.startsWith('$2')}`);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();

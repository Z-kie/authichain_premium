
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import { verifyWalletSignature, validateAuthMessage } from './wallet-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    // Email/Password Authentication
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('❌ Missing credentials');
            return null;
          }

          console.log('🔍 Attempting to authenticate:', credentials.email);

          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (!user) {
            console.log('❌ User not found:', credentials.email);
            return null;
          }

          console.log('✓ User found:', user.email);

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            console.log('❌ Invalid password for:', credentials.email);
            return null;
          }

          console.log('✅ Authentication successful:', user.email);

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username || undefined,
            walletAddress: user.walletAddress || undefined,
            subscriptionTier: user.subscriptionTier,
            customUsername: user.customUsername || undefined,
            isVerified: user.isVerified,
            role: user.role,
          } as any;
        } catch (error) {
          console.error('❌ Authorization error:', error);
          return null;
        }
      }
    }),
    // Wallet Authentication
    CredentialsProvider({
      id: 'wallet',
      name: 'Ethereum Wallet',
      credentials: {
        walletAddress: { label: 'Wallet Address', type: 'text' },
        signature: { label: 'Signature', type: 'text' },
        message: { label: 'Message', type: 'text' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.walletAddress || !credentials?.signature || !credentials?.message) {
            console.log('❌ Missing wallet credentials');
            return null;
          }

          console.log('🔐 Attempting wallet authentication:', credentials.walletAddress);

          // Validate message format and timestamp
          if (!validateAuthMessage(credentials.message, credentials.walletAddress)) {
            console.log('❌ Invalid or expired message');
            return null;
          }

          // Verify signature
          const isValidSignature = await verifyWalletSignature(
            credentials.message,
            credentials.signature,
            credentials.walletAddress
          );

          if (!isValidSignature) {
            console.log('❌ Invalid signature');
            return null;
          }

          console.log('✅ Signature verified');

          // Find user by wallet address
          const user = await prisma.user.findFirst({
            where: {
              walletAddress: credentials.walletAddress.toLowerCase()
            }
          });

          if (!user) {
            console.log('❌ User not found for wallet:', credentials.walletAddress);
            return null;
          }

          console.log('✅ Wallet authentication successful:', user.email);

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username || undefined,
            walletAddress: user.walletAddress || undefined,
            subscriptionTier: user.subscriptionTier,
            customUsername: user.customUsername || undefined,
            isVerified: user.isVerified,
            role: user.role,
          } as any;
        } catch (error) {
          console.error('❌ Wallet authorization error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.subscriptionTier = (user as any).subscriptionTier;
        token.username = (user as any).username;
        token.walletAddress = (user as any).walletAddress;
        token.customUsername = (user as any).customUsername;
        token.isVerified = (user as any).isVerified;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).id = token.sub;
        (session.user as any).subscriptionTier = token.subscriptionTier;
        (session.user as any).username = token.username;
        (session.user as any).walletAddress = token.walletAddress;
        (session.user as any).customUsername = token.customUsername;
        (session.user as any).isVerified = token.isVerified;
        (session.user as any).firstName = token.firstName;
        (session.user as any).lastName = token.lastName;
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
};

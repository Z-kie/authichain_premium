
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      username?: string;
      image?: string;
      subscriptionTier: string;
      customUsername?: string;
      isVerified: boolean;
      walletAddress?: string;
    }
  }

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    username?: string;
    image?: string;
    subscriptionTier: string;
    customUsername?: string;
    isVerified: boolean;
    walletAddress?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    subscriptionTier?: string;
    customUsername?: string;
    isVerified?: boolean;
    username?: string;
    firstName?: string;
    lastName?: string;
    walletAddress?: string;
  }
}

import { PrismaClient } from '@prisma/client';

// Declare global type for Prisma client singleton
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create Prisma Client with optimal settings for Vercel serverless
// Key principle: Each serverless function should have minimal connections
const createPrismaClient = () => {
  // For serverless (Vercel), we need VERY conservative connection settings
  // Default DATABASE_URL should include pgbouncer=true for Supabase
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  
  // Build optimized connection URL for serverless
  // Key changes for serverless:
  // 1. connection_limit=1 - Each function gets exactly 1 connection
  // 2. pool_timeout=0 - Don't wait, fail fast if no connection available
  // 3. connect_timeout=10 - Quick timeout for initial connection
  const hasParams = databaseUrl.includes('?');
  const separator = hasParams ? '&' : '?';
  
  // Check if parameters are already set
  const hasConnectionLimit = databaseUrl.includes('connection_limit=');
  const hasPoolTimeout = databaseUrl.includes('pool_timeout=');
  const hasConnectTimeout = databaseUrl.includes('connect_timeout=');
  const hasPgBouncer = databaseUrl.includes('pgbouncer=');
  
  // Build parameter string
  let params = [];
  if (!hasPgBouncer) params.push('pgbouncer=true');
  if (!hasConnectionLimit) params.push('connection_limit=1');
  if (!hasPoolTimeout) params.push('pool_timeout=0');
  if (!hasConnectTimeout) params.push('connect_timeout=10');
  
  const finalUrl = params.length > 0 
    ? `${databaseUrl}${separator}${params.join('&')}`
    : databaseUrl;
  
  console.log('[Prisma] Initializing client with serverless-optimized settings');
  
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: finalUrl,
      },
    },
  });
};

// Singleton pattern for Prisma Client
// Critical: Only ONE instance across the entire application
// In serverless, this prevents connection pool exhaustion
export const prisma = globalThis.prisma ?? createPrismaClient();

// Store in global to prevent multiple instances in development hot-reload
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Graceful shutdown helper for serverless
// Ensures connections are properly closed when function ends
export async function disconnectPrisma() {
  if (prisma) {
    await prisma.$disconnect();
  }
}

// Also export as 'db' for backward compatibility
export const db = prisma;

// Updated: Wed Oct 30 2025 - Fixed for Vercel serverless environment
// Key fix: connection_limit=1, pool_timeout=0 for serverless
// Deployment: 1761795500

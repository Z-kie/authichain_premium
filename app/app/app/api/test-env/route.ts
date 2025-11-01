import { NextResponse } from 'next/server';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || 'NOT_SET';
  const masked = dbUrl.substring(0, 50) + '...' + dbUrl.substring(dbUrl.length - 30);
  
  return NextResponse.json({
    databaseUrl: masked,
    hasNeon: dbUrl.includes('neon.tech'),
    hasRailway: dbUrl.includes('railway') || dbUrl.includes('db-aa342a793'),
  });
}

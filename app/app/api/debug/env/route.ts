export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || 'NOT SET';
  const directUrl = process.env.DIRECT_DATABASE_URL || 'NOT SET';
  
  // Mask passwords
  const maskUrl = (url: string) => {
    if (url === 'NOT SET') return url;
    try {
      const urlObj = new URL(url);
      if (urlObj.password) {
        urlObj.password = '***MASKED***';
      }
      return urlObj.toString();
    } catch {
      return 'INVALID URL';
    }
  };
  
  return NextResponse.json({
    DATABASE_URL: maskUrl(dbUrl),
    DIRECT_DATABASE_URL: maskUrl(directUrl),
    timestamp: new Date().toISOString(),
  });
}

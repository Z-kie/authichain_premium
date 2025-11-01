import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Get database URL (masked)
    const dbUrl = process.env.DATABASE_URL || 'NOT_SET';
    const maskedUrl = dbUrl.replace(/:[^:@]+@/, ':****@').substring(0, 100);
    
    // Try a simple query
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      success: true,
      database: {
        url: maskedUrl,
        connected: true,
        userCount,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      database: {
        url: (process.env.DATABASE_URL || 'NOT_SET').replace(/:[^:@]+@/, ':****@').substring(0, 100),
        connected: false,
      },
    }, { status: 500 });
  }
}

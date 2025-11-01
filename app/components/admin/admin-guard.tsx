
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AdminGuardProps {
  children: React.ReactNode;
  fallbackUrl?: string;
}

export function AdminGuard({ children, fallbackUrl = '/' }: AdminGuardProps) {
  const { data: session, status } = useSession() || {};
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    
    if ((session.user as any).role !== 'ADMIN') {
      router.push(fallbackUrl);
      return;
    }
  }, [session, status, router, fallbackUrl]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!session || (session.user as any).role !== 'ADMIN') {
    return null;
  }

  return <>{children}</>;
}

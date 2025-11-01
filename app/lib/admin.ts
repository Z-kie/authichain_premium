
import { getServerSession } from 'next-auth';
import { authOptions } from './auth-options';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  if ((session.user as any).role !== 'ADMIN') {
    redirect('/');
  }
  
  return session;
}

export function isAdmin(session: any): boolean {
  return session?.user?.role === 'ADMIN';
}

export async function checkAdminAccess(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return isAdmin(session);
}

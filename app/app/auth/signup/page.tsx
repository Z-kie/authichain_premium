export const dynamic = 'force-dynamic';


import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { SignUpForm } from '@/components/auth/signup-form';

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Join AuthiChain
          </h1>
          <p className="text-gray-400 mt-2">Create your account and start showcasing NFTs</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}

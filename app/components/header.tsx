
'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  LogOut, 
  Crown, 
  Sparkles, 
  Wallet,
  Upload,
  Rocket,
  Bot,
  ShoppingCart,
  CreditCard
} from 'lucide-react';
import { SubscriptionTier } from '@/lib/types';

export function Header() {
  const { data: session, status } = useSession() || {};

  const getTierIcon = (tier?: string) => {
    switch (tier) {
      case SubscriptionTier.PRO:
        return <Crown className="h-3 w-3" />;
      case SubscriptionTier.BRAND:
        return <Sparkles className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getTierColor = (tier?: string) => {
    switch (tier) {
      case SubscriptionTier.PRO:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case SubscriptionTier.BRAND:
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AuthiChain
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {/* Consumer Navigation */}
          {(!session || (session.user as any).role !== 'ADMIN') && (
            <>
              <Link 
                href="/product" 
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
              >
                <span>🔍 Products</span>
              </Link>
              <Link 
                href="/marketplace" 
                className="text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>🎨 NFT Market</span>
              </Link>
              {session && (
                <>
                  <Link 
                    href="/upload" 
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload</span>
                  </Link>
                  <Link 
                    href="/dashboard" 
                    className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                  >
                    <User className="h-4 w-4" />
                    <span>My Account</span>
                  </Link>
                </>
              )}
            </>
          )}
          
          {/* Admin Navigation */}
          {session && (session.user as any).role === 'ADMIN' && (
            <>
              <Link 
                href="/admin" 
                className="text-red-400 hover:text-red-300 transition-colors flex items-center space-x-1"
              >
                <User className="h-4 w-4" />
                <span>🛡️ Admin</span>
              </Link>
              <Link 
                href="/product" 
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
              >
                <span>🔍 Products</span>
              </Link>
              <Link 
                href="/marketplace" 
                className="text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>🎨 NFT Market</span>
              </Link>
              <Link 
                href="/pricing" 
                className="text-amber-400 hover:text-amber-300 transition-colors flex items-center space-x-1"
              >
                <Crown className="h-4 w-4" />
                <span>Pricing</span>
              </Link>
              <Link 
                href="/enterprise" 
                className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center space-x-1"
              >
                <Sparkles className="h-4 w-4" />
                <span>💎 Enterprise</span>
              </Link>
              <Link 
                href="/automations" 
                className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-1"
              >
                <Bot className="h-4 w-4" />
                <span>🤖 Automations</span>
              </Link>
              <Link 
                href="/payments" 
                className="text-pink-400 hover:text-pink-300 transition-colors flex items-center space-x-1"
              >
                <CreditCard className="h-4 w-4" />
                <span>💳 Payments</span>
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {status === 'loading' ? (
            <div className="h-8 w-8 bg-gray-700 rounded-full animate-pulse" />
          ) : session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 rounded-full"
                  onClick={() => {
                    // Handle user avatar click - opens dropdown menu
                    console.log('User avatar clicked');
                  }}
                >
                  <Avatar className="h-10 w-10 border border-purple-500/30">
                    <AvatarImage 
                      src={session.user.image || ''} 
                      alt={session.user.firstName || session.user.email || ''} 
                    />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                      {((session.user as any).firstName?.[0] || session.user.email?.[0] || 'U').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src={session.user.image || ''} 
                      alt={session.user.firstName || session.user.email || ''} 
                    />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                      {((session.user as any).firstName?.[0] || session.user.email?.[0] || 'U').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {(session.user as any).firstName} {(session.user as any).lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {session.user.email}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={`text-xs ${getTierColor((session.user as any).subscriptionTier)}`}>
                        <div className="flex items-center space-x-1">
                          {getTierIcon((session.user as any).subscriptionTier)}
                          <span>{((session.user as any).subscriptionTier || 'BASIC').toLowerCase()}</span>
                        </div>
                      </Badge>
                      {(session.user as any).isVerified && (
                        <Badge variant="outline" className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                {(session.user as any).walletAddress && (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <Wallet className="mr-2 h-4 w-4" />
                      Wallet
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-red-400 focus:text-red-400"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="border-purple-500/50 hidden sm:flex" asChild>
                <Link href="/auth/wallet">
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

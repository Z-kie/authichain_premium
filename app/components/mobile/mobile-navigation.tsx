

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home,
  ShoppingCart,
  Camera,
  BarChart3,
  User,
  Search,
  Bell,
  Heart,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface NavItem {
  icon: any;
  label: string;
  href: string;
  badge?: number;
}

export function MobileNavigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Bottom navigation items
  const bottomNavItems: NavItem[] = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: ShoppingCart, label: 'Market', href: '/marketplace' },
    { icon: Camera, label: 'Scan', href: '/product' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard' },
    { icon: User, label: 'Profile', href: '/dashboard' }
  ];

  // Top menu items
  const topMenuItems: NavItem[] = [
    { icon: Search, label: 'Product Hub', href: '/product' },
    { icon: Bell, label: 'Notifications', href: '/dashboard', badge: notifications },
    { icon: Heart, label: 'Enterprise', href: '/enterprise' },
    { icon: Camera, label: 'QR Scanner', href: '/product' }
  ];

  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <>
      {/* Top Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🔐</div>
            <div>
              <div className="text-lg font-bold text-white">AuthiChain</div>
              <div className="text-xs text-purple-400">NFT Authentication</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2"
              onClick={() => {
                // Handle notifications - could redirect to dashboard or show notification panel
                window.location.href = '/dashboard';
              }}
            >
              <Bell className="w-5 h-5 text-purple-400" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">
                  {notifications}
                </Badge>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-purple-400" />
              ) : (
                <Menu className="w-5 h-5 text-purple-400" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-16 right-0 bottom-20 w-80 bg-slate-900/95 backdrop-blur-sm border-l border-purple-500/30 z-40"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">🔐 Quick Actions</h2>
              
              <div className="space-y-4">
                {topMenuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 hover:bg-purple-900/20 transition-colors"
                      >
                        <div className="p-2 bg-purple-900/30 rounded-lg">
                          <IconComponent className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">{item.label}</div>
                        </div>
                        {item.badge && (
                          <Badge className="bg-red-500">{item.badge}</Badge>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-500/30">
                <h3 className="text-purple-400 font-medium mb-2">📱 Mobile Features</h3>
                <p className="text-gray-300 text-sm">
                  Authenticate NFTs, trade on-the-go, and access real-time market analytics!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-t border-purple-500/30">
        <div className="flex items-center justify-around py-2">
          {bottomNavItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-purple-400 bg-purple-900/20' 
                    : 'text-gray-400 hover:text-purple-300'
                }`}
              >
                <div className="relative">
                  <IconComponent className={`w-6 h-6 ${isActive ? 'text-purple-400' : ''}`} />
                  {item.badge && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-red-500">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className={`text-xs mt-1 ${isActive ? 'text-purple-400' : ''}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* PWA Install Prompt */}
      <div className="fixed bottom-24 right-4 z-40">
        <Button
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full p-3 shadow-lg"
          onClick={() => {
            // PWA install prompt would be handled here
            alert('📱 Install AuthiChain mobile app! Tap "Add to Home Screen" in your browser menu for the best NFT authentication experience.');
          }}
        >
          <div className="text-center">
            <div className="text-lg">📱</div>
            <div className="text-xs">Install</div>
          </div>
        </Button>
      </div>
    </>
  );
}

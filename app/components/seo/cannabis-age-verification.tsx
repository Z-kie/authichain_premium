
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function ProductAgeVerification() {
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    const verified = localStorage.getItem('authichain_age_verified');
    if (verified === 'true') {
      setIsVerified(true);
    } else {
      // Show verification modal after short delay
      setTimeout(() => setShowModal(true), 1000);
    }
  }, []);

  const handleVerify = (isOfAge: boolean) => {
    if (isOfAge) {
      setIsVerified(true);
      localStorage.setItem('authichain_age_verified', 'true');
      
      // Track verification for analytics
      if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', 'product_age_verification', {
          verification_result: 'verified',
          age_requirement: 21,
          region: 'US'
        });
      }
    } else {
      // Redirect to age-restricted page or external site
      window.location.href = 'https://product.gov';
    }
    setShowModal(false);
  };

  if (isVerified || !showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl p-8 max-w-md w-full text-center border border-green-500/20">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">🌿</span>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">
          Age Verification Required
        </h2>
        
        <p className="text-gray-300 mb-6 leading-relaxed">
          AuthiChain is a product-related platform. You must be 21 years or older 
          to access product NFT content in accordance with local laws.
        </p>
        
        <div className="space-y-3">
          <Button 
            onClick={() => handleVerify(true)}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            I am 21 or older - Enter Site
          </Button>
          
          <Button 
            onClick={() => handleVerify(false)}
            variant="outline"
            className="w-full border-red-500 text-red-400 hover:bg-red-500/10"
          >
            I am under 21 - Exit
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 mt-6">
          By entering, you certify that you are of legal age and that you agree to our Terms of Service.
          Product laws vary by location. Please consume responsibly.
        </p>
      </div>
    </div>
  );
}

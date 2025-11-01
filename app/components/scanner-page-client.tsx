
'use client';

import { useState } from 'react';
import { QRScanner } from '@/components/product/qr-scanner';

export function ScannerPageClient() {
  const [isOpen, setIsOpen] = useState(true);
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  const handleScanComplete = (result: string) => {
    console.log('Scan result:', result);
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <QRScanner 
        isOpen={isOpen}
        onClose={handleClose}
        onScanComplete={handleScanComplete}
      />
    </div>
  );
}

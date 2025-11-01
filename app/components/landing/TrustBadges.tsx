
'use client';

import { Shield, Lock, Award, CheckCircle } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    { icon: Shield, label: 'SOC 2 Certified' },
    { icon: Lock, label: 'GDPR Compliant' },
    { icon: Award, label: 'ISO 27001' },
    { icon: CheckCircle, label: '99.9% Uptime' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-30"
        >
          <badge.icon className="w-5 h-5 text-yellow-300" />
          <span className="text-sm font-medium text-white">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}

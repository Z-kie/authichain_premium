
'use client';

import { Badge } from '@/components/ui/badge';
import { Crown, Medal, Trophy } from 'lucide-react';

interface Customer {
  revenue: number;
  tier: string;
  userId: string;
}

interface TopCustomersProps {
  customers: Customer[];
}

export default function TopCustomers({ customers }: TopCustomersProps) {
  if (!customers || customers.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        No customer data available
      </div>
    );
  }

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      ultimate: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      enterprise: 'bg-gradient-to-r from-purple-600 to-blue-600',
      business: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      professional: 'bg-gradient-to-r from-green-500 to-emerald-500',
      starter: 'bg-gradient-to-r from-gray-400 to-gray-500',
      free: 'bg-gray-300',
    };
    return colors[tier.toLowerCase()] || 'bg-gray-300';
  };

  const getIcon = (index: number) => {
    if (index === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (index === 2) return <Trophy className="w-5 h-5 text-orange-600" />;
    return null;
  };

  return (
    <div className="space-y-4">
      {customers.slice(0, 10).map((customer, index) => (
        <div 
          key={customer.userId} 
          className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600 font-bold">
              {index < 3 ? getIcon(index) : index + 1}
            </div>
            <div>
              <p className="font-medium text-gray-900">Customer #{customer.userId.slice(0, 8)}</p>
              <Badge className={`${getTierColor(customer.tier)} text-white border-0`}>
                {customer.tier}
              </Badge>
            </div>
          </div>
          <p className="text-xl font-bold text-purple-600">
            ${customer.revenue.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

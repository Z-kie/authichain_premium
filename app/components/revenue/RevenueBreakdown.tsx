
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface RevenueBreakdownProps {
  data: {
    subscriptions?: { amount: number; percentage: number };
    minting?: { amount: number; percentage: number };
    marketplace?: { amount: number; percentage: number };
    api?: { amount: number; percentage: number };
  };
}

export default function RevenueBreakdown({ data }: RevenueBreakdownProps) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        No breakdown data available
      </div>
    );
  }

  const chartData = [
    { name: 'Subscriptions', value: data.subscriptions?.amount || 0, color: '#8b5cf6' },
    { name: 'Minting Fees', value: data.minting?.amount || 0, color: '#3b82f6' },
    { name: 'Marketplace', value: data.marketplace?.amount || 0, color: '#10b981' },
    { name: 'API Access', value: data.api?.amount || 0, color: '#f59e0b' },
  ].filter(item => item.value > 0);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        No revenue data to display
      </div>
    );
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 space-y-3">
        {Object.entries(data).map(([key, value]: [string, any]) => (
          value?.amount > 0 && (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">${value.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-500">{value.percentage.toFixed(1)}%</p>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

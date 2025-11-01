
'use client';

import { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  Calendar,
  Eye,
  BarChart3,
  Settings,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface AdminDashboardProps {
  data: {
    totalUsers: number;
    totalRevenue: number;
    activeSubscriptions: number;
    totalNfts: number;
    recentUsers: any[];
    recentSales: any[];
    subscriptionStats: any[];
    usageStats: any[];
  };
  user: any;
}

export function AdminDashboard({ data, user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const statCards = [
    {
      title: 'Total Users',
      value: data.totalUsers.toLocaleString(),
      icon: Users,
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Subscriptions',
      value: data.activeSubscriptions.toLocaleString(),
      icon: DollarSign,
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Total NFTs',
      value: data.totalNfts.toLocaleString(),
      icon: ShoppingCart,
      change: '+23%',
      changeType: 'positive'
    },
    {
      title: 'Monthly Revenue',
      value: `$${(data.totalRevenue || 0).toLocaleString()}`,
      icon: TrendingUp,
      change: '+15%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                <Shield className="h-8 w-8 text-red-500" />
                Admin Dashboard
              </h1>
              <p className="text-slate-400 mt-1">
                Welcome back, {user.firstName}! Here's your business overview.
              </p>
            </div>
            <Badge variant="outline" className="border-red-500 text-red-400">
              ADMINISTRATOR ACCESS
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="h-8 w-8 text-emerald-400" />
                  <Badge variant="outline" className="border-emerald-500 text-emerald-400 text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-slate-400 text-sm">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Analytics Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-emerald-600"
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="data-[state=active]:bg-emerald-600"
              onClick={() => setActiveTab("users")}
            >
              Users
            </TabsTrigger>
            <TabsTrigger 
              value="revenue" 
              className="data-[state=active]:bg-emerald-600"
              onClick={() => setActiveTab("revenue")}
            >
              Revenue
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-emerald-600"
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700">
                        <TableHead className="text-slate-300">Name</TableHead>
                        <TableHead className="text-slate-300">Email</TableHead>
                        <TableHead className="text-slate-300">Role</TableHead>
                        <TableHead className="text-slate-300">Tier</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.recentUsers.map((user) => (
                        <TableRow key={user.id} className="border-slate-700">
                          <TableCell className="text-white">
                            {user.firstName} {user.lastName}
                          </TableCell>
                          <TableCell className="text-slate-300">{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'ADMIN' ? 'destructive' : 'secondary'}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-300">{user.subscriptionTier}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent NFT Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700">
                        <TableHead className="text-slate-300">Title</TableHead>
                        <TableHead className="text-slate-300">Owner</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.recentSales.map((sale) => (
                        <TableRow key={sale.id} className="border-slate-700">
                          <TableCell className="text-white">{sale.title}</TableCell>
                          <TableCell className="text-slate-300">
                            {sale.user.firstName} {sale.user.lastName}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-emerald-500 text-emerald-400">
                              {sale.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {new Date(sale.createdAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Comprehensive user management and analytics coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Subscription Distribution</h4>
                    {data.subscriptionStats.map((stat) => (
                      <div key={stat.tier} className="flex justify-between items-center py-2">
                        <span className="text-slate-300">{stat.tier}</span>
                        <Badge variant="outline">{stat._count}</Badge>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Usage Statistics</h4>
                    {data.usageStats.map((stat) => (
                      <div key={stat.type} className="flex justify-between items-center py-2">
                        <span className="text-slate-300">{stat.type.replace('_', ' ')}</span>
                        <Badge variant="outline">{stat._count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Advanced Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Advanced business analytics and insights coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

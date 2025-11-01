
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield,
  Leaf,
  Award,
  TrendingUp,
  Users,
  Package,
  BarChart3,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  Download,
  Upload,
  Beaker,
  Truck,
  Store,
  Star,
  DollarSign,
  Calendar,
  FileText,
  Settings
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { toast } from 'sonner';

interface ProfessionalGrowerHubProps {
  user?: any;
}

export function ProfessionalGrowerHub({ user }: ProfessionalGrowerHubProps) {
  const { data: session } = useSession() || {};
  const [growerProfile, setGrowerProfile] = useState<any>(null);
  const [packages, setPackages] = useState<any[]>([]);
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchGrowerData();
    }
  }, [session]);

  const fetchGrowerData = async () => {
    try {
      const [profileRes, packagesRes] = await Promise.all([
        fetch('/api/product/grower-profile'),
        fetch('/api/product/grower-packages')
      ]);

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setGrowerProfile(profileData.profile || mockGrowerProfile);
        setVerificationStatus(profileData.profile?.status || 'pending');
      } else {
        setGrowerProfile(mockGrowerProfile);
      }

      if (packagesRes.ok) {
        const packagesData = await packagesRes.json();
        setPackages(packagesData.packages || mockPackages);
      } else {
        setPackages(mockPackages);
      }
    } catch (error) {
      console.error('Failed to fetch grower data:', error);
      setGrowerProfile(mockGrowerProfile);
      setPackages(mockPackages);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationRequest = async () => {
    try {
      const response = await fetch('/api/product/request-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session?.user?.id })
      });

      if (response.ok) {
        toast.success('Verification request submitted!');
        setVerificationStatus('pending');
      } else {
        throw new Error('Failed to submit verification');
      }
    } catch (error) {
      toast.error('Failed to request verification');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Shield className="w-12 h-12 mx-auto animate-pulse text-blue-500" />
          <p>Loading Professional Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Professional Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Professional Grower Hub</h1>
                <Badge variant={verificationStatus === 'verified' ? 'default' : 'secondary'} 
                       className={verificationStatus === 'verified' ? 'bg-white text-green-600' : 'bg-white/20 text-white'}>
                  {verificationStatus === 'verified' ? 'Verified' : 'Unverified'}
                </Badge>
              </div>
              <p className="text-xl opacity-90">
                Manage your product cultivation & distribution
              </p>
            </div>
            {verificationStatus !== 'verified' && (
              <Button 
                size="lg" 
                variant="secondary"
                onClick={handleVerificationRequest}
                className="bg-white text-green-600 hover:bg-white/90"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Get Verified
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Professional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Packages</p>
                <p className="text-2xl font-bold">{packages.length}</p>
              </div>
              <Package className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold">${growerProfile?.monthlyRevenue || '0'}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Grower Rating</p>
                <p className="text-2xl font-bold">{growerProfile?.rating || '0.0'}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Strains</p>
                <p className="text-2xl font-bold">{growerProfile?.activeStrains || '0'}</p>
              </div>
              <Leaf className="w-8 h-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification Alert */}
      {verificationStatus !== 'verified' && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Complete your professional verification to unlock premium features including 
            enhanced analytics, priority support, and verified grower status.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="cultivation">Cultivation</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.bgColor}`}>
                        <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{activity.status}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cultivation Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Cultivation Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCalendarEvents.map((event, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${event.color}`} />
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.item}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{event.date}</p>
                        <Badge variant="outline" className="text-xs">{event.stage}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold">Production Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Harvest Yield</span>
                      <span className="font-medium">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                    <div className="flex justify-between">
                      <span className="text-sm">Quality Score</span>
                      <span className="font-medium">91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Compliance Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Lab Testing</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <div className="flex justify-between">
                      <span className="text-sm">Documentation</span>
                      <span className="font-medium">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Market Performance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Sales Rate</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                    <div className="flex justify-between">
                      <span className="text-sm">Customer Rating</span>
                      <span className="font-medium">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages" className="space-y-6">
          {/* Package Management */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Package Management</h2>
              <p className="text-muted-foreground">Track and manage your product packages</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Package
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Package</DialogTitle>
                  <DialogDescription>Register a new product package in the system</DialogDescription>
                </DialogHeader>
                <CreatePackageForm />
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Package ID</th>
                      <th className="text-left p-4">Strain</th>
                      <th className="text-left p-4">Harvest Date</th>
                      <th className="text-left p-4">Weight</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Scans</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map((pkg) => (
                      <tr key={pkg.id} className="border-b hover:bg-muted/50">
                        <td className="p-4 font-mono text-sm">{pkg.packageId}</td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{pkg.item}</p>
                            <Badge variant="outline" className="mt-1">
                              {pkg.itemType}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-4">{pkg.harvestDate}</td>
                        <td className="p-4">{pkg.weight}g</td>
                        <td className="p-4">
                          <Badge variant={pkg.status === 'ACTIVE' ? 'default' : 'secondary'}>
                            {pkg.status}
                          </Badge>
                        </td>
                        <td className="p-4 font-medium">{pkg.scannedCount}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cultivation" className="space-y-6">
          {/* Cultivation Management */}
          <Card>
            <CardHeader>
              <CardTitle>Cultivation Tracking</CardTitle>
              <CardDescription>Monitor your growing operations and harvest schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Leaf className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cultivation Module</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced cultivation tracking coming soon
                </p>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Start Growing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          {/* Compliance Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  License Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Grower License</span>
                    <Badge variant="default" className="bg-green-500">Valid</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Expiry Date</span>
                    <span className="font-medium">Dec 31, 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>License Number</span>
                    <span className="font-mono text-sm">{growerProfile?.licenseNumber}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Beaker className="w-5 h-5" />
                  Lab Testing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Tests Completed</span>
                    <span className="font-medium">47/50</span>
                  </div>
                  <Progress value={94} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span>Pass Rate</span>
                    <span className="font-medium text-green-600">100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Professional Analytics</CardTitle>
              <CardDescription>Advanced insights for verified growers</CardDescription>
            </CardHeader>
            <CardContent>
              {verificationStatus === 'verified' ? (
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Professional Analytics</h3>
                  <p className="text-muted-foreground">
                    Advanced analytics dashboard for verified growers
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Verification Required</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete verification to access professional analytics
                  </p>
                  <Button onClick={handleVerificationRequest}>
                    Get Verified
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Professional Settings</CardTitle>
              <CardDescription>Manage your professional grower profile and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Name</label>
                    <Input value={growerProfile?.businessName || ''} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">License Number</label>
                    <Input value={growerProfile?.licenseNumber || ''} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Tell us about your growing operation..." />
                </div>
                <Button>
                  <Settings className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CreatePackageForm() {
  const [formData, setFormData] = useState({
    item: '',
    itemType: 'HYBRID',
    weight: '',
    harvestDate: '',
    batchNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Package created successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Strain Name</label>
          <Input
            value={formData.item}
            onChange={(e) => setFormData({ ...formData, item: e.target.value })}
            placeholder="e.g., Myles High"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Strain Type</label>
          <Select value={formData.itemType} onValueChange={(value) => setFormData({ ...formData, itemType: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INDICA">Indica</SelectItem>
              <SelectItem value="SATIVA">Sativa</SelectItem>
              <SelectItem value="HYBRID">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Weight (grams)</label>
          <Input
            type="number"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            placeholder="3.5"
            step="0.1"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Harvest Date</label>
          <Input
            type="date"
            value={formData.harvestDate}
            onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">Batch Number</label>
        <Input
          value={formData.batchNumber}
          onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
          placeholder="BATCH-2024-001"
          required
        />
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit">Create Package</Button>
      </div>
    </form>
  );
}

// Mock data
const mockGrowerProfile = {
  businessName: 'Premium Product Co.',
  licenseNumber: 'CGR-2024-001',
  monthlyRevenue: '28,500',
  rating: 4.8,
  activeStrains: 12,
  status: 'pending'
};

const mockPackages = [
  {
    id: '1',
    packageId: 'PKG-2024-001',
    item: 'Myles High',
    itemType: 'HYBRID',
    harvestDate: '2024-08-15',
    weight: 3.5,
    status: 'ACTIVE',
    scannedCount: 23
  },
  {
    id: '2',
    packageId: 'PKG-2024-002',
    item: 'Blue Sapphire',
    itemType: 'INDICA',
    harvestDate: '2024-09-01',
    weight: 7.0,
    status: 'ACTIVE',
    scannedCount: 15
  }
];

const mockRecentActivity = [
  {
    title: 'New Package Scan',
    description: 'Myles High #001 scanned by collector',
    status: 'Success',
    time: '2 hours ago',
    icon: Eye,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    title: 'Lab Test Completed',
    description: 'Batch BATCH-2024-001 test results available',
    status: 'Complete',
    time: '5 hours ago',
    icon: Beaker,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Package Shipped',
    description: 'PKG-2024-002 shipped to distributor',
    status: 'In Transit',
    time: '1 day ago',
    icon: Truck,
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  }
];

const mockCalendarEvents = [
  {
    title: 'Harvest Ready',
    item: 'Ruby Collection',
    date: 'Sep 25',
    stage: 'HARVEST',
    color: 'bg-green-500'
  },
  {
    title: 'Flowering Stage',
    item: 'Vintage Watch',
    date: 'Oct 2',
    stage: 'FLOWERING',
    color: 'bg-purple-500'
  },
  {
    title: 'Lab Testing',
    item: 'Crystal Art',
    date: 'Oct 8',
    stage: 'PROCESSING',
    color: 'bg-blue-500'
  }
];

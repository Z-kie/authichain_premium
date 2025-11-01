

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2,
  CreditCard,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Mail,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

interface EnterpriseInvoice {
  id: string;
  invoice_number: string;
  client_name: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  due_date: string;
  created_date: string;
  items: {
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
  }[];
  payment_terms: string;
}

interface BillingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billing_cycle: 'monthly' | 'quarterly' | 'annually';
  features: string[];
  nft_allowance: number;
  api_calls: number;
  support_level: string;
}

export function EnterpriseBilling() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPlan, setSelectedPlan] = useState<BillingPlan | null>(null);

  const enterpriseInvoices: EnterpriseInvoice[] = [
    {
      id: '1',
      invoice_number: 'INV-2024-001',
      client_name: 'Green Valley Dispensary',
      amount: 15000,
      currency: 'USD',
      status: 'paid',
      due_date: '2024-09-30',
      created_date: '2024-09-01',
      items: [
        { description: 'Product NFT Marketplace License', quantity: 1, unit_price: 10000, total: 10000 },
        { description: 'Advanced Analytics Suite', quantity: 1, unit_price: 3000, total: 3000 },
        { description: 'API Access (Premium)', quantity: 1, unit_price: 2000, total: 2000 }
      ],
      payment_terms: 'Net 30'
    },
    {
      id: '2',
      invoice_number: 'INV-2024-002',
      client_name: 'Product Corp International',
      amount: 25000,
      currency: 'USD',
      status: 'pending',
      due_date: '2024-10-15',
      created_date: '2024-09-15',
      items: [
        { description: 'Enterprise White-Label Solution', quantity: 1, unit_price: 20000, total: 20000 },
        { description: 'Custom Integration Development', quantity: 1, unit_price: 5000, total: 5000 }
      ],
      payment_terms: 'Net 30'
    },
    {
      id: '3',
      invoice_number: 'INV-2024-003',
      client_name: 'MedCann Solutions',
      amount: 8000,
      currency: 'USD',
      status: 'overdue',
      due_date: '2024-09-01',
      created_date: '2024-08-01',
      items: [
        { description: 'Monthly Platform Access', quantity: 1, unit_price: 5000, total: 5000 },
        { description: 'Compliance Monitoring', quantity: 1, unit_price: 3000, total: 3000 }
      ],
      payment_terms: 'Net 30'
    }
  ];

  const enterprisePlans: BillingPlan[] = [
    {
      id: 'enterprise_starter',
      name: 'Enterprise Starter',
      description: 'Perfect for growing product businesses',
      price: 5000,
      billing_cycle: 'monthly',
      features: [
        'White-label marketplace',
        'Custom branding',
        'Basic analytics',
        'Email support',
        'API access'
      ],
      nft_allowance: 1000,
      api_calls: 100000,
      support_level: 'Email'
    },
    {
      id: 'enterprise_professional',
      name: 'Enterprise Professional',
      description: 'Advanced features for established product companies',
      price: 15000,
      billing_cycle: 'monthly',
      features: [
        'Full white-label solution',
        'Advanced analytics & AI',
        'Custom integrations',
        'Priority support',
        'Compliance tools',
        'Multi-region support'
      ],
      nft_allowance: 5000,
      api_calls: 500000,
      support_level: 'Phone & Email'
    },
    {
      id: 'enterprise_enterprise',
      name: 'Enterprise Scale',
      description: 'Complete solution for product industry leaders',
      price: 50000,
      billing_cycle: 'monthly',
      features: [
        'Fully customized platform',
        'Dedicated infrastructure',
        'AI-powered insights',
        'Dedicated account manager',
        'Custom development',
        'SLA guarantees',
        'Global compliance'
      ],
      nft_allowance: 50000,
      api_calls: 2000000,
      support_level: 'Dedicated Manager'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-400 border-green-500/30';
      case 'pending': return 'text-yellow-400 border-yellow-500/30';
      case 'overdue': return 'text-red-400 border-red-500/30';
      case 'cancelled': return 'text-gray-400 border-gray-500/30';
      default: return 'text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const handleInvoicePayment = (invoiceId: string) => {
    alert(`Processing payment for invoice ${invoiceId}. Enterprise payment portal will redirect to secure payment processing.`);
  };

  const handlePlanUpgrade = (plan: BillingPlan) => {
    setSelectedPlan(plan);
    alert(`Initiating upgrade to ${plan.name} plan. Enterprise sales team will contact you within 1 business hour.`);
  };

  const totalRevenue = enterpriseInvoices.reduce((sum, inv) => sum + (inv.status === 'paid' ? inv.amount : 0), 0);
  const pendingRevenue = enterpriseInvoices.reduce((sum, inv) => sum + (inv.status === 'pending' ? inv.amount : 0), 0);
  const overdueRevenue = enterpriseInvoices.reduce((sum, inv) => sum + (inv.status === 'overdue' ? inv.amount : 0), 0);

  return (
    <div className="space-y-6">
      {/* Enterprise Billing Header */}
      <Card className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-green-900/20 border border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-400" />
            🏢 Enterprise Billing & Payments
          </CardTitle>
          <div className="text-gray-300">
            Comprehensive billing solutions for product enterprise clients
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {formatCurrency(totalRevenue, 'USD')}
              </div>
              <div className="text-gray-300 text-sm">Total Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {formatCurrency(pendingRevenue, 'USD')}
              </div>
              <div className="text-gray-300 text-sm">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">
                {formatCurrency(overdueRevenue, 'USD')}
              </div>
              <div className="text-gray-300 text-sm">Overdue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">
                {enterpriseInvoices.length}
              </div>
              <div className="text-gray-300 text-sm">Total Invoices</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enterprise Billing Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" onClick={() => {/* Dashboard tab */}}>📊 Dashboard</TabsTrigger>
          <TabsTrigger value="invoices" onClick={() => {/* Invoices tab */}}>🧾 Invoices</TabsTrigger>
          <TabsTrigger value="plans" onClick={() => {/* Plans tab */}}>💼 Enterprise Plans</TabsTrigger>
          <TabsTrigger value="settings" onClick={() => {/* Settings tab */}}>⚙️ Billing Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Revenue Analytics */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Revenue Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-900/20 rounded-lg">
                    <span className="text-white">This Month</span>
                    <span className="text-green-400 font-bold">{formatCurrency(40000, 'USD')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-900/20 rounded-lg">
                    <span className="text-white">Last Month</span>
                    <span className="text-blue-400 font-bold">{formatCurrency(35000, 'USD')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-900/20 rounded-lg">
                    <span className="text-white">Growth Rate</span>
                    <span className="text-purple-400 font-bold">+14.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  Enterprise Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-900/20 rounded-lg">
                    <span className="text-white">Active Clients</span>
                    <span className="text-blue-400 font-bold">23</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-900/20 rounded-lg">
                    <span className="text-white">New This Month</span>
                    <span className="text-green-400 font-bold">4</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-yellow-900/20 rounded-lg">
                    <span className="text-white">Avg Contract Value</span>
                    <span className="text-yellow-400 font-bold">{formatCurrency(18500, 'USD')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-black/20 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Enterprise Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-900/10 rounded-lg border border-green-500/20">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div className="flex-1">
                    <div className="text-white font-medium">Payment Received</div>
                    <div className="text-gray-400 text-sm">Green Valley Dispensary - {formatCurrency(15000, 'USD')}</div>
                  </div>
                  <div className="text-gray-400 text-sm">2 hours ago</div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-blue-900/10 rounded-lg border border-blue-500/20">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <div className="flex-1">
                    <div className="text-white font-medium">Invoice Generated</div>
                    <div className="text-gray-400 text-sm">Product Corp International - {formatCurrency(25000, 'USD')}</div>
                  </div>
                  <div className="text-gray-400 text-sm">1 day ago</div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-yellow-900/10 rounded-lg border border-yellow-500/20">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  <div className="flex-1">
                    <div className="text-white font-medium">Payment Overdue</div>
                    <div className="text-gray-400 text-sm">MedCann Solutions - {formatCurrency(8000, 'USD')}</div>
                  </div>
                  <div className="text-gray-400 text-sm">7 days ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          {/* Invoices List */}
          <Card className="bg-black/20 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  Enterprise Invoices
                </div>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  onClick={() => alert('Creating new enterprise invoice with custom terms and product-specific billing options.')}
                >
                  Create Invoice
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enterpriseInvoices.map((invoice, index) => (
                  <motion.div
                    key={invoice.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-slate-800/30 rounded-lg border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-white font-bold text-lg">{invoice.invoice_number}</div>
                          <div className="text-gray-400 text-sm">{invoice.client_name}</div>
                        </div>
                        <Badge variant="outline" className={`${getStatusColor(invoice.status)}`}>
                          {getStatusIcon(invoice.status)}
                          <span className="ml-1 capitalize">{invoice.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          {formatCurrency(invoice.amount, invoice.currency)}
                        </div>
                        <div className="text-gray-400 text-sm">Due: {invoice.due_date}</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">Invoice Items:</h4>
                      <div className="space-y-2">
                        {invoice.items.map((item, i) => (
                          <div key={i} className="flex justify-between items-center text-sm">
                            <span className="text-gray-300">{item.description} × {item.quantity}</span>
                            <span className="text-white">{formatCurrency(item.total, invoice.currency)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      {invoice.status === 'pending' && (
                        <Button
                          onClick={() => handleInvoicePayment(invoice.id)}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay Now
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        className="border-gray-600 hover:bg-gray-800"
                        onClick={() => alert(`Downloading invoice ${invoice.invoice_number} as PDF with enterprise product branding.`)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="border-blue-500/30 hover:bg-blue-900/20"
                        onClick={() => alert(`Sending invoice ${invoice.invoice_number} to ${invoice.client_name} via email.`)}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          {/* Enterprise Plans */}
          <div className="grid lg:grid-cols-3 gap-6">
            {enterprisePlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`bg-black/20 border-gray-700 h-full ${
                  plan.id === 'enterprise_professional' ? 'ring-2 ring-purple-500/30' : ''
                }`}>
                  <CardHeader>
                    <div className="text-center">
                      {plan.id === 'enterprise_professional' && (
                        <Badge className="mb-4 bg-purple-500 text-white">Most Popular</Badge>
                      )}
                      <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                      <div className="text-gray-400 text-sm mb-4">{plan.description}</div>
                      <div className="text-4xl font-bold text-white mb-2">
                        {formatCurrency(plan.price, 'USD')}
                      </div>
                      <div className="text-gray-400 text-sm">per {plan.billing_cycle}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Features:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">NFT Allowance:</span>
                        <span className="text-white">{plan.nft_allowance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">API Calls:</span>
                        <span className="text-white">{plan.api_calls.toLocaleString()}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Support:</span>
                        <span className="text-white">{plan.support_level}</span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handlePlanUpgrade(plan)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <Building2 className="w-4 h-4 mr-2" />
                      Upgrade to {plan.name}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Billing Settings */}
          <Card className="bg-black/20 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-400" />
                Enterprise Billing Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company-name" className="text-white">Company Name</Label>
                    <Input
                      id="company-name"
                      placeholder="Your Company Name"
                      className="bg-slate-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="billing-email" className="text-white">Billing Email</Label>
                    <Input
                      id="billing-email"
                      type="email"
                      placeholder="billing@yourcompany.com"
                      className="bg-slate-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tax-id" className="text-white">Tax ID / VAT Number</Label>
                    <Input
                      id="tax-id"
                      placeholder="123456789"
                      className="bg-slate-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="payment-terms" className="text-white">Default Payment Terms</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="net-15">Net 15</SelectItem>
                        <SelectItem value="net-30">Net 30</SelectItem>
                        <SelectItem value="net-60">Net 60</SelectItem>
                        <SelectItem value="due-on-receipt">Due on Receipt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currency" className="text-white">Billing Currency</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="billing-address" className="text-white">Billing Address</Label>
                    <Textarea
                      id="billing-address"
                      placeholder="Enter your billing address"
                      className="bg-slate-800 border-gray-700 text-white"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-700">
                <Button
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 mr-3"
                  onClick={() => alert('Enterprise billing settings saved! Changes will apply to all future invoices and transactions.')}
                >
                  Save Settings
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-800"
                  onClick={() => alert('Enterprise billing settings reset to default values.')}
                >
                  Reset to Default
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Enterprise Billing Summary */}
      <Card className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-green-900/20 border border-blue-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">🏢 Enterprise Billing Excellence</h3>
            
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{formatCurrency(totalRevenue, 'USD')}</div>
                <div className="text-gray-300 text-sm">Revenue Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">23</div>
                <div className="text-gray-300 text-sm">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">98.5%</div>
                <div className="text-gray-300 text-sm">Payment Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">24hr</div>
                <div className="text-gray-300 text-sm">Avg Payment Time</div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <p className="text-blue-300">
                🏢 <strong>Enterprise Billing Active:</strong> Complete product industry billing solutions 
                with custom terms, compliance features, and dedicated account management!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

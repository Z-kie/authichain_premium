

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2,
  Target,
  Users,
  DollarSign,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Zap,
  Crown,
  Star,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface EnterpriseProspect {
  id: string;
  company: string;
  industry: string;
  size: string;
  revenue: string;
  contact: string;
  status: 'cold' | 'warm' | 'hot' | 'qualified' | 'proposal' | 'closed';
  value: number;
}

export function EnterpriseClientTargeting() {
  const [activeTab, setActiveTab] = useState('prospects');
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    industry: '',
    locations: '',
    revenue: '',
    needs: ''
  });

  const enterpriseProspects: EnterpriseProspect[] = [
    {
      id: '1',
      company: 'Green Gold Holdings',
      industry: 'Multi-State Product',
      size: '500-1000 employees',
      revenue: '$100M+',
      contact: 'Sarah Chen, CTO',
      status: 'hot',
      value: 299400 // $2,494 * 12 * 10 locations
    },
    {
      id: '2',
      company: 'California Product Corp',
      industry: 'Dispensary Chain',
      size: '200-500 employees',
      revenue: '$50M+',
      contact: 'Mike Rodriguez, VP Tech',
      status: 'qualified',
      value: 119760 // $999 * 12 * 10 locations
    },
    {
      id: '3',
      company: 'Rocky Mountain Wellness',
      industry: 'Cultivation + Retail',
      size: '100-200 employees',
      revenue: '$25M+',
      contact: 'Jennifer Park, COO',
      status: 'proposal',
      value: 59880 // $499 * 12 * 10 locations
    },
    {
      id: '4',
      company: 'East Coast Product',
      industry: 'Dispensary Chain',
      size: '300-500 employees',
      revenue: '$75M+',
      contact: 'David Thompson, CEO',
      status: 'warm',
      value: 179640 // $1,497 * 12 * 10 locations
    }
  ];

  const targetIndustries = [
    {
      name: 'Multi-State Operators (MSOs)',
      companies: 45,
      avgRevenue: '$500M+',
      priority: 'high',
      value: '$2.5M ARR potential'
    },
    {
      name: 'Dispensary Chains',
      companies: 156,
      avgRevenue: '$50M+',
      priority: 'high',
      value: '$1.8M ARR potential'
    },
    {
      name: 'Product Cultivators',
      companies: 89,
      avgRevenue: '$25M+',
      priority: 'medium',
      value: '$900k ARR potential'
    },
    {
      name: 'Product Tech Companies',
      companies: 67,
      avgRevenue: '$10M+',
      priority: 'medium',
      value: '$600k ARR potential'
    }
  ];

  const outreachTemplates = [
    {
      name: 'MSO Executive Outreach',
      subject: 'How [Company] Can Generate $2M+ Annual Revenue from Product NFTs',
      preview: 'Hi [Name], I noticed [Company] operates across [X] states. Our product NFT platform has helped similar MSOs generate $2M+ in annual revenue...',
      type: 'email'
    },
    {
      name: 'Dispensary Chain Pitch',
      subject: 'Transform Your Dispensaries into NFT Revenue Centers',
      preview: 'Hi [Name], Your [X] dispensary locations could be generating $100k+ monthly through our product NFT authentication platform...',
      type: 'email'
    },
    {
      name: 'Product Tech Integration',
      subject: 'Partnership Opportunity: Product NFT API Integration',
      preview: 'Hi [Name], Our product NFT API processes 2.8M+ monthly calls. Integration could add $500k+ revenue stream to [Company]...',
      type: 'email'
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Enterprise prospect ${formData.company} added to pipeline! Our team will reach out within 24 hours.`);
  };

  return (
    <div className="space-y-8">
      {/* Enterprise Targeting Overview */}
      <Card className="bg-gradient-to-r from-blue-900/20 via-green-900/20 to-purple-900/20 border border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-400" />
            Enterprise Product Client Targeting System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">357</div>
              <div className="text-blue-400">Target Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">$5.8M</div>
              <div className="text-green-400">Pipeline Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">47</div>
              <div className="text-purple-400">Qualified Prospects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">12</div>
              <div className="text-orange-400">Active Proposals</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Target Industries */}
        <Card className="bg-black/20 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-green-400" />
              Target Industries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {targetIndustries.map((industry, index) => (
                <motion.div
                  key={industry.name}
                  className="p-4 bg-slate-800/30 rounded-lg border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white">{industry.name}</h3>
                    <Badge 
                      variant="outline" 
                      className={`
                        ${industry.priority === 'high' ? 'text-red-400 border-red-500/30' : 'text-yellow-400 border-yellow-500/30'}
                      `}
                    >
                      {industry.priority} priority
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-300 space-y-1">
                    <div>Companies: {industry.companies}</div>
                    <div>Avg Revenue: {industry.avgRevenue}</div>
                    <div className="text-green-400 font-medium">{industry.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enterprise Prospects */}
        <Card className="bg-black/20 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              Hot Prospects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enterpriseProspects.slice(0, 4).map((prospect, index) => (
                <motion.div
                  key={prospect.id}
                  className="p-4 bg-slate-800/30 rounded-lg border border-gray-700"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white">{prospect.company}</h3>
                    <Badge 
                      variant="outline" 
                      className={`
                        ${prospect.status === 'hot' ? 'text-red-400 border-red-500/30' : ''}
                        ${prospect.status === 'warm' ? 'text-orange-400 border-orange-500/30' : ''}
                        ${prospect.status === 'qualified' ? 'text-blue-400 border-blue-500/30' : ''}
                        ${prospect.status === 'proposal' ? 'text-purple-400 border-purple-500/30' : ''}
                      `}
                    >
                      {prospect.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-300 space-y-1">
                    <div>{prospect.contact}</div>
                    <div>{prospect.industry}</div>
                    <div className="text-green-400 font-medium">
                      ${(prospect.value / 1000).toFixed(0)}k ARR potential
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Outreach Templates */}
        <Card className="bg-black/20 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-purple-400" />
              Outreach Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {outreachTemplates.map((template, index) => (
                <motion.div
                  key={template.name}
                  className="p-4 bg-slate-800/30 rounded-lg border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="font-medium text-white mb-2">{template.name}</h3>
                  <div className="text-sm text-blue-400 mb-2">{template.subject}</div>
                  <div className="text-xs text-gray-400 mb-3">{template.preview}</div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => alert(`${template.name} template activated! Sending personalized outreach to target prospects.`)}
                  >
                    Use Template
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enterprise Lead Capture Form */}
      <Card className="bg-black/20 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-green-400" />
            Add Enterprise Prospect
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="company" className="text-white">Company Name</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="e.g. Green Gold Holdings"
                  className="bg-slate-800 border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="contact" className="text-white">Primary Contact</Label>
                <Input
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  placeholder="e.g. Sarah Chen, CTO"
                  className="bg-slate-800 border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="sarah@greengold.com"
                  className="bg-slate-800 border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-white">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                  className="bg-slate-800 border-gray-700"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="industry" className="text-white">Industry</Label>
                <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                  <SelectTrigger className="bg-slate-800 border-gray-700">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mso">Multi-State Operator</SelectItem>
                    <SelectItem value="dispensary">Dispensary Chain</SelectItem>
                    <SelectItem value="cultivation">Product Cultivation</SelectItem>
                    <SelectItem value="tech">Product Technology</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="locations" className="text-white">Number of Locations</Label>
                <Input
                  id="locations"
                  value={formData.locations}
                  onChange={(e) => setFormData({...formData, locations: e.target.value})}
                  placeholder="e.g. 15"
                  className="bg-slate-800 border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="revenue" className="text-white">Annual Revenue</Label>
                <Select value={formData.revenue} onValueChange={(value) => setFormData({...formData, revenue: value})}>
                  <SelectTrigger className="bg-slate-800 border-gray-700">
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10m">$10M - $25M</SelectItem>
                    <SelectItem value="25m">$25M - $50M</SelectItem>
                    <SelectItem value="50m">$50M - $100M</SelectItem>
                    <SelectItem value="100m">$100M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="needs" className="text-white">Specific Needs</Label>
                <Textarea
                  id="needs"
                  value={formData.needs}
                  onChange={(e) => setFormData({...formData, needs: e.target.value})}
                  placeholder="Describe their product technology needs..."
                  className="bg-slate-800 border-gray-700"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                Add to Enterprise Pipeline
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-16"
          onClick={() => alert('Enterprise sales automation activated! AI-powered outreach campaigns launched to 357 target companies.')}
        >
          <div className="text-center">
            <Zap className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Launch Outreach</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-green-500/30 hover:bg-green-900/20"
          onClick={() => alert('Enterprise demo scheduler activated! Qualified prospects can now book demo calls automatically.')}
        >
          <div className="text-center">
            <Calendar className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Demo Scheduler</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-yellow-500/30 hover:bg-yellow-900/20"
          onClick={() => alert('Proposal generator activated! Custom enterprise proposals generated for qualified prospects.')}
        >
          <div className="text-center">
            <Crown className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Generate Proposals</div>
          </div>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="h-16 border-purple-500/30 hover:bg-purple-900/20"
          onClick={() => alert('Pipeline analytics activated! Real-time enterprise sales metrics and conversion tracking live.')}
        >
          <div className="text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-1" />
            <div className="font-medium">Pipeline Analytics</div>
          </div>
        </Button>
      </div>
    </div>
  );
}

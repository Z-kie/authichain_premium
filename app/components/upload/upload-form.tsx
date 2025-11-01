
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, Image as ImageIcon, AlertTriangle, Crown } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans';
import { SubscriptionTier } from '@/lib/types';
import { toast } from 'sonner';
import Link from 'next/link';

interface UploadFormProps {
  user: any;
  canUpload: boolean;
  currentUsage: number;
}

const blockchains = [
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'polygon', label: 'Polygon' },
  { value: 'binance', label: 'Binance Smart Chain' },
  { value: 'solana', label: 'Solana' },
  { value: 'cardano', label: 'Cardano' },
  { value: 'other', label: 'Other' }
];

export function UploadForm({ user, canUpload, currentUsage }: UploadFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    tokenId: '',
    contractAddress: '',
    blockchain: 'ethereum'
  });

  const currentPlan = SUBSCRIPTION_PLANS[user.subscriptionTier as SubscriptionTier];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canUpload) {
      toast.error('You have reached your monthly upload limit');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/upload-nft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success('NFT uploaded successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!canUpload && currentPlan.nfts_per_month !== -1) {
    return (
      <Card className="bg-white/5 backdrop-blur-sm border-red-500/50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
          <CardTitle className="text-white">Upload Limit Reached</CardTitle>
          <CardDescription className="text-gray-400">
            You've reached your monthly upload limit of {currentPlan.nfts_per_month} NFTs for the {currentPlan.name} plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-red-300 text-sm">
              Current usage: {currentUsage} / {currentPlan.nfts_per_month} uploads this month
            </p>
          </div>
          
          {user.subscriptionTier !== SubscriptionTier.BRAND && (
            <div className="space-y-3">
              <p className="text-gray-300">Upgrade your plan to upload more NFTs:</p>
              <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Link href="/pricing">
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade Plan
                </Link>
              </Button>
            </div>
          )}
          
          <Button variant="outline" asChild className="border-gray-600">
            <Link href="/dashboard">
              Back to Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Upload className="h-5 w-5" />
          <span>Upload NFT</span>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Add your NFT details and showcase it to the world
        </CardDescription>
        
        <div className="flex items-center space-x-2 pt-2">
          <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
            {currentUsage} / {currentPlan.nfts_per_month === -1 ? '∞' : currentPlan.nfts_per_month} uploads used
          </Badge>
          <Badge variant="outline" className={
            user.subscriptionTier === SubscriptionTier.BASIC 
              ? 'bg-gray-500/20 text-gray-300 border-gray-500/30'
              : user.subscriptionTier === SubscriptionTier.PRO
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
          }>
            {currentPlan.name} Plan
          </Badge>
        </div>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-gray-300">
                NFT Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-white/10 border-gray-600 text-white mt-1"
                placeholder="Enter NFT title"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="tokenId" className="text-gray-300">
                Token ID (Optional)
              </Label>
              <Input
                id="tokenId"
                value={formData.tokenId}
                onChange={(e) => setFormData({ ...formData, tokenId: e.target.value })}
                className="bg-white/10 border-gray-600 text-white mt-1"
                placeholder="e.g., 123"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-300">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-white/10 border-gray-600 text-white mt-1 min-h-[100px]"
              placeholder="Describe your NFT..."
            />
          </div>

          <div>
            <Label htmlFor="imageUrl" className="text-gray-300">
              Image URL *
            </Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="bg-white/10 border-gray-600 text-white mt-1"
              placeholder="https://lh7-rt.googleusercontent.com/docsz/AD_4nXfryjD1OwM3KWMBckgHQMWMKZYWKb4wvKVUQcOlM7OltSVhZjBhOOLbdRzxavvqy_2gq7HZ3n1QTX68oBmeIr10EPr5clTZAHfTek6kF_EBya94k5UHl0v_K7f6eDiGYykpWXNa5w?key=HkSRsj0PLtDHPQFy0eokPoCw"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Direct link to your NFT image (JPG, PNG, GIF, WebP)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="blockchain" className="text-gray-300">
                Blockchain
              </Label>
              <Select 
                value={formData.blockchain} 
                onValueChange={(value) => setFormData({ ...formData, blockchain: value })}
              >
                <SelectTrigger className="bg-white/10 border-gray-600 text-white mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {blockchains.map((blockchain) => (
                    <SelectItem key={blockchain.value} value={blockchain.value}>
                      {blockchain.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="contractAddress" className="text-gray-300">
                Contract Address (Optional)
              </Label>
              <Input
                id="contractAddress"
                value={formData.contractAddress}
                onChange={(e) => setFormData({ ...formData, contractAddress: e.target.value })}
                className="bg-white/10 border-gray-600 text-white mt-1"
                placeholder="0x..."
              />
            </div>
          </div>

          {formData.imageUrl && (
            <div className="mt-6">
              <Label className="text-gray-300 block mb-2">Preview</Label>
              <div className="aspect-square w-32 bg-gray-800 rounded-lg overflow-hidden border border-gray-600">
                <img
                  src={formData.imageUrl}
                  alt="NFT Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-nft.jpg';
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" type="button" asChild className="border-gray-600">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Upload className="mr-2 h-4 w-4" />
              Upload NFT
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}

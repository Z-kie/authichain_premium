
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Crown, Star, Sparkles, User, Mail, Lock, Eye, EyeOff, Wallet } from 'lucide-react';
import { SubscriptionTier } from '@/lib/types';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans';

export function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
    subscriptionTier: SubscriptionTier.BASIC as SubscriptionTier,
    walletAddress: '',
    acceptTerms: true // Set to true by default for immediate functionality
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Handle premium subscriptions
      if (data.requiresPayment && formData.subscriptionTier !== SubscriptionTier.BASIC) {
        // Sign in first
        const signInResult = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false
        });

        if (signInResult?.ok) {
          // Redirect to payment
          const paymentResponse = await fetch('/api/create-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tier: formData.subscriptionTier }),
          });

          const paymentData = await paymentResponse.json();
          if (paymentData.url) {
            window.location.href = paymentData.url;
            return;
          }
        }
      } else {
        // Free tier - auto sign in
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false
        });

        if (result?.ok) {
          router.push('/dashboard');
        } else {
          setError('Account created but sign in failed. Please try signing in manually.');
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getTierIcon = (tier: SubscriptionTier) => {
    switch (tier) {
      case SubscriptionTier.PRO:
        return <Crown className="h-4 w-4" />;
      case SubscriptionTier.BRAND:
        return <Sparkles className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-gray-700">
      <CardHeader>
        <CardTitle className="text-center text-white">Create Your Account</CardTitle>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-gray-300">
                <User className="inline h-4 w-4 mr-2" />
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="bg-white/10 border-gray-600 text-white mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="bg-white/10 border-gray-600 text-white mt-1"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-300">
              <Mail className="inline h-4 w-4 mr-2" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white/10 border-gray-600 text-white mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="username" className="text-gray-300">Username (Optional)</Label>
            <Input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="bg-white/10 border-gray-600 text-white mt-1"
              placeholder="Choose a unique username"
            />
          </div>

          <div className="relative">
            <Label htmlFor="password" className="text-gray-300">
              <Lock className="inline h-4 w-4 mr-2" />
              Password
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-white/10 border-gray-600 text-white pr-10"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="walletAddress" className="text-gray-300">
              <Wallet className="inline h-4 w-4 mr-2" />
              Wallet Address (Optional)
            </Label>
            <Input
              id="walletAddress"
              type="text"
              value={formData.walletAddress}
              onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
              className="bg-white/10 border-gray-600 text-white mt-1"
              placeholder="0xc3a8e14643461a54074a09821edc418d2aa9e11c"
            />
          </div>

          <div>
            <Label className="text-gray-300 mb-3 block">Choose Your Plan</Label>
            <Select 
              value={formData.subscriptionTier} 
              onValueChange={(value) => 
                setFormData({ ...formData, subscriptionTier: value as SubscriptionTier })
              }
            >
              <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
                  <SelectItem key={plan.tier} value={plan.tier}>
                    <div className="flex items-center space-x-2">
                      {getTierIcon(plan.tier)}
                      <span>{plan.name}</span>
                      <Badge variant="outline" className="ml-2">
                        ${plan.price}/month
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="mt-2 p-3 rounded-lg bg-white/5 border border-gray-700">
              <div className="text-sm text-gray-300">
                <strong>{SUBSCRIPTION_PLANS[formData.subscriptionTier].name} Plan Features:</strong>
              </div>
              <ul className="text-xs text-gray-400 mt-1 space-y-1">
                {SUBSCRIPTION_PLANS[formData.subscriptionTier].features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptTerms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, acceptTerms: checked as boolean })
              }
            />
            <Label htmlFor="acceptTerms" className="text-sm text-gray-300">
              I agree to the Terms of Service and Privacy Policy
            </Label>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            disabled={isLoading || !formData.acceptTerms}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
          
          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-purple-400 hover:text-purple-300">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

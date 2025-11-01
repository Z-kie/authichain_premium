
'use client';

import React, { useEffect, useState } from 'react';
import { Check, Circle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface OnboardingStatus {
  walletConnected: boolean;
  subscriptionActive: boolean;
  firstNFTMinted: boolean;
  tutorialCompleted: boolean;
  profileCompleted: boolean;
}

interface OnboardingChecklistProps {
  userId: string;
  initialStatus?: OnboardingStatus;
  compact?: boolean;
}

export function OnboardingChecklist({
  userId,
  initialStatus,
  compact = false,
}: OnboardingChecklistProps) {
  const [status, setStatus] = useState<OnboardingStatus>(
    initialStatus || {
      walletConnected: false,
      subscriptionActive: false,
      firstNFTMinted: false,
      tutorialCompleted: false,
      profileCompleted: false,
    }
  );
  const [loading, setLoading] = useState(!initialStatus);

  useEffect(() => {
    if (!initialStatus) {
      fetchOnboardingStatus();
    }
  }, [userId, initialStatus]);

  const fetchOnboardingStatus = async () => {
    try {
      const response = await fetch(`/api/user/onboarding/status?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
      }
    } catch (error) {
      console.error('Failed to fetch onboarding status:', error);
    } finally {
      setLoading(false);
    }
  };

  const tasks = [
    {
      id: 'wallet',
      title: 'Connect Your Wallet',
      description: 'Link your Web3 wallet to start trading',
      completed: status.walletConnected,
      action: '/dashboard',
      icon: '🔗',
    },
    {
      id: 'subscription',
      title: 'Choose a Subscription',
      description: 'Select a plan that fits your needs',
      completed: status.subscriptionActive,
      action: '/pricing',
      icon: '💎',
    },
    {
      id: 'profile',
      title: 'Complete Your Profile',
      description: 'Add your details and profile picture',
      completed: status.profileCompleted,
      action: '/dashboard/settings',
      icon: '👤',
    },
    {
      id: 'tutorial',
      title: 'Take the Tour',
      description: 'Learn the platform basics',
      completed: status.tutorialCompleted,
      action: '#',
      icon: '🎓',
    },
    {
      id: 'mint',
      title: 'Mint Your First NFT',
      description: 'Create your first authenticated NFT',
      completed: status.firstNFTMinted,
      action: '/mint',
      icon: '🎨',
    },
  ];

  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100;

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Getting Started</CardTitle>
          <CardDescription>
            {completedTasks} of {tasks.length} completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-2 mb-4" />
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-2 text-sm"
              >
                {task.completed ? (
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                )}
                <span className={task.completed ? 'text-gray-500 line-through' : ''}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          <span>Welcome to AuthiChain!</span>
        </CardTitle>
        <CardDescription>
          Complete these steps to get the most out of your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Your Progress</span>
            <span className="text-sm text-gray-600">
              {completedTasks} of {tasks.length} completed
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                task.completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="flex-shrink-0">
                {task.completed ? (
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                    {task.icon}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className={`font-semibold ${task.completed ? 'text-green-900' : 'text-gray-900'}`}>
                  {task.title}
                </h4>
                <p className={`text-sm ${task.completed ? 'text-green-700' : 'text-gray-600'}`}>
                  {task.description}
                </p>
              </div>

              {!task.completed && (
                <a
                  href={task.action}
                  className="flex-shrink-0 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  Start
                </a>
              )}
            </div>
          ))}
        </div>

        {progress === 100 && (
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎉</span>
              <h4 className="font-bold text-lg text-purple-900">Congratulations!</h4>
            </div>
            <p className="text-purple-700 mb-3">
              You've completed all onboarding tasks. You're now ready to make the most of
              AuthiChain!
            </p>
            <a
              href="/marketplace"
              className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              Explore Marketplace
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

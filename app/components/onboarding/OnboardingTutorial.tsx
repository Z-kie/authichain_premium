
'use client';

import React, { useEffect, useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useRouter } from 'next/navigation';

interface OnboardingTutorialProps {
  userId: string;
  isFirstTime?: boolean;
}

export function OnboardingTutorial({ userId, isFirstTime = false }: OnboardingTutorialProps) {
  const router = useRouter();
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Only run tutorial for first-time users
    if (isFirstTime) {
      // Add a small delay to ensure the page is fully loaded
      const timer = setTimeout(() => {
        setRun(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isFirstTime]);

  const steps: Step[] = [
    {
      target: 'body',
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome to AuthiChain! 🎉</h2>
          <p className="text-lg">
            Let's take a quick tour to help you get started with NFT authentication and trading.
          </p>
        </div>
      ),
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '[data-tour="wallet-connect"]',
      content: (
        <div>
          <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
          <p>
            First, connect your Web3 wallet (like MetaMask) to interact with the blockchain and
            manage your NFTs.
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '[data-tour="pricing"]',
      content: (
        <div>
          <h3 className="text-xl font-bold mb-2">Choose Your Plan</h3>
          <p>
            Select a subscription tier that fits your needs. Each plan offers different features
            and NFT minting limits.
          </p>
        </div>
      ),
    },
    {
      target: '[data-tour="mint"]',
      content: (
        <div>
          <h3 className="text-xl font-bold mb-2">Mint Your First NFT</h3>
          <p>
            Create and mint authenticated NFTs with IPFS storage. Your digital assets will be
            permanently stored and verified on the blockchain.
          </p>
        </div>
      ),
    },
    {
      target: '[data-tour="marketplace"]',
      content: (
        <div>
          <h3 className="text-xl font-bold mb-2">Explore the Marketplace</h3>
          <p>
            Browse, buy, and sell authenticated NFTs. Discover collections from creators around
            the world.
          </p>
        </div>
      ),
    },
    {
      target: '[data-tour="collections"]',
      content: (
        <div>
          <h3 className="text-xl font-bold mb-2">Manage Collections</h3>
          <p>
            Organize your NFTs into collections. Create themed groups to showcase your digital
            assets.
          </p>
        </div>
      ),
    },
    {
      target: '[data-tour="dashboard"]',
      content: (
        <div>
          <h3 className="text-xl font-bold mb-2">Your Dashboard</h3>
          <p>
            Access your profile, manage subscriptions, view analytics, and track your NFT
            portfolio.
          </p>
        </div>
      ),
    },
    {
      target: 'body',
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-2">You're All Set! 🚀</h2>
          <p className="text-lg mb-4">
            You're ready to start your NFT authentication journey. Need help anytime? Check out
            our Getting Started guide.
          </p>
          <button
            onClick={() => router.push('/getting-started')}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            View Getting Started Guide
          </button>
        </div>
      ),
      placement: 'center',
    },
  ];

  const handleJoyrideCallback = async (data: CallBackProps) => {
    const { status, index, type } = data;

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setRun(false);
      
      // Mark tutorial as completed
      try {
        await fetch('/api/user/onboarding/complete-tutorial', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
      } catch (error) {
        console.error('Failed to mark tutorial as completed:', error);
      }
    } else if (type === 'step:after') {
      setStepIndex(index + 1);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      stepIndex={stepIndex}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#8b5cf6',
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 12,
          padding: 20,
        },
        buttonNext: {
          backgroundColor: '#8b5cf6',
          borderRadius: 8,
          padding: '10px 20px',
        },
        buttonBack: {
          color: '#8b5cf6',
          marginRight: 10,
        },
        buttonSkip: {
          color: '#64748b',
        },
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        skip: 'Skip Tour',
      }}
    />
  );
}

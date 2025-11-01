

'use client';

import React, { Component, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class PaymentErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Payment Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="bg-red-900/20 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Payment System Error
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-red-900/30 rounded-lg border border-red-500/30">
              <div className="text-red-200">
                <div className="font-medium mb-2">Something went wrong with the payment system</div>
                <div className="text-sm text-red-300">
                  {this.state.error?.message || 'An unexpected error occurred'}
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <div className="text-blue-200 text-sm">
                <div className="font-medium mb-2">💡 What you can do:</div>
                <ul className="space-y-1 text-xs">
                  <li>• Try refreshing the page</li>
                  <li>• Check if MetaMask or your wallet is unlocked</li>
                  <li>• Disable any ad blockers or privacy extensions</li>
                  <li>• Try a different payment method</li>
                  <li>• Contact support if the issue persists</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => window.location.reload()}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Page
              </Button>
              <Button
                onClick={() => this.setState({ hasError: false })}
                variant="outline"
                className="border-gray-600 hover:bg-gray-800"
              >
                Try Again
              </Button>
            </div>

            <div className="text-center">
              <Button
                onClick={() => window.location.href = '/'}
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export const usePaymentErrorHandler = () => {
  const handlePaymentError = (error: Error, context: string = 'payment') => {
    console.error(`Payment Error in ${context}:`, error);
    
    // Show user-friendly error message
    let userMessage = 'Payment processing failed. Please try again.';
    
    if (error.message.includes('MetaMask')) {
      userMessage = 'MetaMask connection failed. You can still pay manually with QR codes.';
    } else if (error.message.includes('network')) {
      userMessage = 'Network error. Please check your connection and try again.';
    } else if (error.message.includes('rejected')) {
      userMessage = 'Payment was cancelled. You can try again anytime.';
    }
    
    return userMessage;
  };

  return { handlePaymentError };
};

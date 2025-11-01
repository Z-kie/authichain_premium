
"use client";

import React, { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PriceDisplayProps {
  amount: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
  showUSD?: boolean;
  className?: string;
}

export function PriceDisplay({
  amount,
  currency = "ETH",
  size = "md",
  showUSD = true,
  className = "",
}: PriceDisplayProps) {
  const [usdValue, setUsdValue] = useState<number | null>(null);

  useEffect(() => {
    if (showUSD && currency === "ETH") {
      // Fetch ETH to USD conversion rate
      fetchEthToUsd(amount).then(setUsdValue);
    }
  }, [amount, currency, showUSD]);

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const getCurrencyIcon = () => {
    switch (currency) {
      case "ETH":
        return "Ξ";
      case "BTC":
        return "₿";
      case "USD":
        return "$";
      default:
        return currency;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex flex-col ${className}`}>
            <div className={`font-bold ${sizeClasses[size]}`}>
              <span className="mr-1">{getCurrencyIcon()}</span>
              <span>{formatAmount(amount)}</span>
            </div>
            {showUSD && usdValue !== null && (
              <span className="text-xs text-muted-foreground">
                ≈ ${formatAmount(usdValue)} USD
              </span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {amount} {currency}
            {usdValue !== null && ` (${usdValue.toFixed(2)} USD)`}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function formatAmount(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(2)}M`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(2)}K`;
  }
  return amount.toFixed(amount < 1 ? 4 : 2);
}

async function fetchEthToUsd(ethAmount: number): Promise<number> {
  try {
    // In a real app, use a price API like CoinGecko or CryptoCompare
    // For now, use a mock conversion rate
    const ETH_TO_USD = 2500; // Mock rate
    return ethAmount * ETH_TO_USD;
  } catch (error) {
    console.error("Failed to fetch ETH to USD rate:", error);
    return 0;
  }
}

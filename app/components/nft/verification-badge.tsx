
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VerificationBadgeProps {
  verified: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  showLabel?: boolean;
  authenticityScore?: number;
  className?: string;
}

export function VerificationBadge({
  verified,
  size = "md",
  showLabel = true,
  authenticityScore,
  className = "",
}: VerificationBadgeProps) {
  if (!verified) return null;

  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const icon = (
    <div className={`flex items-center gap-1 ${className}`}>
      {authenticityScore ? (
        <ShieldCheck className={`${sizeClasses[size]} text-blue-600`} />
      ) : (
        <CheckCircle2 className={`${sizeClasses[size]} text-green-600`} />
      )}
      {showLabel && size !== "xs" && (
        <span className="text-xs font-medium text-green-700">Verified</span>
      )}
    </div>
  );

  const tooltipContent = authenticityScore
    ? `Verified NFT - Authenticity Score: ${authenticityScore}%`
    : "Verified NFT";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-help">
            {showLabel && size !== "xs" ? (
              <Badge variant="secondary" className="bg-green-100 hover:bg-green-200">
                {icon}
              </Badge>
            ) : (
              icon
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

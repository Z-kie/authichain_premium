
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, Check, X, AlertCircle, Send } from "lucide-react";

type OfferStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED" | "EXPIRED" | "COUNTERED";

interface OfferBadgeProps {
  status: OfferStatus;
  expiresAt?: Date;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export function OfferBadge({
  status,
  expiresAt,
  size = "md",
  showIcon = true,
  className = "",
}: OfferBadgeProps) {
  const config = getStatusConfig(status, expiresAt);

  const sizeClasses = {
    sm: "text-xs h-5",
    md: "text-sm h-6",
    lg: "text-base h-7",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant={config.variant}
            className={`${sizeClasses[size]} ${className}`}
          >
            {showIcon && (
              <config.icon className={`${iconSizes[size]} mr-1`} />
            )}
            {config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{config.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function getStatusConfig(status: OfferStatus, expiresAt?: Date) {
  const isExpiringSoon =
    expiresAt && expiresAt.getTime() - new Date().getTime() < 24 * 60 * 60 * 1000;

  switch (status) {
    case "PENDING":
      return {
        label: "Pending",
        variant: "secondary" as const,
        icon: Clock,
        tooltip: expiresAt
          ? `Offer pending - Expires ${formatExpiryDate(expiresAt)}`
          : "Offer pending",
      };

    case "ACCEPTED":
      return {
        label: "Accepted",
        variant: "default" as const,
        icon: Check,
        tooltip: "Offer has been accepted",
      };

    case "REJECTED":
      return {
        label: "Rejected",
        variant: "destructive" as const,
        icon: X,
        tooltip: "Offer has been rejected",
      };

    case "CANCELLED":
      return {
        label: "Cancelled",
        variant: "outline" as const,
        icon: X,
        tooltip: "Offer has been cancelled",
      };

    case "EXPIRED":
      return {
        label: "Expired",
        variant: "secondary" as const,
        icon: AlertCircle,
        tooltip: "Offer has expired",
      };

    case "COUNTERED":
      return {
        label: "Countered",
        variant: "default" as const,
        icon: Send,
        tooltip: "A counter-offer has been made",
      };

    default:
      return {
        label: status,
        variant: "secondary" as const,
        icon: AlertCircle,
        tooltip: `Status: ${status}`,
      };
  }
}

function formatExpiryDate(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  if (diff <= 0) return "already expired";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 7) {
    return `on ${date.toLocaleDateString()}`;
  }
  if (days > 0) {
    return `in ${days} day${days > 1 ? "s" : ""}`;
  }
  if (hours > 0) {
    return `in ${hours} hour${hours > 1 ? "s" : ""}`;
  }
  return "soon";
}

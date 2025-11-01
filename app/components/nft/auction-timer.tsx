
"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AuctionTimerProps {
  endDate: Date;
  onEnd?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "compact" | "inline";
  showIcon?: boolean;
  className?: string;
}

export function AuctionTimer({
  endDate,
  onEnd,
  size = "md",
  variant = "default",
  showIcon = true,
  className = "",
}: AuctionTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining(endDate);
      setTimeRemaining(remaining);

      if (remaining.total <= 0 && onEnd) {
        onEnd();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onEnd]);

  const isExpired = timeRemaining.total <= 0;
  const isUrgent = timeRemaining.total <= 3600000; // Less than 1 hour

  if (variant === "inline") {
    return (
      <span className={`inline-flex items-center gap-1 ${className}`}>
        {showIcon && <Clock className="w-4 h-4" />}
        <span className={isUrgent && !isExpired ? "text-red-500 font-medium" : ""}>
          {isExpired ? "Auction Ended" : formatTimeDisplay(timeRemaining, "compact")}
        </span>
      </span>
    );
  }

  if (variant === "compact") {
    return (
      <Badge 
        variant={isExpired ? "secondary" : isUrgent ? "destructive" : "default"}
        className={`${className}`}
      >
        {showIcon && <Clock className="w-3 h-3 mr-1" />}
        {isExpired ? "Ended" : formatTimeDisplay(timeRemaining, "compact")}
      </Badge>
    );
  }

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <Card className={`${className} ${isUrgent && !isExpired ? "border-red-500" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {showIcon && <Clock className="w-5 h-5 text-muted-foreground" />}
          <span className="text-sm font-medium text-muted-foreground">
            {isExpired ? "Auction Ended" : "Auction Ends In"}
          </span>
        </div>

        {!isExpired && (
          <div className={`grid grid-cols-4 gap-2 ${sizeClasses[size]}`}>
            <TimeUnit label="Days" value={timeRemaining.days} />
            <TimeUnit label="Hours" value={timeRemaining.hours} />
            <TimeUnit label="Mins" value={timeRemaining.minutes} />
            <TimeUnit label="Secs" value={timeRemaining.seconds} />
          </div>
        )}

        {isUrgent && !isExpired && (
          <Badge variant="destructive" className="mt-2 w-full justify-center">
            Ending Soon!
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}

interface TimeUnitProps {
  label: string;
  value: number;
}

function TimeUnit({ label, value }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold">{value.toString().padStart(2, "0")}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

interface TimeRemaining {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeRemaining(endDate: Date): TimeRemaining {
  const total = endDate.getTime() - new Date().getTime();

  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);

  return { total, days, hours, minutes, seconds };
}

function formatTimeDisplay(time: TimeRemaining, format: "compact" | "full"): string {
  if (format === "compact") {
    if (time.days > 0) return `${time.days}d ${time.hours}h`;
    if (time.hours > 0) return `${time.hours}h ${time.minutes}m`;
    if (time.minutes > 0) return `${time.minutes}m ${time.seconds}s`;
    return `${time.seconds}s`;
  }

  return `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`;
}

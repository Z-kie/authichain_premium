
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VerificationBadge } from "./verification-badge";
import { PriceDisplay } from "./price-display";
import { Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NFTCardProps {
  id: string;
  name: string;
  image: string;
  price?: number;
  currency?: string;
  collection?: {
    name: string;
    verified?: boolean;
  };
  authenticityScore?: number;
  isVerified?: boolean;
  status?: "FOR_SALE" | "ON_AUCTION" | "NOT_LISTED";
  auctionEndsAt?: Date;
  onLike?: () => void;
  isLiked?: boolean;
  className?: string;
}

export function NFTCard({
  id,
  name,
  image,
  price,
  currency = "ETH",
  collection,
  authenticityScore,
  isVerified,
  status,
  auctionEndsAt,
  onLike,
  isLiked = false,
  className = "",
}: NFTCardProps) {
  return (
    <Card className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}>
      <Link href={`/nft/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={image || "/placeholder-nft.png"}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Verification Badge */}
          {isVerified && (
            <div className="absolute top-2 left-2">
              <VerificationBadge verified={true} size="sm" />
            </div>
          )}

          {/* Status Badge */}
          {status && status !== "NOT_LISTED" && (
            <div className="absolute top-2 right-2">
              <Badge variant={status === "ON_AUCTION" ? "default" : "secondary"}>
                {status === "ON_AUCTION" ? "Auction" : "For Sale"}
              </Badge>
            </div>
          )}

          {/* Auction Timer */}
          {status === "ON_AUCTION" && auctionEndsAt && (
            <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-sm rounded-md px-2 py-1 flex items-center justify-center text-white text-xs">
              <Clock className="w-3 h-3 mr-1" />
              <span>Ends in {formatTimeRemaining(auctionEndsAt)}</span>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/nft/${id}`}>
          {/* Collection Name */}
          {collection && (
            <div className="flex items-center gap-1 mb-1">
              <span className="text-xs text-muted-foreground truncate">
                {collection.name}
              </span>
              {collection.verified && (
                <VerificationBadge verified={true} size="xs" showLabel={false} />
              )}
            </div>
          )}

          {/* NFT Name */}
          <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Authenticity Score */}
          {authenticityScore !== undefined && (
            <div className="mt-1 flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Authenticity:</span>
              <span className={`text-xs font-medium ${getAuthenticityColor(authenticityScore)}`}>
                {authenticityScore}%
              </span>
            </div>
          )}
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        {/* Price */}
        {price !== undefined && (
          <PriceDisplay 
            amount={price} 
            currency={currency} 
            size="sm"
          />
        )}

        {/* Like Button */}
        {onLike && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onLike();
            }}
            className="ml-auto"
          >
            <Heart 
              className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} 
            />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

function formatTimeRemaining(endDate: Date): string {
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();

  if (diff <= 0) return "Ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function getAuthenticityColor(score: number): string {
  if (score >= 90) return "text-green-600";
  if (score >= 70) return "text-yellow-600";
  return "text-red-600";
}

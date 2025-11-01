
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { VerificationBadge } from "@/components/nft/verification-badge";
import { Badge } from "@/components/ui/badge";

interface CollectionCardProps {
  collection: {
    id: string;
    name: string;
    slug: string;
    coverImage?: string;
    description?: string;
    category?: string;
    verified?: boolean;
    _count?: {
      nfts: number;
    };
    floorPrice?: number;
  };
  className?: string;
}

export function CollectionCard({ collection, className = "" }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.slug}`}>
      <Card className={`group overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`}>
        {/* Cover Image */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
          {collection.coverImage ? (
            <Image
              src={collection.coverImage}
              alt={collection.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
              {collection.name.charAt(0)}
            </div>
          )}
          
          {/* Verified Badge */}
          {collection.verified && (
            <div className="absolute top-3 right-3">
              <VerificationBadge verified={true} size="sm" />
            </div>
          )}

          {/* Category Badge */}
          {collection.category && (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary">{collection.category}</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* Collection Name */}
          <h3 className="font-bold text-lg truncate mb-1 group-hover:text-primary transition-colors">
            {collection.name}
          </h3>

          {/* Description */}
          {collection.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {collection.description}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="text-muted-foreground">Items: </span>
              <span className="font-medium">{collection._count?.nfts || 0}</span>
            </div>
            {collection.floorPrice && (
              <div>
                <span className="text-muted-foreground">Floor: </span>
                <span className="font-medium">Ξ{collection.floorPrice}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

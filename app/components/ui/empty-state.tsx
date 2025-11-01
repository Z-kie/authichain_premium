
"use client";

import React from "react";
import { LucideIcon, Inbox, Package, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: "default" | "compact";
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  variant = "default",
  className = "",
}: EmptyStateProps) {
  if (variant === "compact") {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Icon className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
        {actionLabel && onAction && (
          <Button onClick={onAction} size="sm">
            {actionLabel}
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="flex flex-col items-center justify-center py-16 px-6">
        <div className="rounded-full bg-muted p-6 mb-6">
          <Icon className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-muted-foreground text-center mb-6 max-w-md">{description}</p>
        )}
        {actionLabel && onAction && (
          <Button onClick={onAction} size="lg">
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function EmptyNFTState({ onMint }: { onMint?: () => void }) {
  return (
    <EmptyState
      icon={ImageIcon}
      title="No NFTs Found"
      description="You don't have any NFTs yet. Start by minting your first NFT!"
      actionLabel="Mint NFT"
      onAction={onMint}
    />
  );
}

export function EmptyCollectionState({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={Package}
      title="No Collections Found"
      description="Create your first collection to organize your NFTs."
      actionLabel="Create Collection"
      onAction={onCreate}
    />
  );
}

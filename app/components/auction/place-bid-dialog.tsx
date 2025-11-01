
"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface PlaceBidDialogProps {
  auction: any;
  open: boolean;
  onClose: () => void;
}

export function PlaceBidDialog({ auction, open, onClose }: PlaceBidDialogProps) {
  const { toast } = useToast();
  const [bidAmount, setBidAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentBid = auction.currentBid || auction.startingPrice;
  const minimumBid = currentBid + (currentBid * 0.05); // 5% increase

  const handleSubmit = async () => {
    const bid = parseFloat(bidAmount);

    if (!bidAmount || bid <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid bid amount",
        variant: "destructive",
      });
      return;
    }

    if (bid < minimumBid) {
      toast({
        title: "Error",
        description: `Bid must be at least ${minimumBid.toFixed(4)} ETH`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auctions/bid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auctionId: auction.id,
          amount: bid,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to place bid");
      }

      toast({
        title: "Bid Placed Successfully",
        description: "Your bid has been placed",
      });

      onClose();
      window.location.reload(); // Refresh to show new bid
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to place bid",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Place a Bid</DialogTitle>
          <DialogDescription>
            Current bid: {currentBid} ETH
          </DialogDescription>
        </DialogHeader>

        {isSubmitting ? (
          <LoadingSpinner text="Placing bid..." />
        ) : (
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Minimum bid: {minimumBid.toFixed(4)} ETH (5% above current bid)
              </AlertDescription>
            </Alert>

            <div>
              <Label htmlFor="bid">Your Bid (ETH)</Label>
              <Input
                id="bid"
                type="number"
                step="0.001"
                min={minimumBid}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={minimumBid.toFixed(4)}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSubmit} className="flex-1">
                Place Bid
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

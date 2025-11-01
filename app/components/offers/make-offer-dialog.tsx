
"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface MakeOfferDialogProps {
  nft: any;
  open: boolean;
  onClose: () => void;
}

export function MakeOfferDialog({ nft, open, onClose }: MakeOfferDialogProps) {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [expirationDays, setExpirationDays] = useState("7");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid offer amount",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + parseInt(expirationDays));

      const response = await fetch("/api/offers/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nftId: nft.id,
          amount: parseFloat(amount),
          currency: "ETH",
          expiresAt: expiresAt.toISOString(),
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit offer");
      }

      toast({
        title: "Offer Submitted",
        description: "Your offer has been sent to the owner",
      });

      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit offer",
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
          <DialogTitle>Make an Offer</DialogTitle>
          <DialogDescription>
            Submit an offer for {nft.name}
          </DialogDescription>
        </DialogHeader>

        {isSubmitting ? (
          <LoadingSpinner text="Submitting offer..." />
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Offer Amount (ETH)</Label>
              <Input
                id="amount"
                type="number"
                step="0.001"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="expiration">Expiration</Label>
              <Select value={expirationDays} onValueChange={setExpirationDays}>
                <SelectTrigger id="expiration">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a message to the seller..."
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSubmit} className="flex-1">
                Submit Offer
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

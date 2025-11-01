"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { OfferBadge } from "@/components/nft/offer-badge";
import { PriceDisplay } from "@/components/nft/price-display";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

export default function OffersPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [madeOffers, setMadeOffers] = useState<any[]>([]);
  const [receivedOffers, setReceivedOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      fetchOffers();
    }
  }, [status]);

  async function fetchOffers() {
    try {
      const response = await fetch("/api/offers/list");
      if (response.ok) {
        const data = await response.json();
        setMadeOffers(data.made || []);
        setReceivedOffers(data.received || []);
      }
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAccept = async (offerId: string) => {
    try {
      const response = await fetch(`/api/offers/${offerId}/accept`, {
        method: "POST",
      });
      if (response.ok) {
        toast({ title: "Offer Accepted", description: "The offer has been accepted" });
        fetchOffers();
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to accept offer", variant: "destructive" });
    }
  };

  const handleReject = async (offerId: string) => {
    try {
      const response = await fetch(`/api/offers/${offerId}/reject`, {
        method: "POST",
      });
      if (response.ok) {
        toast({ title: "Offer Rejected", description: "The offer has been rejected" });
        fetchOffers();
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to reject offer", variant: "destructive" });
    }
  };

  const handleCancel = async (offerId: string) => {
    try {
      const response = await fetch(`/api/offers/${offerId}/cancel`, {
        method: "POST",
      });
      if (response.ok) {
        toast({ title: "Offer Cancelled", description: "The offer has been cancelled" });
        fetchOffers();
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to cancel offer", variant: "destructive" });
    }
  };

  if (loading || status === "loading") {
    return <LoadingSpinner fullScreen text="Loading offers..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Offers</h1>

      <Tabs defaultValue="received">
        <TabsList>
          <TabsTrigger value="received">
            Received ({receivedOffers.length})
          </TabsTrigger>
          <TabsTrigger value="made">
            Made ({madeOffers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="mt-6">
          {receivedOffers.length === 0 ? (
            <EmptyState
              title="No Offers Received"
              description="You haven't received any offers yet"
            />
          ) : (
            <div className="space-y-4">
              {receivedOffers.map((offer) => (
                <Card key={offer.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Link href={`/nft/${offer.nft.id}`} className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={offer.nft.image}
                          alt={offer.nft.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </Link>
                      <div className="flex-1">
                        <Link href={`/nft/${offer.nft.id}`} className="font-semibold hover:underline">
                          {offer.nft.name}
                        </Link>
                        <div className="flex items-center gap-3 mt-2">
                          <PriceDisplay amount={offer.amount} currency={offer.currency} size="sm" />
                          <OfferBadge status={offer.status} expiresAt={offer.expiresAt} size="sm" />
                        </div>
                      </div>
                      {offer.status === "PENDING" && (
                        <div className="flex gap-2">
                          <Button onClick={() => handleAccept(offer.id)} size="sm">
                            Accept
                          </Button>
                          <Button onClick={() => handleReject(offer.id)} variant="outline" size="sm">
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="made" className="mt-6">
          {madeOffers.length === 0 ? (
            <EmptyState
              title="No Offers Made"
              description="You haven't made any offers yet"
            />
          ) : (
            <div className="space-y-4">
              {madeOffers.map((offer) => (
                <Card key={offer.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Link href={`/nft/${offer.nft.id}`} className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={offer.nft.image}
                          alt={offer.nft.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </Link>
                      <div className="flex-1">
                        <Link href={`/nft/${offer.nft.id}`} className="font-semibold hover:underline">
                          {offer.nft.name}
                        </Link>
                        <div className="flex items-center gap-3 mt-2">
                          <PriceDisplay amount={offer.amount} currency={offer.currency} size="sm" />
                          <OfferBadge status={offer.status} expiresAt={offer.expiresAt} size="sm" />
                        </div>
                      </div>
                      {offer.status === "PENDING" && (
                        <Button onClick={() => handleCancel(offer.id)} variant="outline" size="sm">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { VerificationBadge } from "@/components/nft/verification-badge";
import { PriceDisplay } from "@/components/nft/price-display";
import { AuctionTimer } from "@/components/nft/auction-timer";
import { NFTCard } from "@/components/nft/nft-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { 
  Heart, 
  Share2, 
  ExternalLink, 
  Eye, 
  ShoppingCart,
  Gavel,
  MessageSquare,
  TrendingUp,
  Clock,
  User
} from "lucide-react";
import { MakeOfferDialog } from "@/components/offers/make-offer-dialog";
import { PlaceBidDialog } from "@/components/auction/place-bid-dialog";

export default function NFTDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const nftId = params.id as string;

  const [nft, setNft] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedNFTs, setRelatedNFTs] = useState<any[]>([]);
  const [showOfferDialog, setShowOfferDialog] = useState(false);
  const [showBidDialog, setShowBidDialog] = useState(false);

  useEffect(() => {
    fetchNFTDetails();
  }, [nftId]);

  async function fetchNFTDetails() {
    try {
      setLoading(true);
      const response = await fetch(`/api/nft/${nftId}`);
      if (response.ok) {
        const data = await response.json();
        setNft(data);
        
        // Fetch related NFTs from the same collection
        if (data.collectionId) {
          fetchRelatedNFTs(data.collectionId);
        }
      } else {
        router.push("/explore");
      }
    } catch (error) {
      console.error("Failed to fetch NFT:", error);
      router.push("/explore");
    } finally {
      setLoading(false);
    }
  }

  async function fetchRelatedNFTs(collectionId: string) {
    try {
      const response = await fetch(`/api/nft/list?collection=${collectionId}&limit=4`);
      if (response.ok) {
        const data = await response.json();
        setRelatedNFTs(data.nfts.filter((n: any) => n.id !== nftId));
      }
    } catch (error) {
      console.error("Failed to fetch related NFTs:", error);
    }
  }

  const handleBuy = async () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    // TODO: Implement purchase flow with wallet integration
    toast({
      title: "Purchase Flow",
      description: "Wallet integration coming soon!",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "NFT link copied to clipboard",
    });
  };

  const isOwner = session?.user?.email === nft?.owner?.email;

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading NFT..." />;
  }

  if (!nft) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Image */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={nft.image || "/placeholder-nft.png"}
                  alt={nft.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </CardContent>
          </Card>

          {/* Attributes */}
          {nft.attributes && nft.attributes.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Properties</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {nft.attributes.map((attr: any, index: number) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 text-center hover:border-primary transition-colors"
                    >
                      <div className="text-xs text-muted-foreground mb-1">
                        {attr.traitType}
                      </div>
                      <div className="font-medium">{attr.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Collection Badge */}
          {nft.collection && (
            <div>
              <Link
                href={`/collections/${nft.collection.slug}`}
                className="text-sm text-primary hover:underline flex items-center gap-2"
              >
                {nft.collection.name}
                {nft.collection.verified && (
                  <VerificationBadge verified={true} size="xs" showLabel={false} />
                )}
              </Link>
            </div>
          )}

          {/* Title and Verification */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              <h1 className="text-4xl font-bold flex-1">{nft.name}</h1>
              {nft.verified && <VerificationBadge verified={true} authenticityScore={nft.authenticityScore} />}
            </div>

            {/* Owner */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Owned by</span>
              <Link
                href={`/profile/${nft.owner.id}`}
                className="text-primary hover:underline font-medium"
              >
                {isOwner ? "you" : nft.owner.name || nft.owner.email}
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span>{nft.views || 0} views</span>
            </div>
            <button
              className="flex items-center gap-2 hover:text-red-500 transition-colors"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              <span>{(nft.likes || 0) + (isLiked ? 1 : 0)} favorites</span>
            </button>
            <button onClick={handleShare} className="flex items-center gap-2 hover:text-primary">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          <Separator />

          {/* Auction Info */}
          {nft.status === "ON_AUCTION" && nft.auction && (
            <Card className="border-2 border-primary">
              <CardContent className="p-6">
                <AuctionTimer
                  endDate={new Date(nft.auction.endTime)}
                  size="lg"
                  variant="default"
                />
                <div className="mt-4">
                  <div className="text-sm text-muted-foreground mb-1">Current Bid</div>
                  <PriceDisplay
                    amount={nft.auction.currentBid || nft.auction.startingPrice}
                    currency="ETH"
                    size="lg"
                  />
                  <div className="text-sm text-muted-foreground mt-2">
                    {nft.auction.bidCount || 0} bids
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Price Info */}
          {nft.status === "FOR_SALE" && nft.price && (
            <Card>
              <CardContent className="p-6">
                <div className="text-sm text-muted-foreground mb-1">Current Price</div>
                <PriceDisplay amount={nft.price} currency="ETH" size="lg" />
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {!isOwner && (
            <div className="flex gap-3">
              {nft.status === "FOR_SALE" && (
                <Button size="lg" className="flex-1" onClick={handleBuy}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
              )}

              {nft.status === "ON_AUCTION" && (
                <Button size="lg" className="flex-1" onClick={() => setShowBidDialog(true)}>
                  <Gavel className="w-4 h-4 mr-2" />
                  Place Bid
                </Button>
              )}

              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={() => setShowOfferDialog(true)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Make Offer
              </Button>
            </div>
          )}

          {/* Owner Actions */}
          {isOwner && (
            <div className="flex gap-3">
              {nft.status === "NOT_LISTED" && (
                <>
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={() => router.push(`/nft/${nft.id}/sell`)}
                  >
                    List for Sale
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.push(`/auctions/create?nft=${nft.id}`)}
                  >
                    Create Auction
                  </Button>
                </>
              )}
            </div>
          )}

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{nft.description}</p>
              {nft.externalUrl && (
                <a
                  href={nft.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-2 mt-4"
                >
                  <ExternalLink className="w-4 h-4" />
                  External Link
                </a>
              )}
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token ID</span>
                  <span className="font-medium">{nft.tokenId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contract</span>
                  <span className="font-medium text-xs">{nft.contractAddress?.slice(0, 10)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Blockchain</span>
                  <span className="font-medium">Ethereum</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Royalty</span>
                  <span className="font-medium">{nft.royaltyPercentage}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="history" className="mb-12">
        <TabsList>
          <TabsTrigger value="history">Price History</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="bids">Bids</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Price history chart coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Offers list coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bids" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Bid history coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related NFTs */}
      {relatedNFTs.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">More from this collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedNFTs.map((relatedNFT) => (
              <NFTCard
                key={relatedNFT.id}
                id={relatedNFT.id}
                name={relatedNFT.name}
                image={relatedNFT.image}
                price={relatedNFT.price}
                currency={relatedNFT.currency}
                authenticityScore={relatedNFT.authenticityScore}
                isVerified={relatedNFT.verified}
                status={relatedNFT.status}
              />
            ))}
          </div>
        </div>
      )}

      {/* Dialogs */}
      {showOfferDialog && (
        <MakeOfferDialog
          nft={nft}
          open={showOfferDialog}
          onClose={() => setShowOfferDialog(false)}
        />
      )}

      {showBidDialog && (
        <PlaceBidDialog
          auction={nft.auction}
          open={showBidDialog}
          onClose={() => setShowBidDialog(false)}
        />
      )}
    </div>
  );
}

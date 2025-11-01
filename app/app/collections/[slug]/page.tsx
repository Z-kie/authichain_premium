"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { NFTCard } from "@/components/nft/nft-card";
import { VerificationBadge } from "@/components/nft/verification-badge";
import { Edit, ExternalLink, Globe, Twitter, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function CollectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const slug = params.slug as string;

  const [collection, setCollection] = useState<any>(null);
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("items");

  useEffect(() => {
    fetchCollectionDetails();
  }, [slug]);

  async function fetchCollectionDetails() {
    try {
      setLoading(true);
      const response = await fetch(`/api/collections/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setCollection(data);
        setNfts(data.nfts || []);
      } else {
        router.push("/collections");
      }
    } catch (error) {
      console.error("Failed to fetch collection:", error);
      router.push("/collections");
    } finally {
      setLoading(false);
    }
  }

  const isOwner = session?.user?.email === collection?.creator?.email;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Collection link copied to clipboard",
    });
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading collection..." />;
  }

  if (!collection) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Banner */}
      {collection.bannerImage && (
        <div className="relative w-full h-64 md:h-96 bg-gradient-to-r from-purple-500 to-pink-500">
          <Image
            src={collection.bannerImage}
            alt={collection.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Collection Info */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-background rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cover Image */}
            {collection.coverImage && (
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border-4 border-background shadow-xl flex-shrink-0">
                <Image
                  src={collection.coverImage}
                  alt={collection.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold">{collection.name}</h1>
                    {collection.verified && <VerificationBadge verified={true} />}
                  </div>
                  {collection.category && (
                    <Badge variant="secondary">{collection.category}</Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  {isOwner && (
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/collections/${slug}/edit`)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{collection.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-2xl font-bold">{collection._count?.nfts || 0}</div>
                  <div className="text-sm text-muted-foreground">Items</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{collection.floorPrice || "—"}</div>
                  <div className="text-sm text-muted-foreground">Floor Price</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{collection.totalVolume || "—"}</div>
                  <div className="text-sm text-muted-foreground">Volume</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {collection._count?.nfts ? "100%" : "0%"}
                  </div>
                  <div className="text-sm text-muted-foreground">Listed</div>
                </div>
              </div>

              {/* Social Links */}
              {(collection.website || collection.twitter || collection.discord) && (
                <div className="flex gap-3">
                  {collection.website && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={collection.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-2" />
                        Website
                      </a>
                    </Button>
                  )}
                  {collection.twitter && (
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={`https://twitter.com/${collection.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="mt-6">
            {nfts.length === 0 ? (
              <EmptyState
                title="No NFTs in this collection yet"
                description={
                  isOwner
                    ? "Start by minting NFTs and adding them to this collection"
                    : "Check back later for new items"
                }
                actionLabel={isOwner ? "Mint NFT" : undefined}
                onAction={isOwner ? () => router.push("/mint") : undefined}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {nfts.map((nft) => (
                  <NFTCard
                    key={nft.id}
                    id={nft.id}
                    name={nft.name}
                    image={nft.image}
                    price={nft.price}
                    currency={nft.currency}
                    authenticityScore={nft.authenticityScore}
                    isVerified={nft.verified}
                    status={nft.status}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <EmptyState
              title="No activity yet"
              description="Activity history will appear here"
              variant="compact"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

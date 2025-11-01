"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { NFTCard } from "@/components/nft/nft-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyNFTState } from "@/components/ui/empty-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MyNFTsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      fetchMyNFTs();
    }
  }, [status]);

  async function fetchMyNFTs() {
    try {
      const response = await fetch("/api/nft/list?mine=true");
      if (response.ok) {
        const data = await response.json();
        setNfts(data.nfts || []);
      }
    } catch (error) {
      console.error("Failed to fetch NFTs:", error);
    } finally {
      setLoading(false);
    }
  }

  const filterNFTs = (status?: string) => {
    if (!status) return nfts;
    return nfts.filter((nft) => nft.status === status);
  };

  if (loading || status === "loading") {
    return <LoadingSpinner fullScreen text="Loading your NFTs..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My NFTs</h1>
          <p className="text-muted-foreground">
            Manage and view your NFT collection
          </p>
        </div>
        <Button onClick={() => router.push("/mint")} size="lg">
          Mint NFT
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All ({nfts.length})</TabsTrigger>
          <TabsTrigger value="for_sale">
            For Sale ({filterNFTs("FOR_SALE").length})
          </TabsTrigger>
          <TabsTrigger value="on_auction">
            On Auction ({filterNFTs("ON_AUCTION").length})
          </TabsTrigger>
          <TabsTrigger value="not_listed">
            Not Listed ({filterNFTs("NOT_LISTED").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {nfts.length === 0 ? (
            <EmptyNFTState onMint={() => router.push("/mint")} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {nfts.map((nft) => (
                <NFTCard key={nft.id} {...nft} />
              ))}
            </div>
          )}
        </TabsContent>

        {["for_sale", "on_auction", "not_listed"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            {filterNFTs(tab.toUpperCase()).length === 0 ? (
              <EmptyNFTState onMint={() => router.push("/mint")} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filterNFTs(tab.toUpperCase()).map((nft) => (
                  <NFTCard key={nft.id} {...nft} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

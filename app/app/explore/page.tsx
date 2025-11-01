"use client";

import React, { useState, useEffect } from "react";
import { NFTCard } from "@/components/nft/nft-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchBar } from "@/components/search/search-bar";
import { FilterSidebar } from "@/components/search/filter-sidebar";
import { SortDropdown } from "@/components/search/sort-dropdown";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function ExplorePage() {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    minPrice: 0,
    maxPrice: 0,
    status: [] as string[],
    collections: [] as string[],
    verifiedOnly: false,
  });
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchNFTs();
  }, [filters, sortBy]);

  async function fetchNFTs() {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        sortBy,
        search: filters.search,
        verifiedOnly: filters.verifiedOnly.toString(),
      });

      if (filters.minPrice > 0) params.append("minPrice", filters.minPrice.toString());
      if (filters.maxPrice > 0) params.append("maxPrice", filters.maxPrice.toString());
      filters.status.forEach((s: any) => params.append("status", s));
      filters.collections.forEach((c: any) => params.append("collection", c));

      const response = await fetch(`/api/nft/list?${params}`);
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore NFTs</h1>
        <p className="text-muted-foreground">
          Discover unique digital assets on AuthiChain
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar
        value={filters.search}
        onChange={(value) => setFilters({ ...filters, search: value })}
        className="mb-6"
      />

      {/* Filters and Content */}
      <div className="flex gap-6">
        {/* Desktop Filters */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={() =>
              setFilters({
                search: "",
                minPrice: 0,
                maxPrice: 0,
                status: [],
                collections: [],
                verifiedOnly: false,
              })
            }
          />
        </div>

        {/* NFT Grid */}
        <div className="flex-1">
          {/* Sort and Mobile Filter Toggle */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {nfts.length} {nfts.length === 1 ? "item" : "items"}
            </p>

            <div className="flex items-center gap-3">
              <SortDropdown value={sortBy} onChange={setSortBy} />

              {/* Mobile Filter Toggle */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <FilterSidebar
                    filters={filters}
                    onChange={setFilters}
                    onReset={() =>
                      setFilters({
                        search: "",
                        minPrice: 0,
                        maxPrice: 0,
                        status: [],
                        collections: [],
                        verifiedOnly: false,
                      })
                    }
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <LoadingSpinner text="Loading NFTs..." className="py-12" />
          ) : nfts.length === 0 ? (
            <EmptyState
              title="No NFTs Found"
              description="Try adjusting your filters or search query"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {nfts.map((nft) => (
                <NFTCard
                  key={nft.id}
                  id={nft.id}
                  name={nft.name}
                  image={nft.image}
                  price={nft.price}
                  currency={nft.currency}
                  collection={nft.collection}
                  authenticityScore={nft.authenticityScore}
                  isVerified={nft.verified}
                  status={nft.status}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

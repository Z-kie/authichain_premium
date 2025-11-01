
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface FilterSidebarProps {
  filters: {
    minPrice: number;
    maxPrice: number;
    status: string[];
    collections: string[];
    verifiedOnly: boolean;
  };
  onChange: (filters: any) => void;
  onReset: () => void;
}

const STATUS_OPTIONS = [
  { value: "FOR_SALE", label: "For Sale" },
  { value: "ON_AUCTION", label: "On Auction" },
  { value: "NOT_LISTED", label: "Not Listed" },
];

export function FilterSidebar({ filters, onChange, onReset }: FilterSidebarProps) {
  const [collections, setCollections] = useState<any[]>([]);
  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice || 100]);

  useEffect(() => {
    fetchCollections();
  }, []);

  async function fetchCollections() {
    try {
      const response = await fetch("/api/collections/list");
      if (response.ok) {
        const data = await response.json();
        setCollections(data.collections || []);
      }
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    }
  }

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked
      ? [...filters.status, status]
      : filters.status.filter((s: any) => s !== status);
    onChange({ ...filters, status: newStatus });
  };

  const handleCollectionChange = (collectionId: string, checked: boolean) => {
    const newCollections = checked
      ? [...filters.collections, collectionId]
      : filters.collections.filter((c: any) => c !== collectionId);
    onChange({ ...filters, collections: newCollections });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    onChange({ ...filters, minPrice: value[0], maxPrice: value[1] });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Verified Only */}
        <div className="flex items-center justify-between">
          <Label htmlFor="verified-only">Verified Only</Label>
          <Switch
            id="verified-only"
            checked={filters.verifiedOnly}
            onCheckedChange={(checked) =>
              onChange({ ...filters, verifiedOnly: checked })
            }
          />
        </div>

        <Separator />

        {/* Status */}
        <div>
          <Label className="mb-3 block">Status</Label>
          <div className="space-y-2">
            {STATUS_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${option.value}`}
                  checked={filters.status.includes(option.value)}
                  onCheckedChange={(checked) =>
                    handleStatusChange(option.value, checked as boolean)
                  }
                />
                <label
                  htmlFor={`status-${option.value}`}
                  className="text-sm cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <Label className="mb-3 block">
            Price Range (ETH): {priceRange[0]} - {priceRange[1]}
          </Label>
          <Slider
            min={0}
            max={100}
            step={1}
            value={priceRange}
            onValueChange={handlePriceChange}
            className="mb-2"
          />
        </div>

        <Separator />

        {/* Collections */}
        {collections.length > 0 && (
          <div>
            <Label className="mb-3 block">Collections</Label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {collections.map((collection) => (
                <div key={collection.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`collection-${collection.id}`}
                    checked={filters.collections.includes(collection.id)}
                    onCheckedChange={(checked) =>
                      handleCollectionChange(collection.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`collection-${collection.id}`}
                    className="text-sm cursor-pointer truncate"
                  >
                    {collection.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

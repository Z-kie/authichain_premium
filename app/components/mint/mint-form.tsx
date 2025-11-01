
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "./image-upload";
import { AttributeBuilder } from "./attribute-builder";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Check } from "lucide-react";

const mintFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(1000, "Description must be less than 1000 characters"),
  externalUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  collectionId: z.string().optional(),
  royaltyPercentage: z.number().min(0, "Royalty must be at least 0%").max(10, "Royalty cannot exceed 10%"),
  attributes: z.array(z.object({
    traitType: z.string(),
    value: z.string(),
  })).optional(),
});

type MintFormValues = z.infer<typeof mintFormSchema>;

export function MintForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStep, setUploadStep] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [collections, setCollections] = useState<any[]>([]);
  const [mintedNFT, setMintedNFT] = useState<any>(null);

  const form = useForm<MintFormValues>({
    resolver: zodResolver(mintFormSchema),
    defaultValues: {
      name: "",
      description: "",
      externalUrl: "",
      royaltyPercentage: 5,
      attributes: [],
    },
  });

  // Fetch user's collections
  React.useEffect(() => {
    fetchCollections();
  }, []);

  async function fetchCollections() {
    try {
      const response = await fetch("/api/collections/list?mine=true");
      if (response.ok) {
        const data = await response.json();
        setCollections(data.collections || []);
      }
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    }
  }

  async function onSubmit(data: MintFormValues) {
    if (!imageFile) {
      toast({
        title: "Error",
        description: "Please upload an image for your NFT",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStep("Preparing metadata...");

    try {
      // Step 1: Upload image to IPFS
      setUploadStep("Uploading image to IPFS...");
      setUploadProgress(20);

      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadResponse = await fetch("/api/upload/ipfs", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image to IPFS");
      }

      const { ipfsHash, url } = await uploadResponse.json();
      setUploadProgress(50);

      // Step 2: Mint NFT
      setUploadStep("Minting NFT...");
      setUploadProgress(70);

      const mintData = {
        name: data.name,
        description: data.description,
        image: url,
        externalUrl: data.externalUrl,
        collectionId: data.collectionId,
        royaltyPercentage: data.royaltyPercentage,
        attributes: data.attributes,
      };

      const mintResponse = await fetch("/api/nft/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mintData),
      });

      if (!mintResponse.ok) {
        const error = await mintResponse.json();
        throw new Error(error.error || "Failed to mint NFT");
      }

      const mintedNFT = await mintResponse.json();
      setUploadProgress(100);
      setUploadStep("Success!");
      setMintedNFT(mintedNFT);

      toast({
        title: "Success!",
        description: "Your NFT has been minted successfully",
      });

      // Redirect to NFT detail page after 2 seconds
      setTimeout(() => {
        router.push(`/nft/${mintedNFT.id}`);
      }, 2000);
    } catch (error: any) {
      console.error("Minting error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to mint NFT",
        variant: "destructive",
      });
      setIsUploading(false);
      setUploadProgress(0);
      setUploadStep("");
    }
  }

  if (mintedNFT) {
    return (
      <Card className="border-green-500">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">NFT Minted Successfully!</h3>
            <p className="text-muted-foreground mb-6">
              Your NFT "{mintedNFT.name}" has been created and is now live on the blockchain
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => router.push(`/nft/${mintedNFT.id}`)}>View NFT</Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Mint Another
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isUploading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" className="mb-6" />
        <div className="text-center mb-4">
          <p className="text-lg font-medium mb-2">{uploadStep}</p>
          <Progress value={uploadProgress} className="w-full max-w-md mx-auto" />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Please don't close this window...
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload */}
        <FormItem>
          <FormLabel>Image/Media *</FormLabel>
          <FormControl>
            <ImageUpload
              value={imagePreview}
              onChange={(file, preview) => {
                setImageFile(file);
                setImagePreview(preview);
              }}
            />
          </FormControl>
          <FormDescription>
            Supported formats: JPG, PNG, GIF, SVG, MP4, WEBM (Max 100MB)
          </FormDescription>
          <FormMessage />
        </FormItem>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input placeholder="NFT Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your NFT..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* External URL */}
        <FormField
          control={form.control}
          name="externalUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>External URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://yourwebsite.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Link to your website or additional information
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Collection */}
        <FormField
          control={form.control}
          name="collectionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a collection" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">No Collection</SelectItem>
                  {collections.map((collection) => (
                    <SelectItem key={collection.id} value={collection.id}>
                      {collection.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Group your NFTs into collections for better organization
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Royalty Percentage */}
        <FormField
          control={form.control}
          name="royaltyPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Royalty Percentage</FormLabel>
              <FormControl>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    className="max-w-[120px]"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </FormControl>
              <FormDescription>
                Earn royalties on future sales (0-10%)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Attributes */}
        <FormField
          control={form.control}
          name="attributes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Properties/Attributes</FormLabel>
              <FormControl>
                <AttributeBuilder
                  value={(field.value || []) as Array<{ traitType: string; value: string }>}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Add custom traits and properties to your NFT
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button type="submit" size="lg" className="flex-1">
            <Sparkles className="w-4 h-4 mr-2" />
            Mint NFT
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

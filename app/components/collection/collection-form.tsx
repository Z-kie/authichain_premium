
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
import { ImageUpload } from "@/components/mint/image-upload";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles } from "lucide-react";

const collectionFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().max(1000, "Description must be less than 1000 characters").optional(),
  category: z.string().optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitter: z.string().optional(),
  discord: z.string().optional(),
});

type CollectionFormValues = z.infer<typeof collectionFormSchema>;

const CATEGORIES = [
  "Art",
  "Gaming",
  "Music",
  "Photography",
  "Sports",
  "Collectibles",
  "Virtual Worlds",
  "Trading Cards",
  "Utility",
  "Other",
];

export function CollectionForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<{ file: File | null; preview: string | null }>({
    file: null,
    preview: null,
  });
  const [bannerImage, setBannerImage] = useState<{ file: File | null; preview: string | null }>({
    file: null,
    preview: null,
  });

  const form = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      website: "",
      twitter: "",
      discord: "",
    },
  });

  async function onSubmit(data: CollectionFormValues) {
    setIsSubmitting(true);

    try {
      let coverImageUrl = "";
      let bannerImageUrl = "";

      // Upload cover image if provided
      if (coverImage.file) {
        const formData = new FormData();
        formData.append("file", coverImage.file);
        const uploadRes = await fetch("/api/upload/ipfs", {
          method: "POST",
          body: formData,
        });
        if (uploadRes.ok) {
          const { url } = await uploadRes.json();
          coverImageUrl = url;
        }
      }

      // Upload banner image if provided
      if (bannerImage.file) {
        const formData = new FormData();
        formData.append("file", bannerImage.file);
        const uploadRes = await fetch("/api/upload/ipfs", {
          method: "POST",
          body: formData,
        });
        if (uploadRes.ok) {
          const { url } = await uploadRes.json();
          bannerImageUrl = url;
        }
      }

      // Create collection
      const collectionData = {
        ...data,
        coverImage: coverImageUrl,
        bannerImage: bannerImageUrl,
      };

      const response = await fetch("/api/collections/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collectionData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create collection");
      }

      const collection = await response.json();

      toast({
        title: "Success!",
        description: "Your collection has been created successfully",
      });

      router.push(`/collections/${collection.slug}`);
    } catch (error: any) {
      console.error("Collection creation error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create collection",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" text="Creating collection..." />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Cover Image */}
        <FormItem>
          <FormLabel>Cover Image</FormLabel>
          <FormControl>
            <ImageUpload
              value={coverImage.preview}
              onChange={(file, preview) => setCoverImage({ file, preview })}
              onRemove={() => setCoverImage({ file: null, preview: null })}
              accept={["image/*"]}
              maxSize={10}
            />
          </FormControl>
          <FormDescription>
            Recommended: 400x400px (Square). Max 10MB.
          </FormDescription>
        </FormItem>

        {/* Banner Image */}
        <FormItem>
          <FormLabel>Banner Image</FormLabel>
          <FormControl>
            <ImageUpload
              value={bannerImage.preview}
              onChange={(file, preview) => setBannerImage({ file, preview })}
              onRemove={() => setBannerImage({ file: null, preview: null })}
              accept={["image/*"]}
              maxSize={10}
            />
          </FormControl>
          <FormDescription>
            Recommended: 1400x400px (Banner). Max 10MB.
          </FormDescription>
        </FormItem>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Name *</FormLabel>
              <FormControl>
                <Input placeholder="My Amazing Collection" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your collection..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Website */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="https://yourwebsite.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Twitter */}
        <FormField
          control={form.control}
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter Handle</FormLabel>
              <FormControl>
                <Input placeholder="@yourhandle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Discord */}
        <FormField
          control={form.control}
          name="discord"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discord Invite</FormLabel>
              <FormControl>
                <Input placeholder="https://discord.gg/yourinvite" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
            <Sparkles className="w-4 h-4 mr-2" />
            Create Collection
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

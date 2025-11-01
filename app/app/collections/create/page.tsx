"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CollectionForm } from "@/components/collection/collection-form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function CreateCollectionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <LoadingSpinner fullScreen text="Loading..." />;
  }

  if (!session) {
    router.push("/auth/signin?callbackUrl=/collections/create");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Collection</h1>
        <p className="text-muted-foreground">
          Organize your NFTs into a curated collection
        </p>
      </div>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Collections help you organize and showcase your NFTs. You can add NFTs to your collection
          during minting or from your existing NFTs.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Collection Details</CardTitle>
          <CardDescription>
            Provide information about your collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CollectionForm />
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MintForm } from "@/components/mint/mint-form";
import { BatchMintForm } from "@/components/mint/batch-mint-form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function MintPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("single");

  if (status === "loading") {
    return <LoadingSpinner fullScreen text="Loading..." />;
  }

  if (!session) {
    router.push("/auth/signin?callbackUrl=/mint");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mint NFT</h1>
        <p className="text-muted-foreground">
          Create and mint your digital assets on the AuthiChain blockchain
        </p>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          All NFTs are minted with built-in authenticity verification. Your metadata will be stored
          on IPFS for permanent, decentralized storage.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single">Single NFT</TabsTrigger>
          <TabsTrigger value="batch">Batch Mint</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Mint Single NFT</CardTitle>
              <CardDescription>
                Upload your digital asset and provide metadata to mint a unique NFT
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MintForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batch" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Batch Mint NFTs</CardTitle>
              <CardDescription>
                Upload multiple files and provide metadata via CSV to mint multiple NFTs at once
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BatchMintForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

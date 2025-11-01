
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/components/ui/use-toast";
import { Download, Upload, FileSpreadsheet, Image as ImageIcon, CheckCircle } from "lucide-react";

export function BatchMintForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleCSVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0]);
    }
  };

  const downloadTemplate = () => {
    const csvContent = `filename,name,description,externalUrl,royaltyPercentage,attributes
image1.jpg,NFT Name 1,Description for NFT 1,https://example.com,5,"Background:Blue;Eyes:Green"
image2.jpg,NFT Name 2,Description for NFT 2,https://example.com,5,"Background:Red;Eyes:Brown"`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "batch-mint-template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleBatchMint = async () => {
    if (files.length === 0 || !csvFile) {
      toast({
        title: "Error",
        description: "Please upload both images and metadata CSV file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      // Parse CSV
      const csvText = await csvFile.text();
      const metadata = parseCSV(csvText);

      if (metadata.length !== files.length) {
        throw new Error("Number of images doesn't match CSV rows");
      }

      const results = [];
      const total = files.length;

      // Process each NFT
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const meta = metadata[i];

        try {
          // Upload image
          const formData = new FormData();
          formData.append("file", file);

          const uploadRes = await fetch("/api/upload/ipfs", {
            method: "POST",
            body: formData,
          });

          if (!uploadRes.ok) throw new Error(`Failed to upload ${file.name}`);

          const { url } = await uploadRes.json();

          // Mint NFT
          const mintRes = await fetch("/api/nft/mint", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...meta,
              image: url,
            }),
          });

          if (!mintRes.ok) throw new Error(`Failed to mint ${meta.name}`);

          const nft = await mintRes.json();
          results.push({ success: true, nft });
        } catch (error: any) {
          results.push({ success: false, error: error.message, filename: file.name });
        }

        setProgress(Math.round(((i + 1) / total) * 100));
      }

      setResults(results);
      toast({
        title: "Batch Minting Complete",
        description: `Successfully minted ${results.filter((r: any) => r.success).length} of ${total} NFTs`,
      });
    } catch (error: any) {
      console.error("Batch mint error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to batch mint NFTs",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (results) {
    const successful = results.filter((r: any) => r.success).length;
    const failed = results.filter((r: any) => !r.success).length;

    return (
      <div className="space-y-4">
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Batch minting complete! {successful} successful, {failed} failed.
          </AlertDescription>
        </Alert>

        <Card>
          <CardContent className="p-4 max-h-96 overflow-y-auto">
            {results.map((result: any, index: number) => (
              <div
                key={index}
                className={`p-3 mb-2 rounded ${
                  result.success ? "bg-green-50" : "bg-red-50"
                }`}
              >
                {result.success ? (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{result.nft.name}</span>
                    <Button
                      size="sm"
                      variant="link"
                      onClick={() => router.push(`/nft/${result.nft.id}`)}
                    >
                      View
                    </Button>
                  </div>
                ) : (
                  <div>
                    <span className="font-medium text-red-600">{result.filename}</span>
                    <p className="text-sm text-red-500">{result.error}</p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button onClick={() => router.push("/dashboard/nfts")}>View My NFTs</Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Mint More
          </Button>
        </div>
      </div>
    );
  }

  if (isUploading) {
    return (
      <div className="py-12">
        <LoadingSpinner size="lg" className="mb-6" />
        <div className="text-center mb-4">
          <p className="text-lg font-medium mb-2">Batch Minting in Progress...</p>
          <Progress value={progress} className="w-full max-w-md mx-auto" />
          <p className="text-sm text-muted-foreground mt-2">{progress}% complete</p>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Please don't close this window...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Alert>
        <FileSpreadsheet className="h-4 w-4" />
        <AlertDescription>
          Download the CSV template, fill in your NFT metadata, and upload it along with your images.
        </AlertDescription>
      </Alert>

      <Button variant="outline" onClick={downloadTemplate} className="w-full">
        <Download className="w-4 h-4 mr-2" />
        Download CSV Template
      </Button>

      {/* Upload Images */}
      <Card>
        <CardContent className="p-6">
          <label className="cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <ImageIcon className="w-5 h-5" />
              <span className="font-medium">Upload Images</span>
            </div>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {files.length > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                {files.length} file(s) selected
              </p>
            )}
          </label>
        </CardContent>
      </Card>

      {/* Upload CSV */}
      <Card>
        <CardContent className="p-6">
          <label className="cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <FileSpreadsheet className="w-5 h-5" />
              <span className="font-medium">Upload Metadata CSV</span>
            </div>
            <Input
              type="file"
              accept=".csv"
              onChange={handleCSVChange}
              className="cursor-pointer"
            />
            {csvFile && (
              <p className="text-sm text-muted-foreground mt-2">
                {csvFile.name}
              </p>
            )}
          </label>
        </CardContent>
      </Card>

      <Button
        onClick={handleBatchMint}
        size="lg"
        className="w-full"
        disabled={files.length === 0 || !csvFile}
      >
        <Upload className="w-4 h-4 mr-2" />
        Start Batch Minting ({files.length} NFTs)
      </Button>
    </div>
  );
}

function parseCSV(csvText: string): any[] {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj: any = {};

    headers.forEach((header, index) => {
      const value = values[index]?.trim();

      if (header === "royaltyPercentage") {
        obj[header] = parseFloat(value) || 5;
      } else if (header === "attributes" && value) {
        // Parse attributes from format "Background:Blue;Eyes:Green"
        obj[header] = value.split(";").map((attr) => {
          const [traitType, attrValue] = attr.split(":");
          return { traitType, value: attrValue };
        });
      } else {
        obj[header] = value;
      }
    });

    return obj;
  });
}

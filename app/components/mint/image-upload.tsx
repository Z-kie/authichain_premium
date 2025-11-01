
"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon, Film } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value?: string | null;
  onChange: (file: File, preview: string) => void;
  onRemove?: () => void;
  maxSize?: number; // in MB
  accept?: string[];
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  maxSize = 100,
  accept = ["image/*", "video/*"],
}: ImageUploadProps) {
  const [error, setError] = useState<string>("");

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError("");

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === "file-too-large") {
          setError(`File is too large. Maximum size is ${maxSize}MB`);
        } else {
          setError("Invalid file type");
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const preview = URL.createObjectURL(file);
        onChange(file, preview);
      }
    },
    [onChange, maxSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxSize * 1024 * 1024,
    multiple: false,
  });

  const isVideo = value && (value.includes(".mp4") || value.includes(".webm"));

  if (value) {
    return (
      <Card className="relative">
        <CardContent className="p-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
            {isVideo ? (
              <video
                src={value}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              <Image
                src={value}
                alt="Upload preview"
                fill
                className="object-contain"
              />
            )}
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => {
              if (onRemove) onRemove();
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Card
        {...getRootProps()}
        className={`border-2 border-dashed cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        } ${error ? "border-destructive" : ""}`}
      >
        <CardContent className="p-12">
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-center">
            {isDragActive ? (
              <>
                <Upload className="w-12 h-12 text-primary mb-4 animate-bounce" />
                <p className="text-lg font-medium text-primary">Drop your file here</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium mb-2">
                  Drag & drop or click to upload
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supported: JPG, PNG, GIF, SVG, MP4, WEBM
                </p>
                <p className="text-xs text-muted-foreground">
                  Maximum file size: {maxSize}MB
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      {error && <p className="text-sm text-destructive mt-2">{error}</p>}
    </div>
  );
}

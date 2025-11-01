/**
 * IPFS Integration for AuthiChain NFT Marketplace
 * Uses NFT.Storage for decentralized storage
 */

import { NFTStorage, File, Blob } from 'nft.storage';
import { lookup } from 'mime-types';

// Initialize NFT.Storage client
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_API_KEY || '';

if (!NFT_STORAGE_KEY && process.env.NODE_ENV !== 'development') {
  console.warn('NFT_STORAGE_API_KEY is not set. IPFS uploads will fail.');
}

const client = new NFTStorage({ token: NFT_STORAGE_KEY });

export interface NFTMetadata {
  name: string;
  description?: string;
  image?: string;
  animation_url?: string;
  external_url?: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
    display_type?: string;
  }>;
  properties?: Record<string, any>;
}

export interface IPFSUploadResult {
  ipfsUrl: string;
  gatewayUrl: string;
  cid: string;
}

/**
 * Upload a file to IPFS using NFT.Storage
 */
export async function uploadFileToIPFS(
  file: Buffer | Uint8Array,
  filename: string,
  contentType?: string
): Promise<IPFSUploadResult> {
  try {
    // Detect content type if not provided
    const mimeType = contentType || lookup(filename) || 'application/octet-stream';
    
    // Create File object
    const nftFile = new File([file], filename, { type: mimeType });
    
    // Upload to IPFS
    const cid = await client.storeBlob(nftFile);
    
    return {
      cid,
      ipfsUrl: `ipfs://${cid}`,
      gatewayUrl: `https://nftstorage.link/ipfs/${cid}`,
    };
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    throw new Error(`Failed to upload file to IPFS: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Upload image from URL to IPFS
 */
export async function uploadImageFromURL(imageUrl: string): Promise<IPFSUploadResult> {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Extract filename from URL
    const filename = imageUrl.split('/').pop() || 'image.png';
    const contentType = response.headers.get('content-type') || undefined;
    
    return await uploadFileToIPFS(buffer, filename, contentType);
  } catch (error) {
    console.error('Error uploading image from URL:', error);
    throw new Error(`Failed to upload image from URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Upload NFT metadata to IPFS
 */
export async function uploadMetadataToIPFS(metadata: NFTMetadata): Promise<IPFSUploadResult> {
  try {
    // Convert metadata to JSON string
    const metadataJSON = JSON.stringify(metadata, null, 2);
    const metadataBlob = new Blob([metadataJSON], { type: 'application/json' });
    
    // Upload to IPFS
    const cid = await client.storeBlob(metadataBlob);
    
    return {
      cid,
      ipfsUrl: `ipfs://${cid}`,
      gatewayUrl: `https://nftstorage.link/ipfs/${cid}`,
    };
  } catch (error) {
    console.error('Error uploading metadata to IPFS:', error);
    throw new Error(`Failed to upload metadata to IPFS: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Upload complete NFT (image + metadata) to IPFS
 */
export async function uploadNFTToIPFS(
  imageFile: Buffer | Uint8Array,
  imageFilename: string,
  metadata: Omit<NFTMetadata, 'image'>,
  imageContentType?: string
): Promise<{
  imageResult: IPFSUploadResult;
  metadataResult: IPFSUploadResult;
}> {
  try {
    // First upload the image
    const imageResult = await uploadFileToIPFS(imageFile, imageFilename, imageContentType);
    
    // Then upload metadata with image IPFS URL
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: imageResult.ipfsUrl,
    };
    
    const metadataResult = await uploadMetadataToIPFS(completeMetadata);
    
    return {
      imageResult,
      metadataResult,
    };
  } catch (error) {
    console.error('Error uploading NFT to IPFS:', error);
    throw new Error(`Failed to upload NFT to IPFS: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Upload multiple files to IPFS (for batch minting)
 */
export async function uploadBatchToIPFS(
  files: Array<{
    file: Buffer | Uint8Array;
    filename: string;
    metadata: Omit<NFTMetadata, 'image'>;
    contentType?: string;
  }>
): Promise<Array<{
  imageResult: IPFSUploadResult;
  metadataResult: IPFSUploadResult;
}>> {
  try {
    const results = await Promise.all(
      files.map((item) =>
        uploadNFTToIPFS(item.file, item.filename, item.metadata, item.contentType)
      )
    );
    
    return results;
  } catch (error) {
    console.error('Error uploading batch to IPFS:', error);
    throw new Error(`Failed to upload batch to IPFS: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get IPFS gateway URL from IPFS URL
 */
export function getGatewayUrl(ipfsUrl: string): string {
  if (!ipfsUrl.startsWith('ipfs://')) {
    return ipfsUrl;
  }
  
  const cid = ipfsUrl.replace('ipfs://', '');
  return `https://nftstorage.link/ipfs/${cid}`;
}

/**
 * Get CID from IPFS URL
 */
export function getCIDFromUrl(ipfsUrl: string): string {
  return ipfsUrl.replace('ipfs://', '').replace('https://nftstorage.link/ipfs/', '');
}

/**
 * Check if NFT.Storage is configured
 */
export function isIPFSConfigured(): boolean {
  return !!NFT_STORAGE_KEY;
}

/**
 * Get IPFS status
 */
export async function getIPFSStatus(): Promise<{
  configured: boolean;
  working: boolean;
  error?: string;
}> {
  if (!NFT_STORAGE_KEY) {
    return {
      configured: false,
      working: false,
      error: 'NFT_STORAGE_API_KEY is not configured',
    };
  }
  
  try {
    // Try a simple upload to test connectivity
    const testBlob = new Blob(['test'], { type: 'text/plain' });
    await client.storeBlob(testBlob);
    
    return {
      configured: true,
      working: true,
    };
  } catch (error) {
    return {
      configured: true,
      working: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export default {
  uploadFileToIPFS,
  uploadImageFromURL,
  uploadMetadataToIPFS,
  uploadNFTToIPFS,
  uploadBatchToIPFS,
  getGatewayUrl,
  getCIDFromUrl,
  isIPFSConfigured,
  getIPFSStatus,
};

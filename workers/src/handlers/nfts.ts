import { Env } from '../types';
import { successResponse, errorResponse } from '../utils/response';
import * as db from '../db/operations';

export async function handleNFTs(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const method = request.method;
  const origin = request.headers.get('Origin') || env.ALLOWED_ORIGINS;

  // Check if DB is available
  if (!env.DB) {
    return errorResponse('Database not configured. Please add D1 permissions to your API token.', 503, origin);
  }

  try {
    // GET /nfts?limit=100 - List NFT mints
    if (method === 'GET') {
      const limitParam = url.searchParams.get('limit');
      const limit = limitParam ? parseInt(limitParam) : 100;
      
      const nfts = await db.getAllNFTMints(env.DB, limit);
      return successResponse(nfts, undefined, origin);
    }

    // POST /nfts - Record new NFT mint
    if (method === 'POST') {
      const body = await request.json() as any;
      
      if (!body.token_id || !body.to_address || !body.tx_hash || !body.block_number || !body.timestamp) {
        return errorResponse('Missing required fields: token_id, to_address, tx_hash, block_number, timestamp', 400, origin);
      }

      const nft = await db.recordNFTMint(env.DB, body);
      return successResponse(nft, 'NFT mint recorded successfully', origin);
    }

    return errorResponse('Method not allowed', 405, origin);
  } catch (error) {
    console.error('NFTs handler error:', error);
    return errorResponse(error instanceof Error ? error.message : 'Internal server error', 500, origin);
  }
}

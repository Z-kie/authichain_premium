
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { uploadFileToIPFS } from "@/lib/ipfs";

export const dynamic = 'force-dynamic';


export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to IPFS
    const result = await uploadFileToIPFS(buffer, file.name, file.type);

    return NextResponse.json({
      cid: result.cid,
      ipfsUrl: result.ipfsUrl,
      gatewayUrl: result.gatewayUrl,
    });
  } catch (error: any) {
    console.error("IPFS upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload to IPFS" },
      { status: 500 }
    );
  }
}

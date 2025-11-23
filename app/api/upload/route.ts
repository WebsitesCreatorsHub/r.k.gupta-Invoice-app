import { type NextRequest, NextResponse } from "next/server";

// Mock Cloudinary upload - in production, connect to real Cloudinary API
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    // Mock Cloudinary response
    const mockCloudinaryUrl = `https://res.cloudinary.com/demo/image/upload/v1234567890/${Date.now()}-${
      file.name
    }`;

    return NextResponse.json({
      success: true,
      url: mockCloudinaryUrl,
      type,
      message: "File uploaded successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

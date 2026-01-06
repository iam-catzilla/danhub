import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "DanHub/1.0 (Next.js Application)",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Site returned ${response.status}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      const blob = await response.blob();
      return new NextResponse(blob, {
        headers: {
          "Content-Type": contentType || "application/octet-stream",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

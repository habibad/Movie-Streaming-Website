/* eslint-disable @typescript-eslint/no-explicit-any */
import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const normalizeVideoFromJson = (item: any, index: number) => ({
  id:
    item?.id ||
    `cloudflare-${index}-${(item?.title || item?.videoUrl || `video-${index}`)
      .toString()
      .replace(/[^a-zA-Z0-9-_]/g, "") || index}`,
  title: item?.title || `Cloudflare Video ${index + 1}`,
  provider: (item?.platform || item?.provider || "Cloudflare").toString(),
  videoUrl: item?.videoUrl || "",
  size:
    typeof item?.size === "number"
      ? item.size
      : typeof item?.runtimeSeconds === "number"
        ? item.runtimeSeconds
        : null,
  createdAt: item?.createdAt || new Date().toISOString(),
});

const getFallbackVideos = async () => {
  try {
    const jsonPath = path.join(process.cwd(), "data", "parsed", "video.json");
    const raw = await fs.readFile(jsonPath, "utf8");
    const parsed = JSON.parse(raw);
    const items = Array.isArray(parsed) ? parsed : [];
    return items.map(normalizeVideoFromJson);
  } catch (error) {
    console.warn("Video fallback data unavailable:", error);
    return [];
  }
};

/**
 * GET /api/video
 * Retrieves video files with optional search, provider filtering, pagination, and sorting.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const search = searchParams.get("search") || "";
    const provider = searchParams.get("provider") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const sortBy = searchParams.get("sortBy") || "title"; // title, createdAt, size
    const order = searchParams.get("order") === "desc" ? "desc" : "asc";

    // Validate page/limit bounds
    const currentPage = Math.max(1, page);
    const currentLimit = Math.max(1, Math.min(100, limit)); // cap limit at 100 per page

    // Build Prisma query clauses
    const where: any = {};

    if (search) {
      where.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (provider) {
      where.provider = {
        equals: provider,
        mode: "insensitive",
      };
    }

    // Build orderBy clause
    const orderBy: any = {};
    if (["title", "createdAt", "size"].includes(sortBy)) {
      orderBy[sortBy] = order;
    } else {
      orderBy.title = "asc";
    }

    let total = 0;
    let videos: any[] = [];

    try {
      const [count, data] = await Promise.all([
        prisma.videoFile.count({ where }),
        prisma.videoFile.findMany({
          where,
          orderBy,
          skip: (currentPage - 1) * currentLimit,
          take: currentLimit,
        }),
      ]);

      total = count;
      videos = data;
    } catch (dbError) {
      console.warn("Prisma video lookup failed, using fallback Cloudflare list.", dbError);
      const fallbackVideos = await getFallbackVideos();
      const normalizedSearch = search.trim().toLowerCase();
      const filtered = fallbackVideos.filter((video) => {
        const matchesProvider = !provider || video.provider.toLowerCase() === provider.toLowerCase();
        const matchesSearch = !normalizedSearch || video.title.toLowerCase().includes(normalizedSearch);
        return matchesProvider && matchesSearch;
      });

      const ordered = [...filtered].sort((a, b) => {
        const left = a.title.toLowerCase();
        const right = b.title.toLowerCase();
        return order === "desc" ? right.localeCompare(left) : left.localeCompare(right);
      });

      const start = (currentPage - 1) * currentLimit;
      const paged = ordered.slice(start, start + currentLimit);

      return NextResponse.json({
        success: true,
        data: paged,
        serverTime: Date.now(),
        pagination: {
          total: ordered.length,
          page: currentPage,
          limit: currentLimit,
          totalPages: Math.max(1, Math.ceil(ordered.length / currentLimit)),
          hasNextPage: start + currentLimit < ordered.length,
          hasPrevPage: currentPage > 1,
        },
      });
    }

    if (videos.length === 0) {
      const fallbackVideos = await getFallbackVideos();
      if (fallbackVideos.length > 0) {
        const normalizedSearch = search.trim().toLowerCase();
        const filtered = fallbackVideos.filter((video) => {
          const matchesProvider = !provider || video.provider.toLowerCase() === provider.toLowerCase();
          const matchesSearch = !normalizedSearch || video.title.toLowerCase().includes(normalizedSearch);
          return matchesProvider && matchesSearch;
        });

        const ordered = [...filtered].sort((a, b) => {
          const left = a.title.toLowerCase();
          const right = b.title.toLowerCase();
          return order === "desc" ? right.localeCompare(left) : left.localeCompare(right);
        });

        const start = (currentPage - 1) * currentLimit;
        const paged = ordered.slice(start, start + currentLimit);

        return NextResponse.json({
          success: true,
          data: paged,
          serverTime: Date.now(),
          pagination: {
            total: ordered.length,
            page: currentPage,
            limit: currentLimit,
            totalPages: Math.max(1, Math.ceil(ordered.length / currentLimit)),
            hasNextPage: start + currentLimit < ordered.length,
            hasPrevPage: currentPage > 1,
          },
        });
      }
    }

    const totalPages = Math.ceil(total / currentLimit);

    return NextResponse.json({
      success: true,
      data: videos,
      serverTime: Date.now(),
      pagination: {
        total,
        page: currentPage,
        limit: currentLimit,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      },
    });
  } catch (error: any) {
    console.error("Error in GET /api/video:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch videos",
        details: error.message || error,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/video
 * Creates a new video file record in the database.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, provider, videoUrl, size } = body;

    // Validate required fields
    if (!title || !provider || !videoUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: title, provider, and videoUrl are required.",
        },
        { status: 400 }
      );
    }

    const newVideo = await prisma.videoFile.create({
      data: {
        title,
        provider,
        videoUrl,
        size: typeof size === "number" ? size : null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newVideo,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in POST /api/video:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create video record",
        details: error.message || error,
      },
      { status: 500 }
    );
  }
}

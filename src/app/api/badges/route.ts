// /app/api/badges/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { errorResponse } from "@/lib/utils/response";

export async function GET() {
  try {
    const badges = await prisma.badge.findMany({
      include: {
        roadmap: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    if (!badges.length) return errorResponse("No badges found", 404);

    return NextResponse.json({
      success: true,
      message: "Badges fetched successfully",
      data: badges,
    });
  } catch (error) {
    console.error("GET /api/badges error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

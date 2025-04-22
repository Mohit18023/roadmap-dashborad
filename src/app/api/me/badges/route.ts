// /app/api/me/badges/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { errorResponse } from "@/lib/utils/response";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return errorResponse("Unauthorized", 401);

    const userBadges = await prisma.userBadge.findMany({
      where: {
        userId: clerkId,
      },
      include: {
        badge: true,  // Include badge details
      },
    });

    if (!userBadges.length) return errorResponse("No badges assigned", 404);

    return NextResponse.json({
      success: true,
      message: "User badges fetched successfully",
      data: userBadges.map((ub) => ({
        id: ub.badge.id,
        name: ub.badge.name,
        image: ub.badge.image,
        createdAt: ub.badge.createdAt,
      })),
    });
  } catch (error) {
    console.error("GET /api/me/badges error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

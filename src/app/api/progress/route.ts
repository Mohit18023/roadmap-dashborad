// /app/api/progress/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { errorResponse } from "@/lib/utils/response";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return errorResponse("Unauthorized", 401);

    const url = new URL(request.url);
    const roadmapId = url.searchParams.get("roadmapId");
    const subtopicId = url.searchParams.get("subtopicId");

    if (!roadmapId && !subtopicId) {
      return errorResponse("Please provide either roadmapId or subtopicId", 400);
    }

    let progress = null;

    if (roadmapId) {
      // Get progress for the entire roadmap
      progress = await prisma.userProgress.findMany({
        where: {
          userId: clerkId,
          subtopic: {
            roadmapId,
          },
        },
        select: {
          subtopicId: true,
          currentIndex: true,
        },
      });
    } else if (subtopicId) {
      // Get progress for a specific subtopic
      progress = await prisma.userProgress.findUnique({
        where: {
          userId_subtopicId: {
            userId: clerkId,
            subtopicId,
          },
        },
        select: {
          currentIndex: true,
        },
      });
    }

    if (!progress) return errorResponse("No progress found", 404);

    return NextResponse.json({
      success: true,
      message: "User progress fetched successfully",
      data: progress,
    });
  } catch (error) {
    console.error("GET /api/progress error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

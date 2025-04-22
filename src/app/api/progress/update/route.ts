import { auth } from "@clerk/nextjs/server";
import { errorResponse, successResponse } from "@/lib/utils/response";
import prisma from "@/lib/prisma";
import { assignBadgeIfEligible } from "@/lib/utils/assignbadge";

export async function POST(request: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return errorResponse("Unauthorized", 401);

    const { subtopicId, currentIndex } = await request.json();

    if (!subtopicId || currentIndex === undefined) {
      return errorResponse("subtopicId and currentIndex are required", 400);
    }

    // Fetch subtopic to get roadmapId
    const subtopic = await prisma.subtopic.findUnique({
      where: { id: subtopicId },
    });

    if (!subtopic) return errorResponse("Invalid subtopicId", 404);

    const roadmapId = subtopic.roadmapId;

    // Update or create progress
    let progress = await prisma.userProgress.findUnique({
      where: {
        userId_subtopicId: {
          userId: clerkId,
          subtopicId,
        },
      },
    });

    if (progress) {
      progress = await prisma.userProgress.update({
        where: {
          userId_subtopicId: {
            userId: clerkId,
            subtopicId,
          },
        },
        data: {
          currentIndex,
        },
      });
    } else {
      progress = await prisma.userProgress.create({
        data: {
          userId: clerkId,
          subtopicId,
          currentIndex,
        },
      });
    }

    // Check if all subtopics are completed
    await assignBadgeIfEligible(clerkId, roadmapId);

    return successResponse("User progress updated successfully", progress);
  } catch (error) {
    console.error("POST /api/progress/update error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

// /app/api/enroll/[roadmapId]/route.ts
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma"; // Correct import for Prisma client
import { successResponse, errorResponse } from "@/lib/utils/response";

export async function POST(req: Request, { params }: { params: { roadmapId: string } }) {
  try {
    const { userId } = await auth();

    // Ensure the user is authenticated
    if (!userId) {
      return errorResponse("Unauthorized", 401);
    }

    const { roadmapId } = params;

    // Check if the roadmap exists
    const roadmap = await prisma.roadmap.findUnique({
      where: { id: roadmapId },
    });

    if (!roadmap) {
      return errorResponse("Roadmap not found", 404);
    }

    // Check if the user is already enrolled in the roadmap
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: { userId_roadmapId: { userId, roadmapId } },
    });

    if (existingEnrollment) {
      return errorResponse("User already enrolled in this roadmap", 400);
    }

    // Enroll the user in the roadmap
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        roadmapId,
      },
    });

    // Respond with success
    return successResponse("User enrolled successfully", enrollment, 201);

  } catch (error) {
    console.error("POST /api/enroll/[roadmapId] error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

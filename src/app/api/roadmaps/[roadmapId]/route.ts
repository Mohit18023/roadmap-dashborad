// /app/api/roadmaps/[roadmapId]/route.ts
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma"; // Using the existing Prisma client
import { successResponse, errorResponse } from "@/lib/utils/response";

export async function GET(req: Request, { params }: { params: { roadmapId: string } }) {
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
      include: {
        subtopics: true, // Include the subtopics associated with the roadmap
      },
    });

    if (!roadmap) {
      return errorResponse("Roadmap not found", 404);
    }

    // Return the roadmap details with subtopics
    return successResponse("Roadmap fetched successfully", roadmap, 200);

  } catch (error) {
    console.error("GET /api/roadmaps/[roadmapId] error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

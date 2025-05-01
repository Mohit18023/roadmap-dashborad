// /app/api/roadmaps/[roadmapId]/subtopics/route.ts

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/utils/response";

interface Params {
  params: {
    roadmapId: string;
  };
}
// /app/api/roadmaps/[roadmapId]/subtopics/route.ts

export async function GET(_: Request, { params }: Params) {
  try {
    const { userId } = await auth();
    if (!userId) return errorResponse("Unauthorized", 401);

    const { roadmapId } = params;
    if (!roadmapId) return errorResponse("Missing roadmap ID", 400);

    const subtopics = await prisma.subtopic.findMany({
      where: { roadmapId },
      orderBy: { createdAt: "asc" },
    });

    return successResponse("Subtopics fetched successfully", subtopics);
  } catch (error) {
    console.error("GET /api/roadmaps/[roadmapId]/subtopics error:", error);
    return errorResponse("Failed to fetch subtopics", 500);
  }
}

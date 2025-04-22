import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/utils/response";
import { RoadmapInput } from "@/lib/utils/types";

export async function PUT(request: Request, { params }: { params: { roadmapId: string } }) {
  const { userId } = await auth();
  if (!userId) return errorResponse("Unauthorized", 401);
  if (userId !== process.env.ADMIN_ID) return errorResponse("Forbidden: Admins only", 403);

  const { roadmapId } = params;
  const body: Partial<RoadmapInput> = await request.json();

  if (!roadmapId) return errorResponse("Missing roadmapId", 400);

  try {
    const updatedRoadmap = await prisma.roadmap.update({
      where: { id: roadmapId },
      data: {
        ...body,
      },
    });

    return successResponse("Roadmap updated successfully", updatedRoadmap);
  } catch (error) {
    console.error("PUT /admin/roadmaps/[roadmapId]/edit", error);
    return errorResponse("Failed to update roadmap", 500);
  }
}

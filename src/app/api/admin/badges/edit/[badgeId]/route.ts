import { isAdminOrThrow } from "@/lib/utils/adminCheck";
import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/utils/response";
import { auth } from "@clerk/nextjs/server";

export async function PUT(
  request: Request,
  { params }: { params: { badgeId: string } }
) {
  try {
    const { userId: clerkId } = await auth();
    isAdminOrThrow(clerkId);

    const { name, image, roadmapId } = await request.json();

    if (!name || !image || !roadmapId) {
      return errorResponse("Name, image, and roadmapId are required", 400);
    }

    // Check if the selected roadmap already has a badge that is not this one
    const targetRoadmap = await prisma.roadmap.findUnique({
      where: { id: roadmapId },
      select: { badgeId: true },
    });

    if (targetRoadmap?.badgeId && targetRoadmap.badgeId !== params.badgeId) {
      return errorResponse(
        "Selected roadmap already has a badge assigned",
        400
      );
    }

    // Remove this badge from any roadmap it's currently linked to
    await prisma.roadmap.updateMany({
      where: { badgeId: params.badgeId },
      data: { badgeId: null },
    });

    // Link the badge to the new roadmap
    await prisma.roadmap.update({
      where: { id: roadmapId },
      data: { badgeId: params.badgeId },
    });

    // Update badge itself
    const updatedBadge = await prisma.badge.update({
      where: { id: params.badgeId },
      data: {
        name,
        image,
      },
    });

    return successResponse("Badge updated successfully", updatedBadge);
  } catch (error) {
    console.error("PUT /api/admin/badges/edit/[badgeId] error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

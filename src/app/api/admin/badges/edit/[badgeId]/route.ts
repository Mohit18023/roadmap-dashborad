import { isAdminOrThrow } from "@/lib/utils/adminCheck";
import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/utils/response";
import { auth } from "@clerk/nextjs/server";

export async function PUT(request: Request, { params }: { params: { badgeId: string } }) {
  try {
    const { userId: clerkId } = await auth();
    isAdminOrThrow(clerkId);  // Admin check

    const { name, image, roadmapId } = await request.json();

    if (!name || !image || !roadmapId) {
      return errorResponse("Name, image, and roadmapId are required", 400);
    }

    // Update the badge
    const updatedBadge = await prisma.badge.update({
      where: { id: params.badgeId },
      data: {
        name,
        image,
        roadmap: {
            connect: { id: roadmapId },
        },
      },
    });

    return successResponse("Badge updated successfully", updatedBadge);
  } catch (error) {
    console.error("PUT /api/admin/badges/edit/[badgeId] error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

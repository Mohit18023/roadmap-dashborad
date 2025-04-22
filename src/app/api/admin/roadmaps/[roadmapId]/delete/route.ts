import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/utils/response";

export async function DELETE(_: Request, { params }: { params: { roadmapId: string } }) {
  const { userId } = await auth();
  if (!userId) return errorResponse("Unauthorized", 401);
  if (userId !== process.env.ADMIN_ID) return errorResponse("Forbidden: Admins only", 403);

  const { roadmapId } = params;

  if (!roadmapId) return errorResponse("Missing roadmapId", 400);

  try {
    await prisma.roadmap.delete({
      where: { id: roadmapId },
    });

    return successResponse("Roadmap deleted successfully",200);
  } catch (error) {
    console.error("DELETE /admin/roadmaps/[roadmapId]/delete", error);
    return errorResponse("Failed to delete roadmap", 500);
  }
}

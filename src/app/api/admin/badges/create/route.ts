import { auth } from "@clerk/nextjs/server";
import { isAdminOrThrow } from "@/lib/utils/adminCheck";
import { errorResponse, successResponse } from "@/lib/utils/response";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return errorResponse("Unauthorized", 401);

    await isAdminOrThrow(clerkId);

    const { name, image, roadmapId } = await req.json();

    if (!name || !image || !roadmapId) {
      return errorResponse("name, image, and roadmapId are required", 400);
    }

    // Check if roadmap exists
    const roadmap = await prisma.roadmap.findUnique({
      where: { id: roadmapId },
    });

    if (!roadmap) return errorResponse("Roadmap not found", 404);

    // Create badge
    const badge = await prisma.badge.create({
      data: {
        name,
        image,
        roadmap: {
          connect: { id: roadmapId },
        },
      },
    });

    return successResponse("Badge created successfully", badge);
  } catch (error) {
    console.error("POST /admin/badges/create error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

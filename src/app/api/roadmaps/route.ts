import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/utils/response";

export async function GET() {
  try {
    const roadmaps = await prisma.roadmap.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse("Fetched all roadmaps", roadmaps);
  } catch (error) {
    console.error("GET /api/roadmaps error:", error);
    return errorResponse("Failed to fetch roadmaps", 500);
  }
}

// /app/api/subtopics/create/route.ts

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/utils/response";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return errorResponse("Unauthorized", 401);
    }

    const { title, description, roadmapId } = await req.json();

    if (!title || !description || !roadmapId) {
      return errorResponse("Title, description, and roadmapId are required", 400);
    }

    // Check if roadmap exists
    const roadmapExists = await prisma.roadmap.findUnique({
      where: { id: roadmapId },
    });

    if (!roadmapExists) {
      return errorResponse("Roadmap not found", 404);
    }

    // Prevent duplicate subtopic titles in the same roadmap
    const existingSubtopic = await prisma.subtopic.findFirst({
      where: {
        title,
        roadmapId,
      },
    });

    if (existingSubtopic) {
      return errorResponse("Subtopic with this title already exists in the roadmap", 409);
    }

    const subtopic = await prisma.subtopic.create({
      data: {
        title,
        description,
        roadmapId,
      },
    });

    return successResponse("Subtopic created successfully", subtopic, 201);
  } catch (error) {
    console.error("POST /api/subtopics/create error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

// /app/api/subtopics/bulk-create/route.ts

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/utils/response";
import { SubtopicInput } from "@/lib/utils/types";

interface BulkSubtopicRequest {
  roadmapId: string;
  subtopics: SubtopicInput[];
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return errorResponse("Unauthorized", 401);

    const { roadmapId, subtopics }: BulkSubtopicRequest = await req.json();

    if (!roadmapId || !Array.isArray(subtopics) || subtopics.length === 0) {
      return errorResponse("roadmapId and at least one subtopic are required", 400);
    }

    // Validate roadmap
    const roadmap = await prisma.roadmap.findUnique({ where: { id: roadmapId } });
    if (!roadmap) return errorResponse("Roadmap not found", 404);

    const existingTitles = await prisma.subtopic.findMany({
      where: {
        roadmapId,
        title: {
          in: subtopics.map((s) => s.title),
        },
      },
      select: {
        title: true,
      },
    });

    const existingSet = new Set(existingTitles.map((e) => e.title));

    const filtered = subtopics.filter(
      (s) => s.title && s.description && !existingSet.has(s.title)
    );

    if (filtered.length === 0) {
      return errorResponse("All provided subtopics already exist or are invalid", 409);
    }

    const created = await prisma.subtopic.createMany({
      data: filtered.map((s) => ({
        title: s.title,
        description: s.description,
        roadmapId,
      })),
    });

    return successResponse("Subtopics created", {
      createdCount: created.count,
      skippedTitles: [...existingSet],
    });
  } catch (error) {
    console.error("POST /api/subtopics/bulk-create error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

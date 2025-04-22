// /app/api/subtopics/[subtopicId]/edit/route.ts

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/utils/response";
import { SubtopicInput } from "@/lib/utils/types";


export async function PATCH(req: Request, { params }: { params: { subtopicId: string } }) {
  try {
    const { userId } = await auth();
    if (!userId) return errorResponse("Unauthorized", 401);

    const { subtopicId } = params;
    const updates: Partial<SubtopicInput> = await req.json();

    if (!subtopicId) return errorResponse("Subtopic ID is required", 400);

    const subtopic = await prisma.subtopic.findUnique({ where: { id: subtopicId } });
    if (!subtopic) return errorResponse("Subtopic not found", 404);

    const updated = await prisma.subtopic.update({
      where: { id: subtopicId },
      data: {
        title: updates.title,
        description: updates.description,
      },
    });

    return successResponse("Subtopic updated", updated);
  } catch (error) {
    console.error("PATCH /api/subtopics/[subtopicId]/edit error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

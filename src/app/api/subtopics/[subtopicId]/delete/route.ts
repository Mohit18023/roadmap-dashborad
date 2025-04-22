// /app/api/subtopics/[subtopicId]/delete/route.ts

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/utils/response";

export async function DELETE(_: Request, { params }: { params: { subtopicId: string } }) {
  try {
    const { userId } = await auth();
    if (!userId) return errorResponse("Unauthorized", 401);

    const { subtopicId } = params;

    const subtopic = await prisma.subtopic.findUnique({ where: { id: subtopicId } });
    if (!subtopic) return errorResponse("Subtopic not found", 404);

    await prisma.subtopic.delete({ where: { id: subtopicId } });

    return successResponse("Subtopic deleted", { id: subtopicId });
  } catch (error) {
    console.error("DELETE /api/subtopics/[subtopicId]/delete error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

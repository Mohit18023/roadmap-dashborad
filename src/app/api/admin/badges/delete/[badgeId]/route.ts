import { isAdminOrThrow } from "@/lib/utils/adminCheck";
import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/utils/response";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(request: Request, { params }: { params: { badgeId: string } }) {
  try {
    const { userId: clerkId } = await auth();
    isAdminOrThrow(clerkId);  // Admin check

    // Delete the badge
    await prisma.badge.delete({
      where: { id: params.badgeId },
    });

    return successResponse("Badge deleted successfully", null);
  } catch (error) {
    console.error("DELETE /api/admin/badges/delete/[badgeId] error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

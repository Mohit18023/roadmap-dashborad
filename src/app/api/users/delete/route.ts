// /app/api/user/delete/route.ts

import { auth } from "@clerk/nextjs/server";
import { errorResponse, successResponse } from "@/lib/utils/response";
import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function DELETE() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return errorResponse("Unauthorized", 401);

    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) return errorResponse("User not found in database", 404);

    // Delete from your own database
    await prisma.user.delete({
      where: { id: user.id },
    });

    // Delete from Clerk
    const client = await clerkClient()
    await client.users.deleteUser(clerkId);

    return successResponse("User deleted from database and Clerk", { id: user.id });
  } catch (error) {
    console.error("DELETE /api/user/delete error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

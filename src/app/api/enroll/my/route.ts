// /app/api/enroll/my/route.ts
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma"; // Using the existing Prisma client
import { successResponse, errorResponse } from "@/lib/utils/response";

export async function GET() {
  try {
    const { userId } = await auth();

    // Ensure the user is authenticated
    if (!userId) {
      return errorResponse("Unauthorized", 401);
    }

    // Retrieve all enrollments for the authenticated user
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        roadmap: true, // Include the roadmap details in the response
      },
    });

    // If no enrollments are found
    if (enrollments.length === 0) {
      return errorResponse("No enrollments found", 404);
    }

    // Return the list of enrollments with roadmap details
    return successResponse("Enrollments fetched successfully", enrollments, 200);

  } catch (error) {
    console.error("GET /api/enroll/my error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

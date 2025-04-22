// /app/api/me/route.ts
import { auth, currentUser } from "@clerk/nextjs/server";

// Import the response utility functions
import { successResponse, errorResponse } from "@/lib/utils/response";

export async function GET() {
  try {
    const { userId } = await auth();

    // Check if user is authenticated
    if (!userId) {
      return errorResponse("User not authenticated", 401);
    }

    const user = await currentUser();

    // Check if user data is found
    if (!user) {
      return errorResponse("User data not found", 404);
    }

    // Return the user data in a success response
    return successResponse(
      "User details fetched successfully",
      {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
      },
      200
    );
  } catch (error) {
    console.error("GET /api/me error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

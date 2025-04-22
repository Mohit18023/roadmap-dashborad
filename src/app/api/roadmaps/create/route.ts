// /app/api/roadmaps/create/route.ts
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma"; // Using the existing Prisma client
import { successResponse, errorResponse } from "@/lib/utils/response";

export async function POST(req: Request) {
  const authResult = await auth();
  console.log('Auth result:', authResult);
  try {
    const { userId } = await auth();
     console.log(userId+" userId from auth");
    // Ensure the user is authenticated and authorized (you may check for admin here)
    if(!userId){
      return errorResponse("No userId found", 401);
    }
    if (userId != process.env.ADMIN_ID) {
      return errorResponse("Unauthorized", 401);
    }

    // You can add additional checks here to ensure the user is an admin (e.g., check user role)

    // Parse request body
    const { title, description, image } = await req.json();

    // Validate input
    if (!title || !description) {
      return errorResponse("Title and description are required", 400);
    }

    // Create a new roadmap
    const roadmap = await prisma.roadmap.create({
      data: {
        title,
        description,
        image, // Optional image URL
      },
    });

    // Return the newly created roadmap
    return successResponse("Roadmap created successfully", roadmap, 201);
    
  } catch (error) {
    console.error("POST /api/roadmaps/create error:", error);
    return errorResponse("Something went wrong", 500);
  }
}

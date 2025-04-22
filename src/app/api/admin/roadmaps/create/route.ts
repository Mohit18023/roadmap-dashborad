import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/lib/utils/response";
import { RoadmapInput } from "@/lib/utils/types"; // make sure this type is defined in utils/types.ts

export async function POST(request: Request) {
  try {
    const { userId: clerkId } = await auth();

    // ✅ Admin Check
    const admins = process.env.ADMINS?.split(",") || [];
    if (!clerkId || !admins.includes(clerkId)) {
      return errorResponse("Unauthorized: Admins only", 401);
    }

    const body: RoadmapInput = await request.json();

    const { title, description, image } = body;

    if (!title || !description) {
      return errorResponse("Title and description are required", 400);
    }

    // 🧱 Create the roadmap
    const roadmap = await prisma.roadmap.create({
      data: {
        title,
        description,
        image,
      },
    });

    return successResponse("Roadmap created successfully", roadmap);
  } catch (error) {
    console.error("POST /admin/roadmaps/create error:", error);
    return errorResponse("Something went wrong while creating the roadmap", 500);
  }
}

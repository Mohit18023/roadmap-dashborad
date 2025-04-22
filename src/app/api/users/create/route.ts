import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      }, { status: 401 });
    }

    const user = await currentUser();

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      }, { status: 404 });
    }

    if (!user?.emailAddresses[0]?.emailAddress) {
      return NextResponse.json({
        success: false,
        message: "Email not found",
      }, { status: 404 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: "User already exists",
        data: {
          user: existingUser,
        },
      }, { status: 200 });
    }

    const createdUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName} ${user.lastName || ""}`.trim(),
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully.",
      data: {
        user: createdUser,
      },
    }, { status: 201 });

  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    }, { status: 500 });
  }
}

'use server';
// app/api/user/formatted/route.ts
import { auth } from "@clerk/nextjs/server";
import { getMockFormattedUser } from "@/lib/actions/user";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getMockFormattedUser(userId);
  return NextResponse.json(user);
}

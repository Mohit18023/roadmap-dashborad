// lib/clerk.ts

import { auth } from "@clerk/nextjs/server";
import prisma from "./prisma";

export async function ensureUserInDB() {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (existingUser) return existingUser;

  // Fetch Clerk user info using Clerk Secret Key
  const res = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user from Clerk");
  }

  const clerkUser = await res.json();

  const newUser = await prisma.user.create({
    data: {
      clerkId: userId,
      name: clerkUser.first_name + " " + clerkUser.last_name,
      email: clerkUser.email_addresses[0].email_address,
      image: clerkUser.image_url,
    },
  });

  return newUser;
}

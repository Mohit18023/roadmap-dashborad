
export function isAdminOrThrow(clerkId: string | null) {
  const admins = process.env.NEXT_PUBLIC_ADMIN_ID?.split(",") || [];
  if (!clerkId || !admins.includes(clerkId)) {
    throw new Error("Unauthorized: Admins only");
  }
}

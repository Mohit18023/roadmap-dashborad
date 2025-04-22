
export function isAdminOrThrow(clerkId: string | null) {
  const admins = process.env.ADMINS?.split(",") || [];
  if (!clerkId || !admins.includes(clerkId)) {
    throw new Error("Unauthorized: Admins only");
  }
}

// /lib/helpers/assignBadge.ts
import prisma from "@/lib/prisma";

export async function assignBadgeIfEligible(userId: string, roadmapId: string) {
  try {
    // Count total subtopics in roadmap
    const totalSubtopics = await prisma.subtopic.count({
      where: { roadmapId },
    });

    // Count how many subtopics the user has completed in that roadmap
    const completedSubtopics = await prisma.userProgress.count({
      where: {
        userId,
        subtopic: {
          roadmapId,
        },
      },
    });

    if (completedSubtopics < totalSubtopics) return;

    const badge = await prisma.badge.findFirst({
        where: {
          roadmap: {
            id: roadmapId,
          },
        },
      });
      
    if (!badge) return;

    const existing = await prisma.userBadge.findUnique({
      where: {
        userId_badgeId: {
          userId,
          badgeId: badge.id,
        },
      },
    });

    if (!existing) {
      await prisma.userBadge.create({
        data: {
          userId,
          badgeId: badge.id,
        },
      });
    }
  } catch (error) {
    console.error("Error assigning badge:", error);
  }
}
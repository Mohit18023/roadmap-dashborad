import prisma from "../prisma";
export async function getMockFormattedUser(userId: string) {
    if (!userId) return null; // Handle the case where userId is not available
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userBadges: {
          include: { badge: true },
        },
        enrollments: {
          include: {
            roadmap: {
              include: {
                subtopics: true,
              },
            },
          },
        },
        progress: true, // We'll use this to calculate progress %
      },
    });
  
    if (!user) return null;
  
    const enrolledRoadmaps = user.enrollments.map((enrollment) => {
      const roadmap = enrollment.roadmap;
      const totalSubtopics = roadmap.subtopics.length;
      const completed = user.progress.filter((p) =>
        roadmap.subtopics.some((s) => s.id === p.subtopicId)
      ).length;
  
      const progress = totalSubtopics > 0 ? Math.round((completed / totalSubtopics) * 100) : 0;
  
      return {
        id: roadmap.id,
        name: roadmap.title,
        progress,
      };
    });
  
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      photoUrl: user.image ?? `https://api.dicebear.com/7.x/avatars/svg?seed=${user.name}`,
      badges: user.userBadges.map((ub) => ({
        id: ub.badge.id,
        name: ub.badge.name,
        imageUrl: ub.badge.image,
      })),
      enrolledRoadmaps,
    };
  }
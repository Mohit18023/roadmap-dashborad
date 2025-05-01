// app/api/subtopics/[subtopicId]/route.ts
import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma'; // Assuming Prisma is used

export async function GET(req: Request, { params }: { params: { subtopicId: string } }) {
  const { subtopicId } = params;

  try {
    const subtopic = await prisma.subtopic.findUnique({
      where: { id: subtopicId },
      include: { roadmap: true }, // Assuming you want to include related roadmap data
    });

    if (!subtopic) {
      return NextResponse.json({ message: 'Subtopic not found.' }, { status: 404 });
    }

    return NextResponse.json({ data: subtopic });
  } catch (err) {
    console.error('Error fetching subtopic:', err);
    return NextResponse.json({ message: 'Failed to fetch subtopic.' }, { status: 500 });
  }
}

// /app/admin/roadmaps/[roadmapId]/page.tsx
export default function EditRoadmapPage({ params }: { params: { roadmapId: string } }) {
    return <div>Edit Roadmap ID: {params.roadmapId}</div>;
  }
  
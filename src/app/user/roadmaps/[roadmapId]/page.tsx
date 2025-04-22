
// app/(dashboard)/roadmaps/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Roadmap } from '@/lib/utils/types';

export default function RoadmapDetailPage() {
  const { roadmapId } = useParams();
  console.log(roadmapId);
  const [roadmap, setRoadmap] = useState<Roadmap>();

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await fetch(`/api/roadmaps/${roadmapId}`);
        const data = await res.json();
        setRoadmap(data.data);
      } catch (err) {
        console.error('Error fetching roadmap', err);
      }
    };

    fetchRoadmap();
  }, [roadmapId]);

  return <div>Roadmap Detail for {roadmapId} (UI to be implemented)
    {
      roadmap ? (
        <div>
          <h1>{roadmap.title}</h1>
          <p>{roadmap.description}</p>
          <h4>{roadmap.id}</h4>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    

  </div>;
}
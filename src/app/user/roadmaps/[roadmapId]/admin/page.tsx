
// app/(dashboard)/roadmaps/[id]/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function RoadmapAdminPage() {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await fetch(`/api/roadmaps/${id}`);
        const data = await res.json();
        setRoadmap(data.data);
      } catch (err) {
        console.error('Error fetching roadmap admin data', err);
      }
    };

    fetchRoadmap();
  }, [id]);

  return <div>Admin Page for Roadmap {id} {roadmap} (UI to be implemented)</div>;
}


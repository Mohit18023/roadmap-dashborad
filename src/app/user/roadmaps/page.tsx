// app/(dashboard)/roadmaps/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Roadmap } from '@/lib/utils/types';

export default function RoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await fetch('/api/roadmaps');
        const data = await res.json();
        console.log(data.data);
        setRoadmaps(data.data);
      } catch (err) {
        console.error('Error fetching roadmaps', err);
      }
    };

    fetchRoadmaps();
  }, []);

  return <div>
    <h1>ALL ROADMAPS</h1>
    {roadmaps.length > 0 ? (
        <ul>
            {roadmaps.map((roadmap) => (
                <li key={roadmap.id}>
                    <a href={`/user/roadmaps/${roadmap.id}`}>{roadmap.title}</a>
                </li>
                
            ))}
        </ul>
    ) : (
        <p>No roadmaps available.</p>
    )}
  </div>;
}

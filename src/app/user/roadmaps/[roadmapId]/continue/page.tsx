// app/(dashboard)/roadmaps/[id]/learn/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function LearnPage() {
  const { id } = useParams();
  const [subtopics, setSubtopics] = useState([]);

  useEffect(() => {
    const fetchLearningData = async () => {
      try {
        const res = await fetch(`/api/roadmaps/${id}/learn`);
        const data = await res.json();
        setSubtopics(data.data);
      } catch (err) {
        console.error('Error fetching learning content', err);
      }
    };

    fetchLearningData();
  }, [id]);

  return <div>Learning Page for Roadmap {id} (UI to be implemented)
  {subtopics}
  </div>;
}

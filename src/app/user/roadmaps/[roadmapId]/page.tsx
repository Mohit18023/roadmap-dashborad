// 'use client';

// // app/(dashboard)/roadmaps/[id]/page.tsx
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { Roadmap } from '@/lib/utils/types';

// interface Subtopic {
//   id: string;
//   title: string;
// }

// export default function RoadmapDetailPage() {
//   const { roadmapId } = useParams();
//   const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
//   const [subtopics, setSubtopics] = useState<Subtopic[]>([]);

//   useEffect(() => {
//     const fetchRoadmap = async () => {
//       try {
//         const res = await fetch(`/api/roadmaps/${roadmapId}`);
//         const data = await res.json();
//         setRoadmap(data.data);
//         setSubtopics(data.data.subtopics || []);
//       } catch (err) {
//         console.error('Error fetching roadmap or subtopics', err);
//       }
//     };

//     if (roadmapId) {
//       fetchRoadmap();
//     }
//   }, [roadmapId]);

//   return (
//     <div>
//       <h1>Roadmap Detail</h1>
//       {roadmap ? (
//         <div>
//           <h2>{roadmap.title}</h2>
//           <p>{roadmap.description}</p>
//           <h4>Roadmap ID: {roadmap.id}</h4>

//           <h3>Subtopics:</h3>
//           {subtopics.length > 0 ? (
//             <ul>
//               {subtopics.map((subtopic) => (
//                 <li key={subtopic.id}>
//                   <a href={`/subtopics/${subtopic.id}`}>{subtopic.title}</a> (ID: {subtopic.id})
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No subtopics available.</p>
//           )}
//         </div>
//       ) : (
//         <p>Loading roadmap...</p>
//       )}
//     </div>
//   );
// }
import { Suspense } from 'react';
import RoadmapPreview from './RoadmapPreview';
import { Loader2 } from "lucide-react";

type PageProps = {
  params: {
    roadmapId: string;
  };
}

export default async function Page({ params }: PageProps) {
  return (
    <Suspense 
      fallback={
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      }
    >
      <RoadmapPreview roadmapId={params.roadmapId} />
    </Suspense>
  );
}

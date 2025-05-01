'use client';

import { Suspense } from 'react';
import { use } from 'react';
import ContinueRoadmap from './ContinueRoadmap';
import { Loader2 } from "lucide-react";

 function RoadmapWrapper({ params }: { params: Promise<{ roadmapId: string }> }) {
  const { roadmapId } = use(params);
  return <ContinueRoadmap roadmapId={roadmapId} />;
}

export default function Page({ params }: { params: Promise<{ roadmapId: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      }
    >
      <RoadmapWrapper params={params} />
    </Suspense>
  );
}
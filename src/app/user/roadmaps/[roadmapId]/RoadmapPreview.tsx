'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';
import { Loader2, CheckCircle2, Circle } from "lucide-react";

interface Subtopic {
    id: string;
    title: string;
    completed: boolean;
}

interface Roadmap {
    id: string;
    title: string;
    subtopics: Subtopic[];
}

export default function RoadmapPreview({ roadmapId }: { roadmapId: string }) {
    const router = useRouter();
    const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const [roadmapRes, subtopicsRes] = await Promise.all([
                    fetch(`/api/roadmaps/${roadmapId}`),
                    fetch(`/api/roadmaps/${roadmapId}/subtopics`)
                ]);

                const [roadmapData, subtopicsData] = await Promise.all([
                    roadmapRes.json(),
                    subtopicsRes.json()
                ]);

                if (roadmapRes.ok && subtopicsRes.ok) {
                    setRoadmap({
                        ...roadmapData.data,
                        subtopics: subtopicsData.data || []
                    });
                } else {
                    toast.error('Failed to load roadmap');
                }
            } catch (error) {
                console.error('Error fetching roadmap:', error);
                toast.error('Error loading roadmap');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRoadmap();
    }, [roadmapId]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    if (!roadmap) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <p className="text-gray-500">Roadmap not found</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
        {/* Header Section - keep the same */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {roadmap.title}
          </h1>
          <Button
            onClick={() => router.push(`/user/roadmaps/${roadmapId}/continue`)}
            className="px-6"
          >
            Continue Learning
          </Button>
        </div>
  
        {/* Roadmap Visualization */}
        <div className="relative py-10">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2" />
  
          {/* Checkpoints */}
          <div className="relative">
            {roadmap.subtopics.map((subtopic, index) => (
              <div
                key={subtopic.id}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 
                    ? 'flex-row' 
                    : 'flex-row-reverse'
                }`}
              >
                {/* Left/Right Spacer */}
                <div className="w-1/2" />
  
                {/* Checkpoint Content */}
                <div className="relative flex items-center">
                  {/* Node */}
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 border-4 z-10 transition-all duration-200 hover:scale-110 ${
                      subtopic.completed 
                        ? 'border-green-500 text-green-500' 
                        : 'border-gray-300 dark:border-gray-600 text-gray-400'
                    }`}
                  >
                    {subtopic.completed ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </div>
  
                  {/* Connecting Line */}
                  <div 
                    className={`absolute top-1/2 w-8 h-0.5 ${
                      subtopic.completed 
                        ? 'bg-green-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    } ${
                      index % 2 === 0 
                        ? '-left-8' 
                        : '-right-8'
                    }`}
                  />
  
                  {/* Content Card */}
                  <div 
                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-all duration-200 hover:scale-105 ${
                      index % 2 === 0 
                        ? 'ml-4' 
                        : 'mr-4'
                    }`}
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {subtopic.title}
                    </h3>
                    <p className={`text-sm mt-1 ${
                      subtopic.completed 
                        ? 'text-green-500' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {subtopic.completed ? 'Completed' : 'Not started'}
                    </p>
                  </div>
                </div>
  
                {/* Right/Left Spacer */}
                <div className="w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

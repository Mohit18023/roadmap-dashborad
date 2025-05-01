'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Define the interface for Subtopic
interface Subtopic {
  id: string;
  title: string;
  description: string;
  roadmapId: string;
}

interface ProgressListProps {
  roadmapId: string;
}

function ProgressBar({
    progress,
    className = '',
  }: {
    progress: number;
    className?: string; // Make className optional
  }) {
    return (
      <div className={`w-full bg-gray-200 rounded-full ${className}`}>
        <div
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
    );
  }
  

export function ProgressList({ roadmapId }: ProgressListProps) {
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    const fetchSubtopics = async () => {
      try {
        const response = await fetch(`/api/roadmaps/${roadmapId}/subtopics`);
        const data = await response.json();

        if (!response.ok) {
          showToast('error', data.message || 'Failed to fetch subtopics');
          return;
        }

        setSubtopics(data.data || []);
        setLoading(false);
      } catch (err) {
        showToast(`error`, 'An error occurred while fetching subtopics: ' + (err as Error).message);
        setLoading(false);
      }
    };

    fetchSubtopics();
  }, [roadmapId, showToast]);

  if (loading) return <div className="p-4">Loading subtopics...</div>;
  if (subtopics.length === 0) return <div className="p-4">No subtopics found.</div>;

  // Calculate progress based on number of subtopics (for now it's 100% as a placeholder)
  const progress = (subtopics.length > 0 ? (subtopics.length / subtopics.length) * 100 : 0);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Roadmap Progress</h2>

      {/* Render ProgressBar */}
      <ProgressBar progress={progress} className="mb-4" />

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Roadmap: {roadmapId}</h3>
        <p className="text-gray-700 dark:text-gray-300">Progress: {progress}%</p>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-2">Subtopics:</h4>
        {subtopics.map((subtopic) => (
          <div key={subtopic.id} className="mb-2">
            <h5 className="text-md font-semibold">{subtopic.title}</h5>
            <p className="text-sm text-gray-500">{subtopic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

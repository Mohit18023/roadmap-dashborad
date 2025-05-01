'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast';
import { Loader2 } from "lucide-react";

interface Subtopic {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

interface Roadmap {
    id: string;
    title: string;
}

export default function ContinueRoadmap({ roadmapId }: { roadmapId: string }) {
    const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
    const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
    const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingDescription, setIsLoadingDescription] = useState(false);

    // Fetch roadmap and subtopics
    useEffect(() => {
        const fetchData = async () => {
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
                    setRoadmap(roadmapData.data);
                    setSubtopics(subtopicsData.data || []);
                    // Set first subtopic as selected by default
                    if (subtopicsData.data?.length > 0) {
                        setSelectedSubtopic(subtopicsData.data[0]);
                    }
                } else {
                    toast.error('Failed to load roadmap data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error loading roadmap data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [roadmapId]);

    // Fetch subtopic description
    const fetchSubtopicDescription = async (subtopicId: string) => {
        setIsLoadingDescription(true);
        try {
            const res = await fetch(`/api/subtopics/${subtopicId}`);
            const data = await res.json();

            if (res.ok) {
                const updatedSubtopic = data.data;
                setSelectedSubtopic(updatedSubtopic);
                setSubtopics(prev =>
                    prev.map(st =>
                        st.id === subtopicId ? updatedSubtopic : st
                    )
                );
            } else {
                toast.error('Failed to load subtopic details');
            }
        } catch (error) {
            console.error('Error fetching subtopic:', error);
            toast.error('Error loading subtopic details');
        } finally {
            setIsLoadingDescription(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            {/* Main Title */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {roadmap?.title}
            </h1>

            {/* Two-column Layout */}
            <div className="flex gap-6 h-[calc(100vh-200px)]">
                {/* Left Column */}
                <div className="w-[350px] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Subtopics
                    </h2>

                    {/* Scrollable Subtopics Grid */}
                    <div className="overflow-y-auto flex-1 pr-2">
                        <div className="grid grid-cols-1 gap-3">
                            {subtopics.map((subtopic) => (
                                <button
                                    key={subtopic.id}
                                    onClick={() => fetchSubtopicDescription(subtopic.id)}
                                    className={`
                    w-full text-left p-4 rounded-lg border transition-all
                    ${subtopic.completed
                                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900'
                                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}
                    ${selectedSubtopic?.id === subtopic.id
                                            ? 'ring-2 ring-blue-500 dark:ring-blue-400'
                                            : ''}
                    hover:shadow-md
                  `}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-2 h-2 rounded-full
                        ${subtopic.completed
                                                    ? 'bg-green-500'
                                                    : 'bg-gray-300 dark:bg-gray-600'}
                      `}
                                        />
                                        <span className={`text-sm font-medium
                      ${subtopic.completed
                                                ? 'text-green-700 dark:text-green-300'
                                                : 'text-gray-700 dark:text-gray-300'}
                    `}>
                                            {subtopic.title}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Description
                    </h2>

                    {/* Description Content */}
                    <div className="overflow-y-auto flex-1 pr-2">
                        {isLoadingDescription ? (
                            <div className="flex justify-center items-center h-full">
                                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                            </div>
                        ) : selectedSubtopic ? (
                            <div className="prose dark:prose-invert max-w-none">
                                <h3 className="text-lg font-semibold mb-4">
                                    {selectedSubtopic.title}
                                </h3>
                                <div dangerouslySetInnerHTML={{ __html: selectedSubtopic.description }} />
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">
                                Select a subtopic to view its description
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Floating Next Button */}
            <Button
                className="fixed bottom-6 right-6 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                size="lg"
            >
                Next
                <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </Button>
        </div>
    );
}
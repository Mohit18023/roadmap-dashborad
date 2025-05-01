'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { Loader2 } from "lucide-react";

interface Roadmap {
  id: string;
  title: string;
  description: string;
}

export default function RoadmapsPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Admin check
  useEffect(() => {
    if (!isLoaded) return;
    const adminId = process.env.NEXT_PUBLIC_ADMIN_ID;
    if (!userId || userId !== adminId) {
      toast.error('Access Denied: Admins only');
      router.push('/');
      return;
    }
    setIsAdmin(true);
  }, [isLoaded, userId, router]);

  // Fetch roadmaps
  useEffect(() => {
    if (!isAdmin) return;

    const fetchRoadmaps = async () => {
      try {
        const res = await fetch('/api/roadmaps');
        const data = await res.json();
        if (res.ok) {
          setRoadmaps(data.data || []);
        } else {
          toast.error('Failed to load roadmaps');
        }
      } catch (error) {
        console.error('Failed to fetch roadmaps:', error);
        toast.error('Error loading roadmaps');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmaps();
  }, [isAdmin]);

  const handleDelete = async (roadmapId: string) => {
    if (!confirm('Are you sure you want to delete this roadmap?')) return;

    try {
      const res = await fetch(`/api/admin/roadmaps/${roadmapId}/delete`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setRoadmaps(prev => prev.filter(roadmap => roadmap.id !== roadmapId));
        toast.success('Roadmap deleted successfully');
        router.push('/admin/roadmaps');
      } else {
        toast.error('Failed to delete roadmap');
      }
    } catch (error) {
      console.error('Error deleting roadmap:', error);
      toast.error('Error deleting roadmap');
    }
  };

  if (!isLoaded || !isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Roadmaps
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create Roadmap Card */}
          <Link href="/admin/roadmaps/create" className="block h-full">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-dashed border-gray-200 dark:border-gray-800 h-full">
              <CardHeader className="flex items-center justify-center h-full text-center">
                <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3 mb-4">
                  <svg
                    className="w-6 h-6 text-gray-600 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <CardTitle className="text-gray-600 dark:text-gray-400">
                  Create Roadmap
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>

          {/* Existing Roadmaps */}
          {roadmaps.map((roadmap) => (
            <Card key={roadmap.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg truncate">
                      {roadmap.title}
                    </CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {roadmap.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end">
                <div className="flex space-x-2 mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => router.push(`/admin/roadmaps/${roadmap.id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDelete(roadmap.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Fill empty space with invisible cards to maintain grid alignment */}
          {roadmaps.length === 0 && (
            <>
              <div className="hidden md:block" />
              <div className="hidden md:block" />
            </>
          )}
        </div>
      )}
    </div>
  );
}

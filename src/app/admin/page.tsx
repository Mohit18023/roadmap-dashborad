'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded) {
      const adminId = process.env.NEXT_PUBLIC_ADMIN_ID;
      if (user?.id !== adminId) {
        router.replace('/profile'); // redirect if not admin
      }
    }
  }, [isLoaded, user, router]);

  // Optional: show nothing or a loader while checking
  if (!isLoaded || (user && user.id !== process.env.NEXT_PUBLIC_ADMIN_ID)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Welcome Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome, Admin
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your platform&apos;s content and resources
        </p>
      </div>

      {/* Operations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Badges Card */}
        <Link href="/admin/badges">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                <svg 
                  className="w-6 h-6 text-purple-600 dark:text-purple-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <CardTitle className="text-xl mb-2">Badges</CardTitle>
              <CardDescription>
                Create and manage achievement badges for users
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        {/* Roadmaps Card */}
        <Link href="/admin/roadmaps">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                <svg 
                  className="w-6 h-6 text-blue-600 dark:text-blue-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <CardTitle className="text-xl mb-2">Roadmaps</CardTitle>
              <CardDescription>
                Design and organize learning paths
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        {/* Create Subtopic Card */}
        <Link href="/admin/subtopics/create">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                <svg 
                  className="w-6 h-6 text-green-600 dark:text-green-400" 
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
              <CardTitle className="text-xl mb-2">Create Subtopic</CardTitle>
              <CardDescription>
                Add new learning subtopics to roadmaps
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* Quick Stats Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Roadmaps
            </CardTitle>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Active Users
            </CardTitle>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">1,234</p>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Badges
            </CardTitle>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">25</p>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

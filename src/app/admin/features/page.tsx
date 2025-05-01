import { Suspense } from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";
import Link from 'next/link';

function LoadingCard() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-200 dark:bg-blue-900 rounded" />
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="mt-2 h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
      </CardHeader>
    </Card>
  );
}

function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Link href="/admin/features/doc">
        <Card className="hover:shadow-lg transition-all cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <span>Create Roadmap from Document</span>
            </CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              Upload a document or image to automatically create a roadmap using AI
            </p>
          </CardHeader>
        </Card>
      </Link>

      {/* Add more feature cards here */}
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Features</h1>
      
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      }>
        <FeatureCards />
      </Suspense>
    </div>
  );
}

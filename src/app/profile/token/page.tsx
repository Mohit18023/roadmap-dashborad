'use client';

import { Button } from "@/components/ui/button";

interface Subtopic {
  id: string;
  title: string;
  completed: boolean;
}

// Mock data for demonstration
const mockSubtopics: Subtopic[] = [
  { id: '1', title: 'Introduction', completed: true },
  { id: '2', title: 'Basic Concepts', completed: true },
  { id: '3', title: 'Advanced Topics', completed: false },
  { id: '4', title: 'Best Practices', completed: false },
  { id: '5', title: 'Common Patterns', completed: false },
  { id: '6', title: 'Performance', completed: false },
  // Add more subtopics as needed
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Main Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Learning React Fundamentals
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
              {mockSubtopics.map((subtopic) => (
                <div
                  key={subtopic.id}
                  className={`
                    p-4 rounded-lg border transition-colors
                    ${subtopic.completed 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900' 
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}
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
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Description
          </h2>
          
          {/* Scrollable Description Content */}
          <div className="overflow-y-auto flex-1 pr-2">
            <div className="prose dark:prose-invert max-w-none">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <h3>Key Points</h3>
              <ul>
                <li>Understanding React components</li>
                <li>State management fundamentals</li>
                <li>Props and component communication</li>
                <li>Lifecycle methods and hooks</li>
              </ul>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <h3>Advanced Concepts</h3>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              {/* Add more content as needed */}
            </div>
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

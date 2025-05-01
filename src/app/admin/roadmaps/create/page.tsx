'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'react-hot-toast';
import { Loader2 } from "lucide-react";

export default function CreateRoadmapPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateRoadmap = async () => {
    if (!title || !description) {
      toast.error('Title and description are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/roadmaps/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title,
          description,
          image,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success('Roadmap created successfully!');
        router.push('/admin/roadmaps');
      } else {
        toast.error(data.message || 'Failed to create roadmap');
      }
    } catch (error) {
      console.error('Error creating roadmap:', error);
      toast.error('Error creating roadmap');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500 dark:text-gray-400">
          Please log in to create a roadmap.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Roadmap</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Title
            </label>
            <Input
              type="text"
              placeholder="Enter roadmap title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Description
            </label>
            <Textarea
              placeholder="Enter roadmap description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
              disabled={isSubmitting}
            />
          </div>

          {/* Image URL Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Image URL (optional)
            </label>
            <Input
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Preview Section */}
          {image && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Preview</label>
              <div className="w-full h-40 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <img
                  src={image}
                  alt="Roadmap preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/default-roadmap.png';
                  }}
                />
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => router.push('/admin/roadmaps')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateRoadmap}
            disabled={isSubmitting || !title || !description}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Roadmap'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

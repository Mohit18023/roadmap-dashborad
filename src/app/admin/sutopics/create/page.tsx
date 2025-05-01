// 'use client';

// import { useEffect, useState } from 'react';
// import { useAuth } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// interface Roadmap {
//   id: string;
//   title: string;
// }


// export default function CreateSubtopicPage() {
//     const { isLoaded, userId } = useAuth();
//     const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
//     const [selectedRoadmapId, setSelectedRoadmapId] = useState('');
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [message, setMessage] = useState('');
//     const [isAdmin, setIsAdmin] = useState(false);
//     const router = useRouter();
  
//     useEffect(() => {
//       if (!isLoaded) return;

//       const adminId = process.env.NEXT_PUBLIC_ADMIN_ID;

//       console.log(adminId, userId);
//       if (!userId || userId !== adminId) {
//         toast.error('Access Denied: Admins only');
//         router.push('/'); // or /access-denied if you have that page
//         return;
//       }
  
//       setIsAdmin(true); // allow access
//     }, [isLoaded, userId]);
  
//     useEffect(() => {
//       const fetchRoadmaps = async () => {
//         try {
//           const res = await fetch('/api/roadmaps');
//           const data = await res.json();
//           setRoadmaps(data.data || []);
//         } catch (error) {
//           console.error('Failed to fetch roadmaps', error);
//         }
//       };
  
//       if (isAdmin) fetchRoadmaps();
//     }, [isAdmin]);
  
//     const handleCreateSubtopic = async () => {
//       if (!selectedRoadmapId || !title || !description) {
//         setMessage('Please fill all required fields.');
//         return;
//       }
  
//       try {
//         const response = await fetch('/api/subtopics/create', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             roadmapId: selectedRoadmapId,
//             title,
//             description, // ✅ match schema
//           }),
//         });
  
//         const data = await response.json();
//         if (response.ok) {
//           setMessage('Subtopic created successfully!');
//           setTitle('');
//           setDescription('');
//           setSelectedRoadmapId('');
//         } else {
//           setMessage(data.message || 'Failed to create subtopic.');
//         }
//       } catch (err) {
//         console.error(err);
//         setMessage('Error creating subtopic.');
//       }
//     };
  
//     if (!isLoaded || !isAdmin) return null;
  
//     return (
//       <div>
//         <h1>Create New Subtopic</h1>
  
//         <select
//           value={selectedRoadmapId}
//           onChange={(e) => setSelectedRoadmapId(e.target.value)}
//         >
//           <option value="">Select Roadmap</option>
//           {roadmaps.map((r) => (
//             <option key={r.id} value={r.id}>
//               {r.title}
//             </option>
//           ))}
//         </select>
  
//         <input
//           type="text"
//           placeholder="Subtopic Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Short Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
  
//         <button onClick={handleCreateSubtopic}>Create Subtopic</button>
  
//         <div>{message}</div>
//       </div>
//     );
//   }


'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface Roadmap {
  id: string;
  title: string;
}

export default function CreateSubtopicPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsLoading(false);
  }, [isLoaded, userId, router]);

  // Fetch roadmaps
  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await fetch('/api/roadmaps');
        const data = await res.json();
        setRoadmaps(data.data || []);
      } catch (error) {
        console.error('Failed to fetch roadmaps', error);
        toast.error('Failed to load roadmaps');
      }
    };
    
    if (isAdmin) fetchRoadmaps();
  }, [isAdmin]);

  const handleCreateSubtopic = async () => {
    if (!selectedRoadmapId || !title || !description) {
      toast.error('Please fill all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/subtopics/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roadmapId: selectedRoadmapId,
          title,
          description,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Subtopic created successfully!');
        setTitle('');
        setDescription('');
        setSelectedRoadmapId('');
        router.push('/admin/roadmaps'); // or wherever you want to redirect
      } else {
        toast.error(data.message || 'Failed to create subtopic');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error creating subtopic');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded || !isAdmin) return null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Subtopic</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Roadmap Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Select Roadmap
            </label>
            <Select
              value={selectedRoadmapId}
              onValueChange={setSelectedRoadmapId}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a roadmap" />
              </SelectTrigger>
              <SelectContent>
                {roadmaps.length === 0 ? (
                  <SelectItem value="none" disabled>
                    No roadmaps available
                  </SelectItem>
                ) : (
                  roadmaps.map((roadmap) => (
                    <SelectItem key={roadmap.id} value={roadmap.id}>
                      {roadmap.title}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Subtopic Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Subtopic Title
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter subtopic title"
              disabled={isSubmitting}
            />
          </div>

          {/* Description Textarea */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter subtopic description"
              className="min-h-[100px]"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <Button
            className="w-full"
            onClick={handleCreateSubtopic}
            disabled={isSubmitting || !title || !description || !selectedRoadmapId}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Subtopic...
              </>
            ) : (
              'Create Subtopic'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

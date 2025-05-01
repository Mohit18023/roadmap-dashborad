// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// import { Roadmap } from '@/lib/utils/types';

// export default function CreateBadgePage() {
//   const router = useRouter();
//   const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
//   const [selectedRoadmapId, setSelectedRoadmapId] = useState('');
//   const [name, setName] = useState('');
//   const [image, setImage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Fetch all roadmaps to populate dropdown
//   useEffect(() => {
//     const fetchRoadmaps = async () => {
//       try {
//         const res = await fetch('/api/roadmaps');
//         const data = await res.json();
//         if (res.ok) {
//           setRoadmaps(data.data);
//         } else {
//           toast.error(data.message || 'Failed to load roadmaps');
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error('Error loading roadmaps');
//       }
//     };

//     fetchRoadmaps();
//   }, []);

//   const handleSubmit = async () => {
//     if (!name || !image || !selectedRoadmapId) {
//       toast.error('All fields are required');
//       return;
//     }
//     console.log('Creating badge:', { name, image, selectedRoadmapId });

//     setIsSubmitting(true);

//     try {
//       const res = await fetch('/api/admin/badges/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, image, roadmapId: selectedRoadmapId }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         toast.success('Badge created successfully!');
//         router.push('/admin/badges'); // Redirect to badge list if desired
//       } else {
//         toast.error(data.message || 'Failed to create badge');
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Something went wrong');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
//       <h1 className="text-2xl font-semibold mb-4">Create Badge</h1>

//       <label className="block mb-2 font-medium">Badge Name</label>
//       <input
//         type="text"
//         className="w-full px-4 py-2 border rounded mb-4"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="e.g., Frontend Master"
//       />

//       <label className="block mb-2 font-medium">Badge Image URL</label>
//       <input
//         type="text"
//         className="w-full px-4 py-2 border rounded mb-4"
//         value={image}
//         onChange={(e) => setImage(e.target.value)}
//         placeholder="e.g., https://imgur.com/your-badge.png"
//       />

//       <label className="block mb-2 font-medium">Select Roadmap</label>
//       <select
//         className="w-full px-4 py-2 border rounded mb-6"
//         value={selectedRoadmapId}
//         onChange={(e) => setSelectedRoadmapId(e.target.value)}
//       >
//         <option value="">-- Select Roadmap --</option>
//         {roadmaps.map((roadmap) => (
//           <option key={roadmap.id} value={roadmap.id}>
//             {roadmap.title}
//           </option>
//         ))}
//       </select>

//       <button
//         onClick={handleSubmit}
//         disabled={isSubmitting}
//         className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//       >
//         {isSubmitting ? 'Creating...' : 'Create Badge'}
//       </button>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Roadmap } from '@/lib/utils/types';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function CreateBadgePage() {
  const router = useRouter();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all roadmaps to populate dropdown
  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await fetch('/api/roadmaps');
        const data = await res.json();
        if (res.ok) {
          // Filter roadmaps where BadgeId is null or undefined
          const availableRoadmaps = data.data.filter(
            (roadmap: Roadmap) => !roadmap.badgeId
          );
          setRoadmaps(availableRoadmaps);
        } else {
          toast.error(data.message || 'Failed to load roadmaps');
        }
      } catch (err) {
        console.error(err);
        toast.error('Error loading roadmaps');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoadmaps();
  }, []);

  const handleSubmit = async () => {
    if (!name || !image || !selectedRoadmapId) {
      toast.error('All fields are required');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/badges/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, image, roadmapId: selectedRoadmapId }),
      });
      
      const data = await res.json();
      if (res.ok) {
        toast.success('Badge created successfully!');
        router.push('/admin/badges');
      } else {
        toast.error(data.message || 'Failed to create badge');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <CardTitle className="text-2xl">Create Badge</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Badge Name Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Badge Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Frontend Master"
              disabled={isSubmitting}
            />
          </div>

          {/* Badge Image URL Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Badge Image URL
            </label>
            <Input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="e.g., https://imgur.com/your-badge.png"
              disabled={isSubmitting}
            />
          </div>

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
                <SelectValue placeholder="Select a roadmap" />
              </SelectTrigger>
              <SelectContent>
                {roadmaps.length === 0 ? (
                  <SelectItem value="none" disabled>
                    No available roadmaps
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

          {/* Preview Section */}
          {image && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Badge Preview</label>
              <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                <img
                  src={image}
                  alt="Badge preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/default-badge.png';
                  }}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isSubmitting || !name || !image || !selectedRoadmapId}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Badge...
              </>
            ) : (
              'Create Badge'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}


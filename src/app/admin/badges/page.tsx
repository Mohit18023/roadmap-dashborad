// 'use client';

// import { useEffect, useState } from 'react';
// import { useAuth } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
// // import Image from "next/image";

// interface Roadmap {
//   id: string;
//   title: string;
//   badgeId: string | null;
// }

// interface Badge {
//   id: string;
//   name: string;
//   image: string;
//   createdAt: string;
//   roadmap?: Roadmap | null;
// }

// export default function AllBadgesPage() {
//   const { isLoaded, userId } = useAuth();
//   const router = useRouter();
//   const [badges, setBadges] = useState<Badge[]>([]);
//   const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingBadge, setEditingBadge] = useState<Badge | null>(null);

//   const [editName, setEditName] = useState('');
//   const [editImage, setEditImage] = useState('');
//   const [editRoadmapId, setEditRoadmapId] = useState('');

//   useEffect(() => {
//     if (!isLoaded) return;
//     const adminId = process.env.NEXT_PUBLIC_ADMIN_ID;
//     if (!userId || userId !== adminId) {
//       toast.error('Access Denied: Admins only');
//       router.push('/');
//       return;
//     }
//     setIsAdmin(true);
//   }, [isLoaded, userId]);

//   useEffect(() => {
//     if (!isAdmin) return;

//     const fetchAll = async () => {
//       const [badgesRes, roadmapsRes] = await Promise.all([
//         fetch('/api/badges'),
//         fetch('/api/roadmaps'),
//       ]);
//       const badgesData = await badgesRes.json();
//       const roadmapsData = await roadmapsRes.json();
//       setBadges(badgesData.data || []);
//       setRoadmaps(roadmapsData.data || []);
//     };

//     fetchAll();
//   }, [isAdmin]);

//   const handleDelete = async (id: string) => {
//     const res = await fetch(`/api/admin/badges/delete/${id}`, {
//       method: 'DELETE',
//     });
//     if (res.ok) {
//       toast.success("Badge deleted!");
//       setBadges(prev => prev.filter(b => b.id !== id));
//     } else {
//       toast.error("Failed to delete badge.");
//     }
//   };

//   const openEditModal = (badge: Badge) => {
//     setEditingBadge(badge);
//     setEditName(badge.name);
//     setEditImage(badge.image);
//     setEditRoadmapId(badge.roadmap?.id || '');
//     setIsEditModalOpen(true);
//   };

//   const handleEditSave = async () => {
//     if (!editingBadge) return;

//     const res = await fetch(`/api/admin/badges/edit/${editingBadge.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         name: editName,
//         image: editImage,
//         roadmapId: editRoadmapId,
//       }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       toast.success("Badge updated!");
//       setIsEditModalOpen(false);
//       // Update local state
//       setBadges(prev =>
//         prev.map(b =>
//           b.id === editingBadge.id
//             ? { ...b, name: editName, image: editImage, roadmap: roadmaps.find(r => r.id === editRoadmapId) || null }
//             : b
//         )
//       );
//     } else {
//       toast.error(data.message || "Edit failed");
//     }
//   };

//   if (!isLoaded || !isAdmin) return null;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">All Badges</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {badges.map((badge) => (
//           <div key={badge.id} className="border rounded-md shadow-sm p-4 bg-white space-y-2">
//             <div className="text-xl font-semibold">{badge.name}</div>
//             {badge.image && (
//               <div className="h-32 relative">
//                 {/* <Image
//                   src={badge.image}
//                   alt={badge.name}
//                   layout="fill"
//                   objectFit="contain"
//                   onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
//                 /> */}
//               </div>
//             )}
//             <div className="text-sm text-gray-600">
//               Roadmap: {badge.roadmap ? `${badge.roadmap.title} (${badge.roadmap.id})` : "None"}
//             </div>
//             <div className="flex gap-2 pt-2">
//               <Button onClick={() => openEditModal(badge)}>Edit</Button>
//               <Button variant="destructive" onClick={() => handleDelete(badge.id)}>Delete</Button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Edit Modal */}
//       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Badge</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-3">
//             <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Badge Name" />
//             <Input value={editImage} onChange={(e) => setEditImage(e.target.value)} placeholder="Image URL" />
//             <Select value={editRoadmapId} onValueChange={setEditRoadmapId}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select a roadmap" />
//               </SelectTrigger>
//               <SelectContent>
//                 {roadmaps.map((roadmap) => (
//                   <SelectItem
//                     key={roadmap.id}
//                     value={roadmap.id}
//                     disabled={!!(roadmap.badgeId && roadmap.badgeId !== editingBadge?.id)}

//                   >
//                     {roadmap.title}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <DialogFooter>
//             <Button onClick={handleEditSave}>Save</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface Badge {
  id: string;
  name: string;
  image: string;
  roadmapId?: string;
}

interface Roadmap {
  id: string;
  title: string;
}

export default function AllBadgesPage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBadge, setEditingBadge] = useState<Badge | null>(null);
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editRoadmapId, setEditRoadmapId] = useState('');
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

  // Fetch badges and roadmaps
  useEffect(() => {
    if (!isAdmin) return;

    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const [badgesRes, roadmapsRes] = await Promise.all([
          fetch('/api/badges'),
          fetch('/api/roadmaps'),
        ]);
        const badgesData = await badgesRes.json();
        const roadmapsData = await roadmapsRes.json();
        setBadges(badgesData.data || []);
        setRoadmaps(roadmapsData.data || []);
      } catch (error) {
        toast.error(`Failed to fetch data: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, [isAdmin]);

  const handleEdit = (badge: Badge) => {
    setEditingBadge(badge);
    setEditName(badge.name);
    setEditImage(badge.image);
    setEditRoadmapId(badge.roadmapId || '');
    setIsEditModalOpen(true);
  };

  const handleDelete = async (badgeId: string) => {
    if (!confirm('Are you sure you want to delete this badge?')) return;

    try {
      const response = await fetch(`/api/admin/badges/delete/${badgeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBadges(prev => prev.filter(badge => badge.id !== badgeId));
        toast.success('Badge deleted successfully');
      } else {
        toast.error('Failed to delete badge');
      }
    } catch (error) {
      toast.error(`Error deleting badge: ${error}`);
    }
  };

  const handleSave = async () => {
    if (!editingBadge) return;

    try {
      const response = await fetch(`/api/admin/badges/edit/${editingBadge.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editName,
          image: editImage,
          roadmapId: editRoadmapId,
        }),
      });

      if (response.ok) {
        setBadges(prev =>
          prev.map(badge =>
            badge.id === editingBadge.id
              ? { ...badge, title: editName, image: editImage, roadmapId: editRoadmapId }
              : badge
          )
        );
        setIsEditModalOpen(false);
        toast.success('Badge updated successfully');
      } else {
        toast.error('Failed to update badge');
      }
    } catch (error) {
      toast.error(`Error updating badge: ${error}`);
    }
  };

  if (!isLoaded || !isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Badges
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create Badge Card */}
          <Link href="/admin/badges/create">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-dashed border-gray-200  dark:border-gray-800">
              <CardHeader className="flex items-center justify-center h-full text-center">
                <div className="rounded-full bg-gray-400 dark:bg-gray-800 p-3 mb-4">
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
                <CardTitle className="text-gray-600 dark:text-gray-400">Create Badge</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          {/* Existing Badges */}
          {badges.map((badge) => (
            <Card key={badge.id} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={badge.image}
                        alt='/default-badge.jpeg'
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/default-badge.jpeg';
                        }}
                      />
                    </div>
                    <CardTitle className="text-lg">{badge.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(badge)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(badge.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Badge</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Badge name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
                placeholder="Image URL"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Roadmap</label>
              <Select value={editRoadmapId} onValueChange={setEditRoadmapId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a roadmap" />
                </SelectTrigger>
                <SelectContent>
                  {roadmaps.map((roadmap) => (
                    <SelectItem key={roadmap.id} value={roadmap.id}>
                      {roadmap.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


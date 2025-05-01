'use client';

import { useEffect, useState } from 'react';
import { ProfileModal } from '@/components/ui/profileModal';
import { Button } from '@/components/ui/button';

const fallbackUser = {
  id: "USR123",
  name: "Mohit Choudhary",
  email: "mohitchoudhary@gmail.com",
  photoUrl: "/default.png",
  badges: [
    { id: "1", name: "JavaScript Master", imageUrl: "/badges/js.png" },
    { id: "2", name: "React Pro", imageUrl: "/badges/react.png" },
    { id: "3", name: "TypeScript Expert", imageUrl: "/badges/ts.png" },
  ],
  enrolledRoadmaps: [
    { id: "1", name: "Frontend Development", progress: 75 },
    { id: "2", name: "React Mastery", progress: 45 },
    { id: "3", name: "TypeScript Fundamentals", progress: 90 },
  ]
};

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<typeof fallbackUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/formatted");
        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setUser(fallbackUser); // use fallback if fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Button onClick={() => setIsModalOpen(true)}>
        View Profile
      </Button>

      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user || fallbackUser}
      />
    </div>
  );
}

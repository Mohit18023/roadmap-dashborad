// /app/badges/page.tsx
// app/(dashboard)/badges/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function BadgesPage() {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const res = await fetch('/api/badges');
        const data = await res.json();
        setBadges(data.data);
      } catch (err) {
        console.error('Error fetching badges', err);
      }
    };

    fetchBadges();
  }, []);

  return <div>Badges Page (UI to be implemented){badges}</div>;
}

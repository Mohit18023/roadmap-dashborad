'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

type Badge = {
  id: string
  name: string
  image: string
}

export default function BadgeList({ userId }: { userId: string }) {
  const [badges, setBadges] = useState<Badge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const res = await fetch(`/api/user/${userId}/badges`)
        const data = await res.json()
        setBadges(data.badges || [])
      } catch (err) {
        console.error('Error fetching badges:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBadges()
  }, [userId])

  if (loading) return <p className="text-sm text-gray-500">Loading badges...</p>

  if (badges.length === 0)
    return (
      <p className="text-center text-sm text-gray-600 mt-2 italic">
        No badges earned yet.
      </p>
    )

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full shadow-sm"
        >
          <Image src={badge.image} alt={badge.name} width={24} height={24} />
          <span className="text-sm text-black">{badge.name}</span>
        </div>
      ))}
    </div>
  )
}

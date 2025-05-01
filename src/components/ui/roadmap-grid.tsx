'use client'

import { Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { toast } from 'react-toastify' // Assuming you're using react-toastify for notifications

// Roadmap interface based on your provided format
export interface Roadmap {
  id: string;
  title: string;
  description: string;
  image?: string;
  badgeId: string | null;
  createdAt: string; // Dates as strings since it's JSON
  updatedAt: string;
}

export function RoadmapGrid() {
  const { user, isLoaded } = useUser()  // Check if the user is authenticated
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchRoadmaps() {
      try {
        const res = await fetch('/api/roadmaps')
        const data = await res.json()

        // Check if the response contains the expected 'data' field with an array of roadmaps
        if (data.success && Array.isArray(data.data)) {
          setRoadmaps(data.data) // Set the roadmaps data
        } else {
          console.error('Unexpected response format:', data)
        }
      } catch (error) {
        console.error('Error fetching roadmaps:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isLoaded && !user) {
      // Redirect to sign-in and show toast if the user is not authenticated
      toast.info('Please log in to see roadmaps')
      router.push('/sign-in')
    } else if (isLoaded) {
      fetchRoadmaps()
    }
  }, [isLoaded, user, router])

  if (loading) {
    return <div>Loading...</div>
  }

  const handleRoadmapClick = (roadmapId: string) => {
    router.push(`/user/roadmaps/${roadmapId}`)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {roadmaps.map((roadmap) => (
        <Card
          key={roadmap.id}
          className="group relative overflow-hidden transition-colors hover:bg-accent cursor-pointer"
          onClick={() => handleRoadmapClick(roadmap.id)}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{roadmap.title}</span>
            </CardTitle>
          </CardHeader>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </Card>
      ))}
    </div>
  )
}

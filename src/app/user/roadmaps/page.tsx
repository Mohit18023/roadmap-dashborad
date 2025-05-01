'use client'

import { useEffect, useState } from 'react'
import { Roadmap } from '@/lib/utils/types'
import { RoadmapGrid } from '@/components/ui/roadmap-grid' // Import the RoadmapGrid component

export default function RoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([])
  const [loading, setLoading] = useState(true) // State for loading indicator

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await fetch('/api/roadmaps')
        const data: { data: Roadmap[] } = await res.json() // Assuming data is nested under 'data' in the response
        setRoadmaps(data.data)
      } catch (err) {
        console.error('Error fetching roadmaps', err)
      } finally {
        setLoading(false) // Set loading to false once data is fetched or error occurs
      }
    }

    fetchRoadmaps()
  }, [])

  return (
    <div>
      {/* Title */}
      <h1 className="text-center text-3xl font-bold my-8">All Roadmaps</h1>

      {/* Main content container */}
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="text-center my-8">
            <p>Loading...</p> {/* You can replace this with a spinner if you prefer */}
          </div>
        ) : roadmaps.length > 0 ? (
          <RoadmapGrid  /> // Pass roadmaps data to RoadmapGrid
        ) : (
          <p>No roadmaps available.</p>
        )}
      </div>
    </div>
  )
}

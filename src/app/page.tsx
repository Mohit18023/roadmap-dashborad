'use client'

import { Button } from "@/components/ui/button"
import { RoadmapGrid } from "@/components/ui/roadmap-grid"
import { Link } from "lucide-react"


export default function Home() {
  return (
    <div className="container max-w-screen-2xl py-6 lg:py-10">
     <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 sm:text-5xl xl:text-6xl">
          Developer Roadmaps
        </h1>
        <p className="mt-4 max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Timeleft is a community effort to create roadmaps, guides and other educational content
          to help guide developers in picking up a path and guide their learnings.
        </p>
        <div className="mt-4 space-x-4">
          <Button variant="outline" size="lg">
            <span className="mr-2">▶</span>
            Practice your skills with projects
          </Button>
          <Button size="lg" asChild>
            <Link href="/create-roadmap">Create Custom Roadmap</Link>
          </Button>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">Role-based Roadmaps</h2>
        <RoadmapGrid />
      </div>
    </div>
  )
}


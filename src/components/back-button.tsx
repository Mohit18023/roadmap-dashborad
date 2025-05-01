'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-9 px-0"
      onClick={() => router.back()}
      aria-label="Go back to previous page"
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  )
}


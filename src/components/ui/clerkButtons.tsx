// components/ClerkButtons.tsx
'use client'

import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function ClerkButtons() {
  return (
    <div className="flex space-x-4">
      <SignInButton>
        <Button variant="outline" className="hover:text-black">Sign In</Button>
      </SignInButton>
      <SignUpButton>
        <Button variant="default" className="hover:text-black">Sign Up</Button>
      </SignUpButton>
    </div>
  )
}

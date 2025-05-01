// 'use client'

// import Link from 'next/link'
// import { Menu } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { useUser } from '@clerk/nextjs'

// export function Navigation() {
//   const { isLoaded, user } = useUser()

//   // Show a loading state until Clerk has determined if the user is authenticated
//   if (!isLoaded) {
//     return (
//       <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-14 max-w-screen-2xl items-center">
//           <div className="flex flex-1 items-center justify-between space-x-2 md:justify-start">
//             <div className="flex items-center space-x-2">
//               <Link href="/" className="flex items-center space-x-2">
//                 <span className="font-bold">Roadmap dashboard</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>
//     )
//   }

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-14 max-w-screen-2xl items-center">
//         <div className="flex flex-1 items-center justify-between space-x-2 md:justify-start">
//           <div className="flex items-center space-x-2">
//             <Link href="/" className="flex items-center space-x-2">
//               <span className="font-bold">Roadmap dashboard</span>
//             </Link>
//           </div>
//           <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
//             {user && (
//               <Link href="/user/roadmaps" className="text-sm font-medium">
//                 All Roadmaps
//               </Link>
//             )}
//           </nav>
//         </div>
//         <div className="flex items-center justify-end space-x-2">
//           {!user ? (
//             <>
//               <Button variant="ghost" asChild>
//                 <Link href="/sign-in">Login</Link>
//               </Button>
//               <Button asChild>
//                 <Link href="/sign-up">Sign Up</Link>
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button variant="ghost" size="icon" asChild>
//                 <Link href="/profile">
//                   <img
//                     src="/default.png"
//                     alt="Profile"
//                     className="h-8 w-8 rounded-full object-cover"
//                   />
//                 </Link>
//               </Button>
//             </>
//           )}
//           <Button variant="ghost" size="icon" className="md:hidden">
//             <Menu className="h-5 w-5" />
//           </Button>
//         </div>
//       </div>
//     </header>
//   )
// }


'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, BookOpen, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const { isLoaded, user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Loading state with skeleton
  if (!isLoaded) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex flex-1 items-center justify-between">
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            <div className="flex space-x-2">
              <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        {/* Logo and Main Nav */}
        <div className="flex items-center space-x-4">
          <Link 
            href="/" 
            className="flex items-center space-x-2 transition-colors hover:text-primary"
          >
            <BookOpen className="h-6 w-6" />
            <span className="font-bold hidden sm:inline-block">Roadmap Dashboard</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {user && (
              <Link 
                href="/user/roadmaps" 
                className="text-sm font-medium px-3 py-2 rounded-md transition-colors hover:bg-accent"
              >
                All Roadmaps
              </Link>
            )}
          </nav>
        </div>

        {/* Auth Buttons / User Menu */}
        <div className="flex items-center space-x-2">
          {!user ? (
            <>
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          ) : (
            <>
              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                    <img
                      src={user.imageUrl || "/default.png"}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="sr-only">Open user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.fullName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/user/roadmaps" className="w-full cursor-pointer">
                      <BookOpen className="mr-2 h-4 w-4" />
                      My Roadmaps
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/sign-out" className="w-full cursor-pointer text-red-600 dark:text-red-400">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40">
          <div className="container py-4 space-y-2">
            {!user ? (
              <div className="space-y-2">
                <Button variant="ghost" asChild className="w-full justify-start">
                  <Link href="/sign-in">Login</Link>
                </Button>
                <Button asChild className="w-full justify-start">
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button variant="ghost" asChild className="w-full justify-start">
                  <Link href="/user/roadmaps">
                    <BookOpen className="mr-2 h-4 w-4" />
                    My Roadmaps
                  </Link>
                </Button>
                <Button variant="ghost" asChild className="w-full justify-start">
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  asChild 
                  className="w-full justify-start text-red-600 dark:text-red-400"
                >
                  <Link href="/sign-out">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

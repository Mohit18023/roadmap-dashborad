// API Success and Error Response Types
export interface ApiSuccessResponse<T> {
    success: true;
    message: string;
    data: T;
  }
  
  export interface ApiErrorResponse {
    success: false;
    message: string;
  }
  
  // User and Related Models
  export interface User {
    id: string;
    clerkId: string;
    name: string;
    email: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
    enrollments: Enrollment[];
    progress: UserProgress[];
    userBadges: UserBadge[];
  }
  
  export interface UserData {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    imageUrl?: string | null;
  }
  
  export interface Enrollment {
    id: string;
    userId: string;
    roadmapId: string;
    enrolledAt: Date;
    user: User;
    roadmap: Roadmap;
  }
  
  export interface UserProgress {
    id: string;
    userId: string;
    subtopicId: string;
    currentIndex: number;
    updatedAt: Date;
    user: User;
    subtopic: Subtopic;
  }
  
  export interface UserBadge {
    id: string;
    userId: string;
    badgeId: string;
    earnedAt: Date;
    user: User;
    badge: Badge;
  }
  
  export interface Badge {
    id: string;
    title: string;
    description: string;
    image: string;
    createdAt: Date;
    userBadges: UserBadge[];
  }
    
  export interface Subtopic {
    id: string;
    title: string;
    description: string;
    roadmapId: string;
    createdAt: Date;
    updatedAt: Date;
    roadmap: Roadmap;
    userProgress: UserProgress[];
  }
  
  // Request Body Types for Enrollment and Progress Updates
  export interface EnrollInRoadmapRequest {
    roadmapId: string;
  }
  
  export interface UpdateUserProgressRequest {
    subtopicId: string;
    currentIndex: number;
  }
  export interface SubtopicInput {
    title: string;
    description: string;
  }
  


  export interface RoadmapInput {
    title: string;
    description: string;
    image?: string | null; // Optional, since image might not always be provided
  }
  
  // utils/types.ts

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  image?: string;
  badgeId: string | null;
  createdAt: Date; // Dates as strings since it's JSON
  updatedAt: Date;
}

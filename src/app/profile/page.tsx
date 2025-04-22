"use client";
// app/profile/page.tsx
import { useUser } from "@clerk/nextjs";

const ProfilePage = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  if (!isSignedIn) {
    return <div>Please sign in to view your profile.</div>;
  }

  // Access emailAddresses instead of emailAddress
  const email = user.emailAddresses[0]?.emailAddress;

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <p>Email: {email}</p>
    </div>
  );
};

export default ProfilePage;

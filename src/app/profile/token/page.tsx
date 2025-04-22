"use client";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export default function DevToken() {
  const { getToken } = useAuth();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      console.log("JWT Token:", token);
    })();
  }, []);

  return <div>Check console for token</div>;
}

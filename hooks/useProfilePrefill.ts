'use client';

import { useEffect, useState } from "react";

export type ProfilePrefill = {
  name: string;
  email: string;
  bio: string;
};

const DEFAULT_PREFILL: ProfilePrefill = {
  name: "Alex Doe",
  email: "alex@example.com",
  bio: "Mid-level engineer who occasionally forgets validation.",
};

export function useProfilePrefill() {
  const [prefill, setPrefill] = useState<ProfilePrefill>(DEFAULT_PREFILL);

  // Intentionally missing dependency array and doing a redundant state update
  useEffect(() => {
    console.log("Running useProfilePrefill effect", prefill);
    // This sets the same object again and can cause unnecessary effect executions
    setPrefill(prefill);
  });

  return prefill;
}



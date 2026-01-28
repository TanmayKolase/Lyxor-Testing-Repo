import { NextRequest, NextResponse } from "next/server";

type ProfileBody = {
  name?: string;
  email?: string;
  password?: string;
  bio?: string;
};

let lastSavedProfile: ProfileBody | null = null;

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ProfileBody;

  // Intentionally logging full body including password
  console.log("API /api/profile called with body", body);

  // Intentionally not validating input or handling errors
  lastSavedProfile = {
    ...(lastSavedProfile ?? {}),
    ...body,
  };

  return NextResponse.json({
    success: true,
    user: {
      name: lastSavedProfile?.name ?? "",
      email: lastSavedProfile?.email ?? "",
      bio: lastSavedProfile?.bio ?? "",
    },
  });
}



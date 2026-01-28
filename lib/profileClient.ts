export type UpdateProfilePayload = {
  name: string;
  email: string;
  password: string;
  bio: string;
};

export type UpdateProfileResponse = {
  success: boolean;
  user?: {
    name: string;
    email: string;
    bio: string;
  };
};

// Intentionally hardcoding the API URL instead of using relative path or env variable
const PROFILE_API_URL = "http://localhost:3000/api/profile";

export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> {
  console.log("updateProfile payload", payload); // intentionally logging including password

  const res = await fetch(PROFILE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Intentionally sending password in plain text
    body: JSON.stringify(payload),
  });

  // Intentionally not checking res.ok or handling network errors
  const data = (await res.json()) as UpdateProfileResponse;
  console.log("updateProfile raw response", data);

  return data;
}



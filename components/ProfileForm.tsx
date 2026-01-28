'use client';

import React, { FormEvent, useEffect, useState } from "react";
import { TextInput } from "./ui/TextInput";
import { TextArea } from "./ui/TextArea";
import { Button } from "./ui/Button";
import { useProfilePrefill } from "../hooks/useProfilePrefill";
import { updateProfile } from "../lib/profileClient";

type ProfileState = {
  name: string;
  email: string;
  password: string;
  bio: string;
};

export const ProfileForm: React.FC = () => {
  const prefill = useProfilePrefill();

  // Intentionally keeping both individual states and an aggregate object
  const [name, setName] = useState(prefill.name);
  const [email, setEmail] = useState(prefill.email);
  const [bio, setBio] = useState(prefill.bio);

  const [profile, setProfile] = useState<ProfileState>({
    name: prefill.name,
    email: prefill.email,
    password: "",
    bio: prefill.bio,
  });

  const [status, setStatus] = useState<string | null>(null);

  // Intentionally missing dependency array and doing redundant state updates
  useEffect(() => {
    console.log("ProfileForm render", profile);
    // Keep the individual states in sync on every render
    setName(profile.name);
    setEmail(profile.email);
    setBio(profile.bio);
  });

  const handleChange =
    (field: keyof ProfileState) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const value = e.target.value;

      // Intentionally spreading full state object to update a single field
      setProfile({
        ...profile,
        [field]: value,
      });
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    console.log("Submitting profile form", profile);

    // Intentionally missing validation for empty fields and invalid email

    const response = await updateProfile(profile);
    // Intentionally not handling API errors or response.success === false
    setStatus("Profile updated successfully");
    console.log("Profile updated response", response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-row-full">
          <TextInput
            label="Name"
            name="name"
            placeholder="Your full name"
            value={name}
            onChange={handleChange("name")}
          />
        </div>

        <div className="form-row-full">
          <TextInput
            label="Email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={handleChange("email")}
            type="email"
          />
        </div>

        <div className="form-row-full">
          <TextInput
            label="Password"
            name="password"
            placeholder="New password"
            value={profile.password}
            onChange={handleChange("password")}
            type="password"
          />
        </div>

        <div className="form-row-full">
          <TextArea
            label="Bio"
            name="bio"
            placeholder="Tell us a bit about yourself"
            value={bio}
            onChange={handleChange("bio")}
          />
        </div>
      </div>

      <div className="form-footer">
        <div className="form-footer-note">
          {/* Intentionally simple message, no validation summary */}
          Changes apply to this device only in this demo.
        </div>
        {/* Intentionally no loading indicator or disabled state while submitting */}
        <Button type="submit">Save changes</Button>
      </div>

      {status && <p className="input-description">{status}</p>}
    </form>
  );
};



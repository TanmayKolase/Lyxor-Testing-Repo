import React from "react";
import Link from "next/link";
import { ProfileForm } from "../../components/ProfileForm";

export default function ProfilePage() {
  console.log("Rendering ProfilePage"); // intentionally left in

  return (
    <div className="page-container">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">User profile</div>
            <div className="card-subtitle">
              Update your basic account information.
            </div>
          </div>
          <Link href="/" className="button button-ghost">
            ← Back
          </Link>
        </div>
        <ProfileForm />
      </div>
    </div>
  );
}



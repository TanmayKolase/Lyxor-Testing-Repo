import Link from "next/link";
import React from "react";

export default function HomePage() {
  console.log("Rendering HomePage"); // intentionally left in

  return (
    <div className="page-container">
      <section className="card">
        <h2>Welcome</h2>
        <p>This is a small demo app with a user profile update form.</p>
        <Link href="/profile" className="button button-primary">
          Go to Profile
        </Link>
      </section>
    </div>
  );
}



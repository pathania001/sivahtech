"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password")
      })
    });
    if (!response.ok) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="admin-shell" style={{ display: "grid", placeItems: "center", padding: 24 }}>
      <form className="admin-card admin-form" onSubmit={submit} style={{ width: "min(100%, 420px)" }}>
        <h1>Admin Login</h1>
        <input className="admin-input" name="email" type="email" placeholder="Email" required />
        <input className="admin-input" name="password" type="password" placeholder="Password" required />
        {error && <p style={{ color: "#c0392b" }}>{error}</p>}
        <button className="admin-button" type="submit">
          Login
        </button>
      </form>
    </main>
  );
}

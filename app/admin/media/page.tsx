"use client";

import { useEffect, useState } from "react";

type Media = {
  id: number;
  file_name: string;
  file_url: string;
  mime_type: string;
  alt_text: string;
};

export default function MediaLibraryPage() {
  const [items, setItems] = useState<Media[]>([]);
  const [search, setSearch] = useState("");

  async function load() {
    const response = await fetch(`/api/admin/media?search=${encodeURIComponent(search)}`);
    const data = await response.json();
    setItems(data.rows || []);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function upload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/media/upload", { method: "POST", body: form });
    if (response.ok) {
      event.currentTarget.reset();
      load();
    }
  }

  async function remove(id: number) {
    if (!confirm("Delete this media item?")) return;
    const response = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    if (response.ok) load();
  }

  return (
    <div>
      <h1>Media Library</h1>
      <form className="admin-card admin-form" onSubmit={upload}>
        <input className="admin-input" type="file" name="file" accept=".jpg,.jpeg,.png,.svg,.webp,image/jpeg,image/png,image/svg+xml,image/webp" required />
        <input className="admin-input" name="alt" placeholder="Alt text" />
        <button className="admin-button" type="submit">Upload Image</button>
      </form>
      <section className="admin-card" style={{ marginTop: 20 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <input className="admin-input" placeholder="Search media" value={search} onChange={(event) => setSearch(event.target.value)} />
          <button className="admin-button" type="button" onClick={load}>Search</button>
        </div>
        <div className="admin-grid">
          {items.map((item) => (
            <article className="admin-card" key={item.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.file_url} alt={item.alt_text || item.file_name} style={{ maxWidth: "100%", height: 120, objectFit: "contain" }} />
              <strong>{item.file_name}</strong>
              <p>{item.mime_type}</p>
              <button type="button" onClick={() => remove(item.id)}>Delete</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

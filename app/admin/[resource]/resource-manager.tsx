"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Row = Record<string, unknown> & { id?: number };

const defaultFields = [
  "title",
  "name",
  "slug",
  "email",
  "phone",
  "service",
  "status",
  "publish_at",
  "meta_title",
  "meta_description",
  "featured_image_url",
  "author_name",
  "content_html",
  "message",
  "notes"
];

function RichTextEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) ref.current.innerHTML = value;
  }, [value]);

  function command(name: string) {
    document.execCommand(name);
    onChange(ref.current?.innerHTML || "");
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        {["bold", "italic", "insertUnorderedList", "insertOrderedList"].map((item) => (
          <button className="admin-button" key={item} type="button" onClick={() => command(item)}>
            {item}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        className="admin-textarea"
        contentEditable
        suppressContentEditableWarning
        onInput={() => onChange(ref.current?.innerHTML || "")}
      />
    </div>
  );
}

export function ResourceManager({ resource, label }: { resource: string; label: string }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [active, setActive] = useState<Row>({});
  const [search, setSearch] = useState("");

  const fields = useMemo(() => {
    const keys = new Set(defaultFields);
    rows.forEach((row) => Object.keys(row).forEach((key) => !["id", "created_at", "updated_at"].includes(key) && keys.add(key)));
    return [...keys];
  }, [rows]);

  async function load() {
    const response = await fetch(`/api/admin/${resource}?search=${encodeURIComponent(search)}`);
    const data = await response.json();
    setRows(data.rows || []);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  async function save(status?: string) {
    const payload = { ...active, ...(status ? { status } : {}) };
    const id = payload.id;
    const response = await fetch(`/api/admin/${resource}${id ? `/${id}` : ""}`, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      setActive({});
      load();
    }
  }

  async function remove(id?: number) {
    if (!id || !confirm("Delete this item?")) return;
    const response = await fetch(`/api/admin/${resource}/${id}`, { method: "DELETE" });
    if (response.ok) load();
  }

  function exportCsv() {
    const header = fields.join(",");
    const body = rows.map((row) => fields.map((field) => JSON.stringify(row[field] ?? "")).join(",")).join("\n");
    const blob = new Blob([`${header}\n${body}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resource}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <h1>{label}</h1>
      <div className="admin-card admin-form">
        <h2>{active.id ? "Edit" : "Add"} {label}</h2>
        {fields.map((field) => (
          <label key={field}>
            {field}
            {field === "content_html" ? (
              <RichTextEditor value={String(active[field] || "")} onChange={(value) => setActive({ ...active, [field]: value })} />
            ) : field.includes("message") || field.includes("notes") || field.includes("description") ? (
              <textarea className="admin-textarea" value={String(active[field] || "")} onChange={(event) => setActive({ ...active, [field]: event.target.value })} />
            ) : field === "status" ? (
              <select className="admin-select" value={String(active[field] || "draft")} onChange={(event) => setActive({ ...active, [field]: event.target.value })}>
                {["draft", "published", "scheduled", "unpublished", "new", "contacted", "qualified", "proposal_sent", "won", "lost", "active"].map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            ) : (
              <input className="admin-input" value={String(active[field] || "")} onChange={(event) => setActive({ ...active, [field]: event.target.value })} />
            )}
          </label>
        ))}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="admin-button" onClick={() => save()} type="button">Save</button>
          <button className="admin-button" onClick={() => save("published")} type="button">Publish</button>
          <button className="admin-button" onClick={() => save("draft")} type="button">Draft</button>
          <button className="admin-button" onClick={() => save("unpublished")} type="button">Unpublish</button>
        </div>
      </div>
      <div className="admin-card" style={{ marginTop: 20 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <input className="admin-input" placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
          <button className="admin-button" onClick={load} type="button">Search</button>
          <button className="admin-button" onClick={exportCsv} type="button">Export</button>
        </div>
        <table className="admin-table">
          <thead><tr>{fields.slice(0, 6).map((field) => <th key={field}>{field}</th>)}<th>Actions</th></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {fields.slice(0, 6).map((field) => <td key={field}>{String(row[field] ?? "").slice(0, 120)}</td>)}
                <td><button onClick={() => setActive(row)}>Edit</button> <button onClick={() => remove(row.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

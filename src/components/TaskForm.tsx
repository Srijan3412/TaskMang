import { useEffect, useState, type FormEvent } from "react";
import type { Task, TaskInput, TaskStatus } from "@/services/taskService";

const STATUSES: TaskStatus[] = ["PENDING", "IN_PROGRESS", "COMPLETED"];

interface Props {
  initial?: Task | null;
  submitting?: boolean;
  onSubmit: (payload: TaskInput) => void | Promise<void>;
  onCancel?: () => void;
}

export default function TaskForm({ initial, submitting, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("PENDING");

  useEffect(() => {
    setTitle(initial?.title ?? "");
    setDescription(initial?.description ?? "");
    setStatus((initial?.status as TaskStatus) ?? "PENDING");
  }, [initial]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onSubmit({ title: title.trim(), description: description.trim(), status });
    if (!initial) {
      setTitle("");
      setDescription("");
      setStatus("PENDING");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, padding: 12, border: "1px solid #ddd", borderRadius: 6 }}>
      <strong>{initial ? "Edit Task" : "Create Task"}</strong>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
      <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" disabled={submitting}>{submitting ? "Saving…" : initial ? "Update" : "Create"}</button>
        {initial && onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

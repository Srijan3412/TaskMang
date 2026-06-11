import type { Task } from "@/services/taskService";

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskList({ tasks, onEdit, onDelete }: Props) {
  if (!tasks.length) return <p>No tasks yet.</p>;
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={th}>Title</th>
          <th style={th}>Description</th>
          <th style={th}>Status</th>
          <th style={th}>Created</th>
          <th style={th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((t) => (
          <tr key={String(t.id)}>
            <td style={td}>{t.title}</td>
            <td style={td}>{t.description}</td>
            <td style={td}>{t.status}</td>
            <td style={td}>{(t.createdAt ?? t.created_at ?? "")?.toString().slice(0, 19).replace("T", " ")}</td>
            <td style={td}>
              <button onClick={() => onEdit(t)}>Edit</button>{" "}
              <button onClick={() => onDelete(t)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const th: React.CSSProperties = { textAlign: "left", borderBottom: "1px solid #ccc", padding: 8 };
const td: React.CSSProperties = { borderBottom: "1px solid #eee", padding: 8, verticalAlign: "top" };

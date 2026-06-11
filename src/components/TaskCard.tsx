import { Calendar, Pencil, Trash2 } from "lucide-react";
import type { Task, TaskStatus } from "@/services/taskService";
import { cn } from "@/lib/utils";

const statusStyle: Record<TaskStatus, string> = {
  PENDING: "bg-warning/15 text-warning border-warning/30",
  IN_PROGRESS: "bg-info/15 text-info border-info/30",
  COMPLETED: "bg-success/15 text-success border-success/30",
};

const statusLabel: Record<TaskStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

export default function TaskCard({
  task,
  index,
  onEdit,
  onDelete,
}: {
  task: Task;
  index: number;
  onEdit: (t: Task) => void;
  onDelete: (t: Task) => void;
}) {
  const created = (task.createdAt ?? task.created_at ?? "").toString().slice(0, 10);
  return (
    <div
      className="card-elev group flex flex-col gap-3 rounded-xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg animate-in fade-in slide-in-from-bottom-2"
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: "backwards" }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-base font-semibold leading-tight truncate">{task.title}</h3>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            statusStyle[task.status],
          )}
        >
          {statusLabel[task.status]}
        </span>
      </div>
      {task.description && (
        <p className="text-sm text-muted-foreground line-clamp-3">{task.description}</p>
      )}
      <div className="mt-auto flex items-center justify-between pt-2">
        {created ? (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {created}
          </div>
        ) : <span />}
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(task)}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

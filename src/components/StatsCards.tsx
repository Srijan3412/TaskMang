import { CheckCircle2, Clock, ListTodo, Loader2 } from "lucide-react";
import type { Task } from "@/services/taskService";

export default function StatsCards({ tasks }: { tasks: Task[] }) {
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "PENDING").length;
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const completed = tasks.filter((t) => t.status === "COMPLETED").length;

  const items = [
    { label: "Total Tasks", value: total, Icon: ListTodo, tint: "bg-primary/10 text-primary" },
    { label: "Pending", value: pending, Icon: Clock, tint: "bg-warning/15 text-warning" },
    { label: "In Progress", value: inProgress, Icon: Loader2, tint: "bg-info/15 text-info" },
    { label: "Completed", value: completed, Icon: CheckCircle2, tint: "bg-success/15 text-success" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map(({ label, value, Icon, tint }, i) => (
        <div
          key={label}
          className="card-elev rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2"
          style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
            <div className={`grid h-9 w-9 place-items-center rounded-lg ${tint}`}>
              <Icon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 font-display text-3xl font-bold tabular-nums">{value}</div>
        </div>
      ))}
    </div>
  );
}

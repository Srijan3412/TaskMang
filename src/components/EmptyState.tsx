import { ListTodo, Plus } from "lucide-react";

export default function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="card-elev flex flex-col items-center justify-center rounded-2xl px-6 py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
        <ListTodo className="h-8 w-8" />
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold">No tasks yet</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Get started by creating your first task. Track progress and stay focused on what matters.
      </p>
      <button
        onClick={onCreate}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90"
      >
        <Plus className="h-4 w-4" />
        Create your first task
      </button>
    </div>
  );
}

export function TaskSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card-elev animate-pulse rounded-xl p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="h-4 w-32 rounded bg-muted" />
            <div className="h-5 w-16 rounded-full bg-muted" />
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-3 w-full rounded bg-muted" />
            <div className="h-3 w-4/5 rounded bg-muted" />
          </div>
          <div className="mt-4 h-3 w-20 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

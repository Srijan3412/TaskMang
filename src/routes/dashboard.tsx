import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCards from "@/components/StatsCards";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
import EmptyState, { TaskSkeleton } from "@/components/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { createTask, deleteTask, listTasks, updateTask, type Task, type TaskInput } from "@/services/taskService";
import { extractErrorMessage } from "@/services/api";

export const Route = createFileRoute("/dashboard")({
  component: () => (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
});

function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setTasks(await listTasks());
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to load tasks"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (t: Task) => { setEditing(t); setModalOpen(true); };

  const handleSubmit = async (payload: TaskInput) => {
    setSubmitting(true);
    try {
      if (editing) {
        await updateTask(editing.id, payload);
        toast.success("Task updated");
      } else {
        await createTask(payload);
        toast.success("Task created");
      }
      setModalOpen(false);
      setEditing(null);
      await refresh();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to save task"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (task: Task) => {
    if (!confirm(`Delete "${task.title}"?`)) return;
    try {
      await deleteTask(task.id);
      toast.success("Task deleted");
      await refresh();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to delete task"));
    }
  };

  return (
    <DashboardLayout title="Dashboard">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Greeting */}
        <section className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Welcome back, {user?.name?.split(" ")[0] ?? "there"} 👋
            </h2>
            <p className="text-sm text-muted-foreground">Here's a quick look at your tasks.</p>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> New Task
          </button>
        </section>

        <StatsCards tasks={tasks} />

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Your tasks</h3>
            <span className="text-xs text-muted-foreground">{tasks.length} total</span>
          </div>

          {loading ? (
            <TaskSkeleton />
          ) : tasks.length === 0 ? (
            <EmptyState onCreate={openCreate} />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tasks.map((t, i) => (
                <TaskCard key={String(t.id)} task={t} index={i} onEdit={openEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </section>
      </div>

      <TaskModal
        open={modalOpen}
        initial={editing}
        submitting={submitting}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSubmit={handleSubmit}
      />
    </DashboardLayout>
  );
}

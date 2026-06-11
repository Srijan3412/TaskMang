import api from "./api";

export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface Task {
  id: string | number;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt?: string;
  created_at?: string;
}

export interface TaskInput {
  title: string;
  description?: string;
  status: TaskStatus;
}

// Our backend returns: { statusCode, success, message, data: T }
// axios gives us res.data = the outer object, so unwrap reads .data
const unwrap = <T,>(data: any): T => (data?.data ?? data) as T;

export const listTasks = async (): Promise<Task[]> => {
  const { data } = await api.get("/tasks");
  const list = unwrap<Task[] | { tasks: Task[] }>(data);
  return Array.isArray(list) ? list : ((list as any).tasks ?? []);
};

export const createTask = async (payload: TaskInput): Promise<Task> => {
  const { data } = await api.post("/tasks", payload);
  return unwrap<Task>(data);
};

export const updateTask = async (id: string | number, payload: Partial<TaskInput>): Promise<Task> => {
  const { data } = await api.put(`/tasks/${id}`, payload);
  return unwrap<Task>(data);
};

export const deleteTask = async (id: string | number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

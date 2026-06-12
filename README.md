# 🎯 Taskly — Modern Task Management Frontend

A sleek, responsive task management dashboard built with **React 19**, **TanStack Router**, **TailwindCSS v4**, and **Shadcn/ui**. Connects to the [Taskly Backend API](https://github.com/Srijan3412/TaskMang-backend) for authentication, RBAC, and task CRUD operations.

---

## ✨ Features

- **Authentication** — Register & Login with JWT persistence
- **Protected Routes** — Dashboard requires authentication
- **Task Management** — Create, edit, delete tasks with status tracking
- **Status Workflow** — Pending → In Progress → Completed
- **Role-Based UI** — Admin sees all tasks, users see only their own
- **Dark Mode** — System-aware theme switching
- **Responsive Design** — Mobile-first layout
- **Toast Notifications** — Success/error feedback via Sonner
- **Modern UI** — Glassmorphism, gradients, micro-animations

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 |
| **Router** | TanStack Router (file-based) |
| **Styling** | TailwindCSS v4 |
| **Components** | Shadcn/ui + Radix UI |
| **HTTP Client** | Axios |
| **Build Tool** | Vite |
| **Language** | TypeScript |

---

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- Backend API running ([TaskMang-backend](https://github.com/Srijan3412/TaskMang-backend))

### 1. Clone & Install

```bash
git clone https://github.com/Srijan3412/TaskMang.git
cd TaskMang
npm install
```

### 2. Configure Environment

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

### 3. Start Development Server

```bash
npm run dev
```

Opens at: **http://localhost:8080**

### 4. Build for Production

```bash
npm run build
npm run preview
```

---

## 🔑 Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_API_BASE_URL` | **Yes** | — | Backend API base URL |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── DashboardLayout.tsx   # Sidebar + header layout
│   ├── ui/                       # Shadcn/ui components
│   ├── EmptyState.tsx            # No-tasks placeholder
│   ├── Notification.tsx          # Toast provider
│   ├── ProtectedRoute.tsx        # Auth guard
│   ├── StatsCards.tsx            # Dashboard metrics
│   ├── TaskCard.tsx              # Individual task card
│   ├── TaskForm.tsx              # Create/edit task form
│   ├── TaskList.tsx              # Task grid/list view
│   └── TaskModal.tsx             # Task detail modal
├── context/
│   ├── AuthContext.tsx           # JWT + user state
│   └── ThemeContext.tsx          # Dark/light mode
├── routes/
│   ├── __root.tsx                # Root layout
│   ├── index.tsx                 # Landing page
│   ├── login.tsx                 # Login page
│   ├── register.tsx              # Register page
│   └── dashboard.tsx             # Protected dashboard
├── services/
│   ├── api.ts                    # Axios instance
│   ├── authService.ts            # Auth API calls
│   └── taskService.ts            # Task API calls
├── main.tsx                      # App entry point
├── router.tsx                    # Router config
└── styles.css                    # TailwindCSS + design tokens
```

---

## 🚀 Deployment (Vercel)

1. Push to GitHub
2. Import on [Vercel](https://vercel.com/new)
3. Set environment variable:
   - `VITE_API_BASE_URL` = `https://your-backend.onrender.com/api/v1`
4. Deploy

---

## 📜 License

MIT

## 👤 Author

**Srijan Bajpai** — [@Srijan3412](https://github.com/Srijan3412)

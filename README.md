# ✓ TodoApp — Frontend

> A modern, full-featured Todo application built with React + Vite. Clean dark UI with authentication, CRUD operations, filtering, due dates and status tracking.

🌐 **Live Demo:** https://todo-frontend-isiaka-ibrahim.vercel.app  
🔗 **Backend Repo:** https://github.com/bryhmo/todo-backend

---

## 📸 Preview

> Dark & modern UI with login, dashboard, todo management and real-time stats.

---

## ✨ Features

- 🔐 **Authentication** — Register and login with JWT tokens
- ✅ **Create Todos** — Add tasks with title, description, status and due date
- ✏️ **Edit Todos** — Update any todo inline
- 🗑️ **Delete Todos** — Remove tasks with confirmation
- ☑️ **Mark Complete** — Toggle todos as done with one click
- 🔍 **Filter by Status** — View All, Active, Completed, Pending, In Progress
- 📅 **Due Dates** — Calendar date picker with overdue detection
- 📊 **Stats Dashboard** — Live count of total, completed, pending and overdue tasks
- 🌙 **Dark Modern UI** — Custom dark theme with smooth animations
- 📱 **Fully Responsive** — Works on mobile, tablet and desktop

---

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| React Router DOM | Client-side routing |
| Axios | HTTP requests to backend API |
| Context API | Global auth state management |
| CSS3 | Custom styling & animations |
| Vercel | Hosting & deployment |

---

## 📁 Project Structure

```
todo-frontend/
├── public/
├── src/
│   ├── api/
│   │   └── axios.js          # Axios instance with JWT interceptor
│   ├── context/
│   │   └── AuthContext.jsx   # Global auth state (login, logout, user)
│   ├── pages/
│   │   ├── Login.jsx         # Login page
│   │   ├── Register.jsx      # Register page with confirm password
│   │   └── Dashboard.jsx     # Main todo dashboard
│   ├── components/
│   │   ├── TodoItem.jsx      # Individual todo card component
│   │   └── TodoModal.jsx     # Create/edit todo modal
│   ├── App.jsx               # Routes & protected route logic
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles & dark theme
├── .env                      # Environment variables (not committed)
├── .env.example              # Example env file for contributors
├── index.html
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- The https://github.com/bryhmo/todo-backend running locally or deployed

### Installation

```bash
# Clone the repository
git clone https://github.com/bryhmo/todo-frontend.git

# Navigate into the project
cd todo-frontend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_API_URL=http://localhost:3000/api
```

For production, replace with your deployed backend URL:
```env
VITE_API_URL= https://todo-backend-production-cd36.up.railway.app/api
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. ✅

### Build for Production

```bash
npm run build
```

---

## 🔐 Authentication Flow

```
User visits app
      ↓
Not logged in? → Redirect to /login
      ↓
Login / Register → JWT token saved to localStorage
      ↓
Redirect to /dashboard
      ↓
All API requests include token in Authorization header
      ↓
Logout → Token cleared → Redirect to /login
```

---

## 🌐 Deployment on Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your `todo-frontend` repo
4. Add environment variable:
   ```
   VITE_API_URL = https://todo-backend-production-cd36.up.railway.app/api
   ```
5. Click **Deploy** 🚀

---

## 🔗 API Endpoints Used

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| GET | `/todos` | Get all todos for logged in user |
| POST | `/todos` | Create new todo |
| PUT | `/todos/:id` | Update todo |
| DELETE | `/todos/:id` | Delete todo |

---

## 🎓 About the Developer

Built by **Isiaka Ibrahim** — Full Stack Developer & Lecturer from Nigeria 🇳🇬

- 🌐 Portfolio: https://portfolio-isiaka-ibrahim.vercel.app/
- 💼 LinkedIn: https://www.linkedin.com/in/techwithbrymo
- 🐙 GitHub: https://github.com/bryhmo

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ If you found this helpful, give it a star on GitHub!
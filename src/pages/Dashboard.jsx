import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import TodoItem from '../components/TodoItem';
import TodoModal from '../components/TodoModal';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    try {
      const res = await api.get('/todos');
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (form) => {
    try {
      if (editTodo) {
        const res = await api.put(`/todos/${editTodo.id}`, form);
        setTodos(todos.map(t => t.id === editTodo.id ? res.data : t));
      } else {
        const res = await api.post('/todos', form);
        setTodos([res.data, ...todos]);
      }
      setShowModal(false); setEditTodo(null);
    } catch (err) { console.error(err); }
  };

  const handleToggle = async (todo) => {
    try {
      const res = await api.put(`/todos/${todo.id}`, {
        completed: !todo.completed,
        status: !todo.completed ? 'completed' : 'pending'
      });
      setTodos(todos.map(t => t.id === todo.id ? res.data : t));
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this todo?')) return;
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) { console.error(err); }
  };

  const handleEdit = (todo) => { setEditTodo(todo); setShowModal(true); };

  const filtered = todos.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return t.status === filter;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
    overdue: todos.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && !t.completed).length,
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-logo">✓ TodoApp</div>
        <div className="nav-user">
          <span>👋 {user?.name}</span>
          <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-body">
        <div className="dashboard-header">
          <h1>My <span>Tasks</span></h1>
          <button className="btn-add" onClick={() => { setEditTodo(null); setShowModal(true); }}>
            + Add Todo
          </button>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <div className="num">{stats.total}</div>
            <div className="label">Total</div>
          </div>
          <div className="stat-card">
            <div className="num">{stats.completed}</div>
            <div className="label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="num">{stats.pending}</div>
            <div className="label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="num" style={{color: stats.overdue > 0 ? '#ff4d6d' : 'var(--accent)'}}>
              {stats.overdue}
            </div>
            <div className="label">Overdue</div>
          </div>
        </div>

        <div className="filters">
          {['all', 'active', 'completed', 'pending', 'in-progress'].map(f => (
            <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="empty-state"><div className="icon">⏳</div><h3>Loading...</h3></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="icon">📭</div>
            <h3>No todos found</h3>
            <p>Click "+ Add Todo" to create your first task</p>
          </div>
        ) : (
          <div className="todo-list">
            {filtered.map(todo => (
              <TodoItem key={todo.id} todo={todo}
                onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <TodoModal todo={editTodo} onSave={handleSave}
          onClose={() => { setShowModal(false); setEditTodo(null); }} />
      )}
    </div>
  );
}
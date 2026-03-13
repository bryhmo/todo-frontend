export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button className={`todo-check ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo)}>
        {todo.completed ? '✓' : ''}
      </button>
      <div className="todo-content">
        <div className="todo-title">{todo.title}</div>
        <div className="todo-meta">
          {todo.dueDate && (
            <span className={`todo-due ${isOverdue ? 'overdue' : ''}`}>
              📅 {new Date(todo.dueDate).toLocaleDateString()}
              {isOverdue && ' • Overdue'}
            </span>
          )}
          <span className={`status-badge ${todo.status}`}>{todo.status}</span>
        </div>
      </div>
      <div className="todo-actions">
        <button className="btn-icon" onClick={() => onEdit(todo)} title="Edit">✏️</button>
        <button className="btn-icon delete" onClick={() => onDelete(todo.id)} title="Delete">🗑️</button>
      </div>
    </div>
  );
}
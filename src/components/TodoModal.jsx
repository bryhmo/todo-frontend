import { useState, useEffect } from 'react';

export default function TodoModal({ todo, onSave, onClose }) {
  const [form, setForm] = useState({
    title: '', description: '', status: 'pending', dueDate: ''
  });

  useEffect(() => {
    if (todo) {
      setForm({
        title: todo.title || '',
        description: todo.description || '',
        status: todo.status || 'pending',
        dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : ''
      });
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  // Get today's date in YYYY-MM-DD format to set as minimum date
  const today = new Date().toISOString().split('T')[0];

  // Format selected date for display
  const formatDisplay = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{todo ? 'Edit Todo' : 'New Todo'}</h2>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" placeholder="What needs to be done?" required
              value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows={3} placeholder="Add more details..."
              value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              min={today}
              value={form.dueDate}
              onChange={e => setForm({...form, dueDate: e.target.value})}
              style={{colorScheme: 'dark'}}
            />
            {form.dueDate && (
              <span style={{
                fontSize: '0.78rem', color: 'var(--accent)',
                marginTop: '6px', display: 'block'
              }}>
                📅 {formatDisplay(form.dueDate)}
              </span>
            )}
          </div>
          <button type="submit" className="btn-primary" style={{marginTop: '8px'}}>
            {todo ? 'Save Changes →' : 'Add Todo →'}
          </button>
        </form>
      </div>
    </div>
  );
}
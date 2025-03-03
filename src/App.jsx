import { useEffect, useState } from 'react';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import TaskInfo from './TaskInfo';
import CreateTask from './CreateTask';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create new task
  const handleCreate = async (newTask) => {
    try {
      const response = await fetch('http://localhost:3000/tasks/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      
      if (!response.ok) throw new Error('Creation failed');
      await fetchTasks(); // Refresh list
      setShowCreateForm(false);
    } catch (err) {
      setError('Failed to create task');
    }
  };

  // Update task
  const handleUpdate = async (updatedTask) => {
    try {
      const response = await fetch(
        `http://localhost:3000/tasks/update/:id'`, 
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!response.ok) throw new Error('Update failed');
      await fetchTasks(); // Refresh list
      setSelectedTask(null);
    } catch (err) {
      setError('Failed to update task');
    }
  };

  // Delete task
  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const response = await fetch(
        `http://localhost:3000/tasks/delete/${taskId}`, 
        { method: 'DELETE' }
      );
      
      if (!response.ok) throw new Error('Deletion failed');
      await fetchTasks(); // Refresh list
      setSelectedTask(null);
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  // Toggle task status
  const handleStatusChange = async (task) => {
    const updatedTask = { ...task, is_completed: !task.is_completed };
    await handleUpdate(updatedTask);
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'complete') return task.is_completed;
    if (filter === 'incomplete') return !task.is_completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Your Tasks</h1>
      {error && <div className="error">{error}</div>}
      
      <TaskFilter currentFilter={filter} setFilter={setFilter} />
      
      <button 
        className="create-button"
        onClick={() => setShowCreateForm(true)}
      >
        + New Task
      </button>

      {showCreateForm ? (
        <CreateTask 
          onCreate={handleCreate}
          onCancel={() => setShowCreateForm(false)}
        />
      ) : !selectedTask ? (
        loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onTaskSelect={setSelectedTask}
            emptyMessage={tasks.length === 0 ? 'No tasks found' : 'No tasks match the filter'}
          />
        )
      ) : (
        <TaskInfo
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

export default App;
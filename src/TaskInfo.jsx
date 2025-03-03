import { useState } from 'react';
import UpdateTask from './UpdateTask';

function TaskInfo({ task, onClose, onDelete, onUpdate, onStatusChange }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="task-details">
      {isEditing ? (
        <UpdateTask
          task={task}
          onSave={(updatedTask) => {
            onUpdate(updatedTask);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Created: {new Date(task.created_at).toLocaleDateString()}</p>
          
          <div className="status-toggle">
            <label>
              <input
                type="checkbox"
                checked={task.is_completed}
                onChange={() => onStatusChange(task)}
              />
              {task.is_completed ? 'Completed' : 'Mark Complete'}
            </label>
          </div>
          
          <div className="detail-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
            <button onClick={onClose}>Back to List</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskInfo;
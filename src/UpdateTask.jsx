import { useState } from 'react';

function UpdateTask({ task, onSave, onCancel }) {
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleSubmit = (u) => {
    u.preventDefault();
    onSave(updatedTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={updatedTask.title}
          onChange={(u) => setUpdatedTask({...updatedTask, title: u.target.value})}
          required
        />
      </label>
      
      <label>
        Description:
        <textarea
          value={updatedTask.description}
          onChange={(u) => setUpdatedTask({...updatedTask, description: u.target.value})}
        />
      </label>
      
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UpdateTask;
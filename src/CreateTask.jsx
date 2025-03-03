import { useState } from 'react';

function CreateTask({ onCreate, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, description, is_completed: false });
  };

  return (
    <div className="create-form">
      <h2>Add A Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(u) => setTitle(u.target.value)}
            required
          />
        </label>
        
        <label>
          Description:
          <textarea
            value={description}
            onChange={(u) => setDescription(u.target.value)}
          />
        </label>
        
        <div className="form-actions">
          <button type="submit">Create</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
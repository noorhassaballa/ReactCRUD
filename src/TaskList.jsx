import TaskItem from "./TaskItem";

function TaskList({ tasks, onTaskSelect }) {
  return (
    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onClick={() => onTaskSelect(task)}
        />
      ))}
    </div>
  );
}

export default TaskList;
function TaskItem ({task, onClick}){
    return(
        <div className="task-item" onClick={onClick}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.is_completed ? 'Completed' : 'Pending'}</p>
        </div>
    );
}

export default TaskItem;
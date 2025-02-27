import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

function Tasks() {

  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    async function getAllTasks() {
      let response = await fetch ('http://localhost:3000/tasks')
      let tasks = await response.json();

      let newTaskList = tasks.map(t =>
        <TaskCard title={t.title}
          description={t.description}
          completion={t.is_completed}
          date={t.created_at}
          />
      ) 
      setTaskList(newTaskList);
    }
    getAllTasks();

  }, []
)

    return (
      <>
        <div className='taskcontainer'>
          <ul>
          {taskList}
          </ul>
        </div>
      </>
    )
  }
  
  export default Tasks
  
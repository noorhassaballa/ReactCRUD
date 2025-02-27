function TaskCard({title, description, completion, date}) {


    return (
      <div className='taskcard'>
        <p>{title}</p>
        <p>{description}</p>
        <p>{completion}</p>
        <p>{date}</p>
      </div>
    )
  }
  
  export default TaskCard
  
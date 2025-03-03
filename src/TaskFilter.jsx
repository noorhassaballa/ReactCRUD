function TaskFilters ({currentFilter, setFilter}){
    return (
        <div className="filters">
            <button onClick={() => setFilter('all')} disabled={currentFilter === 'all'}>
                Show All
            </button>
            <button onClick={() => setFilter('complete')} disabled={currentFilter === 'complete'}>
                Completed
            </button>
            <button onClick={() => setFilter('incomplete')} disabled={currentFilter === 'incomplete'}>
                Incomplete
            </button>
        </div>
    );
}

export default TaskFilters
import './TaskCard.css';

const TaskCard = ({ task, activeTaskId, setActiveTaskId }) => {
    return (
        <article className={task.id === activeTaskId ? "task-wrapper task-wrapper-active" : "task-wrapper"} onClick={() => setActiveTaskId(task.id)}>
            <input type="checkbox" name="completed" id="completed" />
            
            <section className="task-content">
                <p className="task-title">{task.title}</p>
                <p className="task-category">{task.category}</p>
            </section>
        </article>
    );
};

export default TaskCard;
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './TaskCard.css';
import { taskService } from '../../services/taskService';

const TaskCard = ({ task, activeTaskId, setActiveTaskId }) => {
    const navigate = useNavigate();

    const deleteTask = () => {
        taskService.deleteOne(task.id)
            .then((res) => {
                if (res === 'success') {
                    navigate('/');
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <article className={task.id === activeTaskId ? "task-wrapper task-wrapper-active" : "task-wrapper"} onClick={() => setActiveTaskId(task.id)}>
            <section className="task-content">
                <input type="checkbox" name="completed" id="completed" />
                
                <article className="task-text">
                    <p className="task-title">{task.title}</p>
                    <p className="task-category">{task.category}</p>
                </article>
            </section>
            
            {task.id === activeTaskId && 
                <section className="task-settings">
                    <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => deleteTask()}></FontAwesomeIcon>
                </section>
            }
        </article>
    );
};

export default TaskCard;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './TaskCard.css';
import { taskService } from '../../../services/taskService';
import TaskFormCard from '../TaskFormCard/TaskFormCard';

const TaskCard = ({ task, activeTaskId, setActiveTaskId, pageRef }) => {
    const navigate = useNavigate();

    const [detailsOpened, setDetailsOpened] = useState(false);

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
        <>
            {detailsOpened && 
                <TaskFormCard pageRef={pageRef} task={task}></TaskFormCard>
            }
            {!detailsOpened && 
                <article className={task.id === activeTaskId ? "task-wrapper task-wrapper-active" : "task-wrapper"} onClick={() => setActiveTaskId(task.id)} onDoubleClick={() => setDetailsOpened(!detailsOpened)}>
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
            }
        </>
    );
};

export default TaskCard;
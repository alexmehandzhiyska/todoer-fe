import { useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './TaskCard.css';
import { taskService } from '../../../services/taskService';
import { TaskContext } from '../../../contexts/taskContext';
import TaskFormCard from '../TaskFormCard/TaskFormCard';

const TaskCard = ({ task, activeTaskId, setActiveTaskId, pageRef }) => {
    const { editTask, removeTask } = useContext(TaskContext);

    const [searchParams] = useSearchParams();
    const day = searchParams.has('day') ? searchParams.get('day') : 'inbox';

    const [detailsOpened, setDetailsOpened] = useState(false);

    const changeTaskCompletion = () => {
        task.completed = !task.completed;

        taskService.updateOne(task)
            .then((res) => {
                editTask(task);
            })
            .catch(err => {
                console.log(err);
            })
    };

    const deleteTask = () => {
        taskService.deleteOne(task.id)
            .then((res) => {
                if (res === 'success') {
                    removeTask(task.id, day);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <>
            {detailsOpened && 
                <TaskFormCard pageRef={pageRef} task={task} detailsOpened={detailsOpened} setDetailsOpened={setDetailsOpened}></TaskFormCard>
            }
            {!detailsOpened && 
                <article className={task.id === activeTaskId ? "task-wrapper task-wrapper-active" : "task-wrapper"} onClick={() => setActiveTaskId(task.id)} onDoubleClick={() => setDetailsOpened(!detailsOpened)}>
                    <section className="task-content">
                        <input type="checkbox" name="completed" id="completed" defaultChecked={task.completed} onClick={changeTaskCompletion} />
                        
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
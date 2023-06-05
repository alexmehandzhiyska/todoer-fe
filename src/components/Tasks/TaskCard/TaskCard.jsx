import { useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';

import { taskService } from '../../../services/taskService';
import { TaskContext } from '../../../contexts/taskContext';
import TaskFormCard from '../TaskFormCard/TaskFormCard';

import './TaskCard.css';

const TaskCard = ({ task, activeTaskId, setActiveTaskId, pageRef }) => {
    const { editTask, removeTask } = useContext(TaskContext);

    const [searchParams] = useSearchParams();
    const day = searchParams.has('day') ? searchParams.get('day') : 'inbox';

    const [detailsOpened, setDetailsOpened] = useState(false);

    const changeTaskCompletion = () => {
        task.completed = !task.completed;

        taskService.updateOne(task)
            .then((res) => {
                editTask(res);
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
                <article className={task.id === activeTaskId ? "task-active" : "task"} onClick={() => setActiveTaskId(task.id)} onDoubleClick={() => setDetailsOpened(!detailsOpened)}>
                    <section className="task-content">
                        <article className="is-important-wrapper">
                            {task.isImportant && <FontAwesomeIcon icon={faStar} className="is-important"></FontAwesomeIcon>}
                        </article>

                        <input type="checkbox" name="completed" id="completed" defaultChecked={task.completed} onClick={changeTaskCompletion} />
                        
                        <article className="task-text">
                            <section className="task-title-tags">
                                <p className="task-title">{task.title}</p>
                                {task.isUrgent && <span className="task-tag">Urgent</span>}
                            </section>

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
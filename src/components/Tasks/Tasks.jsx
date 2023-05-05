import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { taskService } from '../../services/taskService';
import { categoryIcons } from '../../constants';
import TaskFormCard from './TaskFormCard/TaskFormCard';
import TaskCard from './TaskCard/TaskCard';
import './Tasks.css';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [activeTaskId, setActiveTaskId] = useState(0);
    const [newCardAdded, setNewCardAdded] = useState(false);

    const [searchParams] = useSearchParams();
    const day = searchParams.has('day') ? searchParams.get('day') : 'inbox';

    const pageRef = useRef(null);

    useEffect(() => {
        taskService.getAll(day)
            .then(res => {
                setTasks(res);
            })
            .catch(err => {
                console.log(err);
            });
    }, [day]);

    return (
        <section className="home-wrapper" ref={pageRef}>
            <article className="home-content">
                <section className="home-title-wrapper">
                    <FontAwesomeIcon icon={categoryIcons[day].icon} style={{ color: categoryIcons[day].color }} className="icon"></FontAwesomeIcon>
                    <h1 className="home-title">{day}</h1>
                </section>

                {tasks && 
                    <section className="tasks">
                        {tasks.map(task => <TaskCard key={task.id} task={task} activeTaskId={activeTaskId} setActiveTaskId={setActiveTaskId} pageRef={pageRef}></TaskCard>)}
                    </section>
                }
                {newCardAdded && <TaskFormCard pageRef={pageRef} />}
            </article>
            
            <article id="home-settings">
                <p onClick={() => setNewCardAdded(true)}>+</p>
            </article>
        </section>
    );
};

export default Tasks;
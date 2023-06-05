import { useState, useRef, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GoogleLogin from 'react-google-login';

import { TaskContext } from '../../contexts/taskContext';
import { categoryIcons } from '../../constants';

import TaskFormCard from './TaskFormCard/TaskFormCard';
import TaskCard from './TaskCard/TaskCard';
import eventService from '../../services/eventService';
import Events from './Events/Events';

import './Tasks.css';

const Tasks = () => {
    const [activeTaskId, setActiveTaskId] = useState(0);
    const [newCardAdded, setNewCardAdded] = useState(false);
    const [googleToken, setGoogleToken] = useState(localStorage.getItem('google_token'));

    const [searchParams] = useSearchParams();
    const day = searchParams.has('day') ? searchParams.get('day') : 'inbox';

    const { tasks } = useContext(TaskContext);
    const activeTasks = tasks.filter(task => task.completed === false);
    const completedTasks = tasks.filter(task => task.completed === true);

    const pageRef = useRef(null);

    const responseGoogle = async(res) => {
        eventService.getAccessToken(res)
            .then(token => {
                console.log(token);
                localStorage.setItem('google_token', token);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <section className="home-wrapper" ref={pageRef}>
            {!googleToken && <GoogleLogin clientId='781317250288-9r3o4v0to0rmibjr4srcaft1an0fmko2.apps.googleusercontent.com' onSuccess={responseGoogle} cookiePolicy={'single_host_origin'} responseType='code' scope='openid email profile https://www.googleapis.com/auth/calendar' />}

            <article className="home-content">
                <Events />

                <section className="title-wrapper">
                    <FontAwesomeIcon icon={categoryIcons[day].icon} style={{ color: categoryIcons[day].color }} className="icon"></FontAwesomeIcon>
                    <h1 className="title">{day}</h1>
                </section>

                {tasks && 
                    <section className="tasks">
                        {activeTasks.length > 0 && 
                            <section className="active-tasks">
                                {activeTasks.map(task => <TaskCard key={task.id} task={task} activeTaskId={activeTaskId} setActiveTaskId={setActiveTaskId} pageRef={pageRef}></TaskCard>)}
                            </section>
                        }

                        {activeTasks.length === 0 && <p className="text">No tasks waiting to be completed.</p>}

                        {newCardAdded && <TaskFormCard pageRef={pageRef} setDetailsOpened={setNewCardAdded} />}

                        {completedTasks.length > 0 &&
                            <>
                                <hr />

                                <section className="completed-tasks">
                                    {tasks.filter(task => task.completed === true).map(task => <TaskCard key={task.id} task={task} activeTaskId={activeTaskId} setActiveTaskId={setActiveTaskId} pageRef={pageRef}></TaskCard>)}
                                </section>
                            </>
                        }
                    </section>
                }
            </article>
            
            <article id="home-settings">
                <p onClick={() => setNewCardAdded(true)}>+</p>
            </article>
        </section>
    );
};

export default Tasks;
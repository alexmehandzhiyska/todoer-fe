import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { taskService } from '../../services/taskService';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [newCardAdded, setNewCardAdded] = useState(false);

    const [searchParams] = useSearchParams();
    const day = searchParams.has('day') ? searchParams.get('day') : 'today';

    useEffect(() => {
        taskService.getAll(day)
            .then(res => {
                setTasks(res);
            })
            .catch(err => {
                console.log(err);
            });
    }, [day]);

    const createTask = (event) => {
        event.preventDefault();

        const task = new FormData(event.target);
        const taskTitle = task.get('task-title');
        const taskDesc = task.get('task-desc');

        taskService.create({title: taskTitle, description: taskDesc})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <section>
            <h1>Home</h1>
            {tasks && tasks.map(task => <p key={task.id}>{task.title}</p>)}
            {newCardAdded && (
                <form onSubmit={e => createTask(e)}>
                    <input className="task-title" id="task-title" name="task-title" />
                    <input className="task-desc" id="task-desc" name="task-desc" />
                    <input type="submit" value="Submit" />
                </form>
            )}
            <p onClick={() => setNewCardAdded(true)}>+</p>
        </section>
    );
};

export default Home;
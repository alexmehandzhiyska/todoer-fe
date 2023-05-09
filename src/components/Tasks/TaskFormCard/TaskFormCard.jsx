import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBell } from '@fortawesome/free-solid-svg-icons';

import { taskService } from '../../../services/taskService';
import { CategoryContext } from '../../../contexts/categoryContext';
import { TaskContext } from '../../../contexts/taskContext';
import './TaskFormCard.css';

const TaskFormCard = ({ pageRef, task, setDetailsOpened }) => {
    const [searchParams] = useSearchParams();
    const day = searchParams.has('day') ? searchParams.get('day') : 'inbox';

    const { categories } = useContext(CategoryContext);
    const { addTask, editTask } = useContext(TaskContext);

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const categoryRef = useRef(null);

    const [isImportant, setIsImportant] = useState(false);
    const [isUrgent, setIsUrgent] = useState(false);

    const taskHandler = () => {
        if (titleRef.current && descriptionRef.current) {
            const title = titleRef.current.value;
            const description = descriptionRef.current.value;
            const category = categoryRef.current.value;

            if (task) {
                taskService.updateOne({ id: task.id, title, description, category, isUrgent, isImportant })
                    .then((res) => {
                        setDetailsOpened(false);
                        editTask(res, day, category)
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                taskService.create({ title, description, category, isUrgent, isImportant })
                    .then((res) => {
                        setDetailsOpened(false);
                        addTask(res, day, category);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    };

    useEffect(() => {
        const currentRef = pageRef.current;

        const handlePageClick = (e) => {
            const formTags = ['INPUT', 'FORM', 'TEXTAREA', 'path', 'svg', 'OPTION', 'SELECT'];
            
            if (!formTags.includes(e.target.tagName)) {
                taskHandler();
            }
        };
        
        currentRef.addEventListener('click', handlePageClick);

        return () => {
            currentRef.removeEventListener('click', handlePageClick);
        };
    }, [taskHandler, pageRef]);

    return (
        <section className="task-form-wrapper">
            <form className="task-form">
                <input className="task-title" name="task-title" placeholder="New To-Do" ref={titleRef} defaultValue={task ? task.title : ''} />
                <textarea className="task-description" name="task-description" placeholder="Notes" ref={descriptionRef} defaultValue={task ? task.description : ''}></textarea>
                <select ref={categoryRef} defaultValue={task ? task.category : ''}>
                    {categories.map(category => <option key={category.id}>{category.name}</option>)}
                </select>
            </form>

            <article className="task-options">
                <FontAwesomeIcon icon={faStar} className="icon star-icon" onClick={() => setIsImportant(!isImportant)}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faBell} className="icon bell-icon" onClick={() => setIsUrgent(!isUrgent)}></FontAwesomeIcon>
            </article>
        </section>
    );
};

export default TaskFormCard;

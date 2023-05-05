import { useRef, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBell } from '@fortawesome/free-solid-svg-icons';

import { taskService } from '../../services/taskService';
import { CategoryContext } from '../../contexts/categoryContext';
import './TaskCreateCard.css';

const TaskCreateCard = ({ pageRef }) => {
    const navigate = useNavigate();
    const { categories } = useContext(CategoryContext);

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const categoryRef = useRef(null);

    const [isImportant, setIsImportant] = useState(false);
    const [isUrgent, setIsUrgent] = useState(false);

    const createTask = useCallback(() => {
        if (titleRef.current && descriptionRef.current) {
            const title = titleRef.current.value;
            const description = descriptionRef.current.value;
            const category = categoryRef.current.value;

            taskService.create({ title, description, category, isUrgent, isImportant })
                .then(() => {
                    navigate('/');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [isImportant, isUrgent, navigate]);

    useEffect(() => {
        const currentRef = pageRef.current;

        const handlePageClick = (e) => {
            const formTags = ['INPUT', 'FORM', 'TEXTAREA', 'path', 'svg', 'OPTION', 'SELECT'];
            
            if (!formTags.includes(e.target.tagName)) {
                createTask();
            }
        };
        
        currentRef.addEventListener('click', handlePageClick);

        return () => {
                currentRef.removeEventListener('click', handlePageClick);
        };
    }, [createTask, pageRef]);

    return (
        <section className="task-form-wrapper">
            <form className="task-form">
                <input className="task-title" name="task-title" placeholder="New To-Do" ref={titleRef}/>
                <textarea className="task-description" name="task-description" placeholder="Notes" ref={descriptionRef} ></textarea>
                <select ref={categoryRef}>
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

export default TaskCreateCard;

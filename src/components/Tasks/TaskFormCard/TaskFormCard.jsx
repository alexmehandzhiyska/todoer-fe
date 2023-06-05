import { useRef, useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBell, faFlag } from '@fortawesome/free-solid-svg-icons';

import { taskService } from '../../../services/taskService';
import { CategoryContext } from '../../../contexts/categoryContext';
import { TaskContext } from '../../../contexts/taskContext';

import './TaskFormCard.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const TaskFormCard = ({ pageRef, task, setDetailsOpened }) => {
    const [searchParams] = useSearchParams();
    const day = searchParams.has('day') ? searchParams.get('day') : 'inbox';

    const { categories } = useContext(CategoryContext);
    const { addTask, editTask } = useContext(TaskContext);

    const taskFormRef = useRef(null);

    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [category, setCategory] = useState(task?.category || categories[0].name);
    const [isImportant, setIsImportant] = useState(task?.isImportant || false);
    const [isUrgent, setIsUrgent] = useState(task?.isUrgent || false);
    const [dueDate, setDueDate] = useState(task?.dueDate || null);
    const [datePickerOpen, setDatePickerOpen] = useState(false);

    const selectDate = (date) => {
        console.log(date);
        setDueDate(date);
        setDatePickerOpen(false);
    };
    
    const taskHandler = () => {
        if (task) {
            taskService.updateOne({ id: task.id, title, description, category, isUrgent, isImportant, dueDate })
                .then((res) => {
                    setDetailsOpened(false);
                    editTask(res, day, category);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            taskService.create({ title, description, category, isUrgent, isImportant, dueDate })
                .then((res) => {
                    setDetailsOpened(false);
                    addTask(res, day, category);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        const currentRef = pageRef.current;

        const handlePageClick = (e) => {
            if (taskFormRef.current && !taskFormRef.current.contains(e.target)) {
                taskHandler();
            }
        };
        
        currentRef.addEventListener('click', handlePageClick);

        return () => {
            currentRef.removeEventListener('click', handlePageClick);
        };
    }, [taskHandler, pageRef]);

    return (
        <section className="task-form-wrapper" ref={taskFormRef}>
            <form className="task-form">
                <input className="task-title" name="task-title" placeholder="New To-Do" defaultValue={task ? task.title : ''} onChange={(e) => setTitle(e.target.value)} />
                <textarea className="task-description" name="task-description" placeholder="Notes" defaultValue={task ? task.description : ''} onChange={(e) => setDescription(e.target.value)}></textarea>
                <select defaultValue={task ? task.category : ''} onChange={(e) => setCategory(e.target.value)}>
                    {categories.map(category => <option key={category.id}>{category.name}</option>)}
                </select>
            </form>

            <article className="task-options">
                <FontAwesomeIcon icon={faStar} className="icon star-icon" onClick={() => setIsImportant(!isImportant)}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faBell} className="icon bell-icon" onClick={() => setIsUrgent(!isUrgent)}></FontAwesomeIcon>

                <section className="due-date-calendar-wrapper">
                    <DatePicker className="date-picker" open={datePickerOpen} onOpenChange={() => setDatePickerOpen(false)} onSelect={(date) => selectDate(date)} isClearable/>  
                    <FontAwesomeIcon icon={faFlag} className="icon bell-icon" onClick={() => setDatePickerOpen(true)}></FontAwesomeIcon>
                </section>
            </article>
        </section>
    );
};

export default TaskFormCard;

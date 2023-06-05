import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import { AreaContext } from '../../contexts/areaContext';
import { CategoryContext } from '../../contexts/categoryContext';
import { areaService } from '../../services/areaService';
import { categoryService } from '../../services/categoryService';

import './CreateList.css';

const CreateList = () => {
    const { addArea } = useContext(AreaContext);
    const { addCategory } = useContext(CategoryContext);
    
    const { state } = useLocation();
    const listType = state.listType;

    const [listName, setListName] = useState('');

    const createList = () => {
        if (listType === 'area') {
            areaService.create(listName)
                .then(res => {
                    addArea(res);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            categoryService.create(listName)
                .then(res => {
                    addCategory(res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    return (
        <section className="create-wrapper">
            <form className="create-form">
                <FontAwesomeIcon icon={listType === 'area' ? faFolder : faCircleNotch} className="icon added-list-icon"></FontAwesomeIcon>
                <input placeholder={`Create ${listType}`} onChange={(e) => setListName(e.target.value)} onBlur={() => createList()} />
            </form>

            <article className="add-task-instructions">
                <p>Press ⌘ + N to create a new to-do.</p>
            </article>
        </section>
    )
};

export default CreateList;
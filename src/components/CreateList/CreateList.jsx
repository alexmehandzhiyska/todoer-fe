import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import './CreateList.css';
import { areaService } from '../../services/areaService';

const CreateList = () => {
    const { state } = useLocation();
    const listType = state.listType;

    const [listName, setListName] = useState('');

    const createList = () => {
        if (listType === 'area') {
            areaService.create(listName)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    return (
        <section id="create-wrapper">
            <form id="create-form">
                <FontAwesomeIcon icon={listType === 'area' ? faFolder : faCircleNotch} className="icon added-list-icon"></FontAwesomeIcon>
                <input placeholder={`Create ${listType}`} onChange={(e) => setListName(e.target.value)} onBlur={() => createList()} />
            </form>
        </section>
    )
};

export default CreateList;
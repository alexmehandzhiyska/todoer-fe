import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import { AreaContext } from '../../contexts/areaContext';
import TimeCategories from './TimeCategories/TimeCategories';
import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();

    const [newListIsToggled, setNewListIsToggled] = useState(false);

    const { areas } = useContext(AreaContext);

    const showCreateList = (listType) => {
        setNewListIsToggled(false);
        navigate(`/create`, { state: { listType }});
    };

    return (
        <section id="sidebar">
            <article id="sidebar-content">
                <TimeCategories></TimeCategories>

                {areas && (
                    <ul className="areas">
                        {areas.map(area => 
                            <li key={area.id}>
                                <FontAwesomeIcon icon={faFolder} className="icon sidebar-icon area-icon"></FontAwesomeIcon>
                                <span>{area.name}</span>

                                <ul className="categories">
                                    {area.categories.map(category => 
                                        <li key={category.id}>
                                            <FontAwesomeIcon icon={faCircleNotch} className="icon sidebar-icon category-icon"></FontAwesomeIcon>
                                            <span>{category.name}</span>
                                        </li>
                                    )}
                                </ul>
                            </li>
                        )}
                    </ul>
                )}
            </article>

            <article className="manage-lists">
                {newListIsToggled && 
                    <section className="new-lists">
                        <article className="new-category" onClick={() => showCreateList('category')}>
                            <FontAwesomeIcon icon={faCircleNotch} className="icon sidebar-icon add-category-icon"></FontAwesomeIcon>
                            <p>New Category</p>
                        </article>

                        <article className="new-area" onClick={() => showCreateList('area')}>
                            <FontAwesomeIcon icon={faFolder} className="icon sidebar-icon add-area-icon"></FontAwesomeIcon>
                            <p>New Area</p>
                        </article>
                    </section>
                }
                
                <section className="add-list" onClick={() => setNewListIsToggled(!newListIsToggled)}>
                    <span className="plus">+</span>
                    <span>New List</span>
                </section>
            </article>
        </section>
    );
};

export default Sidebar;
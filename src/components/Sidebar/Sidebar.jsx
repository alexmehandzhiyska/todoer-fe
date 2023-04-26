import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import { areaService } from '../../services/areaService';
import TimeCategories from './TimeCategories/TimeCategories';
import './Sidebar.css';

const Sidebar = () => {
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        areaService.getAll()
            .then((res) => {
                setAreas(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <section id="sidebar">
            <TimeCategories></TimeCategories>

            {areas && (
                <ul className="areas">
                    {areas.map(area => 
                        <li>
                            <FontAwesomeIcon icon={faFolder} className="area-icon icon"></FontAwesomeIcon>
                            <span>{area.name}</span>

                            <ul className="categories">
                                {area.categories.map(category => 
                                    <li>
                                        <FontAwesomeIcon icon={faCircleNotch} className="category-icon icon"></FontAwesomeIcon>
                                        <span>{category.name}</span>
                                    </li>
                                )}
                            </ul>
                        </li>
                    )}
                </ul>
            )}
        </section>
    );
};

export default Sidebar;
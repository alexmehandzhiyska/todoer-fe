import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { categoryIcons } from '../../../constants';

const TimeCategories = () => {
    const navigate = useNavigate();

    return (
        <ul>
            {Object.entries(categoryIcons).map((category, i) => 
                <li key={i} onClick={() => navigate(`/tasks${category[1].query}`)}>
                    <FontAwesomeIcon icon={category[1].icon} className="sidebar-icon icon" style={{color: category[1].color}}></FontAwesomeIcon>
                    <span className="heading">{category[0]}</span>
                </li>
            )}
        </ul>
    );
};

export default TimeCategories;
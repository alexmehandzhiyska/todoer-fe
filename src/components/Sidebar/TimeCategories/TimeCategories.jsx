import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faStar, faCalendar, faLayerGroup, faBoxArchive } from '@fortawesome/free-solid-svg-icons';

const TimeCategories = () => {
    const navigate = useNavigate();

    return (
        <ul>
            <li onClick={() => navigate(`/tasks`)}>
                <FontAwesomeIcon icon={faInbox} className="sidebar-icon icon" id="inbox-icon"></FontAwesomeIcon>
                <span>inbox</span>
            </li>

            <li onClick={() => navigate(`/tasks?day=today`)}>
                <FontAwesomeIcon icon={faStar} className="sidebar-icon icon" id="star-icon"></FontAwesomeIcon>
                <span>today</span>
            </li>

            <li onClick={() => navigate(`/tasks?day=tomorrow`)}>
                <FontAwesomeIcon icon={faCalendar} className="sidebar-icon icon" id="calendar-icon"></FontAwesomeIcon>
                <span>tomorrow</span>
            </li>
            
            <li onClick={() => navigate(`/tasks`)}>
                <FontAwesomeIcon icon={faLayerGroup} className="sidebar-icon icon" id="layers-icon"></FontAwesomeIcon>
                <span>upcoming</span>
            </li>

            <li onClick={() => navigate(`/tasks`)}>
                <FontAwesomeIcon icon={faBoxArchive} className="sidebar-icon icon" id="archive-icon"></FontAwesomeIcon>
                <span>anytime</span>
            </li>
        </ul>
    );
};

export default TimeCategories;
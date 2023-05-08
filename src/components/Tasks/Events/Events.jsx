import { useState, useEffect } from 'react';

import eventService from '../../../services/eventService';
import './Events.css';

const Events = () => {
    const [googleToken, setGoogleToken] = useState(localStorage.getItem('google_token'));
    const [events, setEvents] = useState([]);

    // useEffect(() => {
    //     eventService.getEvents(googleToken)
    //         .then(res => {
    //             let events = res
    //                 .map(calendarEvents => calendarEvents.data.items)
    //                 .flat(1)
    //                 .filter(ev => ev.status !== 'cancelled' && ev.start.dateTime !== undefined)
    //                 .sort((ev1, ev2) => new Date(ev1.start.dateTime) - new Date(ev2.start.dateTime));

    //             events = events.map(ev => {
    //                 // This response includes both current day events and events that continue for multiple days
    //                 // return { start: ev.start.date || ev.start.dateTime, end: ev.end.date || ev.end.dateTime, title: ev.summary };

    //                 return { id: ev.id, start: ev.start.dateTime, end: ev.end.dateTime, title: ev.summary };
    //             });

    //             events.forEach(ev => {
    //                 ev.start = ev.start.toString().slice(11, 16);
    //                 ev.end = ev.end.toString().slice(11, 16);
    //             });

    //             setEvents(events);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }, []);

    return (
        <>
        {events && 
            <table className="events">
                <tbody>
                    {events.map(ev => 
                        <tr key={ev.id} className="event">
                            <td className="event-time">{ev.start}-{ev.end}</td>
                            <td className="event-title">{ev.title}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        }
        </>
    );
};

export default Events;
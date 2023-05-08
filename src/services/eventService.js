import { baseUrl } from '../constants';

const getAccessToken = async (code) => {
    const response = await fetch(`${baseUrl}/events/code`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
    });

    const data = await response.json();
    return data
};

const getEvents = async (token) => {
    const response = await fetch(`${baseUrl}/events?token=${token}`);
    const data = await response.json();
    return data;
};

export default { getAccessToken, getEvents };
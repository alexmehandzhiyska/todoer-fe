import { baseUrl } from '../constants';
import { getDate } from '../utils';

const getAll = async (day) => {
    const date = getDate(day);

    const response = await fetch(`${baseUrl}/tasks?due_date=${date}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};

const create = async (task) => {
    console.log(task);
    const response = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
}

export const taskService = { getAll, create };
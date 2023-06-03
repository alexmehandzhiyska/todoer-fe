import { baseUrl } from '../constants';
import { getDate } from '../utils';

const getAll = async (day) => {
    let dueDate = getDate(day);
    dueDate = dueDate === undefined ? day : dueDate;

    const response = await fetch(`${baseUrl}/tasks?due_date=${dueDate}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};

const create = async (task) => {
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
};

const updateOne = async (task) => {
    const response = await fetch(`${baseUrl}/tasks/${task.id}`, {
        method: 'PATCH',
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
};

const deleteOne = async (taskId) => {
    const response = await fetch(`${baseUrl}/tasks/${taskId}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return 'success';
};

export const taskService = { getAll, create, updateOne, deleteOne };
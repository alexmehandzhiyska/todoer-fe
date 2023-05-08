import { createContext, useEffect, useReducer } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { taskService } from '../services/taskService';

export const TaskContext = createContext();

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_TASKS':
            return action.payload;
        case 'ADD_TASK':
            return [...state, action.payload];
        case 'EDIT_TASK':
            return state.map(task => task.id === action.payload.id ? action.payload : task);
        case 'REMOVE_TASK':
            return state.filter(task => task.id !== action.taskId);
    }
};

export const TaskProvider = ({ children }) => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const day = searchParams.has('day') ? searchParams.get('day') : 'inbox';
    
    const [tasks, dispatch] = useReducer(taskReducer, []);

    useEffect(() => {
        taskService.getAll(day)
            .then(res => {
                dispatch({
                    type: 'LOAD_TASKS',
                    payload: res
                });
            })
            .catch(err => {
                console.log(err);
            });
    }, [day]);

    const addTask = (task, day, category) => {
        dispatch({
            type: 'ADD_TASK',
            payload: {...task, category}
        });

        if (day) {
            navigate(`/tasks?day=${day}`);
        } else {
            navigate('/tasks');
        }
    };

    const editTask = (task, day) => {
        dispatch({
            type: 'EDIT_TASK',
            payload: task
        });

        if (day) {
            navigate(`/tasks?day=${day}`);
        } else {
            navigate('/tasks');
        }
    };

    const removeTask = (taskId, day) => {
        dispatch({
            type: 'REMOVE_TASK',
            taskId
        });

        if (day) {
            navigate(`/tasks?day=${day}`);
        } else {
            navigate('/tasks');
        }
    };

    return (
        <TaskContext.Provider value={{tasks, addTask, editTask, removeTask}}>
            {children}
        </TaskContext.Provider>
    );
}
import { createContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { areaService } from '../services/areaService';

const areaReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_AREAS':
            return action.payload;
        case 'ADD_AREA':
            return [...state, action.payload];
        case 'ADD_CATEGORY':
            return action.payload;
    }
};

export const AreaContext = createContext();

export const AreaProvider = ({ children }) => {
    const navigate = useNavigate();

    const [areas, dispatch] = useReducer(areaReducer, []);

    useEffect(() => {
        areaService.getAll()
            .then(res => {
                dispatch({
                    type: 'LOAD_AREAS',
                    payload: res
                });
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const addArea = (area) => {
        dispatch({
            type: 'ADD_AREA',
            payload: area
        });

        navigate('/');
    };

    const addCategory = (areas) => {
        dispatch({
            type: 'ADD_CATEGORY',
            payload: areas
        });
    };

    return (
        <AreaContext.Provider value={{ areas, addArea, addCategory }}>
            {children}
        </AreaContext.Provider>
    );
};
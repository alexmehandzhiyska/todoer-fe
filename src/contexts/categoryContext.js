import { createContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { categoryService } from '../services/categoryService';

export const CategoryContext = createContext();

const categoryReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_CATEGORIES':
            return action.payload;
        case 'ADD_CATEGORY':
            return [...state, action.payload];
    }
};

export const CategoryProvider = ({ children }) => {
    const navigate = useNavigate();

    const [categories, dispatch] = useReducer(categoryReducer, []);

    useEffect(() => {
        categoryService.getAll()
            .then(res => {
                dispatch({
                    type: 'LOAD_CATEGORIES',
                    payload: res
                });
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const addCategory = (category) => {
        dispatch({
            type: 'ADD_CATEGORY',
            payload: category
        });

        navigate('/tasks?day=inbox');
    };

    return (
        <CategoryContext.Provider value={{categories, addCategory}}>
            {children}
        </CategoryContext.Provider>
    );
}
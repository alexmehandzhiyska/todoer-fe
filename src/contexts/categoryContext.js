import { createContext, useEffect, useReducer } from 'react';
import { categoryService } from '../services/categoryService';

export const CategoryContext = createContext();

const categoryReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_CATEGORIES':
            return action.payload;
    }
};

export const CategoryProvider = ({ children }) => {
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

    return (
        <CategoryContext.Provider value={{categories}}>
            {children}
        </CategoryContext.Provider>
    );
}
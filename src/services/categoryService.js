import { baseUrl } from "../constants";

const getAll = async () => {
    const response = await fetch(`${baseUrl}/categories`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};

const create = async (listName) => {
    const category = { name: listName };
    
    const response = await fetch(`${baseUrl}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
}

export const categoryService = { getAll, create };
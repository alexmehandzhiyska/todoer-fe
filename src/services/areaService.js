import { baseUrl } from "../constants";

const getAll = async () => {
    const response = await fetch(`${baseUrl}/areas`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};

const create = async (listName) => {
    const area = { name: listName };
    
    const response = await fetch(`${baseUrl}/areas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(area)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
}

export const areaService = { getAll, create };
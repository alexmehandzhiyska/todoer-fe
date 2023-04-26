import { baseUrl } from "../constants";

const getAll = async () => {
    const response = await fetch(`${baseUrl}/areas`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};

export const areaService = { getAll };
import { url } from "./configuration";

export const showAllRooms = async () => {
    const response = await fetch(`${url}/rooms/retrieveRoom`, {
        method: "GET",
    });

    return await response.json();
};

export const addRoom = async (body) => {
    const response = await fetch(`${url}/rooms/insertRoom`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return await response.json();
};

export const updateRoom = async (body, id) => {
    const response = await fetch(`${url}/rooms/updateRoom`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return await response.json();
};

export const deleteRoom = async (id) => {
    const response = await fetch(`${url}/rooms/deleteRoom`, {
        method: "POST",
    });

    return await response.json();
};

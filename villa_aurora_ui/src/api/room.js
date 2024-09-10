import { url } from "./configuration";

export const showAllRooms = async (token) => {
    const response = await fetch(`${url}/rooms/retrieveRoom`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return await response.json();
};

export const addRoom = async (body, token) => {
    const response = await fetch(`${url}/rooms/insertRoom`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    return await response.json();
};

export const updateRoom = async (body, token) => {
    const response = await fetch(`${url}/rooms/updateRoom`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    return await response.json();
};

export const deleteRoom = async (id, token) => {
    const response = await fetch(`${url}/rooms/deleteRoom`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    });

    return await response.json();
};

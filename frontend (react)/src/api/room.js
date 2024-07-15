import { url } from "./configuration";

export const showAllRooms = async (token) => {
    const response = await fetch(`${url}/rooms`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return await response.json();
};

export const addRoom = async (body, token) => {
    const response = await fetch(`${url}/rooms`, {
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

export const updateRoom = async (body, id, token) => {
    const response = await fetch(`${url}/rooms/${id}?_method=PATCH`, {
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
    const response = await fetch(`${url}/rooms/${id}?_method=DELETE`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return await response.json();
};

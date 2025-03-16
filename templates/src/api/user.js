import { url } from "./configuration";

export const index = async (token) => {
    const response = await fetch(`${url}/users/retrieveUser`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return await response.json();
};

export const store = async (body, token) => {
    const response = await fetch(`${url}/users/insertUser`, {
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

export const update = async (body, token) => {
    const response = await fetch(`${url}/users/updateUser`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: body,
    });

    return await response.json();
};

export const destroy = async (id, token) => {
    const response = await fetch(`${url}/users/deleteUser`, {
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

export const getUser = async (id, token) => {
    const response = await fetch(`${url}/users/getUser/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
};

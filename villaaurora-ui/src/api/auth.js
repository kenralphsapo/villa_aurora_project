import { url } from "./configuration";

/**
 * This what we called the basic fetch request declaration
 * Also JSON stands Javascript Object Notation
 * Convert all properties of 'body' to strings
 *
 */
export const register = async (body) => {
    const response = await fetch(`${url}/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return await response.json();
};

export const checkToken = async (token) => {
    const response = await fetch(`${url}/checkToken`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return await response.json();
};

export const login = async (body) => {
    const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return await response.json();
};

export const forgotPassword = async (body) => {
    const response = await fetch(`${url}/forgotPassword`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return await response.json();
};

export const resetPassword = async (body) => {
    const response = await fetch(`${url}/resetPassword`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return await response.json();
};

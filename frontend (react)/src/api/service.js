import { url } from "./configuration";

// backend endpoint

export const showAllServices = async (token) => {
    const response = await fetch(`${url}/services`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return await response.json();
};

export const addService = async (body, token) => {
    const response = await fetch(`${url}/services`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: body,
    });

    return await response.json();
};

export const updateService = async (body, id, token) => {
    const response = await fetch(`${url}/services/${id}?_method=PATCH`, {
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

export const deleteService = async (id, token) => {
    const response = await fetch(`${url}/services/${id}?_method=DELETE`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return await response.json();
};

import { url } from "./configuration";

export const showAllServices = async (token) => {
    const response = await fetch(`${url}/services/retrieveService`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return await response.json();
};

export const addService = async (body, token) => {
    const response = await fetch(`${url}/services/insertService`, {
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

export const updateService = async (body, token) => {
    const response = await fetch(`${url}/services/updateService`, {
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
    const response = await fetch(`${url}/services/deleteService`, {
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

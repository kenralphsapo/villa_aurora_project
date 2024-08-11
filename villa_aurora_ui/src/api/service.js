import { url } from "./configuration";

export const showAllServices = async () => {
    const response = await fetch(`${url}/services/retrieveService`, {
        method: "GET",
    });

    return await response.json();
};

export const addService = async (body) => {
    const response = await fetch(`${url}/services/insertService`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return await response.json();
};

export const updateService = async (body, id) => {
    const response = await fetch(`${url}/services/updateService`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return await response.json();
};

export const deleteService = async (id) => {
    const response = await fetch(`${url}/servicesdeleteService`, {
        method: "POST",
    });

    return await response.json();
};

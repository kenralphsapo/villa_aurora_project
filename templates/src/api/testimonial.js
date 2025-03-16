import { url } from "./configuration";

export const showAllTestimonials = async (token) => {
    const response = await fetch(`${url}/testimonials/retrieveTestimonial`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
};

export const addTestimonial = async (body, token) => {
    const response = await fetch(`${url}/testimonials/insertTestimonial`, {
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

export const updateTestimonial = async (body, token) => {
    const response = await fetch(`${url}/testimonials/updateTestimonial`, {
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

export const deleteTestimonial = async (id, token) => {
    const response = await fetch(`${url}/testimonials/deleteTestimonial`, {
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

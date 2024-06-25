import { url } from "./configuration";

export const showAllTestimonials = async () => {
    const response = await fetch(`${url}/testimonials`, {
        method: "GET",
    });

    return await response.json();
};

export const addTestimonial = async (body) => {
    const response = await fetch(`${url}/testimonials`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return await response.json();
};

export const updateTestimonial = async (body, id) => {
    const response = await fetch(`${url}/testimonials/${id}?_method=PATCH`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return await response.json();
};

export const deleteTestimonial = async (id) => {
    const response = await fetch(`${url}/testimonials/${id}?_method=DELETE`, {
        method: "POST",
    });

    return await response.json();
};

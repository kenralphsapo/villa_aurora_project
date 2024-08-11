import { url } from "./configuration";

export const showAllTestimonials = async () => {
    const response = await fetch(`${url}/testimonials/retrieveTestimonial`, {
        method: "GET",
    });

    return await response.json();
};

export const updateTestimonial = async (body, id) => {
    const response = await fetch(`${url}/testimonials/updateTestimonial`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return await response.json();
};

export const deleteTestimonial = async (id) => {
    const response = await fetch(`${url}/testimonials/deleteTestimonial`, {
        method: "POST",
    });

    return await response.json();
};

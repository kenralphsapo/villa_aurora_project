import { url } from "./configuration";

export const showAllTransactions = async () => {
    const response = await fetch(`${url}/transactions`, {
        method: "GET",
    });

    return await response.json();
};

export const addTransaction = async (body) => {
    const response = await fetch(`${url}/transactions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return await response.json();
};

export const updateTransaction = async (body, id) => {
    const response = await fetch(`${url}/transactions/${id}?_method=PATCH`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return await response.json();
};

export const deleteTransaction = async (id) => {
    const response = await fetch(`${url}/transactions/${id}?_method=DELETE`, {
        method: "POST",
    });

    return await response.json();
};

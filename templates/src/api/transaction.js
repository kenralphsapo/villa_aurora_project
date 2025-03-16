import { url } from "./configuration";

export const showAllTransactions = async (token) => {
    const response = await fetch(`${url}/transactions/retrieveTransaction`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
};

export const addTransaction = async (body, token) => {
    const response = await fetch(`${url}/transactions/insertTransaction`, {
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

export const updateTransaction = async (body, token) => {
    const response = await fetch(`${url}/transactions/updateTransaction`, {
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

export const deleteTransaction = async (id, token) => {
    const response = await fetch(`${url}/transactions/deleteTransaction`, {
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

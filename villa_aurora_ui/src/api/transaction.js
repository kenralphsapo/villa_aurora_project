import { url } from "./configuration";

export const showAllTransactions = async () => {
    const response = await fetch(`${url}/transactions/retrieveTransaction`, {
        method: "GET",
    });

    return await response.json();
};

export const updateTransaction = async (body, id) => {
    const response = await fetch(`${url}/transactions/updateTransaction`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return await response.json();
};

export const deleteTransaction = async (id) => {
    const response = await fetch(`${url}/transactions/deleteTransaction`, {
        method: "POST",
    });

    return await response.json();
};

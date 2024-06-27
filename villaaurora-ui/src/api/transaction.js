import { url } from "./configuration";

export const showAllTransactions = async (token) => {
    const response = await fetch(`${url}/transactions`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          },
    });
  
    return await response.json();
  };

  export const addTransaction = async (body, token) => {
    const response = await fetch(`${url}/transactions`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });
  
    return await response.json();
  };

  export const updateTransaction = async (body, id, token) => {
    const response = await fetch(`${url}/transactions/${id}?_method=PATCH`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });
  
    return await response.json();
  };
  

  export const deleteTransaction = async (id, token) => {
    const response = await fetch(`${url}/transactions/${id}?_method=DELETE`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
    });
  
    return await response.json();
  };

import { url } from "./configuration";

export const showAllServices = async () => {
    const response = await fetch(`${url}/services`, {
        method: 'GET'
      })

      return await response.json()
}

export const addService = async (body) => {
  const response = await fetch(`${url}/services`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return await response.json();
};
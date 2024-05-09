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

export const updateService = async (body, id) => {
  const response = await fetch(`${url}/services/${id}?_method=PATCH`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return await response.json();
};

export const deleteService = async (id) => {
  const response = await fetch(`${url}/services/${id}?_method=DELETE`, {
    method: 'POST'
  });

  return await response.json();
};
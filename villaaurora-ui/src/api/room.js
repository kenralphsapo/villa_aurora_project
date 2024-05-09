import { url } from "./configuration";

export const showAllRooms = async () => {
    const response = await fetch(`${url}/rooms`, {
        method: 'GET'
      })

      return await response.json()
}


export const addRoom = async (body) => {
  const response = await fetch(`${url}/rooms`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return await response.json();
};


export const updateRoom = async (body, id) => {
  const response = await fetch(`${url}/rooms/${id}?_method=PATCH`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return await response.json();
};

export const deleteRoom = async (id) => {
  const response = await fetch(`${url}/rooms/${id}?_method=DELETE`, {
    method: 'POST'
  });

  return await response.json();
};
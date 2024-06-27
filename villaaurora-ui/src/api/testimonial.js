import { url } from "./configuration";

export const showAllTestimonials = async (token) => {
    const response = await fetch(`${url}/testimonials`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
      })

      return await response.json()
}

export const addTestimonial = async (body, token) => {
    const response = await fetch(`${url}/testimonials`, {
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

  export const updateTestimonial = async (body, id, token) => {
    const response = await fetch(`${url}/testimonials/${id}?_method=PATCH`, {
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

  export const deleteTestimonial = async (id, token) => {
    const response = await fetch(`${url}/testimonials/${id}?_method=DELETE`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
    });
  
    return await response.json();
  };

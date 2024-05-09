import { url } from "./configuration";

export const showAllTestimonials = async () => {
    const response = await fetch(`${url}/testimonials`, {
        method: 'GET'
      })

      return await response.json()
}


export const deleteTestimonial = async (id) => {
  const response = await fetch(`${url}/testimonials/${id}?_method=DELETE`, {
    method: 'POST'
  });

  return await response.json();
};
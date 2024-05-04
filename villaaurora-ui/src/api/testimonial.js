import { url } from "./configuration";

export const showAllTestimonials = async () => {
    const response = await fetch(`${url}/testimonials`, {
        method: 'GET'
      })

      return await response.json()
}
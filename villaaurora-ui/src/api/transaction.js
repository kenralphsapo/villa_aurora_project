import { url } from "./configuration";

export const showAllServices = async () => {
    const response = await fetch(`${url}/services`, {
        method: 'GET'
      })

      return await response.json()
}
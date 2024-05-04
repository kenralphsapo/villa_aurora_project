import { url } from "./configuration";

export const showAllRooms = async () => {
    const response = await fetch(`${url}/rooms`, {
        method: 'GET'
      })

      return await response.json()
}
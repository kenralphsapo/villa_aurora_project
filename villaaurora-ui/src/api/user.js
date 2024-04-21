import {url} from "./configuration";

export const index = async (token) => {
    const response = await fetch(`${url}/users`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
      })

      return await response.json()
}

export const store = async (body, token) => {
    const response = await fetch(`${url}/users`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
"Content-Type": 'application/json'
          Authorization: `Bearer ${token}`
        },
body: JSON.stringify(body)
      })

      return await response.json()
}

import { url } from "./configuration";

export const showAllTransactions = async () => {
    const response = await fetch(`${url}/transactions`, {
        method: 'GET'
      })

      return await response.json()
}
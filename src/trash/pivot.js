import { url } from "../villaaurora-ui/src/api/configuration";

export const getAllDataPivot = async () => {
    const response = await fetch(`${url}/pivot`, {
        method: "GET",
    });

    return await response.json();
};

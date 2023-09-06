import { graphConfig } from "../authConfig";

export async function callMeDrive(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.listDriveEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

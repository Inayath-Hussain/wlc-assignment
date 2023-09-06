import axios from 'axios';

export async function uploadToDrive(accessToken, URL, file) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    const formData = new FormData()

    headers.append("Authorization", bearer);
    headers.append(`Content-Type`, file.type);

    if (file.type.includes('image')) {
        // const imgURL = await readFile(file)
        const imgURL = new Blob([file], { type: file.type })
        console.log(imgURL)
        // formData.append('content', imgURL)

        const options = {
            method: 'PUT',
            headers: headers,
            body: imgURL,
            encoding: null
        }

        for (let i of headers.entries()) {
            console.log(i)
        }

        return fetch(URL, options)
            .then(response => response.json())
            .catch(error => console.log(error));
    }
    else {
        formData.append('file', file)
        const options = {
            method: "PUT",
            headers: headers,
            body: formData,
        };

        for (let i of formData.entries()) {
            console.log(i)
        }
        for (let i of headers.entries()) {
            console.log(i)
        }

        return fetch(URL, options)
            .then(response => response.json())
            .catch(error => console.log(error));
    }

}

function readFile(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()

        reader.onload = () => {
            new Blob()
            resolve(reader.result)
        }

        reader.onerror = (e) => {
            reject(e)
        }

        reader.readAsBinaryString(file)
    })
}
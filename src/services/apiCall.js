import { developmentUrl } from "../config/url";

const headers = { "Content-Type": "application/json" };

export const getCall = async (endPoint, customHeaders) => {
    try {
        let fetchedData = await fetch(`${developmentUrl}${endPoint}`, {
            method: "GET",
            headers: { ...headers, ...customHeaders }
        });
        let parsedData = await fetchedData.json();
        return parsedData;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const postCall = async (endPoint, customHeaders, body) => {
    try {
        let fetchedData = await fetch(`${developmentUrl}${endPoint}`, {
            method: "POST",
            headers: { ...headers, ...customHeaders },
            body: JSON.stringify(body)
        });
        let parsedData = await fetchedData.json();
        return parsedData;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const postFormDataCall = async (endPoint, customHeaders, body) => {
    try {
        // let fetchedData = await fetch(`${developmentUrl}${endPoint}`, {
        //     method: "POST",
        //     headers: { ...headers, ...customHeaders },
        //     body: body
        // });
        // let parsedData = await fetchedData.json();
        // return parsedData;
    } catch (error) {
        console.log(error);
        return null;
    }
}
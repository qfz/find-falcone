import {TokenResponsePayload} from "./types"
import {memoize} from "lodash"

const host = process.env.REACT_APP_API_HOST

const getTokenCacheKey = () => "token"

enum HttpMethod {
    Get = "GET",
    Post = "Post",
}

export const status = (response: Response) => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return response.json().then(body => {
            const error = new Error(response.statusText)
            return Promise.reject(Object.assign(error, body))
        })
    }
};

export const json = (response: Response) => {
    const contentType = response.headers.get("Content-Type")
    if (contentType && contentType.includes("application/json")) {
        return response.json()
    } else {
        return Promise.resolve()
    }
};

const fetchToken = memoize(() => {
    return fetch(`${host}/token`, {
        method: HttpMethod.Post,
        headers: {
            Accept: "application/json"
        }
    }).then(status).then(json).then((payload: TokenResponsePayload) => {
        return Promise.resolve(payload.token)
    })
}, getTokenCacheKey)

export const fetchPlanets = () => {
    return fetch(`${host}/planets`).then(status).then(json)
}

export const fetchVehicles = () => {
    return fetch(`${host}/vehicles`).then(status).then(json)
}

export const findFalcone = (planet_names: string[], vehicle_names: string[]) => {
    fetchToken().catch(() => {
        fetchToken.cache.delete(getTokenCacheKey())
        return fetchToken()
    }).then((token: string) => {
        return fetch(`${host}/`, {
            method: HttpMethod.Post,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token,
                planet_names,
                vehicle_names
            })
        }).then(status).then(json)
    }).catch(() => {
        alert("The server is not reacheable at the moment, check the network connection or try again later.")
    })
}
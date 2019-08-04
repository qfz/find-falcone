import {TokenResponsePayload} from "./types"
import {memoize} from "lodash"
import {FindFalconeResponsePayload} from "./types"

const host = process.env.REACT_APP_API_HOST

const getTokenCacheKey = () => "token"

enum HttpMethod {
    Get = "GET",
    Post = "Post",
}

const status = (response: Response) => {
    if (response.status >= 200 && response.status < 300) {
        return response.json()
    } else {
        return response.json().then(body => {
            return Promise.reject(body)
        })
    }
};


const fetchToken = memoize(() => {
    return fetch(`${host}/token`, {
        method: HttpMethod.Post,
        headers: {
            Accept: "application/json"
        }
    }).then(status).then((payload: TokenResponsePayload) => {
        return Promise.resolve(payload.token)
    })
}, getTokenCacheKey)

export const fetchPlanets = () => {
    return fetch(`${host}/planets`).then(status)
}

export const fetchVehicles = () => {
    return fetch(`${host}/vehicles`).then(status)
}

export const findFalcone = (planet_names: string[], vehicle_names: string[]) => {
    return fetchToken().then((token: string) => {
        return fetch(`${host}/find`, {
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
        }).then(status)
    }).catch((response: FindFalconeResponsePayload) => {
        if (response.error) {
            alert(response.error)
        }
    })
}
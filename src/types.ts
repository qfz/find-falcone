export interface Planet {
    name: string,
    distance: number
}

export interface Vehicle {
    name: string,
    total_no: number,
    max_distance: number,
    speed: number
}

export interface TokenResponsePayload {
    token: string
}

export enum FindFalconeStatus {
    Success = "success",
    Failure = "false"
}


export type FindFalconeResponsePayload = {
    status: FindFalconeStatus,
    timeTaken: number
    planet_name?: string,
    error?: string
}
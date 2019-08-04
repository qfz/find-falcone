import { Vehicle, Planet } from "./types"

export const getAvailableVehicles = (vehicles: Vehicle[], selectedVehicleNames: (string | undefined)[]): Vehicle[] => {
    return vehicles.map(v => {
        const selectedCount = selectedVehicleNames.filter(n => n === v.name).length

        if (selectedCount <= v.total_no) {
            return {
                ...v,
                total_no: v.total_no - selectedCount
            }
        } else {
            throw new Error(`More ${v.name} have been selected than total available`)
        }
    })
}

// currentSelected is the selected planet name for the active dropdown.
export const getValidPlanets = (planets: Planet[], selectedPlanetNames: string[], currentSelected: string | undefined) => {
    return planets.filter(p => {
        return (
            p.name === currentSelected ||
            !(selectedPlanetNames.includes(p.name))
        )
    })
}

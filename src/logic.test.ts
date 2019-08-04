import { getAvailableVehicles, getValidPlanets } from "./logic"
import { Vehicle } from "./types"
import {random, take, difference} from "lodash"

describe(`Function: ${getAvailableVehicles.name}`, () => {
    const spacePod = "Space pod"
    const spacePodCount = 2
    const spaceRocket = "Space rocket"
    const spaceShuttle = "Space shuttle"
    const spaceShip = "Space ship"

    const mockedVehicles: Vehicle[] = [
        {
            "name": spacePod,
            "total_no": spacePodCount,
            "max_distance": 200,
            "speed": 2
        },
        {
            "name": spaceRocket,
            "total_no": 1,
            "max_distance": 300,
            "speed": 4
        },
        {
            "name": spaceShuttle,
            "total_no": 1,
            "max_distance": 400,
            "speed": 5
        },
        {
            "name": spaceShip,
            "total_no": 2,
            "max_distance": 600,
            "speed": 10
        }
    ]


    it('should decrement the vehicle count if a vehicle is chosen', () => {
        const mockedSelectedVehicleNames = [spacePod]
        const availableVehicles = getAvailableVehicles(mockedVehicles, mockedSelectedVehicleNames)

        const targetVehicle = availableVehicles.find(v => v.name === spacePod)

        if (targetVehicle) {
            expect(targetVehicle.total_no).toBe(spacePodCount - 1)
        }

    })

    it('should return the same vehicle if no vehicle is chosen', () => {
        const mockedSelectedVehicleNames: string[] = []
        const availableVehicles = getAvailableVehicles(mockedVehicles, mockedSelectedVehicleNames)
        expect(availableVehicles).toEqual(mockedVehicles)
    })

    it('should return all vehicles with a count of 0 if they are all chosen', () => {
        const mockedSelectedVehicleNames = [
            spacePod,
            spacePod,
            spaceRocket,
            spaceShuttle,
            spaceShip,
            spaceShip
        ]

        const availableVehicles = getAvailableVehicles(mockedVehicles, mockedSelectedVehicleNames)
        availableVehicles.forEach(v => {
            expect(v.total_no).toBe(0)
        })
    })

    it('should throw an error if more vehicles are selected than available', () => {
        const mockedSelectedVehicleNames = [
            spacePod,
            spacePod,
            spacePod,
        ]

        expect(() => {getAvailableVehicles(mockedVehicles, mockedSelectedVehicleNames)}).toThrowError()
    })
})

describe(`Function: ${getValidPlanets.name}`, () => {
    const Donlon = "Donlon"
    const Enchai = "Enchai"
    const Jebing = "Jebing"
    const Sapir = "Sapir"
    const Lerbin = "Lerbin"
    const Pingasor = "Pingasor"

    const mockedPlanets = [
        { "name": Donlon, "distance": 100 },
        { "name": Enchai, "distance": 200 },
        { "name": Jebing, "distance": 300 },
        { "name": Sapir, "distance": 400 },
        { "name": Lerbin, "distance": 500 },
        { "name": Pingasor, "distance": 600 }
    ]

    it('should return all planets if no planet is chosen', () => {
        const validPlanets = getValidPlanets(mockedPlanets, [], undefined)

        expect(validPlanets).toEqual(mockedPlanets)
    })

    it('shouldn only return the currently chosen planet, if all are chosen', () => {
        const validPalnets = getValidPlanets(mockedPlanets, mockedPlanets.map(p => p.name), Lerbin)
        expect(validPalnets).toHaveLength(1)
        expect(validPalnets[0].name).toBe(Lerbin)
    })

    it('should always contians the currently selected planet', () => {
        const selectedPlanetNames = take(mockedPlanets.map(p => p.name), random(1, 6))
        const validPlanets = getValidPlanets(mockedPlanets, selectedPlanetNames, Jebing)
        const currentSelectedPlanet = validPlanets.find(p => p.name === Jebing)

        expect(currentSelectedPlanet).toBeTruthy()
    })

    it('should return planets without the chosen ones, expect the currently selected one', () => {
        const selectedPlanetNames = take(mockedPlanets.map(p => p.name), random(1, 6))
        const validPlanets = getValidPlanets(mockedPlanets, selectedPlanetNames, Sapir)
        const validPlanetNames = validPlanets.map(p => p.name)

        const selectedPlanetNameWithoutTheCurrentOne = selectedPlanetNames.filter(s => s !== Sapir)
        const allPlanetNames = mockedPlanets.map(p => p.name)

        const diff = difference(allPlanetNames, selectedPlanetNameWithoutTheCurrentOne)

        expect(diff).toEqual(validPlanetNames)
    })
})
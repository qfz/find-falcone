import {fetchPlanets, fetchVehicles} from "./api"

describe(`Function: ${fetchPlanets.name}`, () => {
    it("should fetch the right planets", () => {
        const mockedResult = []
        const mockedResponse = {
            status: 200,
            json: () => Promise.resolve(mockedResult)
        } as Response
        jest.spyOn(window, 'fetch').mockResolvedValueOnce(mockedResponse)

        return fetchPlanets().then(result => {
            expect(result).toBe(mockedResult)
        })
    })

    it("should reject is fetch rejects", () => {
        const mockedResponse = {
            status: 400,
            json: () => Promise.reject(undefined)
        }
        jest.spyOn(window, 'fetch').mockRejectedValueOnce(mockedResponse)

        return expect(fetchPlanets()).rejects.toEqual(mockedResponse)
    })
})

describe(`Function: ${fetchVehicles}`, () => {
    it("should fethc the right vehicles", () => {
        const mockedResult = []
        const mockedResponse = {
            status: 200,
            json: () => Promise.resolve(mockedResult)
        } as Response
        jest.spyOn(window, 'fetch').mockResolvedValueOnce(mockedResponse)

        return expect(fetchVehicles()).resolves.toBe(mockedResult)
    })
    
    it("should reject if fetch rejects", () => {
        const mockedResponse = {
            status: 400,
            json: () => Promise.reject(undefined)
        }
        jest.spyOn(window, 'fetch').mockRejectedValueOnce(mockedResponse)

        return expect(fetchVehicles()).rejects.toEqual(mockedResponse)
    })
})

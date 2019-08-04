import React, { useEffect, useState, FormEventHandler } from 'react';
import { fetchPlanets, fetchVehicles, findFalcone } from "./api"
import { Planet, Vehicle, FindFalconeStatus, FindFalconeResponsePayload } from "./types"
import { PlanetPicker } from "./components/PlanetPicker"
import { VehiclePicker } from "./components/VehiclePicker"
import {getAvailableVehicles, getValidPlanets} from "./logic"
import {SuccessPage} from "./components/SuccessPage"
import {FailurePage} from "./components/FailurePage"
import './App.css';

const App: React.FC = () => {
    const [planets, setPlanets] = useState<Planet[]>([])
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [submitDisabled, setSubmitDisabled] = useState(false)
    const [findFalconeResult, setFindFalconeResult] = useState<FindFalconeResponsePayload | undefined>()

    const planetStatePairs = [
        useState<string | undefined>(undefined),
        useState<string | undefined>(undefined),
        useState<string | undefined>(undefined),
        useState<string | undefined>(undefined),
    ]

    const vehicleStatePairs = [
        useState<string | undefined>(undefined),
        useState<string | undefined>(undefined),
        useState<string | undefined>(undefined),
        useState<string | undefined>(undefined),
    ]

    useEffect(() => {
        fetchPlanets().then(planets => {
            setPlanets(planets)
        })
        fetchVehicles().then(vehicles => {
            setVehicles(vehicles)
        })
    }, [])

    const reset = () => {
        const resetState = (pair: [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>]) => {
            const [, setter] = pair
            setter(undefined)
        }
        planetStatePairs.forEach(resetState)
        vehicleStatePairs.forEach(resetState)
        setFindFalconeResult(undefined)
    }

    if (planets.length === 0 || vehicles.length === 0) {
        return (
            <div>Loading data...</div>
        )
    }

    if (findFalconeResult && findFalconeResult.planet_name) {
        return (
            <SuccessPage
                timeTaken={findFalconeResult.timeTaken}
                planetFound={findFalconeResult.planet_name}
                reset={reset}
            />
        )
    }

    if (findFalconeResult && findFalconeResult.status === FindFalconeStatus.Failure) {
        return (
            <FailurePage reset={reset}/>
        )
    }

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setSubmitDisabled(true)
        const planetNames = planetStatePairs.map(pair => pair[0]).filter(name => name !== undefined) as string[]
        const vehicleNames = vehicleStatePairs.map(pair => pair[0]).filter(name => name !== undefined) as string[]
        const start = performance.now()

        const fetchHandler = (payload: FindFalconeResponsePayload) => {
            const end = performance.now()
            const timeTaken = end - start
            setFindFalconeResult({
                ...payload,
                timeTaken
            })
        }

        findFalcone(planetNames, vehicleNames)
            .then(fetchHandler)
            .catch(fetchHandler)
            .finally(() => {
                setSubmitDisabled(false)
            })
    }

    const renderVehiclePicker = (index: number) => {
        const currentSelected = vehicleStatePairs[index][0]
        const selectedVehicleNames = vehicleStatePairs.map(pair => pair[0])
        const validVehicles = getAvailableVehicles(vehicles, selectedVehicleNames)

        return (
            <VehiclePicker
                vehicles={validVehicles}
                selectedVehicle={currentSelected}
                setVehicle={vehicleStatePairs[index][1]}
            />
        )
    }

    return (
        <div className="app">
            <form className="main" onSubmit={submit}>
                <h1>Finding Falcone!</h1>
                <h2>Select planets you want to search in:</h2>
                <div className="planets">
                    {
                        planetStatePairs.map((statePair, index, statePairs) => {
                            const [selectedPlanetName, setPlanetName] = statePair
                            const allSelectedPlanetNames = statePairs.map(pair => pair[0]).filter(name => name !== undefined) as string[]
                            const validPlanets = getValidPlanets(planets, allSelectedPlanetNames, selectedPlanetName)

                            return (
                                <div key={index}>
                                    <PlanetPicker
                                        key={index}
                                        index={index}
                                        planets={validPlanets}
                                        selectedPlanet={selectedPlanetName}
                                        setPlanet={setPlanetName}
                                    />
                                    {
                                        selectedPlanetName &&
                                        renderVehiclePicker(index)
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div className="buttons">
                    <button type="submit" id="find-falcone" disabled={submitDisabled}>Find Falcone!</button>
                    <button type="button" id="app-reset" onClick={reset}>Reset</button>
                </div>
            </form>
        </div>
    );
}

export default App;

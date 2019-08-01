import React, { useEffect, useState, FormEventHandler } from 'react';
import { fetchPlanets, fetchVehicles } from "./api"
import { Planet, Vehicle } from "./types"
import { PlanetPicker } from "./components/PlanetPicker"
import { VehiclePicker } from "./components/VehiclePicker"
import {getAvailableVehicles} from "./logic"
import './App.css';

type A = Partial<{}>

const App: React.FC = () => {
    const [planets, setPlanets] = useState<Planet[]>([])
    const [vehicles, setVehicles] = useState<Vehicle[]>([])

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

    if (planets.length === 0 || vehicles.length === 0) {
        return (
            <div>Loading data...</div>
        )
    }

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
    }

    const reset = () => {
        const resetState = (pair: [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>]) => {
            const [, setter] = pair
            setter(undefined)
        }
        planetStatePairs.forEach(resetState)
        vehicleStatePairs.forEach(resetState)
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
                            const allSelectedPlanetNames = statePairs.map(pair => pair[0]).filter(name => name !== undefined)
                            const validPlanets = planets.filter(p => {
                                return (
                                    p.name === selectedPlanetName ||
                                    !(allSelectedPlanetNames.includes(p.name))
                                )
                            })

                            return (
                                <div>
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
                    <button type="submit">Find Falcone!</button>
                    <button type="button" onClick={reset}>Reset</button>
                </div>
            </form>
        </div>
    );
}

export default App;

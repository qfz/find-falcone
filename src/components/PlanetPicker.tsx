import React, {FunctionComponent, ChangeEventHandler} from "react"
import {Planet} from "../types"

interface Props {
    index: number,
    planets: Planet[],
    selectedPlanet: string | undefined,
    setPlanet: (planetName: string) => void
}

export const PlanetPicker: FunctionComponent<Props> = ({index, planets, selectedPlanet, setPlanet}) => {
    const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        setPlanet(e.target.value)
    }

    return (
        <div className="planet-picker">
            <h5>Destination {index}</h5>
            <select value={selectedPlanet} onChange={onChange}>
                <option>Select</option>
                {
                    planets.map(planet => (
                        <option key={planet.name} value={planet.name}>{planet.name}</option>
                    ))
                }
            </select>
        </div>
    )
}
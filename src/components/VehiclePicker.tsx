import React, {FunctionComponent, ChangeEventHandler} from "react"
import {Vehicle} from "../types"
import {uniqueId} from "lodash"

interface Props {
    vehicles: Vehicle[],
    selectedVehicle: string | undefined,
    setVehicle: (vehicleName: string) => void
}

export const VehiclePicker: FunctionComponent<Props> = ({vehicles, selectedVehicle, setVehicle}) => {
    const radioGroupName = uniqueId()

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setVehicle(e.target.value)
    }

    return (
        <div>
            {
                vehicles.map(v => (
                    <div>
                        <input
                            type="radio"
                            name={radioGroupName}
                            id={v.name}
                            disabled={v.total_no <= 0 && selectedVehicle !== v.name}
                            value={v.name}
                            checked={v.name === selectedVehicle}
                            onChange={onChange}
                        />
                        <label htmlFor={v.name}>{v.name} ({v.total_no})</label>
                    </div>
                ))
            }
        </div>
    )
}
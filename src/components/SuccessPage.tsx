import React, {FunctionComponent} from "react"

interface Props {
    timeTaken: number,
    planetFound: string,
    reset: () => void
}

export const SuccessPage: FunctionComponent<Props> = ({timeTaken, planetFound, reset}) => {
    return (
        <div className="text-center">
            <h1>
                Success! Congratulations on finding Falcone. King Shan is mighty pleased.
            </h1>
            <h2>Time taken: {timeTaken} milliseconds</h2>
            <h2>Planet found: {planetFound}</h2>
            <button id="success-reset" onClick={reset}>Start Again</button>
        </div>
    )
}
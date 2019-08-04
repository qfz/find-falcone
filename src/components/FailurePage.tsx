import React, {FunctionComponent} from "react"

interface Props {
    reset: () => void
}

export const FailurePage: FunctionComponent<Props> = ({reset}) => {
    return (
        <div className="text-center">
            <h1>Sorry we couldn't find Queen Falcone : (</h1>
            <button id="failure-reset" onClick={reset}>Try again</button>
        </div>
    )
}
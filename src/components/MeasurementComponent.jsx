import { useParams } from "react-router-dom"

export default function MeasurementComponent() {

    const {id, index} = useParams()

    return (
        <div className="MeasurementComponent">

            <h1>Dupa {id} {index}</h1>

        </div>
    )

}
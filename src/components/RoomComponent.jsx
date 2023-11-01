import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { retrieveMeasurementMainTypes } from "../api/MeasurementMainApiService"

export default function RoomComponent() {

    const {id} = useParams()
    const [add, setAdd] = useState(false)
    const [types, setTypes] = useState([])
    const navigate = useNavigate()

    function handleAddMeasBtn() {
        setAdd(true)
        console.log(add)
        retrieveMeasurementMainTypes()
        .then(response => setTypes(response.data))
        .catch(error => console.log(error))
    }
    function handleAddBtn(index) {
        navigate(`/room/${id}/measurement/${index}`)
    }

    return (
        <div className="RoomComponent">
            <h1>Room {id}</h1>
            <button className="btn btn-info m-2" onClick={handleAddMeasBtn}>Add measurement</button>
                { add && 
                    <ul className ="list-group">
                        {
                            types.map (
                                (type, index) => (
                                    <li>
                                        {type}{index}
                                        <button className="btn btn-success btn-sm m-1" onClick={() =>handleAddBtn(index)}>+</button>
                                    </li>
                                )
                            )
                        }
                    </ul>
                }  
        </div>
    )
}
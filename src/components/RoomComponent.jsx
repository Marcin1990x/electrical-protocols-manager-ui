import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { retrieveMeasurementMainTypes } from "../api/MeasurementMainApiService"
import { useGlobal } from "./GlobalData"

export default function RoomComponent() {

    const context = useGlobal()

    const {id} = useParams()
    const [add, setAdd] = useState(false)
    const [types, setTypes] = useState([])
    const navigate = useNavigate()

    function handleAddMeasBtn() {
        setAdd(true)
        retrieveMeasurementMainTypes()
            .then(response => setTypes(response.data))
            .catch(error => console.log(error))
    }
    function handleAddBtn(index) {
        navigate(`/room/${id}/measurement/${index}`)
    }
    function handleOpenMainBtn(id) {
        navigate(`/measurements/${id}`)
    }

    return (
        <div className="RoomComponent">
            <h1>Room {id}</h1>
            <button className="btn btn-info m-2" onClick={handleAddMeasBtn}>Dodaj pomiar</button>
                { add && 
                    <ul className ="list-group">
                        {
                            types.map (
                                (type, index) => (
                                    <li>
                                        {type}
                                        <button className="btn btn-success btn-sm m-1" onClick={() =>handleAddBtn(index)}>+ dodaj</button>
                                    </li>
                                )
                            )
                        }
                    </ul>
                }
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nazwa pomiaru</th>
                            <th>Otwórz</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            context.room.measurementMains?.map (
                                main => (
                                    <tr>
                                        <td>{main.measurementName}</td>
                                        <td><button className="btn btn-info" onClick={() => handleOpenMainBtn(main.id)}>Otwórz</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
        </div>
    )
}
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { retrieveMeasurementMainTypes } from "../api/MeasurementMainApiService"
import { retrieveRoomApi } from "../api/RoomApiService"

export default function RoomComponent() {

    const {id} = useParams()
    const [add, setAdd] = useState(false)
    const [types, setTypes] = useState([])
    const [mains, setMains] = useState([])
    const navigate = useNavigate()

    useEffect( () => refreshData(), [])

    function refreshData() {
        retrieveRoomApi(id)
            .then(response => {
                console.log(response)
                setMains(response.data)
            })
            .catch(error => console.log(error))
    }
    function testData() {
        console.log(mains)
    }

    function handleAddMeasBtn() {
        setAdd(true)
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
                <button className="btn btn-danger" onClick={testData}>show data</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nazwa pomiaru</th>
                            <th>Otwórz</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mains.measurementMains.map (
                                main => (
                                    <tr key = {main.id}>
                                        <td>{main.measurementName}</td>
                                    </tr>
                                )
                            )
                        }
                        {/* <tr><td>{mains.roomName}</td></tr> */}
                    </tbody>
                </table>
        </div>
    )
}
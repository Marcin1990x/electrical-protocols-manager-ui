import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { retrieveMeasurementMainTypes } from "../api/MeasurementMainApiService"
import { retrieveRoomApi } from "../api/RoomApiService"

export default function RoomComponent() {

    const {id} = useParams()
    const [types, setTypes] = useState([])
    const [room, setRoom] = useState({})
    const navigate = useNavigate()

    useEffect( () => {
        setRoomData()
        setMeasurementTypes()
    }, [])

    function setRoomData() {
        retrieveRoomApi(id)
        .then( response => {
            setRoom(response.data)
            console.log(response)
        })
        .catch( error => console.log(error))
    }

    function setMeasurementTypes() {
        retrieveMeasurementMainTypes()
            .then(response => setTypes(response.data))
            .catch(error => console.log(error))
    }
    function handleAddBtn(index) {
        navigate(`/rooms/${id}/addMeasurement/${index}`)
    }
    function handleOpenMainBtn(idMain) {
        navigate(`/rooms/${id}/measurements/${idMain}`)
    }

    function handleBackButton() {
        navigate(`/structure`)
    }

    return (
        <div className="RoomComponent">
            <button className = "btn btn-primary btn-lg m-2" onClick = {handleBackButton}>Wstecz</button>
            <h1>{room.roomCascadeName}</h1>
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
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nazwa pomiaru</th>
                            <th>Otwórz</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            room.measurementMains?.map (
                                main => (
                                    <tr key = {main.index}>
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
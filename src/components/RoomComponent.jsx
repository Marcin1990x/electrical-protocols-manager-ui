import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { retrieveMeasurementMainTypes, deleteMeasurementMainApi } from "../api/MeasurementMainApiService"
import { retrieveRoomApi } from "../api/RoomApiService"

export default function RoomComponent() {

    const {id, projectName} = useParams()
    const [types, setTypes] = useState([])
    const [room, setRoom] = useState({})
    const [render, setRender] = useState(0)
    const navigate = useNavigate()

    useEffect( () => {
        setRoomData()
        setMeasurementTypes()
    }, [render])

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
        navigate(`addMeasurement/${index}`)
    }
    function handleOpenMainBtn(idMain) {
        navigate(`measurements/${idMain}`)
    }
    function handleDeleteMainBtn(mainId) {
        deleteMeasurementMainApi(mainId, id)
            .then(response => {
                console.log(response)
                setRender(render + 1)
            })
            .catch(error => console.log(error))
    }
    function checkForDuplicates(name) {
        if(room.measurementMains) {
            for(var i = 0; i < room.measurementMains.length; i++) {
                if(name === room.measurementMains[i].measurementName) {
                    return true
                }
            }
        }
    }
    function handleAddMainName(added) {
        if(added === true) {
            return 'Dodano'
        }
        return '+ dodaj'
    }

    return (
        <div className="RoomComponent">
            <button className = "btn btn-outline-dark m-2 w-25" onClick = {() => navigate(`/${projectName}/project/structure`)}>Wstecz</button>
            <h1>{room.roomCascadeName}</h1>
                    <ul className ="list-group">
                        {
                            types.map (
                                (type, index) => (
                                    <li>
                                        {type}
                                        <button className="btn btn-dark btn-sm m-1" disabled = {checkForDuplicates(type)}
                                            onClick={() =>handleAddBtn(index)}>{handleAddMainName(checkForDuplicates(type))}</button>
                                    </li>
                                )
                            )
                        }
                    </ul>
                    <br></br>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Nazwa pomiaru</th>
                            <th>Otwórz</th>
                            <th>Usuń pomiar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            room.measurementMains?.map (
                                main => (
                                    <tr key = {main.id}>
                                        <td>{main.measurementName}</td>
                                        <td><button className="btn btn-dark" onClick={() => handleOpenMainBtn(main.id)}>Otwórz</button></td>
                                        <td><button className="btn btn-outline-dark" onClick={() => handleDeleteMainBtn(main.id)}>Usuń</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
        </div>
    )
}
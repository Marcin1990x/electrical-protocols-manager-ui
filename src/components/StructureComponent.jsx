import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addBuildingApi, addFloorToBuildingApi, deleteBuildingByIdApi, retrieveBuildingApi} from "../api/BuildingApiService"
import { addFloorApi, addRoomToFloorApi, deleteFloorByIdApi } from "../api/FloorApiService"
import { addRoomApi, deleteRoomByIdApi } from "../api/RoomApiService"
import FloorTable from "./tables/FloorTable"
import { addBuildingToProjectApi, retrieveProjectByNameApi } from "../api/ProjectApiService"

export default function StructureComponent() {

    const navigate = useNavigate()
    const {projectName} = useParams()

    const [render, setRender] = useState('')
    const [buildings, setBuildings] = useState([])
    const [buildingName, setBuildingName] = useState('')
    const [floorName, setFloorName] = useState('')
    const [roomName, setRoomName] = useState('')

    const [message, setMessage] = useState('')
    const [messageVisible, setMessageVisible] = useState(false)

    function showError(text) {
        setMessageVisible(true)
        setMessage(text)
    }

    useEffect ( () => refreshData(), [render])

    function refreshData() {

        retrieveProjectByNameApi(projectName)
            .then(response => {
                console.log(response)
                if(response.data.building === null){
                    setBuildings(null)
                } else {                
                retrieveBuildingApi(response.data.building.id)
                    .then(response => {
                        setBuildings(response.data)
                        console.log(response)})
                        .catch(error => console.log(error))
                }
            })
            .catch(error => console.log(error))
    }

    function handleBuildingNameChange(event) {
        setBuildingName(event.target.value)
    }
    function handleFloorNameChange(event) {
        setFloorName(event.target.value)
    }
    function handleRoomNameChange(event) {
        setRoomName(event.target.value)
    }
    function handleRoomBtn(id) {
        navigate(`rooms/${id}`)
    }

    function handleAddBuildingBtn() {

        const newBuilding = {
            buildingName: buildingName
        }
        if(buildingName !== '') {
            addBuildingApi(newBuilding)
                .then(response => {  
                    addBuildingToProjectApi(projectName, response.data.id)
                        .then(response => {
                            setRender(render - 1)
                            console.log(response)
                        })
                        .catch(error => console.log(error))
                    console.log(response)
                    setMessageVisible(false)
            })
            .catch(error => console.log(error))
        } else {
            showError('Wpisz nazwę budynku.')
        }
    }
    function addFloorTable(building){
        return (
                FloorTable(building, handleAddRoomBtn, handleDeleteBtn, handleRoomBtn)
        )
    }
    function handleDeleteBtn(id, delType, parentId) {
        if(delType === 1) {
            deleteBuildingByIdApi(id)
                .then(response => {
                    setRender(render - 1)
                    console.log(response)
                })
                .catch(error => console.log(error))
        } else if (delType === 2) {
            deleteFloorByIdApi(id, parentId)
                .then(response => {
                    setRender(render + 1)
                    console.log(response)
                })
                .catch(error => console.log(error))
        } else if (delType === 3) {
            deleteRoomByIdApi(id, parentId)
                .then(response => {
                    setRender(render + 1)
                    console.log(response)
                })
                .catch(error => console.log(error))
        }
    }
    function handleAddFloorBtn(id) {

        const newFloor = {
            floorName: floorName
        }
        if(floorName !== '') {
            addFloorApi(newFloor)
            .then(response => {
                setRender(render - 1)
                addFloorToBuildingApi(id, response.data.id)
                .then(response => {
                    setMessageVisible(false)
                    setRender(render + 1)
                    console.log(response)
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        } else {
            showError('Wpisz nazwę piętra.')
        }
    }
    function handleAddRoomBtn(id) { // same as above. Refactor with if
        const newRoom = {
            roomName: roomName
        }
        if(roomName !== '') {
            addRoomApi(newRoom)
            .then(response => {
                setRender(render - 1)
                addRoomToFloorApi(id, response.data.id)
                .then(response => {
                    setMessageVisible(false)
                    setRender(render + 1)
                    console.log(response)
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        } else {
            showError('Wpisz nazwę pomieszczenia.')
        }
    }

    return (
        <div className="StructureComponent">
            <button className="btn btn-outline-dark m-2 w-25" onClick={() => navigate(`/${projectName}/project`)}>Wstecz</button>
            <div className="message">
                {messageVisible && message}
            </div>
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Budynek</th>
                            <th>Piętro</th>
                            <th>Pomieszczenie</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" className="form-control form-control-sm" defaultValue = "wprowadź nazwę" maxLength = {15} onChange={handleBuildingNameChange} />
                                <button className="btn btn-dark m-2" disabled = {buildings} onClick={handleAddBuildingBtn}>Dodaj budynek</button>
                            </td>
                            <td>
                                <input type="text" className="form-control form-control-sm" defaultValue = "wprowadź nazwę" maxLength = {15} onChange={handleFloorNameChange} />
                            </td>
                            <td>
                                <input type="text" className="form-control form-control-sm" defaultValue = "wprowadź nazwę" maxLength = {15} onChange={handleRoomNameChange} />
                            </td>
                        </tr>
                        {
                            buildings?.map (
                                building => (
                                    <tr key = {building.id}>
                                        <td>
                                            <div className="structure-element">
                                                {building.buildingName}
                                            </div>
                                            <button className="btn btn-outline-dark btn-sm m-1" onClick = {() => handleDeleteBtn(building.id, 1)}>Usuń</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-dark m-2" onClick = {() => handleAddFloorBtn(building.id)}>Dodaj piętro</button>
                                        </td>
                                        <td>
                                            {addFloorTable(building)}
                                        </td>
                                    </tr>
                                )
                            )
                        }            
                    </tbody>
                </table>
            </div>
        </div>
    )
}
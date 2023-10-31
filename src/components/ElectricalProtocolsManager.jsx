import { useEffect, useState } from "react"
import { addBuildingApi, retrieveBuildingsApi, addFloorToBuildingApi, deleteBuildingByIdApi} from "../api/BuildingApiService"
import { addFloorApi, addRoomToFloorApi, deleteFloorByIdApi } from "../api/FloorApiService"
import { addRoomApi, deleteRoomByIdApi } from "../api/RoomApiService"
import FloorTable from "./tables/FloorTable"

export default function ElectricalProtocolsManager() {

    const [render, setRender] = useState(0)
    const [buildings, setBuildings] = useState([])
    const [buildingName, setBuildingName] = useState('')
    const [floorName, setFloorName] = useState('')
    const [roomName, setRoomName] = useState('')

    useEffect ( () => refreshData(), [render])

    function handleBuildingNameChange(event) {
        setBuildingName(event.target.value)
    }
    function handleFloorNameChange(event) {
        setFloorName(event.target.value)
    }
    function handleRoomNameChange(event) {
        setRoomName(event.target.value)
    }
    function handleAddBuildingBtn() {
        const newBuilding = {
            buildingName: buildingName
        }
        if(buildingName !== '') {
            addBuildingApi(newBuilding)
            .then(response => {
                console.log(response)
                setRender(render + 1)
            })
            .catch(error => console.log(error))
            console.log(render)
        } else {
            console.log('Fill building name field.')
        }
    }
    function addFloorTable(building){
        return (
                FloorTable(building, handleAddRoomBtn, handleDeleteBtn)
        )
    }
    function handleDeleteBtn(id, delType, parentId) {
        if(delType === 1) {
            deleteBuildingByIdApi(id)
            .then(response => {
                setRender(render + 1)
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
            deleteRoomByIdApi(id)
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
                    setRender(render + 1)
                    console.log(response)
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        } else {
            console.log('Fill floor name field.')
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
                    setRender(render + 1)
                    console.log(response)
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        } else {
            console.log('Fill room name field.')
        }
    }

    function refreshData() {
        retrieveBuildingsApi()
        .then(response => {
            console.log(response)
            setBuildings(response.data)
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="ElectricalProtocolsManager">
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>BUILDING</th>
                            <th>add FLOOR</th>
                            <th>add ROOM</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" defaultValue="building name" onChange={handleBuildingNameChange} ></input>
                                <button type="button" className="btn btn-success" onClick={handleAddBuildingBtn}>Add building</button>
                            </td>
                            <td>
                                <input type="text" defaultValue="floor name" onChange={handleFloorNameChange} ></input>
                            </td>
                            <td>
                            <input type="text" defaultValue="room name" onChange={handleRoomNameChange} ></input>
                            </td>
                        </tr>
                        {
                            buildings.map (
                                building => (
                                    <tr key = {building.id}>
                                        <td>
                                            {building.buildingName}
                                            <button type="button" className="btn btn-danger" onClick = {() => handleDeleteBtn(building.id, 1)}>X</button>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-success" onClick = {() => handleAddFloorBtn(building.id)}>Add floor</button>
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
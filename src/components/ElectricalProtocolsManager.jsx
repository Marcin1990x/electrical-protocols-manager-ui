import { useEffect, useState } from "react"
import { addBuildingApi, retrieveBuildingsApi, addFloorToBuildingApi} from "../api/BuildingApiService"
import { retrieveFloorsApi, addFloorApi } from "../api/FloorApiService"

export default function ElectricalProtocolsManager() {

    const [render, setRender] = useState(0)
    const [buildings, setBuildings] = useState([])
    const [floors, setFloors] = useState([])
    const [buildingName, setBuildingName] = useState('Building Name')
    const [floorName, setFloorName] = useState('Floor Name')

    useEffect ( () => refreshData(), [render])

    function handleBuildingNameChange(event) {
        setBuildingName(event.target.value)
    }
    function handleFloorNameChange(event) {
        setFloorName(event.target.value)
    }
    function handleAddBuildingBtn() {
        const newBuilding = {
            buildingName: buildingName
        }
        if(buildingName !== '') {
            addBuildingApi(newBuilding)
            .then(response => console.log(response))
            .catch(error => console.log(error))
            setRender(render + 1)
            console.log(render)
        } else {
            console.log('Fill building name field.')
        }
    }
    function handleAddFloorBtn(id) {
        const newFloor = {
            floorName: floorName
        }
        if(floorName !== '') {
            addFloorApi(newFloor)
            .then(response => {
                addFloorToBuildingApi(id, response.data.id)
                .then(response => console.log(response))
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
            setRender(render - 1)
        } else {
            console.log('Fill floor name field.')
        }
    }

    function refreshData() {
        retrieveBuildingsApi()
        .then(response => {
            console.log(response)
            setBuildings(response.data)
        })
        .catch(error => console.log(error))
        retrieveFloorsApi()
        .then(response => setFloors(response.data))
        .catch(error => console.log(error))
    }

    return (
        <div className="ElectricalProtocolsManager">

            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>BUILDING</th>
                            <th>add</th>
                            <th>add</th>
                            <th>add</th>
                            <th>FLOOR</th>
                            <th>add</th>
                            <th>ROOM</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" defaultValue= "Building Name" onChange={handleBuildingNameChange} ></input>
                                <button type="button" className="btn btn-success" onClick={handleAddBuildingBtn}>Add building</button>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        {
                            buildings.map (
                                building => (
                                    <tr key = {building.id}>
                                        <td>
                                            {building.buildingName}
                                            <button type="button" className="btn btn-danger">X</button>
                                        </td>
                                        <td>
                                            <input type="text" defaultValue= "Floor Name" onChange={handleFloorNameChange} ></input>
                                            <button type="button" className="btn btn-success" onClick={() =>handleAddFloorBtn(building.id)}>Add floor</button>
                                        </td>
                                        <td>
                                            {
                                                floors.map (
                                                    floor => (
                                                        <tr key = {floor.id} >
                                                            <td>{floor.floorName}</td>
                                                        </tr>
                                                    )
                                                )
                                            }
                                        </td>
                                    </tr>
                                )
                            )
                        }
                        {/* {
                            floors.map (
                                floor => (
                                    <tr key = {floor.id}>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            {floor.floorName}
                                            <button type="button" className="btn btn-danger">X</button>
                                        </td>
                                        <td>
                                            <input type="text" defaultValue= "Floor Name"  ></input>
                                            <button type="button" className="btn btn-success">Add room</button>
                                        </td>
                                    </tr>
                                )
                            )
                        } */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
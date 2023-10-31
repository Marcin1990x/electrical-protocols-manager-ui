import RoomTable from "./RoomTable"

export default function FloorTable(building, handleAddRoomBtn, handleDeleteBtn) {

    function addRoomTable(floor){
        return (
                RoomTable(floor, handleDeleteBtn)
        )
    }

    return (
        <div className="FloorTable">
            <table className="table">
            <thead>
                <tr>
                    <th>FLOOR</th>
                </tr>
            </thead>
            <tbody>
                {
                    building.floors.map (
                        floor => (
                            <tr key = {floor.id} >
                                <td>
                                    {floor.floorName}
                                    <button type="button" className="btn btn-danger" onClick = {() => handleDeleteBtn(floor.id, 2, building.id)}>X</button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-success" onClick={() =>handleAddRoomBtn(floor.id)}>Add room</button>
                                </td>
                                <td>
                                    {addRoomTable(floor)}
                                </td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    </div>
    )
}
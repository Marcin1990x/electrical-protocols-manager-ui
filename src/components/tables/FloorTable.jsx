import RoomTable from "./RoomTable"

export default function FloorTable(building, handleAddRoomBtn, handleDeleteBtn, handleRoomBtn) {

    function addRoomTable(floor){
        return (
                RoomTable(floor, handleDeleteBtn, handleRoomBtn)
        )
    }

    return (
        <div className="FloorTable">
            <table className="table">
            <thead>
                <tr>
                    <th>Piętro</th>
                </tr>
            </thead>
            <tbody>
                {
                    building.floors.map (
                        floor => (
                            <tr key = {floor.id} >
                                <td>
                                    {floor.floorName}
                                    <button className="btn btn-danger btn-sm m-1" onClick = {() => handleDeleteBtn(floor.id, 2, building.id)}>X</button>
                                </td>
                                <td>
                                    <button className="btn btn-success" onClick={() =>handleAddRoomBtn(floor.id)}>Dodaj pomieszczenie</button>
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
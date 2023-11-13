import RoomTable from "./RoomTable"
import '../Common.css'

export default function FloorTable(building, handleAddRoomBtn, handleDeleteBtn, handleRoomBtn) {

    function addRoomTable(floor){
        return (
                RoomTable(floor, handleDeleteBtn, handleRoomBtn)
        )
    }

    return (
        <div className="FloorTable">
            <table className="table table-bordered">
            <thead>
                <tr className="table-success">
                    <th>Piętro</th>
                </tr>
            </thead>
            <tbody>
                {
                    building.floors.map (
                        floor => (
                            <tr key = {floor.id} >
                                <td>
                                    <div className="structure-element">
                                        {floor.floorName}
                                    </div>
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
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
            <table className="table table-borderless">
            <thead>
                <tr>
                    <th>Piętra</th>
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
                                    <button className="btn btn-outline-dark btn-sm m-1" onClick = {() => handleDeleteBtn(floor.id, 2, building.id)}>Usuń</button>
                                </td>
                                <td>
                                    <button className="btn btn-dark m-2" onClick={() =>handleAddRoomBtn(floor.id)}>Dodaj pomieszczenie</button>
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
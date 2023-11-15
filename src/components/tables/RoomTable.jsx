import '../Common.css'

export default function RoomTable(floor, handleDeleteBtn, handleRoomBtn) {

    return (
        <div className="RoomTable">
            <table className="table table-borderless">
            <thead>
                <tr>
                    <th>Pomieszczenia</th>
                </tr>
            </thead>
            <tbody>
                {
                    floor.rooms.map (
                        room => (
                            <tr key = {room.id}>
                                <td>
                                    <div className="structure-element">
                                        {room.roomName}
                                    </div>
                                    <button className="btn btn-warning btn-sm m-1" onClick = {() => handleRoomBtn(room.id)}>Otwórz</button>
                                    <button className="btn btn-danger btn-sm m-1" onClick = {() => handleDeleteBtn(room.id, 3, floor.id)}>X</button>
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
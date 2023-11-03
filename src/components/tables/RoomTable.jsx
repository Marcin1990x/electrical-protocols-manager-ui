export default function RoomTable(floor, handleDeleteBtn, handleRoomBtn) {

    return (
        <div className="RoomTable">
            <table className="table">
            <thead>
                <tr>
                    <th>Pomieszczenie</th>
                </tr>
            </thead>
            <tbody>
                {
                    floor.rooms.map (
                        room => (
                            <tr key = {room.id} >
                                <td>
                                    <button className="btn btn-warning btn-sm m-1" onClick = {() => handleRoomBtn(room.id)}>{room.roomName}</button>
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
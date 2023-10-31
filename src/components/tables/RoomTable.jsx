export default function RoomTable(floor, handleDeleteBtn) {

    return (
        <div className="RoomTable">
            <table className="table">
            <thead>
                <tr>
                    <th>ROOM</th>
                </tr>
            </thead>
            <tbody>
                {
                    floor.rooms.map (
                        room => (
                            <tr key = {room.id} >
                                <td>
                                    {room.roomName}
                                    <button type="button" className="btn btn-danger" onClick = {() => handleDeleteBtn(room.id, 3)}>X</button>
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
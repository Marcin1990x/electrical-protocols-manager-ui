export default function RoomTable(floor) {

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
                                    <button type="button" className="btn btn-danger">X</button>
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
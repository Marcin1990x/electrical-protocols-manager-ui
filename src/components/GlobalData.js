import { createContext, useContext, useState } from "react"
import { retrieveBuildingApi } from "../api/BuildingApiService"
import { retrieveRoomApi } from "../api/RoomApiService"

export const Context = createContext()
export const useGlobal = () => useContext(Context)

export default function ContextProvider({children}) {

    const [building, setBuilding] = useState([])
    const [room, setRoom] = useState([])

    
    function getBuilding(id) {

        retrieveBuildingApi(id)
        .then(response => {
            setBuilding(response.data)
            console.log(response)
        })
        .catch(error => console.log(error))
    }
    function getRoom(id) {

        retrieveRoomApi(id)
        .then(response => {
            setRoom(response.data)
            console.log(response)
        })
        .catch(error => console.log(error))
    }

    return (
        <Context.Provider value = {{building, getBuilding, room, getRoom}} >
            {children}
        </Context.Provider>
    )
}
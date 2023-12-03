import { createContext, useContext} from "react"
import { sendHeartbeats } from "../api/ApplicationApiService"

export const Context = createContext()
export const useGlobal = () => useContext(Context)

export default function ContextProvider({children}) {

    setInterval( () => {
        sendHeartbeats()
    }, 2000)

    return (
        <Context.Provider value = {1} >
            {children}
        </Context.Provider>
    )
}
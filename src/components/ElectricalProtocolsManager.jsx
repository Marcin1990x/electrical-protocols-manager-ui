import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePageComponent from './HomePageComponent'
import RoomComponent from "./RoomComponent"
import AddMeasurementComponent from "./AddMeasurementComponent"
import MeasurementComponent from "./MeasurementComponent"
import ContextProvider from "./GlobalData"

export default function ElectricalProtocolsManager() {

    return (
        <div className="ElectricalProtocolsManager">
            <ContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path = "" element = { <HomePageComponent />} />
                        <Route path = "/rooms/:id" element = { <RoomComponent />} />
                        <Route path = "/room/:id/measurement/:index" element = { <AddMeasurementComponent />} />
                        <Route path = "measurements/:id" element = { <MeasurementComponent />} />
                    </Routes>
                </BrowserRouter>
            </ContextProvider>
        </div>
    )
}
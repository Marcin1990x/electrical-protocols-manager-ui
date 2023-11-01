import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePageComponent from './HomePageComponent'
import RoomComponent from "./RoomComponent"
import MeasurementComponent from "./MeasurementComponent"

export default function ElectricalProtocolsManager() {

    return (
        <div className="ElectricalProtocolsManager">
            <BrowserRouter>
                <Routes>
                    <Route path = "" element = { <HomePageComponent />} />
                    <Route path = "/rooms/:id" element = { <RoomComponent />} />
                    <Route path = "/room/:id/measurement/:index" element = { <MeasurementComponent />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
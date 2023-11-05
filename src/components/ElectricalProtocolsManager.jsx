import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePageComponent from './HomePageComponent'
import RoomComponent from "./RoomComponent"
import AddMeasurementComponent from "./AddMeasurementComponent"
import MeasurementComponent from "./MeasurementComponent"
import ContextProvider from "./GlobalData"
import HomeComponent from "./HomeComponent"
import ProjectComponent from "./ProjectComponent"
import ElectriciansComponent from "./ElectriciansComponent"
import AddElectricianComponent from "./AddElectricianComponent"

export default function ElectricalProtocolsManager() {

    return (
        <div className="ElectricalProtocolsManager">
            <ContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path = "/temp1" element = { <ProjectComponent />} /> 
                        <Route path = "/temp" element = { <HomeComponent />} />
                        <Route path = "" element = { <HomePageComponent />} />
                        <Route path = "/addElectrician" element = { <AddElectricianComponent />} />
                        <Route path = "/electricians" element = { <ElectriciansComponent />} />
                        <Route path = "/rooms/:id" element = { <RoomComponent />} />
                        <Route path = "/room/:id/addMeasurement/:index" element = { <AddMeasurementComponent />} />
                        <Route path = "/rooms/:id/measurements/:idMain" element = { <MeasurementComponent />} />
                    </Routes>
                </BrowserRouter>
            </ContextProvider>
        </div>
    )
}
import { BrowserRouter, Route, Routes } from "react-router-dom"
import StructureComponent from './StructureComponent'
import RoomComponent from "./RoomComponent"
import AddMeasurementComponent from "./AddMeasurementComponent"
import MeasurementComponent from "./MeasurementComponent"
import ContextProvider from "./GlobalData"
import HomeComponent from "./HomeComponent"
import ProjectComponent from "./ProjectComponent"
import ElectriciansComponent from "./ElectriciansComponent"
import ProtocolInformationComponent from "./ProtocolInformationComponent"
import GeneratePdfComponent from "./GeneratePdfComponent"

export default function ElectricalProtocolsManager() {

    return (
        <div className="ElectricalProtocolsManager">
            <ContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path = "/project" element = { <ProjectComponent />} /> 
                        <Route path = "" element = { <HomeComponent />} />
                        <Route path = "/structure" element = { <StructureComponent />} />
                        <Route path = "/generate" element = { <GeneratePdfComponent />} />
                        <Route path = "/protocolInfo" element = { <ProtocolInformationComponent />} />
                        <Route path = "/electricians" element = { <ElectriciansComponent />} />
                        <Route path = "/rooms/:id" element = { <RoomComponent />} />
                        <Route path = "/rooms/:id/addMeasurement/:index" element = { <AddMeasurementComponent />} />
                        <Route path = "/rooms/:id/measurements/:idMain" element = { <MeasurementComponent />} />
                    </Routes>
                </BrowserRouter>
            </ContextProvider>
        </div>
    )
}
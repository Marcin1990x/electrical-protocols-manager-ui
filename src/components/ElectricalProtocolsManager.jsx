import { BrowserRouter, Route, Routes} from "react-router-dom"
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
import HeaderComponent from "./HeaderComponent"
import ErrorComponent from "./ErrorComponent"
import ExitComponent from "./ExitComponent"

export default function ElectricalProtocolsManager() {

    return (
        <div className="ElectricalProtocolsManager">
            <ContextProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                        <Routes>
                            <Route path = "*" element = { <ErrorComponent/>} /> 
                            <Route path = "/exit" element = { <ExitComponent />} /> 
                            <Route path = ":projectName/project" element = { <ProjectComponent />} /> 
                            <Route path = "" element = { <HomeComponent />} />
                            <Route path = ":projectName/project/structure" element = { <StructureComponent />} />
                            <Route path = ":projectName/project/generate" element = { <GeneratePdfComponent />} />
                            <Route path = ":projectName/project/protocolInfo" element = { <ProtocolInformationComponent />} />
                            <Route path = "/electricians" element = { <ElectriciansComponent />} />
                            <Route path = ":projectName/project/structure/rooms/:id" element = { <RoomComponent />} />
                            <Route path = ":projectName/project/structure/rooms/:id/addMeasurement/:index" element = { <AddMeasurementComponent />} />
                            <Route path = ":projectName/project/structure/rooms/:id/measurements/:idMain" element = { <MeasurementComponent />} />
                        </Routes>
                </BrowserRouter>
            </ContextProvider>
        </div>
    )
}
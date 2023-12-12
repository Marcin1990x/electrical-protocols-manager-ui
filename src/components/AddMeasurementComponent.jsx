import { useParams, useNavigate } from "react-router-dom"
import { addEntryToMainApi, addMeasurementMain, retrieveMeasurementMainById } from "../api/MeasurementMainApiService"
import { useEffect, useRef, useState } from "react"
import { addMainToRoomApi } from "../api/RoomApiService"
import { retrieveMeasurementMainTypes, deleteMeasurementMainApi } from "../api/MeasurementMainApiService"
import { addMeasurementEntry, deleteEntryByIdApi, deleteAllEntriesApi } from "../api/MeasurementEntryApiService"
import { handleContinuity, handleResult } from "./functions/CommonFunctions"
import MainInput from "./elements/MainInput"
import EntryInput from "./elements/EntryInput"

export default function AddMeasurementComponent() {

    const {id, index, projectName} = useParams()

    const navigate = useNavigate()

    var maxEntries = 20

    const [mainAdded, setMainAdded] = useState(false)
    const [mainIndex, setMainIndex] = useState(0)
    const [main, setMain] = useState(null)
    const [entry, setEntry] = useState([])
    const [entriesMax, setEntriesMax] = useState(false)
    const [message, setMessage] = useState('')
    const [messageVisible, setMessageVisible] = useState(false)

    const [firstPhase, setFirstPhase] = useState(false)
    const [secondPhase, setSecondPhase] = useState(false)
    const [thirdPhase, setThirdPhase] = useState(false)
    const [allPhases, setAllPhases] = useState(true)

    function handlePhaseSelect(event) {
        if(event.target.value === '1') {
            setFirstPhase(true)
            setSecondPhase(false)
            setThirdPhase(false)
            setAllPhases(false)
        }
        else if(event.target.value === '2') {
            setFirstPhase(false)
            setSecondPhase(true)
            setThirdPhase(false)
            setAllPhases(false)
        }
        else if(event.target.value === '3') {
            setFirstPhase(false)
            setSecondPhase(false)
            setThirdPhase(true)
            setAllPhases(false)
        }
        else if(event.target.value === '4') {
            setFirstPhase(false)
            setSecondPhase(false)
            setThirdPhase(false)
            setAllPhases(true)
        }
    }

    
    //discriminator 0
    const un = useRef()
    const ui = useRef() // common with 3
    const ko = useRef()
    const ta = useRef() // common with 3
    const networkType = useRef()

    const uo = useRef()
    const symbol = useRef()
    const point = useRef() // common with 3
    const cutout = useRef() // common with 3
    const type = useRef() // common with 3
    const iNom = useRef() // common with 3
    const zs = useRef()
    //discriminator 0
    //discriminator 1
    const uiso = useRef() // common with 2

    const phase = useRef() // common with 2
    const circuitName = useRef() // common with 2
    const l1l2 = useRef() // common with 2
    const l2l3 = useRef() // common with 2
    const l3l1 = useRef() // common with 2
    const l1pe = useRef()
    const l2pe = useRef()
    const l3pe = useRef()
    const l1n = useRef()
    const l2n = useRef()
    const l3n = useRef()
    const npe = useRef()
    const ra = useRef() // common with 2 and 5
    //discriminator 1
    //discriminator 2
    const l1pen = useRef()
    const l2pen = useRef()
    const l3pen = useRef()
    //discriminator 2
    //discriminator 3
    const ia = useRef()
    const trcd = useRef()
    const ub = useRef()
    //discriminator 3
    //discriminator 4
    const lm = useRef()
    const dm = useRef()
    const p = useRef()
    //discriminator 4

    //discriminator 5
    const continuity = useRef()
    const rs = useRef()
    //discriminator 5


    const [render, setRender] = useState('')
    const [types, setTypes] = useState([])

    useEffect ( () => { 
        checkEntriesQuantity()
        refreshMeasurementName()
        refreshMain()
    }, [render])


    function refreshMeasurementName(){
        retrieveMeasurementMainTypes()
            .then(response => setTypes(response.data))
            .catch(error => console.log(error))
    }
    function refreshMain(){
        if(mainIndex !== 0) {
        retrieveMeasurementMainById(mainIndex)
            .then(response => {
                console.log(response)
                setMain(response.data)
            })
            .catch(error => console.log(error))
        }
    }
    function checkEntriesQuantity() {
        if(main!== null && main.measurementEntries !== null && main.measurementEntries.length === maxEntries){
            setEntriesMax(true)
            showError('Maksymalna ilość wpisów ' + maxEntries)
        } else {
            setEntriesMax(false)
            setMessageVisible(false)
        }
    }

    function showError(text) {
        setMessageVisible(true)
        setMessage(text)
    }

    function numberFieldChecker(value) {
        if(value !== '' && value > 0){
            return true
        } else {
            return false
        }
    }
    function addEntryLogic(entryObj)
    {
        addMeasurementEntry(index, entryObj)
        .then(response => {
            console.log(response)
            setEntry(response.data)
                addEntryToMainApi(index, main.id, response.data.id)
                .then(response => {
                    console.log(response)
                    setRender(render + 1)
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error)) 
    }         

    function handleAddEntryBtn() {

        if(index == 0) {
            const newProtectionMeasurementEntry = {
                symbol : symbol.current.value,
                uo : uo.current.value,
                measuringPoint : point.current.value,
                cutout : cutout.current.value,
                type : type.current.value,
                iNom : iNom.current.value,
                zs : zs.current.value
            }
            if(cutout.current.value !== '' && type.current.value !== '' && numberFieldChecker(iNom.current.value) 
            && numberFieldChecker(zs.current.value) && numberFieldChecker(uo.current.value)) {

                addEntryLogic(newProtectionMeasurementEntry)       
            } else {
                showError('Wypełnij wszystkie pola.')
            }
        }
        if(index == 1) {

            if(allPhases) {
            const newCircuitInsulationTnsEntry = {
                symbol: symbol.current.value,
                circuitName : circuitName.current.value,
                l1l2 : l1l2.current.value,
                l2l3 : l2l3.current.value,
                l3l1 : l3l1.current.value,
                l1pe : l1pe.current.value,
                l2pe : l2pe.current.value,
                l3pe : l3pe.current.value,
                l1n : l1n.current.value,
                l2n : l2n.current.value,
                l3n : l3n.current.value,
                npe : npe.current.value,
                ra : ra.current.value
            }
            if(numberFieldChecker(l1l2.current.value) && numberFieldChecker(l2l3.current.value) && numberFieldChecker(l3l1.current.value)
                && numberFieldChecker(l1pe.current.value) && numberFieldChecker(l2pe.current.value) && numberFieldChecker(l3pe.current.value)
                && numberFieldChecker(l1n.current.value) && numberFieldChecker(l2n.current.value) && numberFieldChecker(l3n.current.value) 
                && numberFieldChecker(npe.current.value) && numberFieldChecker(ra.current.value)) {

                addEntryLogic(newCircuitInsulationTnsEntry)            
            } else {
                showError('Wypełnij wszystkie pola.')
            }
            } else if (firstPhase) {
                const newCircuitInsulationTnsEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l1pe : l1pe.current.value,
                    l1n : l1n.current.value,
                    npe : npe.current.value,
                    ra : ra.current.value
                }
                if(numberFieldChecker(l1pe.current.value) && numberFieldChecker(l1n.current.value)
                    && numberFieldChecker(npe.current.value) && numberFieldChecker(ra.current.value)) {
                    addEntryLogic(newCircuitInsulationTnsEntry)            
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            } else if (secondPhase) {
                const newCircuitInsulationTnsEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l2pe : l2pe.current.value,
                    l2n : l2n.current.value,
                    npe : npe.current.value,
                    ra : ra.current.value
                }
                if(numberFieldChecker(l2pe.current.value) && numberFieldChecker(l2n.current.value)
                    && numberFieldChecker(npe.current.value) && numberFieldChecker(ra.current.value)) {
                    addEntryLogic(newCircuitInsulationTnsEntry)            
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            } else if(thirdPhase) {
                const newCircuitInsulationTnsEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l3pe : l3pe.current.value,
                    l3n : l3n.current.value,
                    npe : npe.current.value,
                    ra : ra.current.value
                }
                if(numberFieldChecker(l3pe.current.value) && numberFieldChecker(l3n.current.value)
                    && numberFieldChecker(npe.current.value) && numberFieldChecker(ra.current.value)) {
                    addEntryLogic(newCircuitInsulationTnsEntry)            
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            }
        }
        if(index == 2) {

            if(allPhases) {
                const newCircuitInsulationTncEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l1l2 : l1l2.current.value,
                    l2l3 : l2l3.current.value,
                    l3l1 : l3l1.current.value,
                    l1pen : l1pen.current.value,
                    l2pen : l2pen.current.value,
                    l3pen : l3pen.current.value,
                    ra : ra.current.value
                }
                if(numberFieldChecker(l1l2.current.value) && numberFieldChecker(l2l3.current.value) && numberFieldChecker(l3l1.current.value)
                && numberFieldChecker(l1pen.current.value) && numberFieldChecker(l2pen.current.value) && numberFieldChecker(l3pen.current.value) 
                && numberFieldChecker(ra.current.value)){
                
                    addEntryLogic(newCircuitInsulationTncEntry)         
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            } else if(firstPhase) {
                const newCircuitInsulationTncEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l1pen : l1pen.current.value,
                    ra : ra.current.value
                }
                if(numberFieldChecker(l1pen.current.value) && numberFieldChecker(ra.current.value)){
                    addEntryLogic(newCircuitInsulationTncEntry)         
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            } else if(secondPhase) {
                const newCircuitInsulationTncEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l2pen : l2pen.current.value,
                    ra : ra.current.value
                }
                if(numberFieldChecker(l2pen.current.value) && numberFieldChecker(ra.current.value)){
                    addEntryLogic(newCircuitInsulationTncEntry)         
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            } else if(thirdPhase) {
                const newCircuitInsulationTncEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l1pen : l3pen.current.value,
                    ra : ra.current.value
                }
                if(numberFieldChecker(l3pen.current.value) && numberFieldChecker(ra.current.value)){
                    addEntryLogic(newCircuitInsulationTncEntry)         
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            }
        }
        if(index == 3) {
            const newResidualCurrentProtectionEntry = {
                symbol: symbol.current.value,
                measuringPoint : point.current.value,
                circuitBreaker : cutout.current.value,
                rcdType : type.current.value,
                iNom : iNom.current.value,
                ia : ia.current.value,
                ta : ta.current.value,
                trcd : trcd.current.value,
                ub : ub.current.value,
                ui : ui.current.value
            }
            if(cutout.current.value !== '' && type.current.value !== '' && numberFieldChecker(iNom.current.value) && numberFieldChecker(ia.current.value)
             && numberFieldChecker(ta.current.value) && numberFieldChecker(trcd.current.value) && numberFieldChecker(ub.current.value)
              && numberFieldChecker(ui.current.value)) {
            
                addEntryLogic(newResidualCurrentProtectionEntry)         
            } else {
                showError('Wypełnij wszystkie pola.')
            }
        }
        if(index == 4) {
            const newSoilResistanceEntry = {
                symbol : symbol.current.value,
                measuringPoint : point.current.value,
                l : lm.current.value,
                d : dm.current.value,
                p : p.current.value,
            }
            if(numberFieldChecker(lm.current.value) && numberFieldChecker(dm.current.value) && numberFieldChecker(p.current.value)) {
                addEntryLogic(newSoilResistanceEntry)           
            } else {
                showError('Wypełnij wszystkie pola.')
            }
        }
        if(index == 5) {
            const newContinuityOfSmallResistanceEntry = {
                symbol : symbol.current.value,
                continuity : continuity.current.value,
                rs : rs.current.value,
                ra : ra.current.value,
            }
            if(continuity.current.value !== '' && numberFieldChecker(rs.current.value) && numberFieldChecker(ra.current.value)) {
                addEntryLogic(newContinuityOfSmallResistanceEntry)           
            } else {
                showError('Wypełnij wszystkie pola.')
            }
        }
    }
    function handleAddMainBtn() {

        if(index == 0 ) {
            const newProtectionMeasurementMain = {
                un : un.current.value,
                ui : ui.current.value,
                ko : ko.current.value,
                ta : ta.current.value,
                networkType : networkType.current.value,
            }
            if(numberFieldChecker(un.current.value) && numberFieldChecker(ui.current.value) && numberFieldChecker(ko.current.value)
            && numberFieldChecker(ta.current.value) && networkType.current.value !== ''&& numberFieldChecker(uo.current.value)) {
                setMainAdded(true)
                addMeasurementMain(index, newProtectionMeasurementMain)
                .then(response => {
                    setMainIndex(response.data.id)
                    setMain(response.data)
                    setMessageVisible(false)
                    addMainToRoomApi(id, response.data.id)
                    .then(response => console.log(response))
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
            } else {
                showError('Wypełnij wszystkie pola.')
            }
        }
        if(index == 1 || index == 2) {

            console.log(uiso.current.value)

            const newCircuitInsulationMain = {
                uiso : uiso.current.value
            }
            if(numberFieldChecker(uiso.current.value)) {
                setMainAdded(true)
                addMeasurementMain(index, newCircuitInsulationMain)
                .then(response => {
                    setMainIndex(response.data.id)
                    setMain(response.data)
                    setMessageVisible(false)
                    addMainToRoomApi(id, response.data.id)
                    .then(response => console.log(response))
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
            } else {
                showError('Wypełnij wszystkie pola.')
            }
        }
        if(index == 3) {
            const newResidualCurrentProtectionMain = {}

            setMainAdded(true)
            addMeasurementMain(index, newResidualCurrentProtectionMain)
                .then(response => {
                setMainIndex(response.data.id)
                setMain(response.data)
                addMainToRoomApi(id, response.data.id)
                  .then(response => console.log(response))
                  .catch(error => console.log(error))
                })
                  .catch(error => console.log(error))
        }
        if(index == 4) {
            const newSoilResistanceMain = {}

            setMainAdded(true)
            addMeasurementMain(index, newSoilResistanceMain)
                .then(response => {
                setMainIndex(response.data.id)
                setMain(response.data)
                addMainToRoomApi(id, response.data.id)
                  .then(response => console.log(response))
                  .catch(error => console.log(error))
                })
                  .catch(error => console.log(error))
        }
        if(index == 5) {
            const newContinuityOfSmallResistanceMain = {}

            setMainAdded(true)
            addMeasurementMain(index, newContinuityOfSmallResistanceMain)
                .then(response => {
                setMainIndex(response.data.id)
                setMain(response.data)
                addMainToRoomApi(id, response.data.id)
                  .then(response => console.log(response))
                  .catch(error => console.log(error))
                })
                  .catch(error => console.log(error))
        }
    }

    function handleDeleteEntryBtn(entryId) {

        deleteEntryByIdApi(index, entryId, mainIndex)
            .then(response => {
                console.log(response)
                setRender(render + 1)
            })
            .catch(error => console.log(error))
    }
    function handleDeleteAllEntriesBtn() {

        deleteAllEntriesApi(index, mainIndex)
            .then(response => {
                setMessageVisible(false)
                console.log(response)
                setRender(render - 1)
            })
            .catch(error => console.log(error))
    }

    //btn to delete entry
    function deleteEntryButton(entryId) {
        return (
            <td><button className="btn btn-outline-dark btn-sm" onClick = {() => handleDeleteEntryBtn(entryId)}>Usuń</button></td>
        )
    }
    //btn to delete all entries
    function deleteAllEntriesButton() {
        return (
            (main!= null && main.measurementEntries!= null) &&
            <button className="btn btn-outline-dark" onClick = {handleDeleteAllEntriesBtn}>Usuń wszystkie wpisy</button>
        )
    }
    function handleDeleteMainBtn() {
        deleteMeasurementMainApi(main.id, id)
            .then(navigate(`/${projectName}/project/structure/rooms/${id}`))
            .catch(error => console.log(error))
    }
    return (
        <div className="AddMeasurementComponent">

            <button className = "btn btn-outline-dark w-25 m-2" 
                onClick = {() => navigate(`/${projectName}/project/structure/rooms/${id}`)}>Wstecz
            </button>

        {/* add room name from authcontext building */}
            <h3>{types[index]}</h3> 

            <div className="message">
                {messageVisible && message}
            </div>

        {/* Add main  */}

            { (index == 0) &&
                <table className="table">
                    <thead>
                        <tr>
                            <th>Un[V]</th>
                            <th>Ui[V]</th>
                            <th>Ko[V]</th>
                            <th>ta[ms]</th>
                            <th>Typ sieci[V]</th>
                            <th>Uo[V]</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* <td><input type = "number" className = "form-control" disabled = {mainAdded} ref={un}
                                data-toggle = "tooltip" data-placement = "top" title = "Wartość skuteczna napięcia znamionowego prądu przemiennego pomiędzy przewodami liniowymi"/></td> */}
                            <td><MainInput disabled = {mainAdded} inputRef = {un} title = "Wartość skuteczna napięcia znamionowego prądu przemiennego pomiędzy przewodami liniowymi"/></td>
                            {/* <td><input type = "number" className = "form-control" disabled = {mainAdded} ref={ui}
                                data-toggle = "tooltip" data-placement = "top" title = "Wartość bezpiecznego napięcia napięcia (50V / 25V) prądu przemiennego [V]"/></td> */}
                            <td><MainInput disabled = {mainAdded} inputRef = {ui} title = "Wartość bezpiecznego napięcia napięcia (50V / 25V) prądu przemiennego [V]"/></td>
                            {/* <td><input type = "number" className = "form-control" disabled = {mainAdded} ref={ko}/></td>  */}
                            <td><MainInput disabled = {mainAdded} inputRef = {ko}/></td>       
                            {/* <td><input type = "number" className = "form-control" disabled = {mainAdded} ref={ta}/></td> */}
                            <td><MainInput disabled = {mainAdded} inputRef = {ta}/></td>
                            <td><select className="form-select" disabled = {mainAdded} ref={networkType}>
                                    <option value = "TNS">TNS</option>
                                    <option value = "TNC">TNS</option>
                                    <option value = "TNS">TN-C-S</option>
                                </select>
                            </td>
                            <td><MainInput disabled = {mainAdded} inputRef = {uo} title = "Wartość skuteczna napięcia znamionowego prądu przemiennego względem ziemi [V]"/></td>
                            {/* <td><input type = "number" className = "form-control" disabled = {mainAdded} ref={uo}
                                data-toggle = "tooltip" data-placement = "top" title = "Wartość skuteczna napięcia znamionowego prądu przemiennego względem ziemi [V]"/></td> */}
                        </tr>
                    </tbody>
                </table>   
            }
            { (index == 1 || index == 2) &&
                <table className="table">
                    <thead>
                        <tr>
                            <th>Uiso[V]</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><MainInput disabled={mainAdded} inputRef={uiso}/></td>
                            {/* <td><input type = "number" className = "form-control" disabled = {mainAdded} ref={uiso}/></td> */}
                        </tr>
                    </tbody>
                </table>   
            }
            <button className="btn btn-dark m-1" disabled = {mainAdded} onClick={handleAddMainBtn}>Dodaj pomiar do protokołu</button>
            <button className="btn btn-outline-dark m-1" disabled = {!mainAdded} onClick={handleDeleteMainBtn}>Usuń pomiar</button>
            {/* Add entry */}

            { (index == 0) &&
                <table className="table">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Badany punkt</th>
                        <th>Wyłącznik</th>
                        <th>Typ</th>
                        <th>In[A]</th>
                        <th>Ia[A]</th>
                        <th>Zs[Ω]</th>
                        <th>Za[Ω]</th>
                        <th>Ik[A]</th>
                        <th>Ocena</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {/* <td><input type = "text" size={5} maxLength = {6} className="form-control" ref = {symbol} disabled = {!mainAdded}/></td> */}
                        <td><EntryInput type = "text" disabled = {!mainAdded} inputRef = {symbol} size = {5} maxLength = {6}/></td>
                        {/* <td className="col-md-2"><input type = "text" maxLength = {20} className="form-control" ref = {point} disabled = {!mainAdded}/></td> */}
                        <td className="col-md-2"><EntryInput type = "text" disabled = {!mainAdded} inputRef = {point} maxLength = {20}/></td>
                        {/* <td><input type = "text" maxLength = {6} className="form-control" ref = {cutout} disabled = {!mainAdded}
                            data-toggle="tooltip" data-placement="top" title="Nazwa elementu zabezpieczającego obwód"/></td> */}
                        <td><EntryInput type = "text" disabled = {!mainAdded} inputRef = {cutout} maxLength = {6} 
                            title = "Nazwa elementu zabezpieczającego obwód"/></td>
                        <td className="col-md-1"><select className="form-select" ref={type} disabled = {!mainAdded} 
                            data-toggle="tooltip" data-placement="top" title="Charakterystyka bezpiecznika">
                                    <option value = "B">B</option>
                                    <option value = "C">C</option>
                                    <option value = "D">D</option>
                            </select>
                        </td>
                        {/* <td><input type = "number" className="form-control" ref = {iNom} disabled = {!mainAdded}
                            data-toggle="tooltip" data-placement="top" title="Prąd nominalny bezpiecznika"/></td> */}
                        <td><EntryInput type = "number" disabled = {!mainAdded} inputRef = {iNom}
                            title = "Prąd nominalny bezpiecznika"/></td>
                        <td><input type = "text" className="form-control" disabled value={entry.ia} 
                            data-toggle="tooltip" data-placement="top" title="Prąd powodujący wyzwolenie bezpiecznika"/></td>
                        {/* <td><EntryInput type = "text" disabled = {true}
                            title = "Prąd powodujący wyzwolenie bezpiecznika" value = {entry.ia}/></td> */}
                        <td><input type = "number" className="form-control" ref = {zs} disabled = {!mainAdded} 
                            data-toggle="tooltip" data-placement="top" title="Zmierzona impedancja pętli zwarciowej"/></td>
                        <td><input type = "text" className="form-control" disabled value={entry.za} 
                            data-toggle="tooltip" data-placement="top" title="Wartość wymagana impedancji pętli zwarciowej: Za = (Uo/Ia)"/></td>
                        <td><input type = "text" className="form-control" disabled value={entry.ik} 
                            data-toggle="tooltip" data-placement="top" title="Prąd zwarcia wyliczony: Ik = Uo/Zs"/></td>
                        <td className="col-md-2"><input type = "text" className="form-control" disabled value= {handleResult(entry.result)}
                            data-toggle="tooltip" data-placement="top" title="Ocena pomiaru: - pozytywna gdy: Zs<=Za lub Ud<=UI"/></td>
                    </tr>
                </tbody>
            </table>
            }
            { (index == 1) &&
            <div>
                <div className="col-2 m-1">
                <select className="form-select" onChange={handlePhaseSelect} ref={phase}>
                                    <option value = '4'>Obwód 3 fazowy</option>
                                    <option value = '1'>Faza 1</option>
                                    <option value = '2'>Faza 2</option>
                                    <option value = '3'>Faza 3</option>
                </select>
                </div>
                <table className="table">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Nazwa obwodu</th>
                        <th>L1-L2[MΩ]</th>
                        <th>L2-L3[MΩ]</th>
                        <th>L3-L1[MΩ]</th>
                        <th>L1-PE[MΩ]</th>
                        <th>L2-PE[MΩ]</th>
                        <th>L3-PE[MΩ]</th>
                        <th>L1-N[MΩ]</th>
                        <th>L2-N[MΩ]</th>
                        <th>L3-N[MΩ]</th>
                        <th>N-PE[MΩ]</th>
                        <th>Ra</th>
                        <th>Ocena</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="col-md-1"><input type = "text" maxLength = {6} className="form-control" ref = {symbol} disabled = {!mainAdded}/></td>
                        <td className="col-md-2"><input type = "text" maxLength = {20} className="form-control" ref = {circuitName} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {l1l2} disabled = {!(mainAdded && allPhases)}/></td>
                        <td><input type = "number" className="form-control" ref = {l2l3} disabled = {!(mainAdded && allPhases)} /></td>
                        <td><input type = "number" className="form-control" ref = {l3l1} disabled = {!(mainAdded && allPhases)} /></td>
                        <td><input type = "number" className="form-control" ref = {l1pe} disabled = {!(mainAdded && (firstPhase || allPhases))} /></td>
                        <td><input type = "number" className="form-control" ref = {l2pe} disabled = {!(mainAdded && (secondPhase || allPhases))} /></td>
                        <td><input type = "number" className="form-control" ref = {l3pe} disabled = {!(mainAdded && (thirdPhase || allPhases))} /></td>
                        <td><input type = "number" className="form-control" ref = {l1n} disabled = {!(mainAdded && (firstPhase || allPhases))} /></td>
                        <td><input type = "number" className="form-control" ref = {l2n} disabled = {!(mainAdded && (secondPhase || allPhases))} /></td>
                        <td><input type = "number" className="form-control" ref = {l3n} disabled = {!(mainAdded && (thirdPhase || allPhases))} /></td>
                        <td><input type = "number" className="form-control" ref = {npe} disabled = {!mainAdded} /></td>
                        <td className="col-md-1"><input type = "number" className="form-control" ref = {ra} disabled = {!mainAdded} /></td>
                        <td className="col-md-1"><input type = "text" className="form-control" disabled value={handleResult(entry.result)}/></td>
                    </tr>
                </tbody>
            </table>
            </div>
            }
            { (index == 2) &&
            <div>
                <div className="col-2 m-1">
                <select className="form-select" onChange={handlePhaseSelect} ref={phase}>
                                    <option value = '4'>Obwód 3 fazowy</option>
                                    <option value = '1'>Faza 1</option>
                                    <option value = '2'>Faza 2</option>
                                    <option value = '3'>Faza 3</option>
                </select>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Nazwa obwodu</th>
                            <th>L1-L2[MΩ]</th>
                            <th>L2-L3[MΩ]</th>
                            <th>L3-L1[MΩ]</th>
                            <th>L1-PEN[MΩ]</th>
                            <th>L2-PEN[MΩ]</th>
                            <th>L3-PEN[MΩ]</th>
                            <th>Ra</th>
                            <th>Ocena</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="col-md-1"><input type = "text" size={5} maxLength = {6} className="form-control" ref = {symbol} disabled = {!mainAdded} /></td>
                            <td className="col-md-2"><input type = "text"  maxLength={20} className="form-control" ref = {circuitName} disabled = {!mainAdded}/></td>
                            <td><input type = "number" className="form-control" ref = {l1l2} disabled = {!(mainAdded && allPhases)}/></td>
                            <td><input type = "number" className="form-control" ref = {l2l3} disabled = {!(mainAdded && allPhases)}/></td>
                            <td><input type = "number" className="form-control" ref = {l3l1} disabled = {!(mainAdded && allPhases)}/></td>
                            <td><input type = "number" className="form-control" ref = {l1pen} disabled = {!(mainAdded && (firstPhase || allPhases))}/></td>
                            <td><input type = "number" className="form-control" ref = {l2pen} disabled = {!(mainAdded && (secondPhase || allPhases))}/></td>
                            <td><input type = "number" className="form-control" ref = {l3pen} disabled = {!(mainAdded && (thirdPhase || allPhases))}/></td>
                            <td><input type = "number" className="form-control" ref = {ra} disabled = {!mainAdded}/></td>
                            <td><input type = "text" className="form-control" disabled value={handleResult(entry.result)}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            }
            { (index == 3) &&
                <table className="table">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Badany punkt</th>
                        <th>Wyłącznik RCD</th>
                        <th>Typ</th>
                        <th>In[mA]</th>
                        <th>Ia[mA]</th>
                        <th>ta[ms]</th>
                        <th>t rcd[ms]</th>
                        <th>Ub[V]</th>
                        <th>Ui[V]</th>
                        <th>Ocena</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type = "text" size={5} maxLength = {6} className="form-control" ref = {symbol} disabled = {!mainAdded}/></td>
                        <td className="col-md-2"><input type = "text" maxLength={20} className="form-control" ref = {point} disabled = {!mainAdded}/></td>
                        <td><input type = "text" maxLength={8} className="form-control" ref = {cutout} disabled = {!mainAdded}/></td>
                        <td className="col-md-1"><select className="form-select" ref={type} disabled = {!mainAdded}>
                                    <option value = '[AC]'>[AC]</option>
                                    <option value = '[A]'>[A]</option>
                                    <option value = '[B]'>[B]</option>
                            </select>
                        </td>
                        <td><input type = "number" className="form-control" ref = {iNom} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {ia} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {ta} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {trcd} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {ub} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {ui} disabled = {!mainAdded}/></td>
                        <td className="col-md-1"><input type = "text" className="form-control" disabled value={handleResult(entry.result)}/></td>
                    </tr>
                </tbody>
            </table>
            }
            { (index == 4) &&
                <table className="table">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Badany punkt</th>
                        <th>L[m]</th>
                        <th>d[m]</th>
                        <th>p[Ωm]</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type = "text" size = {5} maxLength = {6} className="form-control" ref = {symbol} disabled = {!mainAdded}/></td>
                        <td className="col-md-2"><input type = "text" maxLength={20} className="form-control" ref = {point} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {lm} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {dm} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {p} disabled = {!mainAdded}/></td>
                    </tr>
                </tbody>
            </table>
            }
            { (index == 5) &&
                <table className="table">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Ciągłość</th>
                        <th>Rs[Ω]</th>
                        <th>Ra[Ω]</th>
                        <th>Ocena</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type = "text" size={5} maxLength = {6} className="form-control" ref = {symbol} disabled = {!mainAdded}/></td>
                        <td><select className="form-select" ref={continuity} disabled = {!mainAdded}>
                                    <option value = 'PRESERVED'>Zachowana</option>
                                    <option value = 'NOTPRESERVED'>Niezachowana</option>
                            </select>
                        </td>
                        <td><input type = "number" className="form-control" ref = {rs} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {ra} disabled = {!mainAdded}/></td>
                        <td><input type = "text" className="form-control" disabled value={handleResult(entry.result)}/></td>
                    </tr>
                </tbody>
            </table>
            }
            <button className="btn btn-dark" disabled = {!mainAdded || entriesMax} onClick={handleAddEntryBtn}>Dodaj wpis do pomiaru</button> 
            <hr></hr>

            {/* view entry */}

            { (index == 0) &&
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Lp.</th>
                        <th>Symbol</th>
                        <th>Badany punkt</th>
                        <th>Wyłącznik</th>
                        <th>Typ</th>
                        <th>In[A]</th>
                        <th>Ia[A]</th>
                        <th>Zs[Ω]</th>
                        <th>Za[Ω]</th>
                        <th>Ik[A]</th>
                        <th>Ocena</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        main?.measurementEntries?.map (
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.measuringPoint}</td>
                                    <td>{entry.cutout}</td>
                                    <td>{entry.type}</td>
                                    <td>{entry.iNom}</td>
                                    <td>{entry.ia}</td>
                                    <td>{entry.zs}</td>
                                    <td>{entry.za}</td>
                                    <td>{entry.ik}</td>
                                    <td>{handleResult(entry.result)}</td>
                                    {deleteEntryButton(entry.id)}
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            { (index == 1) &&
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Lp.</th>
                        <th>Symbol</th>
                        <th>Nazwa obwodu</th>
                        <th>L1-L2[MΩ]</th>
                        <th>L2-L3[MΩ]</th>
                        <th>L3-L1[MΩ]</th>
                        <th>L1-PE[MΩ]</th>
                        <th>L2-PE[MΩ]</th>
                        <th>L3-PE[MΩ]</th>
                        <th>L1-N[MΩ]</th>
                        <th>L2-N[MΩ]</th>
                        <th>L3-N[MΩ]</th>
                        <th>N-PE[MΩ]</th>
                        <th>Ra</th>
                        <th>Ocena</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        main?.measurementEntries?.map (
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.circuitName}</td>
                                    <td>{(entry.l1l2) != 0 && entry.l1l2}</td>
                                    <td>{(entry.l2l3) != 0 && entry.l2l3}</td>
                                    <td>{(entry.l3l1) != 0 && entry.l3l1}</td>
                                    <td>{(entry.l1pe) != 0 && entry.l1pe}</td>
                                    <td>{(entry.l2pe) != 0 && entry.l2pe}</td>
                                    <td>{(entry.l3pe) != 0 && entry.l3pe}</td>
                                    <td>{(entry.l1n) != 0 && entry.l1n}</td>
                                    <td>{(entry.l2n) != 0 && entry.l2n}</td>
                                    <td>{(entry.l3n) != 0 && entry.l3n}</td>
                                    <td>{entry.npe}</td>
                                    <td>{entry.ra}</td>
                                    <td>{handleResult(entry.result)}</td>
                                    {deleteEntryButton(entry.id)}
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            { (index == 2) &&
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Lp.</th>
                        <th>Symbol</th>
                        <th>Nazwa obwodu</th>
                        <th>L1-L2[MΩ]</th>
                        <th>L2-L3[MΩ]</th>
                        <th>L3-L1[MΩ]</th>
                        <th>L1-PEN[MΩ]</th>
                        <th>L2-PEN[MΩ]</th>
                        <th>L3-PEN[MΩ]</th>
                        <th>Ra</th>
                        <th>Ocena</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        main?.measurementEntries?.map (
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.circuitName}</td>
                                    <td>{(entry.l1l2) != 0 && entry.l1l2}</td>
                                    <td>{(entry.l2l3) != 0 && entry.l2l3}</td>
                                    <td>{(entry.l3l1) != 0 && entry.l3l1}</td>
                                    <td>{(entry.l1pen) != 0 && entry.l1pen}</td>
                                    <td>{(entry.l2pen) != 0 && entry.l2pen}</td>
                                    <td>{(entry.l3pen) != 0 && entry.l3pen}</td>
                                    <td>{entry.ra}</td>
                                    <td>{handleResult(entry.result)}</td>
                                    {deleteEntryButton(entry.id)}
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            { (index == 3) &&
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Lp.</th>
                        <th>Symbol</th>
                        <th>Badany punkt</th>
                        <th>Wyłącznik RCD</th>
                        <th>Typ</th>
                        <th>In[mA]</th>
                        <th>Ia[mA]</th>
                        <th>ta[ms]</th>
                        <th>t rcd[ms]</th>
                        <th>Ub[V]</th>
                        <th>Ui[V]</th>
                        <th>Ocena</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        main?.measurementEntries?.map (
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.measuringPoint}</td>
                                    <td>{entry.circuitBreaker}</td>
                                    <td>{entry.rcdType}</td>
                                    <td>{entry.iNom}</td>
                                    <td>{entry.ia}</td>
                                    <td>{entry.ta}</td>
                                    <td>{entry.trcd}</td>
                                    <td>{entry.ub}</td>
                                    <td>{entry.ui}</td>
                                    <td>{handleResult(entry.result)}</td>
                                    {deleteEntryButton(entry.id)}
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            { (index == 4) &&
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Lp.</th>
                        <th>Symbol</th>
                        <th>Badany punkt</th>
                        <th>L[m]</th>
                        <th>d[m]</th>
                        <th>p[Ωm]</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        main?.measurementEntries?.map (
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.measuringPoint}</td>
                                    <td>{entry.l}</td>
                                    <td>{entry.d}</td>
                                    <td>{entry.p}</td>
                                    {deleteEntryButton(entry.id)}
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            { (index == 5) &&
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Lp.</th>
                        <th>Symbol</th>
                        <th>Ciągłość</th>
                        <th>Rs[Ω]</th>
                        <th>Ra[Ω]</th>
                        <th>Ocena</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        main?.measurementEntries?.map (
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.symbol}</td>
                                    <td>{handleContinuity(entry.continuity)}</td>
                                    <td>{entry.rs}</td>
                                    <td>{entry.ra}</td>
                                    <td>{handleResult(entry.result)}</td>
                                    {deleteEntryButton(entry.id)}
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            {deleteAllEntriesButton()}
        </div>
    )
}
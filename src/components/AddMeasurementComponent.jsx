import { useParams, useNavigate } from "react-router-dom"
import { addEntryToMainApi, addMeasurementMain, retrieveMeasurementMainById } from "../api/MeasurementMainApiService"
import { useEffect, useRef, useState } from "react"
import { addMainToRoomApi } from "../api/RoomApiService"
import { retrieveMeasurementMainTypes, deleteMeasurementMainApi } from "../api/MeasurementMainApiService"
import { addMeasurementEntry, deleteEntryByIdApi, deleteAllEntriesApi } from "../api/MeasurementEntryApiService"
import { handleContinuity, handleResult } from "./functions/CommonFunctions"

export default function AddMeasurementComponent() {

    const {id, index, projectName} = useParams()

    const navigate = useNavigate()

    const [mainAdded, setMainAdded] = useState(false)
    const [mainIndex, setMainIndex] = useState(0)
    const [main, setMain] = useState(null)
    const [entry, setEntry] = useState([])

    const [message, setMessage] = useState('')
    const [messageVisible, setMessageVisible] = useState(false)


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
            setMessageVisible(false)
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
        }
        if(index == 2) {
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
                            <td><input type = "number" className="form-control" disabled = {mainAdded} ref={un}></input></td>
                            <td><input type = "number" className="form-control" disabled = {mainAdded} ref={ui}></input></td>
                            <td><input type = "number" className="form-control" disabled = {mainAdded} ref={ko}></input></td>
                            <td><input type = "number" className="form-control" disabled = {mainAdded} ref={ta}></input></td>
                            <td><select className="form-select" disabled = {mainAdded} ref={networkType}>
                                    <option value = "TNS">TNS</option>
                                    <option value = "TNC">TNS</option>
                                    <option value = "TNS">TN-C-S</option>
                                </select>
                            </td>
                            <td><input type = "number" className="form-control" disabled = {mainAdded} ref={uo}></input></td>
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
                            <td><input type = "number" className="form-control" disabled = {mainAdded} ref={uiso}></input></td>
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
                        <td><input type = "text" size={5} maxLength = {6} className="form-control" ref = {symbol} disabled = {!mainAdded}/></td>
                        <td className="col-md-2"><input type = "text" maxLength = {20} className="form-control" ref = {point} disabled = {!mainAdded}/></td>
                        <td><input type = "text" maxLength = {6} className="form-control" ref = {cutout} disabled = {!mainAdded}/></td>
                        <td className="col-md-1"><select className="form-select" ref={type} disabled = {!mainAdded}>
                                    <option value = "B">B</option>
                                    <option value = "C">C</option>
                                    <option value = "D">D</option>
                            </select>
                        </td>
                        <td><input type = "number" className="form-control" ref = {iNom} disabled = {!mainAdded}/></td>
                        <td><input type = "text" className="form-control" disabled value={entry.ia} /></td>
                        <td><input type = "number" className="form-control" ref = {zs} disabled = {!mainAdded} /></td>
                        <td><input type = "text" className="form-control" disabled value={entry.za} /></td>
                        <td><input type = "text" className="form-control" disabled value={entry.ik} /></td>
                        <td className="col-md-2"><input type = "text" className="form-control" disabled value= {handleResult(entry.result)}/></td>
                    </tr>
                </tbody>
            </table>
            }
            { (index == 1) &&
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
                        <td><input type = "number" className="form-control" ref = {l1l2} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {l2l3} disabled = {!mainAdded} /></td>
                        <td><input type = "number" className="form-control" ref = {l3l1} disabled = {!mainAdded} /></td>
                        <td><input type = "number" className="form-control" ref = {l1pe} disabled = {!mainAdded} /></td>
                        <td><input type = "number" className="form-control" ref = {l2pe} disabled = {!mainAdded} /></td>
                        <td><input type = "number" className="form-control" ref = {l3pe} disabled = {!mainAdded} /></td>
                        <td><input type = "number" className="form-control" ref = {l1n} disabled = {!mainAdded} /></td>
                        <td><input type = "number" className="form-control" ref = {l2n} disabled = {!mainAdded} /></td>
                        <td><input type = "number" className="form-control" ref = {l3n} disabled = {!mainAdded} /></td>
                        <td><input type = "number" className="form-control" ref = {npe} disabled = {!mainAdded} /></td>
                        <td className="col-md-1"><input type = "number" className="form-control" ref = {ra} disabled = {!mainAdded} /></td>
                        <td className="col-md-1"><input type = "text" className="form-control" disabled value={handleResult(entry.result)}/></td>
                    </tr>
                </tbody>
            </table>
            }
            { (index == 2) &&
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
                        <td><input type = "number" className="form-control" ref = {l1l2} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {l2l3} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {l3l1} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {l1pen} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {l2pen} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {l3pen} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" ref = {ra} disabled = {!mainAdded}/></td>
                        <td><input type = "number" className="form-control" disabled value={handleResult(entry.result)}/></td>
                    </tr>
                </tbody>
            </table>
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
            <button className="btn btn-dark" disabled = {!mainAdded} onClick={handleAddEntryBtn}>Dodaj wpis do pomiaru</button> 
            <hr></hr>

            {/* view entry */}

            { (index == 0) &&
            <table className="table table-striped">
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        main?.measurementEntries?.map (
                            entry => (
                                <tr key={entry.id}>
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
                            entry => (
                                <tr key={entry.id}>
                                    <td></td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.circuitName}</td>
                                    <td>{entry.l1l2}</td>
                                    <td>{entry.l2l3}</td>
                                    <td>{entry.l3l1}</td>
                                    <td>{entry.l1pe}</td>
                                    <td>{entry.l2pe}</td>
                                    <td>{entry.l3pe}</td>
                                    <td>{entry.l1n}</td>
                                    <td>{entry.l2n}</td>
                                    <td>{entry.l3n}</td>
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
                            entry => (
                                <tr key={entry.id}>
                                    <td></td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.circuitName}</td>
                                    <td>{entry.l1l2}</td>
                                    <td>{entry.l2l3}</td>
                                    <td>{entry.l3l1}</td>
                                    <td>{entry.l1pen}</td>
                                    <td>{entry.l2pen}</td>
                                    <td>{entry.l3pen}</td>
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
                            entry => (
                                <tr key={entry.id}>
                                    <td></td>
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
                            entry => (
                                <tr key={entry.id}>
                                    <td></td>
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
                            entry => (
                                <tr key={entry.id}>
                                    <td></td>
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
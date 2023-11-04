import { useParams, useNavigate } from "react-router-dom"
import { addEntryToMainApi, addMeasurementMain } from "../api/MeasurementMainApiService"
import { useEffect, useRef, useState } from "react"
import { addMainToRoomApi } from "../api/RoomApiService"
import { retrieveMeasurementMainTypes } from "../api/MeasurementMainApiService"
import { addMeasurementEntry, retrieveMeasurementEntries } from "../api/MeasurementEntryApiService"
import { useGlobal } from "./GlobalData"

export default function AddMeasurementComponent() {

    const {id, index} = useParams()

    const context = useGlobal()

    const navigate = useNavigate()

    const [mainAdded, setMainAdded] = useState(false)
    const [mainIndex, setMainIndex] = useState('')
    const [entry, setEntry] = useState([])
    const [entries, setEntries] = useState([])


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
    const ra = useRef() // common with 2
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


    const [render, setRender] = useState('')

    const [types, setTypes] = useState([])

    useEffect ( () => { 
        refreshMeasurementName()
        refreshEntries() 
    }, [render])

    function refreshEntries(){
        retrieveMeasurementEntries(index)
            .then(response =>setEntries(response.data))
            .catch(error => console.log(error))
    }

    function refreshMeasurementName(){
        retrieveMeasurementMainTypes()
            .then(response => setTypes(response.data))
            .catch(error => console.log(error))
    }

    function handleBackButton() {
        navigate(`/rooms/${id}`)
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
            if(cutout.current.value !== '' && type.current.value !== '' && iNom.current.value !== '' && zs.current.value !== '' && uo.current.value !== '') {
                addMeasurementEntry(index, newProtectionMeasurementEntry)
                .then(response => {
                    setRender(render + 1)
                    console.log(response)
                    setEntry(response.data)
                        addEntryToMainApi(index, mainIndex, response.data.id)
                        .then(response => console.log(response))
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))          
            } else {
                console.log('Fill all fields.')
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
            if(l1l2.current.value !== '' && l2l3.current.value !== '' && l3l1.current.value !== '' && l1pe.current.value !== '' && l2pe.current.value !== ''
                && l3pe.current.value !== '' && l1n.current.value !== '' && l2n.current.value !== '' && l3n.current.value !== '' && npe.current.value !== ''
                && ra.current.value !== ''
            ) {
                addMeasurementEntry(index, newCircuitInsulationTnsEntry)
                .then(response => {
                    setRender(render + 1)
                    console.log(response)
                    setEntry(response.data)
                        addEntryToMainApi(index, mainIndex, response.data.id)
                        .then(response => console.log(response))
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))          
            } else {
                console.log('Fill all fields.')
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
            if(l1l2.current.value !== '' && l2l3.current.value !== '' && l3l1.current.value !== '' && l1pen.current.value !== ''
             && l2pen.current.value !== ''&& l3pen.current.value !== '' && ra.current.value !== '')
            {
                addMeasurementEntry(index, newCircuitInsulationTncEntry)
                .then(response => {
                    setRender(render + 1)
                    console.log(response)
                    setEntry(response.data)
                        addEntryToMainApi(index, mainIndex, response.data.id)
                        .then(response => console.log(response))
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))          
            } else {
                console.log('Fill all fields.')
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
            if(cutout.current.value !== '' && type.current.value !== '' && iNom.current.value !== '' && ia.current.value !== ''
             && ta.current.value !== ''&& trcd.current.value !== '' && ub.current.value !== '' && ui.current.value !== '')
            {
                addMeasurementEntry(index, newResidualCurrentProtectionEntry)
                .then(response => {
                    setRender(render + 1)
                    console.log(response)
                    setEntry(response.data)
                        addEntryToMainApi(index, mainIndex, response.data.id)
                        .then(response => console.log(response))
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))          
            } else {
                console.log('Fill all fields.')
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
            if(un.current.value !== '' && ui.current.value !== '' && ko.current.value !== '' && ta.current.value !== '' 
            && networkType.current.value !== ''&& uo.current.value !== '0') {
                setMainAdded(true)
                addMeasurementMain(index, newProtectionMeasurementMain)
                .then(response => {
                    setMainIndex(response.data.id)
                    addMainToRoomApi(id, response.data.id)
                    .then(response => console.log(response))
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
            } else {
                console.log('Fill all fields.')
            }
        }
        if(index == 1 || index == 2) {
            const newCircuitInsulationMain = {
                uiso : uiso.current.value
            }
            if(uiso.current.value !== '') {
                setMainAdded(true)
                addMeasurementMain(index, newCircuitInsulationMain)
                .then(response => {
                    setMainIndex(response.data.id)
                    addMainToRoomApi(id, response.data.id)
                    .then(response => console.log(response))
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
            } else {
                console.log('Fill all fields.')
            }
        }
        if(index == 3) {
            const newResidualCurrentProtection = {}

            setMainAdded(true)
            addMeasurementMain(index, newResidualCurrentProtection)
                .then(response => {
                setMainIndex(response.data.id)
                addMainToRoomApi(id, response.data.id)
                  .then(response => console.log(response))
                  .catch(error => console.log(error))
                })
                  .catch(error => console.log(error))
        }
    }

    return (
        <div className="AddMeasurementComponent">

            <button className = "btn btn-primary btn-lg m-2" onClick = {handleBackButton}>Wstecz</button>

        {/* add room name from authcontext building */}
            <h3>{types[index]} (room {id})</h3> 

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
                            <td><input type = "text" className="form-control" ref={un}></input></td>
                            <td><input type = "text" className="form-control" ref={ui}></input></td>
                            <td><input type = "text" className="form-control" ref={ko}></input></td>
                            <td><input type = "text" className="form-control" ref={ta}></input></td>
                            <td><select className="form-select" ref={networkType}>
                                    <option value = "TNS">TNS</option>
                                    <option value = "TNC">TNS</option>
                                    <option value = "TNS">TN-C-S</option>
                                </select>
                            </td>
                            <td><input type = "text" className="form-control" ref={uo}></input></td>
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
                            <td><input type = "text" className="form-control" ref={uiso}></input></td>
                        </tr>
                    </tbody>
                </table>   
            }
            <button className="btn btn-success m-1" disabled = {mainAdded} onClick={handleAddMainBtn}>Dodaj</button>
            <button className="btn btn-info m-1" disabled = {!mainAdded}>Edytuj - not done</button>

            {/* Add entry */}

            { (index == 0) &&
                <table className="table">
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type = "text" className="form-control" disabled></input></td>
                        <td><input type = "text" className="form-control" ref = {symbol}></input></td>
                        <td><input type = "text" className="form-control" ref = {point}></input></td>
                        <td><input type = "text" className="form-control" ref = {cutout}></input></td>
                        <td><select className="form-select" ref={type}>
                                    <option value = "B">B</option>
                                    <option value = "C">C</option>
                                    <option value = "D">D</option>
                            </select>
                        </td>
                        <td><input type = "text" className="form-control" ref = {iNom}></input></td>
                        <td><input type = "text" className="form-control" disabled value={entry.ia}></input></td>
                        <td><input type = "text" className="form-control" ref = {zs}></input></td>
                        <td><input type = "text" className="form-control" disabled value={entry.za}></input></td>
                        <td><input type = "text" className="form-control" disabled value={entry.ik}></input></td>
                        <td><input type = "text" className="form-control" disabled value={entry.result}></input></td>
                    </tr>
                </tbody>
            </table>
            }
            { (index == 1) &&
                <table className="table">
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type = "text" className="form-control" disabled></input></td>
                        <td><input type = "text" className="form-control" ref = {symbol}></input></td>
                        <td><input type = "text" className="form-control" ref = {circuitName}></input></td>
                        <td><input type = "text" className="form-control" ref = {l1l2}></input></td>
                        <td><input type = "text" className="form-control" ref = {l2l3}></input></td>
                        <td><input type = "text" className="form-control" ref = {l3l1}></input></td>
                        <td><input type = "text" className="form-control" ref = {l1pe}></input></td>
                        <td><input type = "text" className="form-control" ref = {l2pe}></input></td>
                        <td><input type = "text" className="form-control" ref = {l3pe}></input></td>
                        <td><input type = "text" className="form-control" ref = {l1n}></input></td>
                        <td><input type = "text" className="form-control" ref = {l2n}></input></td>
                        <td><input type = "text" className="form-control" ref = {l3n}></input></td>
                        <td><input type = "text" className="form-control" ref = {npe}></input></td>
                        <td><input type = "text" className="form-control" ref = {ra}></input></td>
                        <td><input type = "text" className="form-control" disabled value={entry.result}></input></td>
                    </tr>
                </tbody>
            </table>
            }
            { (index == 2) &&
                <table className="table">
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type = "text" className="form-control" disabled></input></td>
                        <td><input type = "text" className="form-control" ref = {symbol}></input></td>
                        <td><input type = "text" className="form-control" ref = {circuitName}></input></td>
                        <td><input type = "text" className="form-control" ref = {l1l2}></input></td>
                        <td><input type = "text" className="form-control" ref = {l2l3}></input></td>
                        <td><input type = "text" className="form-control" ref = {l3l1}></input></td>
                        <td><input type = "text" className="form-control" ref = {l1pen}></input></td>
                        <td><input type = "text" className="form-control" ref = {l2pen}></input></td>
                        <td><input type = "text" className="form-control" ref = {l3pen}></input></td>
                        <td><input type = "text" className="form-control" ref = {ra}></input></td>
                        <td><input type = "text" className="form-control" disabled value={entry.result}></input></td>
                    </tr>
                </tbody>
            </table>
            }
            { (index == 3) &&
                <table className="table">
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type = "text" className="form-control" disabled></input></td>
                        <td><input type = "text" className="form-control" ref = {point}></input></td>
                        <td><input type = "text" className="form-control" ref = {symbol}></input></td>
                        <td><input type = "text" className="form-control" ref = {cutout}></input></td>
                        <td><select className="form-select" ref={type}>
                                    <option value = '[AC]'>[AC]</option>
                                    <option value = '[A]'>[A]</option>
                                    <option value = '[B]'>[B]</option>
                            </select>
                        </td>
                        <td><input type = "text" className="form-control" ref = {iNom}></input></td>
                        <td><input type = "text" className="form-control" ref = {ia}></input></td>
                        <td><input type = "text" className="form-control" ref = {ta}></input></td>
                        <td><input type = "text" className="form-control" ref = {trcd}></input></td>
                        <td><input type = "text" className="form-control" ref = {ub}></input></td>
                        <td><input type = "text" className="form-control" ref = {ui}></input></td>
                        <td><input type = "text" className="form-control" disabled value={entry.result}></input></td>
                    </tr>
                </tbody>
            </table>
            }
            <button className="btn btn-success" disabled = {!mainAdded} onClick={handleAddEntryBtn}>Dodaj wpis</button> 
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
                    </tr>
                </thead>
                <tbody>
                    {
                        entries.map (
                            entry => (
                                <tr key={entry.id}>
                                    <td></td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.measuringPoint}</td>
                                    <td>{entry.cutout}</td>
                                    <td>{entry.type}</td>
                                    <td>{entry.iNom}</td>
                                    <td>{entry.ia}</td>
                                    <td>{entry.zs}</td>
                                    <td>{entry.za}</td>
                                    <td>{entry.ik}</td>
                                    <td>{entry.result}</td>
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
                    </tr>
                </thead>
                <tbody>
                    {
                        entries.map (
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
                                    <td>{entry.result}</td>
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
                    </tr>
                </thead>
                <tbody>
                    {
                        entries.map (
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
                                    <td>{entry.result}</td>
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
                    </tr>
                </thead>
                <tbody>
                    {
                        entries.map (
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
                                    <td>{entry.result}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
        </div>
    )
}
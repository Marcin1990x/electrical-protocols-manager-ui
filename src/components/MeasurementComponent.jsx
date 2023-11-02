import { useParams } from "react-router-dom"
import { addEntryToMainApi, addMeasurementMain } from "../api/MeasurementMainApiService"
import { useEffect, useRef, useState } from "react"
import { addMainToRoomApi } from "../api/RoomApiService"
import { retrieveMeasurementMainTypes } from "../api/MeasurementMainApiService"
import { addMeasurementEntry, retrieveMeasurementEntries } from "../api/MeasurementEntryApiService"

export default function MeasurementComponent() {

    const {id, index} = useParams()

    const [mainAdded, setMainAdded] = useState(false)
    const [mainIndex, setMainIndex] = useState('')
    const [entry, setEntry] = useState([])
    const [entries, setEntries] = useState([])

    const un = useRef()
    const ui = useRef()
    const ko = useRef()
    const ta = useRef()
    const networkType = useRef()

    const uo = useRef()
    const symbol = useRef()
    const point = useRef()
    const cutout = useRef()
    const type = useRef()
    const iNom = useRef()
    const zs = useRef()

    const [render, setRender] = useState('')

    const [types, setTypes] = useState([])

    useEffect ( () => { 
        refreshMeasurementName(); refreshEntries() 
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

    function handleAddEntryBtn() {

        const newProtectionMeasurement = {
            symbol : symbol.current.value,
            uo : uo.current.value,
            measuringPoint : point.current.value,
            cutout : cutout.current.value,
            type : type.current.value,
            iNom : iNom.current.value,
            zs : zs.current.value
        }
        if(cutout.current.value !== '' && type.current.value !== '' && iNom.current.value !== '' && zs.current.value !== '' && uo.current.value !== '') {
            addMeasurementEntry(index, newProtectionMeasurement)
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
        console.log('main index: ' + mainIndex)
    }
    function handleAddMainBtn() {

        const newProtectionMeasurementEntry = {
            un : un.current.value,
            ui : ui.current.value,
            ko : ko.current.value,
            ta : ta.current.value,
            networkType : networkType.current.value,
        }
        if(un.current.value !== '' && ui.current.value !== '' && ko.current.value !== '' && ta.current.value !== '' && networkType.current.value !== '') {
            setMainAdded(true)
            addMeasurementMain(index, newProtectionMeasurementEntry)
            .then(response => {
                addMainToRoomApi(id, response.data.id)
                .then(response => {
                    setMainIndex(response.data.id)
                    console.log(response)
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        }
    }

    return (
        <div className="MeasurementComponent">

        {/* add room name from authcontext building */}
            <h3>{types[index]} (room {id})</h3> 

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
                            <td><input type = "text" className="form-control" ref={networkType}></input></td>
                            <td><input type = "text" className="form-control" ref={uo}></input></td>
                        </tr>
                    </tbody>
                </table>   
            }
            <button className="btn btn-success m-1" disabled = {mainAdded} onClick={handleAddMainBtn}>Add</button>
            <button className="btn btn-info m-1" disabled = {!mainAdded}>Edit</button>
            
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
                        <th>Zs[Om]</th>
                        <th>Za[Om]</th>
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
                        <td><input type = "text" className="form-control" ref = {type}></input></td>
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
            <button className="btn btn-success" disabled = {!mainAdded} onClick={handleAddEntryBtn}>Add</button> 
            <hr></hr>
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
                        <th>Zs[Om]</th>
                        <th>Za[Om]</th>
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
        </div>
    )
}
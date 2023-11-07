import { useEffect, useRef, useState } from "react"
import { retrieveElectriciansApi} from "../api/ElectricianApiService"
import { useNavigate } from "react-router-dom"

export default function ProtocolInformationComponent() {


    const [electriciansToAdd, setElectriciansToAdd] = useState([])
    const [render, setRender] = useState(0)
    const [electriciansAdded, setElectriciansAdded] = useState([])
    const title = useRef()
    const protocolNumber = useRef()
    const customer = useRef()
    const address = useRef()
    const measurementType = useRef()
    const measDate = useRef()
    const measNextDate = useRef()
    const weather = useRef()

    const option1= useRef()



    const navigate = useNavigate()

    useEffect( () => initializeData(), [])
    useEffect( () => refreshData(), [render])

    function initializeData() {
        retrieveElectriciansApi()
            .then(response => {
                setElectriciansToAdd(response.data)
                console.log(response)    
            })
            .catch(error => console.log(error))    
    }
    function refreshData() {}

    function handleAddBtn(electrician) {
        setRender(render + 1)
        electriciansAdded.push(electrician)
        electriciansToAdd.pop(electrician)
    }
    function handleDeleteBtn(electrician) {
        setRender(render -1)
        electriciansAdded.pop(electrician)
        electriciansToAdd.push(electrician)
    }

    return (
        <div className="ProtocolInformationComponent">
            <button className="btn btn-primary btn-lg m-2" onClick={() => navigate(`/project`)}>Wstecz</button>
            <div className="container"> 
                <div className="row">
                    <div className="col">
                        <label><b>Tytuł protokołu:</b></label>
                            <input type = "text" className="form-control" id="dupa" ref={title}></input>
                        <label><b>Numer protokołu:</b></label>
                            <input type = "text" className="form-control" ref={protocolNumber}></input>
                            <label><b>Zleceniodawca:</b></label>
                            <input type = "text" className="form-control" ref={customer}></input>
                        <label><b>Miejsce przeprowadzenia pomiarów:</b></label>
                            <input type = "text" className="form-control" ref={address}></input>
                        <label><b>Rodzaj pomiarów:</b></label>
                            <select className="form-select" ref={measurementType}>
                                                <option value = 'NEW_INSTALLATION'>Nowa instalacja</option>
                                                <option value = 'PERIODIC'>Badania okresowe</option>
                                                <option value = 'AFTER_RENOVATION'>Po remoncie</option>
                            </select>
                        <label><b>Pogoda:</b></label>
                            <select className="form-select" ref={weather}>
                                                <option value = 'SUNNY'>Słoneczna</option>
                                                <option value = 'CLOUDY'>Pochmurna</option>
                                                <option value = 'RAINY'>Deszczowa</option>
                            </select>
                        <div className="container"> 
                            <div className="row">   
                                <div className="col">
                                    <label><b>Data pomiarów:</b></label>
                                    <input class="form-control" type="date" ref={measDate}/>
                                </div>
                                <div className="col">
                                    <label><b>Data następnych pomiarów:</b></label>
                                    <input class="form-control" type="date" ref={measNextDate}/>
                                </div>
                            </div>
                        </div>    
                        <div>
                            <label><b>Rodzaj instalacji:</b></label>
                        </div>
                        <div class="form-check form-check-inline m-2">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" value='NEW'/>
                            <label className="form-check-label" for="inlineRadio1">Nowa</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" value='MODIFICATED'/>
                            <label className="form-check-label" for="inlineRadio1">Modyfikacja</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" value='EXPANDED'/>
                            <label className="form-check-label" for="inlineRadio1">Rozbudowa</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" value='EXISING'/>
                            <label className="form-check-label" for="inlineRadio1">Istniejąca</label>
                        </div>
                        <div>
                            <label><b>Orzeczenie:</b></label>
                        </div>
                            <textarea className="form-control" rows="2"></textarea>
                        <label><b>Uwagi do orzeczenia:</b></label>
                            <textarea className="form-control" rows="4"></textarea>
                        </div>    
                </div>
            </div>
            <label><b>Wykonawcy pomiarów:</b></label>
            
            <div className="container p-3">
                <div className="row">
                    <div className="col"><b>Dostępni :</b></div>
                    <div className="col"><b>Wybrani :</b></div>
                </div>
                <div className="row">
                    <div className="col">
                            <table className="table table-sm">
                                <caption>Dostępni</caption>
                                <thead className="table-light">
                                    <tr>
                                        <th>Imię</th>
                                        <th>Nazwisko</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        electriciansToAdd.map (
                                            elec => (
                                                <tr key={elec.id}>
                                                    <td>{elec.firstName}</td>
                                                    <td>{elec.lastName}</td>
                                                    <td>
                                                        <button className="btn btn-success" onClick = {() => handleAddBtn(elec)}>+</button>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </table>
                    </div>
                    <div className="col">
                            <table className="table table-sm">
                                <caption>Wybrani</caption>
                                <thead className="table-light">
                                    <tr>
                                        <th>Imię</th>
                                        <th>Nazwisko</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        electriciansAdded?.map (
                                            elec => (
                                                <tr key={elec.id}>
                                                    <td>{elec.firstName}</td>
                                                    <td>{elec.lastName}</td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick = {() => handleDeleteBtn(elec)}>-</button>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </table>
                    </div>        
                </div>            
            </div>                            
        </div>
    )
}
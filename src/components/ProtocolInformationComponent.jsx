import { useEffect, useRef, useState } from "react"
import { retrieveDistinctElectriciansApi} from "../api/ElectricianApiService"
import { useNavigate } from "react-router-dom"
import { addTitlePageApi, addElectricanToTitlePageApi, removeElectricanFromTitlePageApi, retrievePdfTitlePageData } from "../api/PdfTitlePageApiService"

export default function ProtocolInformationComponent() {


    const [electriciansToAdd, setElectriciansToAdd] = useState([])
    const [render, setRender] = useState(0)
    const [electriciansAdded, setElectriciansAdded] = useState([])
    const [titlePage, setTitlePage] = useState([])
    const title = useRef()
    const protocolNumber = useRef()
    const customer = useRef()
    const address = useRef()
    const measurementType = useRef()
    const installationType = useRef()
    const measDate = useRef()
    const measNextDate = useRef()
    const weather = useRef()
    const decisionDescription = useRef()
    const comments = useRef()

    const navigate = useNavigate()

    useEffect( () => initializeData(), [])
    useEffect( () => refreshData(), [render])

    function initializeData() {
        retrieveDistinctElectriciansApi()
            .then(response => {
                setElectriciansToAdd(response.data)
                console.log(response)    
            })
            .catch(error => console.log(error))    
    }
    function refreshData() {
        retrievePdfTitlePageData()
            .then(response => {
                console.log(response)
                setTitlePage(response.data)
            })
            .catch(error => console.log(error))
    }

    function handleAddBtn(electrician) {

        addElectricanToTitlePageApi(titlePage.id, electrician.id)
            .then(response => {
                setRender(render + 1)
                console.log(response)
            })
            .catch(error => console.log(error))

        electriciansAdded.push(electrician)
        electriciansToAdd.pop(electrician)
    }
    function handleDeleteBtn(electrician) {
        
        removeElectricanFromTitlePageApi(titlePage.id, electrician.id)
            .then(response => {
                setRender(render -1)
                console.log(response)
            })
            .catch(error => console.log(error))

        electriciansAdded.pop(electrician)
        electriciansToAdd.push(electrician)
    }
     function handleSubmitBtn() {

        const titlePageData = {
            documentNumber : protocolNumber.current.value,
            title: title.current.value,
            customerName : customer.current.value,
            measurementPlace : address.current.value,
            typeOfMeasurement : measurementType.current.value,
            typeOfWeather : weather.current.value,
            measurementDate : measDate.current.value,
            nextMeasurementDate : measNextDate.current.value,
            typeOfInstallation : installationType.current.value,
            decisionDescription : decisionDescription.current.value,
            comments : comments.current.value
        }

        if(protocolNumber.current.value !== '' && title.current.value !== '' && customer.current.value !== '' &&
        address.current.value !== '' && measurementType.current.value !== '' && weather.current.value !== '' &&
        measDate.current.value !== '' && measNextDate.current.value !== '' && installationType.current.value !== ''
        && decisionDescription.current.value !== '' && comments.current.value !== ''){

            addTitlePageApi(titlePageData)
                .then(response => {
                    console.log(response)
                    setTitlePage(response.data)
                })
                .catch(error => console.log(error))
        } else {
            console.log('Fill all fields.')
        }
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
                            <select className="form-select" ref = {installationType}>
                                                    <option value = 'NEW'>Nowa</option>
                                                    <option value = 'MODIFICATED'>Modyfikacja</option>
                                                    <option value = 'EXPANDED'>Rozbudowa</option>
                                                    <option value = 'EXISTING'>Istniejąca</option>
                            </select>
                        <div>
                            <label><b>Orzeczenie:</b></label>
                        </div>
                            <textarea className="form-control" rows="2" ref=  {decisionDescription}></textarea>
                        <label><b>Uwagi do orzeczenia:</b></label>
                            <textarea className="form-control" rows="4" ref = {comments}></textarea>
                        </div>
                        <button className="btn btn-success m-2" onClick={handleSubmitBtn}>Załaduj dane</button>    
            </div>
            </div>
            {titlePage && <label><b>Wykonawcy pomiarów:</b></label> }
            {titlePage &&
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
                                        electriciansToAdd.map (//compare all elec in db with elec in pdftitledata
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
                                        titlePage.electricians?.map (
                                        //electriciansAdded?.map (
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
            </div>  }                          
        </div>
    )
}
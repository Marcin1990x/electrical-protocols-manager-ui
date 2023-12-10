import { useEffect, useRef, useState } from "react"
import { retrieveDistinctElectriciansApi} from "../api/ElectricianApiService"
import { useNavigate, useParams } from "react-router-dom"
import { addTitlePageApi, addElectricanToTitlePageApi, removeElectricanFromTitlePageApi, retrievePdfTitlePageData } from "../api/PdfTitlePageApiService"

export default function ProtocolInformationComponent() {

    const {projectName} = useParams()
    const [electriciansToAdd, setElectriciansToAdd] = useState([])
    const [render, setRender] = useState(0)
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

    const [message, setMessage] = useState('')
    const [messageVisible, setMessageVisible] = useState(false)

    const today = new Date()
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    var nextDate = (today.getFullYear() + parseInt(5)) + '-' + (today.getMonth() + 1) + '-' + today.getDate()

    const navigate = useNavigate()

    useEffect( () => {
        refreshTitlePageData()
        refreshElectriciansToAdd()
    } , [render])

    function showError(text) {
        setMessageVisible(true)
        setMessage(text)
    }

    function fillTitlePageData(titlePage) {
        if(titlePage) {
            title.current.value = titlePage.title
            protocolNumber.current.value = titlePage.documentNumber
            customer.current.value = titlePage.customerName
            address.current.value = titlePage.measurementPlace
            measurementType.current.value = titlePage.typeOfMeasurement
            weather.current.value = titlePage.typeOfWeather
            measDate.current.value =titlePage.measurementDate
            measNextDate.current.value = titlePage.nextMeasurementDate
            installationType.current.value = titlePage.typeOfInstallation
            decisionDescription.current.value = titlePage.decisionDescription
            comments.current.value = titlePage.comments
        }
    }

    function refreshElectriciansToAdd() {
        retrieveDistinctElectriciansApi()
            .then(response => {
                setElectriciansToAdd(response.data)
                console.log(response)    
            })
            .catch(error => console.log(error))    
    }
    function refreshTitlePageData() {
        retrievePdfTitlePageData()
            .then(response => {
                console.log(response)
                setTitlePage(response.data)
                fillTitlePageData(response.data)
            })
            .catch(error => console.log(error))
    }

    function handleAddBtn(electrician) {

    if(titlePage.electricians.length < 4){    
        addElectricanToTitlePageApi(titlePage.id, electrician.id)
            .then(response => {
                setRender(render + 1)
                console.log(response)
            })
            .catch(error => console.log(error))
        } else {
            showError('Możesz dodać maksymalnie 4 elektryków.')
        }
    }
    function handleDeleteBtn(electrician) {
        
        removeElectricanFromTitlePageApi(titlePage.id, electrician.id)
            .then(response => {
                setRender(render -1)
                console.log(response)
            })
            .catch(error => console.log(error))
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
        measDate.current.value !== '' && measNextDate.current.value !== '' && installationType.current.value !== '')
        {
            addTitlePageApi(titlePageData)
                .then(response => {
                    console.log(response)
                    setTitlePage(response.data)
                    showError('Formularz dodano pomyślnie.')
                })
                .catch(error => console.log(error))
        } else {
            showError('Wypełnij wszystkie pola formularza.')
        }
     }
    return (
        <div className="ProtocolInformationComponent">
            <button className="btn btn-outline-dark w-25 m-2" onClick={() => navigate(`/${projectName}/project`)}>Wstecz</button>
            <hr></hr>
            <div className="message">
                {messageVisible && message}
            </div>
            <div className="container"> 
                <div className="row">
                    <div className="col-2"/>
                    <div className="col-8">
                        <label><b>Tytuł protokołu:</b></label>
                            <input type = "text" maxLength = {30} className="form-control" ref={title}></input>
                        <label><b>Numer protokołu:</b></label>
                            <input type = "text" maxLength = {20} className="form-control" ref={protocolNumber}></input>
                            <label><b>Zleceniodawca:</b></label>
                            <input type = "text" maxLength = {60} className="form-control" ref={customer}></input>
                        <label><b>Miejsce przeprowadzenia pomiarów:</b></label>
                            <input type = "text" maxLength = {80} className="form-control" ref={address}></input>
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
                            <div className="row m-2">   
                                <div className="col">  
                                    <label><b>Data pomiarów:</b></label>
                                    <input class="form-control" type="date" defaultValue={date} ref={measDate}/>
                                </div>
                                <div className="col"/>
                                <div className="col">
                                    <label><b>Data następnych pomiarów:</b></label>
                                    <input class="form-control" type="date" defaultValue={nextDate} ref={measNextDate}/>
                                </div>
                            </div>
                        </div>    
                            <label><b>Rodzaj instalacji:</b></label>
                                <select className="form-select" ref = {installationType}>
                                                            <option value = 'NEW'>Nowa</option>
                                                            <option value = 'MODIFICATED'>Modyfikacja</option>
                                                            <option value = 'EXPANDED'>Rozbudowa</option>
                                                            <option value = 'EXISTING'>Istniejąca</option>
                                </select>  
                            <label><b>Orzeczenie:</b></label>
                                <input className="form-control" ref=  {decisionDescription}></input>
                            <label><b>Uwagi do orzeczenia:</b></label>
                                <textarea className="form-control" rows="4" ref = {comments}></textarea>
                            <button className="btn btn-dark m-2" onClick={handleSubmitBtn}>Załaduj dane</button> 
                    </div> 
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
                                        electriciansToAdd.map (
                                            elec => (
                                                <tr key={elec.id}>
                                                    <td>{elec.firstName}</td>
                                                    <td>{elec.lastName}</td>
                                                    <td>
                                                        <button className="btn btn-dark btn-sm" onClick = {() => handleAddBtn(elec)}>+ dodaj</button>
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
                                            elec => (
                                                <tr key={elec.id}>
                                                    <td>{elec.firstName}</td>
                                                    <td>{elec.lastName}</td>
                                                    <td>
                                                        <button className="btn btn-outline-dark btn-sm" onClick = {() => handleDeleteBtn(elec)}>- usuń</button>
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
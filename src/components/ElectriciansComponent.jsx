import { useEffect, useRef, useState } from "react"
import { addElectricianApi, retrieveElectriciansApi, deleteElectricianByIdApi} from "../api/ElectricianApiService"
import { useNavigate } from "react-router-dom"
import './Common.css'

export default function ElectriciansComponent() {

    const [electricians, setElectricians] = useState([])
    const [render, setRender] = useState(0)
    const navigate = useNavigate()
    const [permissionsList, setPermissionsList] = useState([])

    const [message, setMessage] = useState('')
    const [messageVisible, setMessageVisible] = useState(false)

    useEffect( () => refreshData(), [render])

    const firstName = useRef()
    const lastName = useRef()
    const address = useRef()
    const permissions = useRef()
    const position = useRef()

    function refreshData() {
        retrieveElectriciansApi()
            .then(response => {
                setElectricians(response.data)
                console.log(response)    
            })
            .catch(error => console.log(error))
    }

    function handlePosition(position) {
        if(position == 'MEASURER') {
            return 'Pomiarowiec'
        } else {
            return 'Sprawdzający'
        }
    }
    function handleDeleteBtn(id) {
        deleteElectricianByIdApi(id)
            .then(response => {
                setRender(render - 1)
                console.log(response)
                setMessageVisible(false)
            })
            .catch(error => {
                console.log(error)
                if((error.response.data).includes('Error 100')){
                    setMessage('Elektryk dodany do informacji protokołu. Usuń najpierw elektryka z zakładki "informacje do protokołu".')
                    setMessageVisible(true)
                }
            })
    }

    function handleAddPermission() {
        if(permissions.current.value != '' && permissionsList.length <= 1) {
            permissionsList.push(permissions.current.value)
            permissions.current.value = ''
            setRender(render + 1)
        }
    }
    function handleDeletePermission(permission) {
        permissionsList.pop(permission)
        setRender(render - 1)
    }

    function handleChangeBtn(electrician) {

            firstName.current.value = electrician.firstName
            lastName.current.value = electrician.lastName
            address.current.value = electrician.electricianAddress
            setPermissionsList(electrician.permissionList)
            position.current.value = electrician.position

            handleDeleteBtn(electrician.id)
    }

    function handleAddElectrician(){

        const newElectrician = {
            firstName : firstName.current.value,
            lastName : lastName.current.value,
            electricianAddress : address.current.value,
            permissionList : permissionsList,
            position : position.current.value
        }

        if(firstName.current.value !== '' && lastName.current.value !== ''&& address.current.value !== '' && permissionsList.length > 0
        && position.current.value !== '' ) {
            addElectricianApi(newElectrician)
                .then(response => {
                    setRender(render + 1)
                    console.log(response)
                    setMessageVisible(false)
                })
                .catch(error => {
                    console.log(error)
                    if((error.response.data).includes('Error 101')){
                        setMessage('Elektryk o nazwisku ' + lastName.current.value + ' już istnieje.')
                        setMessageVisible(true)
                    }
                })

        } else {
            setMessageVisible(true)
            setMessage('Wypełnij wszystkie pola.')
        }
    }

    return (
        <div className="ElectriciansComponent">
            <button className="btn btn-primary btn-lg m-2" onClick={() => navigate(`/`)}>Wstecz</button>
            <h1>Elektrycy</h1>
            <div className="message">
                {messageVisible && message}
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Adres</th>
                        <th>Lista uprawnień</th>
                        <th></th>
                        <th>Pozycja</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type = "text" size = {10} maxLength={15} className="form-control" ref ={firstName}></input></td>
                        <td><input type = "text" size = {10} maxLength={15} className="form-control" ref ={lastName}></input></td>
                        <td><input type = "text" size = {40} maxLength={40} className="form-control" ref ={address}></input></td>
                        <td><input type = "text" maxLength={15} className="form-control" ref ={permissions}></input>
                        {
                            permissionsList.map (
                                perm => (
                                    <div className="row p-1">
                                        <div className="col">
                                            <input className="form-control" value = {perm} readOnly></input>
                                    </div>
                                        <div className="col-md-auto">
                                            <button className="btn btn-danger" onClick={() => handleDeletePermission(perm)}><b>-</b></button>
                                        </div>
                                    </div>
                                )
                            )
                        }
                        </td>
                        <td><button className="btn btn-success" onClick={handleAddPermission}><b>+</b></button></td>
                        <td><select className="form-select" ref ={position}>
                                    <option value = 'MEASURER'>Pomiarowiec</option>
                                    <option value = 'CHECKER'>Sprawdzający</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
                <button className="btn btn-success m-1" onClick={handleAddElectrician}>Dodaj elektryka</button>
            </table>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Adres</th>
                        <th>Uprawnienia</th>
                        <th>Pozycja</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        electricians.map (
                            electrician => (
                                <tr key = {electrician.id}>
                                    <td>{electrician.firstName}</td>
                                    <td>{electrician.lastName}</td>
                                    <td>{electrician.electricianAddress}</td>
                                    <td>
                                        {
                                            electrician.permissionList.map (
                                                permission => (
                                                    permission + ' / '
                                                )
                                            )
                                        }
                                    </td>
                                    <td>{handlePosition(electrician.position)}</td>
                                    <td>
                                        <button className="btn btn-warning m-1 " onClick = {() => handleChangeBtn(electrician)}>Zmień</button>
                                        <button className="btn btn-danger" onClick = {() => handleDeleteBtn(electrician.id)}>Usuń</button>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
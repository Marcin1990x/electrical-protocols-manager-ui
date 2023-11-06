import { useEffect, useRef, useState } from "react"
import { addElectricianApi, retrieveElectriciansApi, deleteElectricianByIdApi} from "../api/ElectricianApiService"
import { useNavigate } from "react-router-dom"

export default function ElectriciansComponent() {

    const [electricians, setElectricians] = useState([])
    const [render, setRender] = useState(0)
    const navigate = useNavigate()

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
        console.log(id)
        deleteElectricianByIdApi(id)
            .then(response => {
                setRender(render - 1)
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    function handleAddElectrician(){

        const newElectrician = {
            firstName : firstName.current.value,
            lastName : lastName.current.value,
            electricianAddress : address.current.value,
            permissionList : [permissions.current.value],
            position : position.current.value
        }

        if(firstName.current.value !== '' && lastName.current.value !== ''&& address.current.value !== '' && permissions.current.value != ''
        && position.current.value !== '' ) {
            addElectricianApi(newElectrician)
                .then(response => {
                    setRender(render + 1)
                    console.log(response)
                })
                .catch(error => console.log(error))

        } else {
            console.log('Fill all fields.')
        }
        
    }

    return (
        <div className="ElectriciansComponent">
            <button className="btn btn-primary btn-lg m-2" onClick={() => navigate(`/`)}>Wstecz</button>
            <h1>Elektrycy</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Adres</th>
                        <th>Uprawnienia</th>
                        <th>Pozycja</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type = "text" className="form-control" ref ={firstName}></input></td>
                        <td><input type = "text" className="form-control" ref ={lastName}></input></td>
                        <td><input type = "text" className="form-control" ref ={address}></input></td>
                        <td><input type = "text" className="form-control" ref ={permissions}></input></td>
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
                                    <td>{electrician.permissionList}</td>
                                    <td>{handlePosition(electrician.position)}</td>
                                    <td><button className="btn btn-danger" onClick = {() => handleDeleteBtn(electrician.id)}>Usuń</button></td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
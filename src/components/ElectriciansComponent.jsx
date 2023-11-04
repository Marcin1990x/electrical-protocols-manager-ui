import { useRef, useState } from "react"
import { addElectricianApi } from "../api/ElectricianApiService"

export default function ElectriciansComponent() {

    const [addElectrician, setAddElectrician] = useState(false)

    const firstName = useRef()
    const lastName = useRef()
    const address = useRef()
    const permissions = useRef()
    const position = useRef()
    

    function handleAddElectrician(){

        console.log('lole')

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
                .then(response => console.log(response))
                .catch(error => console.log(error))

        } else {
            console.log('Fill all fields.')
        }
        
    }

    return (
        <div className="ElectriciansComponent">
            <h1>Elektrycy</h1>
            <button className="btn btn-dark m-3" onClick={() => setAddElectrician(true)}>Dodaj elektryka</button>
            {addElectrician && 
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
            }
        </div>
    )
}
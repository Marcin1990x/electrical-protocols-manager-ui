import { useEffect, useRef, useState } from "react"
import { addElectricianApi, retrieveElectriciansApi} from "../api/ElectricianApiService"
import { useNavigate } from "react-router-dom"
import { testApi } from "../api/ElectricianApiService"

export default function AddElectricianComponent() {

    const [electricians, setElectricians] = useState([])
    const [render, setRender] = useState(0)
    const navigate = useNavigate()

    //useEffect( () => refreshData(), [render])


    function refreshData() {
        retrieveElectriciansApi()
            .then(response => {
                setElectricians(response.data)
                console.log(response)    
            })
            .catch(error => console.log(error))
    }

    function test() {
        testApi()
        .then(response => {
            //setElectricians(response.data)
            console.log(response)    
        })
        .catch(error => console.log(error))
    }




    return (
        <div className="AddElectricianComponent">
            <button className="btn btn-info m-3" onClick={() => navigate(`/temp1`)}>Wstecz</button>
            <h1>Dodaj elektryka do projektu</h1>
            <button className="btn btn-info m-3" onClick={test}>Wczytaj z pliku</button>
            {   
                electricians?.map (
                    electrician => (
                        <textarea class="form-control w-50 m-2" rows="2" value = {electrician.signature} disabled = {true}></textarea>
                    )
                )
            }
        </div>
    )
}
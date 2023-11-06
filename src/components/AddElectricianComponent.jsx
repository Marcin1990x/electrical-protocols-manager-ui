import { useState } from "react"
import { retrieveElectriciansApi} from "../api/ElectricianApiService"
import { useNavigate } from "react-router-dom"

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

    return (
        <div className="AddElectricianComponent">
            <button className="btn btn-primary btn-lg m-2" onClick={() => navigate(`/project`)}>Wstecz</button>
            <h1>Dodaj elektryka do projektu</h1>
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
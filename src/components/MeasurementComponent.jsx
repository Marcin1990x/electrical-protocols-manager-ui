import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { retrieveMeasurementMainById } from "../api/MeasurementMainApiService"
//import { useGlobal } from "./GlobalData"

export default function MeasurementComponent() {

    const [main, setMain] = useState([])
    //const context = useGlobal()
    const {id} = useParams()
    
    useEffect( () => refreshData(), [])

    function refreshData() {

        retrieveMeasurementMainById(id)
            .then(response => {
                setMain(response.data)
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    function test(){
        console.log(main)
    }


    return (
        <div className="MeasurementComponent">
            <hr></hr>
            <h4>{main.measurementMainCascadeNameWithoutMeasurementName}</h4>
            <h3> {main.measurementName} - id {id}</h3>
            

            {/* <button className="btn btn-success" onClick = {() => test()}>test</button> */}
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
                            <td>{main.un}</td>
                            <td>{main.ui}</td>
                            <td>{main.ko}</td>
                            <td>{main.ta}</td>
                            <td>{main.networkType}</td>
                            <td>{main.uo}</td>
                        </tr>
                    </tbody>
            </table> 
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
                        main.measurementEntries?.map (
                            entry => (
                                <tr key={entry.id}>
                                    <td>{entry.id}</td>
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
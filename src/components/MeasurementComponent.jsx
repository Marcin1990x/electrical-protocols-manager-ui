import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { retrieveMeasurementMainById } from "../api/MeasurementMainApiService"
//import { useGlobal } from "./GlobalData"

export default function MeasurementComponent() {

    const navigate = useNavigate()

    const [main, setMain] = useState([])
    //const context = useGlobal()
    const {id, idMain} = useParams()

    //discriminator 1
    const [uo, setUo] = useState(0)
    //discriminator 1
    
    useEffect( () => refreshData(), [])

    function refreshData() {

        retrieveMeasurementMainById(idMain)
            .then(response => {
                setMain(response.data)
                setUo(response.data.measurementEntries[0].uo)
                console.log(response)
            })
            .catch(error => console.log(error))
    }
    function handleBackButton() {
        navigate(`/rooms/${id}`)
    }


    return (
        <div className="MeasurementComponent">
            <hr></hr>
            <h4>
                <button className = "btn btn-primary btn-lg m-2" onClick = {handleBackButton}>Wstecz</button>
                {main.measurementMainCascadeNameWithoutMeasurementName}
            </h4>
            <h3> {main.measurementName} - id {idMain}</h3>

            {(main.measurementName == '(TN-C, TN-S) Badanie ochrony przed porazeniem przez samoczynne wylaczenie') && //fix this shit
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
                            <td>{uo}</td>
                        </tr>
                    </tbody>
            </table> 
            }
            <hr></hr>
            {(main.measurementName == '(TN-C, TN-S) Badanie ochrony przed porazeniem przez samoczynne wylaczenie') &&
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
                        <th>Zs[Ω]</th>
                        <th>Za[Ω]</th>
                        <th>Ik[A]</th>
                        <th>Ocena</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        main.measurementEntries?.map (
                            entry => (
                                <tr key={entry.id}>
                                    <td>{entry.index}</td>
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
            }
            {(main.measurementName == '(TN-S) Badanie rezystancji izolacji obwodow') &&
            <table className="table">
                    <thead>
                        <tr>
                            <th>Uiso[V]</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{main.uiso}</td>
                        </tr>
                    </tbody>
            </table> 
            }
            <hr></hr>
            {(main.measurementName == '(TN-S) Badanie rezystancji izolacji obwodow') &&
            <table className="table">
                <thead>
                    <tr>
                        <th>Lp.</th>
                        <th>Symbol</th>
                        <th>Nazwa obwodu</th>
                        <th>L1-L2[MΩ]</th>
                        <th>L2-L3[MΩ]</th>
                        <th>L3-L1[MΩ]</th>
                        <th>L1-PE[MΩ]</th>
                        <th>L2-PE[MΩ]</th>
                        <th>L3-PE[MΩ]</th>
                        <th>L1-N[MΩ]</th>
                        <th>L2-N[MΩ]</th>
                        <th>L3-N[MΩ]</th>
                        <th>N-PE[MΩ]</th>
                        <th>Ra</th>
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
                                    <td>{entry.circuitName}</td>
                                    <td>{entry.l1l2}</td>
                                    <td>{entry.l2l3}</td>
                                    <td>{entry.l3l1}</td>
                                    <td>{entry.l1pe}</td>
                                    <td>{entry.l2pe}</td>
                                    <td>{entry.l3pe}</td>
                                    <td>{entry.l1n}</td>
                                    <td>{entry.l2n}</td>
                                    <td>{entry.l3n}</td>
                                    <td>{entry.npe}</td>
                                    <td>{entry.ra}</td>
                                    <td>{entry.result}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            {(main.measurementName == '(TN-C) Badanie rezystancji izolacji obwodow') &&
            <table className="table">
                <thead>
                    <tr>
                        <th>Lp.</th>
                        <th>Symbol</th>
                        <th>Nazwa obwodu</th>
                        <th>L1-L2[MΩ]</th>
                        <th>L2-L3[MΩ]</th>
                        <th>L3-L1[MΩ]</th>
                        <th>L1-PEN[MΩ]</th>
                        <th>L2-PEN[MΩ]</th>
                        <th>L3-PEN[MΩ]</th>
                        <th>Ra</th>
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
                                    <td>{entry.circuitName}</td>
                                    <td>{entry.l1l2}</td>
                                    <td>{entry.l2l3}</td>
                                    <td>{entry.l3l1}</td>
                                    <td>{entry.l1pen}</td>
                                    <td>{entry.l2pen}</td>
                                    <td>{entry.l3pen}</td>
                                    <td>{entry.ra}</td>
                                    <td>{entry.result}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            {(main.measurementName == 'Parametry zabezpieczen roznicowopradowych') &&
            <table className="table">
                <thead>
                    <tr>
                        <th>Lp.</th>
                        <th>Symbol</th>
                        <th>Badany punkt</th>
                        <th>Wyłącznik RCD</th>
                        <th>Typ</th>
                        <th>In[mA]</th>
                        <th>Ia[mA]</th>
                        <th>ta[ms]</th>
                        <th>t rcd[ms]</th>
                        <th>Ub[V]</th>
                        <th>Ui[V]</th>
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
                                    <td>{entry.circuitBreaker}</td>
                                    <td>{entry.rcdType}</td>
                                    <td>{entry.iNom}</td>
                                    <td>{entry.ia}</td>
                                    <td>{entry.ta}</td>
                                    <td>{entry.trcd}</td>
                                    <td>{entry.ub}</td>
                                    <td>{entry.ui}</td>
                                    <td>{entry.result}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            {(main.measurementName == 'Badanie rezystywnosci gruntu') &&
            <table className="table">
                <thead>
                    <tr>
                        <th>Lp.</th>
                        <th>Symbol</th>
                        <th>Badany punkt</th>
                        <th>L[m]</th>
                        <th>d[m]</th>
                        <th>p[Ωm]</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        main.measurementEntries?.map (
                            entry => (
                                <tr key={entry.id}>
                                    <td></td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.measuringPoint}</td>
                                    <td>{entry.l}</td>
                                    <td>{entry.d}</td>
                                    <td>{entry.p}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
        </div>
    )
}
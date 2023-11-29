import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { retrieveMeasurementMainById } from "../api/MeasurementMainApiService"
import { handleContinuity, handleResult } from "./functions/CommonFunctions"

export default function MeasurementComponent() {

    const navigate = useNavigate()

    const [main, setMain] = useState([])
    const {id, idMain, projectName} = useParams()

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
    return (
        <div className="MeasurementComponent">
            
                <div>
                    <button className = "btn btn-outline-dark btn-lg m-2" onClick = {() => navigate(`/${projectName}/project/structure/rooms/${id}`)}>Wstecz</button>
                </div>
                <h3>
                {main.measurementMainCascadeNameWithoutMeasurementName}
                </h3>
                <hr></hr>
            <h2>{main.measurementName}</h2>

            {(main.measurementName == '(TN-C, TN-S) Badanie ochrony przed porażeniem przez samoczynne wyłączenie') && //fix this shit
            <table className="table table-striped">
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
            {(main.measurementName == '(TN-C, TN-S) Badanie ochrony przed porażeniem przez samoczynne wyłączenie') &&
            <table className="table table-striped">
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
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.measuringPoint}</td>
                                    <td>{entry.cutout}</td>
                                    <td>{entry.type}</td>
                                    <td>{entry.iNom}</td>
                                    <td>{entry.ia}</td>
                                    <td>{entry.zs}</td>
                                    <td>{entry.za}</td>
                                    <td>{entry.ik}</td>
                                    <td>{handleResult(entry.result)}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            {(main.measurementName == '(TN-S) Badanie rezystancji izolacji obwodów') &&
            <table className="table table-striped">
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
            {(main.measurementName == '(TN-S) Badanie rezystancji izolacji obwodów') &&
            <table className="table table-striped">
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
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.circuitName}</td>
                                    <td>{(entry.l1l2) != 0 && entry.l1l2}</td>
                                    <td>{(entry.l2l3) != 0 && entry.l2l3}</td>
                                    <td>{(entry.l3l1) != 0 && entry.l3l1}</td>
                                    <td>{(entry.l1pe) != 0 && entry.l1pe}</td>
                                    <td>{(entry.l2pe) != 0 && entry.l2pe}</td>
                                    <td>{(entry.l3pe) != 0 && entry.l3pe}</td>
                                    <td>{(entry.l1n) != 0 && entry.l1n}</td>
                                    <td>{(entry.l2n) != 0 && entry.l2n}</td>
                                    <td>{(entry.l3n) != 0 && entry.l3n}</td>
                                    <td>{entry.npe}</td>
                                    <td>{entry.ra}</td>
                                    <td>{handleResult(entry.result)}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            {(main.measurementName == '(TN-C) Badanie rezystancji izolacji obwodów') &&
            <table className="table table-striped">
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
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.circuitName}</td>
                                    <td>{(entry.l1l2) != 0 && entry.l1l2}</td>
                                    <td>{(entry.l2l3) != 0 && entry.l2l3}</td>
                                    <td>{(entry.l3l1) != 0 && entry.l3l1}</td>
                                    <td>{(entry.l1pen) != 0 && entry.l1pen}</td>
                                    <td>{(entry.l2pen) != 0 && entry.l2pen}</td>
                                    <td>{(entry.l3pen) != 0 && entry.l3pen}</td>
                                    <td>{entry.ra}</td>
                                    <td>{handleResult(entry.result)}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            {(main.measurementName == 'Parametry zabezpieczeń różnicowoprądowych') &&
            <table className="table table-striped">
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
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
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
                                    <td>{handleResult(entry.result)}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            {(main.measurementName == 'Badanie rezystywności gruntu') &&
            <table className="table table-striped">
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
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
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
            {(main.measurementName == 'Badanie ciągłości małych rezystancji') &&
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Lp.</th>
                        <th>Symbol</th>
                        <th>Ciągłość</th>
                        <th>Rs[Ω]</th>
                        <th>Ra[Ω]</th>
                        <th>Ocena</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        main.measurementEntries?.map (
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.symbol}</td>
                                    <td>{handleContinuity(entry.continuity)}</td>
                                    <td>{entry.rs}</td>
                                    <td>{entry.ra}</td>
                                    <td>{handleResult(entry.result)}</td>
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
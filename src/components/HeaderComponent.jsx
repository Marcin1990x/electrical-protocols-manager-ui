import { useLocation } from "react-router-dom"
import { saveDataApi, createSqlFileApi } from "../api/SaveLoadApiService"
import { useEffect, useState } from "react"


export default function HeaderComponent(){

    const [message, setMessage] = useState('')
    const [messageVisible, setMessageVisible] = useState(false)
    const location = useLocation()

    useEffect( () => setMessageVisible(false), [location])

    function showMessage(text) {
        setMessageVisible(true)
        setMessage(text)
    }
    function handleSaveBtn() {
        
        saveDataApi()
            .then(response => {
                console.log(response)
                createSqlFileApi()
                    .then(response => {
                        console.log(response)
                        showMessage('Zapisano.')
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }

    return(
        <header className="border-bottom border-light border-5 mb-5 p-2">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                    <div className="collapse navbar-collapse">

                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item fs-5">
                            <div className="container m-1">
                                {messageVisible && 
                                    <b>{message}</b>
                                }
                            </div>
                        </li>
                        <li className="nav-item fs-5">
                            <div>
                                <button className="btn btn-dark" onClick={() => handleSaveBtn()}>Zapisz strukturę</button>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        </header>
    )
}
import { useLocation, useNavigate } from "react-router-dom"
import { saveDataApi, createSqlFileApi } from "../api/SaveLoadApiService"
import { useEffect, useState } from "react"

export default function HeaderComponent(){

    const [message, setMessage] = useState('')
    const [messageVisible, setMessageVisible] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect( () => setMessageVisible(false), [location])

    function showMessage(text) {
        setMessageVisible(true)
        setMessage(text)
    }
    function handleSaveBtn() {

        console.log(location.pathname)
        
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
    function isDisabled(path) {
        if(location.pathname.endsWith(path)) {
            return true
        }
    }

    return(
    <div className="headerComponent">
        { !isDisabled('exit') &&
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <div className="collapse navbar-collapse">
                            <button className="btn btn-dark btn-sm m-1" disabled = {isDisabled('/')} 
                                onClick={() => navigate(`/`)}>Strona główna</button>
                            <button className="btn btn-dark btn-sm m-1" disabled = {isDisabled('/electricians')} 
                                onClick={() => navigate(`/electricians`)}>Pomiarowcy</button>
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
                                    <button className="btn btn-dark btn-sm m-1" onClick={() => handleSaveBtn()}>Zapisz strukturę</button>
                                    <button className="btn btn-danger btn-sm m-1" onClick={() => navigate('/exit')}>Wyjdź</button>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
        }
    </div>    
    )
}
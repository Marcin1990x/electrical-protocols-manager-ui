import { useNavigate, useParams } from "react-router-dom"
import { saveDataApi, createSqlFileApi } from "../api/SaveLoadApiService"
import { useState } from "react"
import { deleteProjectByNameApi } from "../api/ProjectApiService"

export default function ProjectComponent() {

    const navigate = useNavigate()
    const {projectName} = useParams()

    const [message, setMessage] = useState('')
    const [messageVisible, setMessageVisible] = useState(false)

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
                        showMessage('Zapisano strukturę')
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }
    function handleDeleteBtn() {
        deleteProjectByNameApi(projectName)
            .then(response => {
                navigate('/')
                console.log(response)
            })
            .catch(error => console.log(error))
    }
    return (
        <div className="ProjectComponent">
            
            
                <div className="row justify-content-start">
                    <div className="col"/>
                    <div className="col">
                        <div className="shadow-sm p-3 mb-2 bg-body rounded">
                            <button className="btn btn-outline-dark m-2" onClick={() => navigate(`/`)}>Wstecz</button>
                        </div>
                    </div>
                    <div className="col"/>
                </div>
                <div className="row">
                    <div className="col"/>
                    <div className="col">
                        <div className="shadow-sm p-3 mb-2 bg-body rounded">
                            <h1>Projekt <i>{projectName}</i></h1>
                        </div>
                    </div>
                    <div className="col"/>
                </div>
                <div className="row">
                    <div className="col"></div>
                    <div className="col">
                        <div className="shadow-sm p-3 mb-2 bg-body rounded">
                            <button className="btn btn-dark" onClick={() => navigate(`structure`)}>Struktura</button>
                        </div>
                        <div className="shadow-sm p-3 mb-2 bg-body rounded">
                            <button className="btn btn-dark" onClick={() => navigate(`protocolInfo`)}>Informacje do protokołu</button>
                        </div>
                        <div className="shadow-sm p-3 mb-2 bg-body rounded">
                            <button className="btn btn-dark" onClick={() => navigate(`generate`)}>Generuj PDF protokołu</button>
                        </div>
                        <div className="shadow-sm p-3 mb-2 bg-body rounded">
                            <button className="btn btn-dark" onClick={() => handleSaveBtn()}>Zapisz strukturę</button>
                            <div>
                                {messageVisible && 
                                    <div>
                                    <br/><b>{message}</b>
                                    </div> 
                                }
                            </div>
                        </div>
                        <div className="shadow-sm p-3 mb-2 bg-body rounded">
                            <button className="btn btn-danger" onClick={() => handleDeleteBtn()}>Usuń projekt</button>
                        </div>
                    </div>
                    <div className="col"/>
                </div>
        </div>
    )
}
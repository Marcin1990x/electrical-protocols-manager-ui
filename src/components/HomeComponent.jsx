import { useNavigate } from "react-router-dom"
import { retrieveElectriciansFromFileApi } from "../api/ElectricianApiService"
import { useEffect, useRef, useState } from "react"
import { deleteAllBuildingsApi, retrieveProjectsToLoadApi } from "../api/BuildingApiService"

export default function HomeComponent() {

    const navigate = useNavigate()
    const [addName, setAddName] = useState(false)
    const [loadProject, setLoadProject] = useState(false)
    const projectName = useRef()
    const projectToLoad = useRef()
    const [projectNames, setProjectNames] = useState([])
    const [message, setMessage] = useState('')
    const [messageVisible, setMessageVisible] = useState(false)

    useEffect( () => readData(), [])

    function showError(text) {
        setMessageVisible(true)
        setMessage(text)
    }

    function readData() {
        deleteAllBuildingsApi()
            .then(response => console.log(response))
            .catch(error => console.log(error))
        retrieveElectriciansFromFileApi()
            .then(reponse => console.log(reponse))
            .catch(error => console.log(error))
    }
    function showNameField() {
        if(addName === false){
            setAddName(true)
            setLoadProject(false)
            setMessageVisible(false)
        } else {
            setAddName(false)
        }
    }
    function loadProjectWindowSize() {
        if(projectNames.length < 5 && projectNames.length > 0) {
            return projectNames.length
        } else if(projectNames.length >= 5){
            return 5
        } else {
            return 1
        }
    }
    function showLoadWindow() {
        if(loadProject === false){
            setLoadProject(true)
            setAddName(false)
            setMessageVisible(false)
            retrieveProjectsToLoadApi()
                .then(response => {
                    setProjectNames(response.data)
                    console.log(response)
                })
                .catch(error => console.log(error))
        } else {
            setLoadProject(false)
        }
    }
    function handleCreateBtn() {
        if(projectName.current.value !== '') {
            navigate(`${projectName.current.value}/project/`)
        } else {
            showError('Musisz wpisać nazwę.')
        }
    }
    function handleLoadBtn() {
        console.log(projectToLoad.current.value)
        if(projectToLoad.current.value !== ''){
            navigate(`${projectToLoad.current.value}/project/`)
        } else {
            showError('Wybierz projekt do wczytania.')
        }
    }

    return (
        <div className="HomeComponent">
            
                <div className="row">
                    <div className="col"/>
                    <div className="col">
                    <div className="shadow-sm p-3 mb-2 bg-body rounded">
                        <h1>Protokoły elektryczne</h1>
                    </div>
                    </div>
                    <div className="col"/>
                </div>
                <div className="row">
                    <div className="col"/>
                    <div className="col">
                        <div className="shadow-sm p-3 mb-2 bg-body rounded">
                            <button className="btn btn-dark" onClick={() => showNameField()}>Nowy projekt</button>
                        </div>
                        {addName &&
                            <div className="shadow-sm p-3 mb-2 bg-body rounded">
                                <label><b>Wprowadź nazwę projektu:</b></label>
                                <input type = "text" className="form-control" maxLength={15} ref={projectName}/>
                                <button className="btn btn-outline-dark m-2" 
                                    onClick={() => handleCreateBtn()}>Utwórz
                                </button>
                                <div>
                                <b>{messageVisible && message}</b>
                                </div>
                            </div>
                        }
                        <div className="shadow-sm p-3 mb-2 bg-body rounded">
                            <button className="btn btn-dark" onClick={() => showLoadWindow()}>Wczytaj projekt</button>
                        </div>
                        {loadProject &&
                            <div className="shadow-sm p-3 mb-2 bg-body rounded">
                                <label><b>Wybierz projekt z listy:</b></label>
                                    <select class="form-select m-2" size={loadProjectWindowSize()} multiple aria-label="multiple select example" ref={projectToLoad}>
                                        {
                                            projectNames.map (
                                                name => (
                                                    <option value= {name}>{name}</option>
                                                )
                                            )
                                        }
                                    </select>
                                <button className="btn btn-outline-dark m-2" 
                                    onClick={() => handleLoadBtn()}>Wczytaj
                                </button>
                                <div>
                                    <b>{messageVisible && message}</b>
                                </div>
                            </div>
                        }
                        <div className="shadow-sm p-3 mb-2 bg-body rounded">
                            <button className="btn btn-dark" onClick={() => navigate(`/electricians`)}>Dodaj dane pomiarowca</button>
                        </div>
                        <div className="shadow-sm p-3 mb-2 bg-body rounded">
                            <button className="btn btn-dark">Wyjdź</button>
                        </div>
                    </div>
                    <div className="col"/>
                </div>
        </div>
    )

}
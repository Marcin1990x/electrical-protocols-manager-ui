import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { addProjectApi, retrieveProjectsApi } from "../api/ProjectApiService"
import { closeApplicationApi } from "../api/ApplicationApiService"

export default function HomeComponent() {

    const navigate = useNavigate()
    const [addName, setAddName] = useState(false)
    const [loadProject, setLoadProject] = useState(false)
    const projectName = useRef()
    const projectToLoad = useRef()
    const [projects, setProjects] = useState([])
    const [message, setMessage] = useState('')
    const [messageVisible, setMessageVisible] = useState(false)

    useEffect( () => readData(), [])

    function showError(text) {
        setMessageVisible(true)
        setMessage(text)
    }

    function readData() {
        retrieveProjectsApi()
            .then(response => {
                setProjects(response.data)
                console.log(response)
            })
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
        if(projects.length < 5 && projects.length > 0) {
            return projects.length
        } else if(projects.length >= 5){
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
        } else {
            setLoadProject(false)
        }
    }
    function checkProjectName(name) {
        
        for(let item of projects) {
            if(item.projectName === name || name === ''){
                return false
            }
        }
        return true
    }

    function handleCreateBtn() {
        if(checkProjectName(projectName.current.value)) {
            const newProject = {
                projectName: projectName.current.value
            }
            addProjectApi(newProject)
                .then(response => {
                    navigate(`${projectName.current.value}/project/`)
                    console.log(response)
                    setMessageVisible(false)
                })    
                .catch(error => console.log(error))
        } else if(projectName.current.value === '') {
            showError('Musisz wpisać nazwę.')
        } else {
            showError('Projekt o takiej nazwie już istnieje.')
        }
    }
    function handleLoadBtn() {
        
        if(projectToLoad.current.value !== ''){
            navigate(`${projectToLoad.current.value}/project/`)
        } else {
            showError('Wybierz projekt do wczytania.')
        }
    }
    function handleExitBtn() {

        closeApplicationApi()
            .then(response => console.log(response))
            .catch(error => console.log(error))
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
                                            projects?.map (
                                                project => (
                                                    <option value= {project.projectName}>{project.projectName}</option>
                                                )
                                            )
                                        }
                                    </select>
                                <button className="btn btn-outline-dark m-2" onClick={() => handleLoadBtn()}>Wczytaj</button>
                                <div>
                                    <b>{messageVisible && message}</b>
                                </div>
                            </div>
                        }
                        <div className="shadow-sm p-3 mb-2 bg-body rounded">
                            <button className="btn btn-dark" onClick={() => navigate(`/electricians`)}>Dodaj dane pomiarowca</button>
                        </div>
                        <div className="shadow-sm p-3 mb-2 bg-body rounded">
                            <button className="btn btn-dark" onClick={() => handleExitBtn()}>Wyjdź</button>
                        </div>
                    </div>
                    <div className="col"/>
                </div>
        </div>
    )
}
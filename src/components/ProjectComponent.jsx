import { useNavigate, useParams } from "react-router-dom"

export default function ProjectComponent() {

    const navigate = useNavigate()
    const {projectName} = useParams()


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
                            <h1>Projekt {projectName}</h1>
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
                            <button className="btn btn-dark">Zapisz projekt</button>
                        </div>
                    </div>
                    <div className="col"/>
                </div>
        </div>
    )

}
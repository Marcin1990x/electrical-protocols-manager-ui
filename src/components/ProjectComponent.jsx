import { useNavigate } from "react-router-dom"

export default function ProjectComponent() {

    const navigate = useNavigate()


    return (
        <div className="ProjectComponent">
            <button className="btn btn-info m-3" onClick={() => navigate(`/temp`)}>Wstecz</button>
            <div className="shadow-sm p-3 mb-2 bg-body rounded">
                <h1>Projekt</h1>
            </div>
                <div className="w-100 p-1">
                    <div className="shadow-sm p-3 mb-2 bg-body rounded">
                        <button className="btn btn-dark">Nowa struktura</button>
                    </div>
                    <div className="shadow-sm p-3 mb-2 bg-body rounded">
                        <button className="btn btn-dark" onClick={() => navigate(`/addElectrician`)}>Dodaj pomiarowca do projektu</button>
                    </div>
                    <div className="shadow-sm p-3 mb-2 bg-body rounded">
                        <button className="btn btn-dark">Generuj PDF</button>
                    </div>
                    <div className="shadow-sm p-3 mb-2 bg-body rounded">
                        <button className="btn btn-dark">Zapisz projekt</button>
                    </div>
                </div>
        </div>
    )

}
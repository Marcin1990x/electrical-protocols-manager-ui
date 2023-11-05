import { useNavigate } from "react-router-dom"

export default function HomeComponent() {

    const navigate = useNavigate()

    return (
        <div className="HomeComponent">
            <div className="shadow-sm p-3 mb-2 bg-body rounded">
                <h1>Protokoły elektryczne</h1>
            </div>
                <div className="w-100 p-1">
                    <div className="shadow-sm p-3 mb-2 bg-body rounded">
                        <button className="btn btn-dark" onClick={() => navigate(`/temp1`)}>Nowy projekt</button>
                    </div>
                    <div className="shadow-sm p-3 mb-2 bg-body rounded">
                        <button className="btn btn-dark">Wczytaj projekt</button>
                    </div>
                    <div className="shadow-sm p-3 mb-2 bg-body rounded">
                        <button className="btn btn-dark" onClick={() => navigate(`/electricians`)}>Dodaj dane pomiarowca</button>
                    </div>
                    <div className="shadow-sm p-3 mb-2 bg-body rounded">
                        <button className="btn btn-dark">Wyjdź</button>
                    </div>
                </div>
        </div>
    )

}
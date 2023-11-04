import { useNavigate } from "react-router-dom"

export default function HomeComponent() {

    const navigate = useNavigate()

    function handleAddElectrician() {
        navigate(`/electricians`)
    }

    return (
        <div className="HomeComponent">
            <div className="shadow-sm p-3 mb-2 bg-body rounded">
                <h1>Protokoły elektryczne</h1>
            </div>
                <div className="w-100 p-1">
                    <div className="shadow-sm p-3 mb-2 bg-body rounded">
                        <button className="btn btn-dark">Nowy projekt</button>
                    </div>
                    <div className="shadow-sm p-3 mb-2 bg-body rounded">
                        <button className="btn btn-dark">Wczytaj projekt</button>
                    </div>
                    <div className="shadow-sm p-3 mb-2 bg-body rounded">
                        <button className="btn btn-dark" onClick={handleAddElectrician}>Dodaj dane pomiarowca</button>
                    </div>
                    <div className="shadow-sm p-3 mb-2 bg-body rounded">
                        <button className="btn btn-dark">Wyjdź</button>
                    </div>
                </div>
        </div>
    )

}
import { useNavigate } from "react-router-dom"

export default function ErrorComponent() {

    const navigate = useNavigate()

    return (
        <div className="ErrorComponent">
            <h3>Ups...coś poszło nie tak.</h3>
            wróc na stronę główną.
            <div>
                <button className="btn btn-dark m-2" onClick={() => navigate(`/`)}>Strona główna</button>
            </div>
        </div>
    )
}
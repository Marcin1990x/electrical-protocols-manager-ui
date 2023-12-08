import { useEffect } from "react"
import { closeApplicationApi } from "../api/ApplicationApiService"

export default function ExitComponent() {

    useEffect(() => closeApplication, [])

    function closeApplication() {

        closeApplicationApi()
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    return (
        <div className="ExitComponent">
            <br/>
            <h3>Dziękujemy za skorzystanie z aplikacji !</h3>
        </div>
    )
}
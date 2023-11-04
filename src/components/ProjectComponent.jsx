export default function ProjectComponent() {

    


    return (
        <div className="ProjectComponent">
            <div className="shadow-sm p-3 mb-2 bg-body rounded">
                <h1>Projekt</h1>
            </div>
                <div className="w-100 p-1">
                    <div className="shadow-sm p-3 mb-2 bg-body rounded">
                        <button className="btn btn-dark">Nowa struktura</button>
                    </div>
                    <div className="shadow-sm p-3 mb-2 bg-body rounded">
                        <button className="btn btn-dark">Dodaj pomiarowca do projektu</button>
                    </div>
                    <div className="shadow-sm p-3 mb-2 bg-body rounded">
                        <button className="btn btn-dark">Zapisz projekt</button>
                    </div>
                </div>
        </div>
    )

}
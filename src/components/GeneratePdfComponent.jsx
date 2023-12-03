import { useNavigate, useParams } from "react-router-dom"
import { Document, Page, pdfjs } from 'react-pdf'
import { useRef, useState } from "react"
import { getDataForProtocolApi, generateProtocolApi, savePdfApi } from "../api/GeneratePdfApi"
import test from '../test.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString()


export default function GeneratePdf() {

    const [message, setMessage] = useState('')
    const [messageVisible, setMessageVisible] = useState(false)
    const {projectName} = useParams()
    const navigate = useNavigate()
    const [numPages, setNumPages] = useState()
    const [pageNumber, setPageNumber] = useState(1)
    const [width, setWidth] = useState(1000)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [pdfGenerated, setPdfGenerated] = useState(false)
    const [saveBtn, setSaveBtn] = useState(false)

    const [filePath, setFilePath] = useState("")

    const fileName = useRef()

    function showError(text) {
        setMessageVisible(true)
        setMessage(text)
    }

    function increasePageCount() {
        if(pageNumber < numPages) {
            setPageNumber(pageNumber + 1)
        }
    }
    function decreasePageCount() {
        if(pageNumber > 1) {
            setPageNumber(pageNumber - 1)
        }
    }
    function increasePage(){
        if(width < 1300) {
            setWidth(width + 100)
        }
    }
    function decreasePage(){
        if(width > 500) {
            setWidth(width - 100)
        }
    }

    function loadDataToProtocol() {
        getDataForProtocolApi(projectName)
            .then(response => {
                if(response.data.includes('OK')){
                    showError('Dane załadowane.')
                    setDataLoaded(true)
                } else if (response.data.includes('110')){
                    showError('Brak dodanej struktury.')
                } else if (response.data.includes('111')){
                    showError('Brak dodanych informacji strony tytułowej.')
                } else if (response.data.includes('112')){
                    showError('Nie dodano elektryka do danych protokołu.')
                }
            })
            .catch(error => console.log(error))
    }
    function generatePdf() {
        generateProtocolApi()
            .then(response => {
                console.log(response)
                setFilePath(response.data)
                setPdfGenerated(true)
                showError('Wygenerowano plik protokołu.')
            })
            .catch(error => console.log(error))
    }

    function handleSaveBtn() {

        console.log(filePath)
        if(saveBtn == true){
            setSaveBtn(false)
        } else {
            setSaveBtn(true)
        }
    }


    function savePdf(){
        if(!fileName.current.value == '') {

        savePdfApi(fileName.current.value)
            .then(response => {
                setSaveBtn(false)
                showError('Zapisano pdf.')
                console.log(response)
            })
            .catch(error => console.log(error))
        } else {
            showError('Wprowadź nazwę pliku.')
        }
    }

    function onDocumentLoadSuccess({numPages}){
        setNumPages(numPages);
    }


    return (
        <div className="GeneratePdf">
            <button className="btn btn-outline-dark w-25 m-2" onClick={() => navigate(`/${projectName}/project`)}>Wstecz</button>

            <h2>Protokół pomiarowy</h2>

            <div className="message">
                <b>{messageVisible && message}</b>
            </div>
            <div className="row">
                <div className="col"/>
                <div className="col-2">
                    <button className="btn btn-dark btn-lg m-2" onClick={loadDataToProtocol}>Załaduj dane</button>
                </div>
                <div className="col-2">
                    <button className="btn btn-dark btn-lg m-2" disabled = {!dataLoaded} onClick={generatePdf}>Generuj podgląd Pdf</button>
                </div>
                <div className="col"/>
            </div>    
            <div className="row">
                <div className="col">
                    <button className="btn btn-dark btn-lg m-2" disabled = {!pdfGenerated} onClick={handleSaveBtn}>Zapisz Pdf</button>
                </div>  
            </div>      
            <div className="row">
                <div className="col-5"/>
                <div className="col-2 m-2">
                    { saveBtn &&
                        <div>
                            <label><b>Wprowadź nazwę pliku: </b></label>
                            <input type = "text" className="form-control" ref={fileName}></input>
                            <button className="btn btn-dark m-2" onClick={savePdf}>zapisz</button>
                        </div>
                    }
                </div>
            </div>
            

            <br></br>
            <div className="container">
                <div className="row">
                { pdfGenerated &&
                    <div>
                        Strona {pageNumber} z {numPages}
                        <button className="btn btn-dark btn m-1" onClick={increasePageCount}>+</button>
                        <button className="btn btn-outline-dark btn m-1" onClick={decreasePageCount}>-</button>
                        <hr></hr>
                        Rozmiar
                        <button className="btn btn-dark btn m-1" onClick={increasePage}>+</button>
                        <button className="btn btn-outline-dark btn m-1" onClick={decreasePage}>-</button>
                        <div className="row">
                            <div className="col-2"/>
                                <div className="col">
                                    <Document file = {test} onLoadSuccess={onDocumentLoadSuccess}>
                                        <Page pageNumber={pageNumber} renderTextLayer = {false} renderAnnotationLayer = {false} width={width}/>
                                    </Document>
                                </div>
                            <div className="col-2"/>
                        </div>
                    </div>
                }
                </div>
             </div>
        </div>
    )
}
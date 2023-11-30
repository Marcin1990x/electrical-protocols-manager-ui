import { useNavigate, useParams } from "react-router-dom"
import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from "react"
import pdf from '../test.pdf'
import { getDataForProtocolApi, generateProtocolApi, savePdfApi } from "../api/GeneratePdfApi"

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
                setPdfGenerated(true)
                showError('Wygenerowano plik protokołu.')
            })
            .catch(error => console.log(error))
    }
    function savePdf(){
        savePdfApi()
            .then(response => {
                showError('Zapisano pdf.')
                console.log(response)
            })
            .catch(error => console.log(error))
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
            
            <button className="btn btn-dark btn-lg m-2" onClick={loadDataToProtocol}>Załaduj dane</button>
            <button className="btn btn-dark btn-lg m-2" disabled = {!dataLoaded} onClick={generatePdf}>Generuj podgląd Pdf</button>
            <button className="btn btn-dark btn-lg m-2" disabled = {!pdfGenerated} onClick={savePdf}>Zapisz Pdf</button>

            <br></br>
            <div className="container">
                <div className="row">
                { pdfGenerated &&
                    <div className="col m-5">
                    
                        Strona {pageNumber} z {numPages}
                        <button className="btn btn-dark btn m-1" onClick={increasePageCount}>+</button>
                        <button className="btn btn-outline-dark btn m-1" onClick={decreasePageCount}>-</button>
                        <hr></hr>
                        Rozmiar
                        <button className="btn btn-dark btn m-1" onClick={increasePage}>+</button>
                        <button className="btn btn-outline-dark btn m-1" onClick={decreasePage}>-</button>
                        <Document file= {pdf} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} renderTextLayer = {false} renderAnnotationLayer = {false} width={width}/>
                        </Document>
                    </div>
                }
                </div>
             </div>
        </div>
    )
}
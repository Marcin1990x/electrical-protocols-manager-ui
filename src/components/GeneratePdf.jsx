import { useNavigate } from "react-router-dom"
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from "react";
import './GeneratePdf.css'
import pdf from '../test.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString()


export default function GeneratePdf() {

    const navigate = useNavigate()
    const [numPages, setNumPages] = useState()
    const [pageNumber, setPageNumber] = useState(1)
    const [width, setWidth] = useState(1000)

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

    function onDocumentLoadSuccess({numPages}){
        setNumPages(numPages);
      }


    return (
        <div className="GeneratePdf">
            <button className="btn btn-primary btn-lg m-2" onClick={() => navigate(`/project`)}>Wstecz</button>
                <h1>Protokół pomiarowy</h1>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="col">
                        Strona {pageNumber} z {numPages}
                        <button className="btn btn-success btn m-1" onClick={increasePageCount}>+</button>
                        <button className="btn btn-success btn m-1" onClick={decreasePageCount}>-</button>
                        <hr></hr>
                        Rozmiar
                        <button className="btn btn-success btn m-1" onClick={increasePage}>+</button>
                        <button className="btn btn-success btn m-1" onClick={decreasePage}>-</button>
                        <Document file= {pdf} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} renderTextLayer = {false} renderAnnotationLayer = {false} width={width}/>
                        </Document>
                    </div>
                </div>
             </div>
        </div>
    )
}
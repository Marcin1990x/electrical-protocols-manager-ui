import { useParams, useNavigate } from "react-router-dom"
import { addEntryToMainApi, retrieveMeasurementMainById, updateMeasurementMainApi } from "../api/MeasurementMainApiService"
import { useEffect, useRef, useState } from "react"
import { retrieveMeasurementMainTypes} from "../api/MeasurementMainApiService"
import { addMeasurementEntry, deleteEntryByIdApi, deleteAllEntriesApi, updateMeasurementEntryApi } from "../api/MeasurementEntryApiService"
import { handleContinuity, handleResult, setDiscriminatorIndex } from "./functions/CommonFunctions"
import MainInput from "./elements/MainInput"
import {EntryInputRef, EntryInputVal} from "./elements/EntryInput"
import { entry0LabelsPL, entry1LabelsPL, entry2LabelsPL, entry3LabelsPL, entry4LabelsPL, entry5LabelsPL} from "./text/LabelsPL"
import { main0TextPL, entry0TextPL, entry1TextPL, entry2TextPL, entry3TextPL, entry4TextPL, entry5TextPL } from "./text/TooltipsPL"

export default function EditMeasurementComponent() {

    const {id, projectName, idMain} = useParams()

    const navigate = useNavigate()

    var maxEntries = 37

    const [mainIndex, setMainIndex] = useState(0)
    const [discriminator, setDiscriminator] = useState(10)
    const [main, setMain] = useState([])
    const [entry, setEntry] = useState([])
    const [entriesMax, setEntriesMax] = useState(false)
    const [message, setMessage] = useState('')
    const [messageVisible, setMessageVisible] = useState(false)
    const [editEntryOn, setEditEntryOn] = useState(false)
    const [entryInEdit, setEntryInEdit] = useState([])
    const [phaseSelectorDisable, setPhaseSelectorDisable] = useState(false)

    const [firstPhase, setFirstPhase] = useState(false)
    const [secondPhase, setSecondPhase] = useState(false)
    const [thirdPhase, setThirdPhase] = useState(false)
    const [allPhases, setAllPhases] = useState(true)

    const [uoTest, setUoTest] = useState(0)

    function handlePhaseSelect(event) {
        if(event.target.value === '1') {
            setFirstPhase(true)
            setSecondPhase(false)
            setThirdPhase(false)
            setAllPhases(false)
        }
        else if(event.target.value === '2') {
            setFirstPhase(false)
            setSecondPhase(true)
            setThirdPhase(false)
            setAllPhases(false)
        }
        else if(event.target.value === '3') {
            setFirstPhase(false)
            setSecondPhase(false)
            setThirdPhase(true)
            setAllPhases(false)
        }
        else if(event.target.value === '4') {
            setFirstPhase(false)
            setSecondPhase(false)
            setThirdPhase(false)
            setAllPhases(true)
        }
    }

    
    //discriminator 0
    const un = useRef()
    const ui = useRef() // common with 3
    const ko = useRef()
    const ta = useRef() // common with 3
    const networkType = useRef()

    const uo = useRef()
    const symbol = useRef()
    const point = useRef() // common with 3
    const cutout = useRef() // common with 3
    const type = useRef() // common with 3
    const iNom = useRef() // common with 3
    const zs = useRef()
    //discriminator 0
    //discriminator 1
    const uiso = useRef() // common with 2

    const phase = useRef() // common with 2
    const circuitName = useRef() // common with 2
    const l1l2 = useRef() // common with 2
    const l2l3 = useRef() // common with 2
    const l3l1 = useRef() // common with 2
    const l1pe = useRef()
    const l2pe = useRef()
    const l3pe = useRef()
    const l1n = useRef()
    const l2n = useRef()
    const l3n = useRef()
    const npe = useRef()
    const ra = useRef() // common with 2 and 5
    //discriminator 1
    //discriminator 2
    const l1pen = useRef()
    const l2pen = useRef()
    const l3pen = useRef()
    //discriminator 2
    //discriminator 3
    const ia = useRef()
    const trcd = useRef()
    const ub = useRef()
    //discriminator 3
    //discriminator 4
    const lm = useRef()
    const dm = useRef()
    const p = useRef()
    //discriminator 4

    //discriminator 5
    const continuity = useRef()
    const rs = useRef()
    //discriminator 5


    const [render, setRender] = useState('')
    const [types, setTypes] = useState([])

    useEffect ( () => { 
        //refreshMeasurementName()
        //controlEntriesQuantity()
        refreshMain()
    }, [render])

    function refreshMeasurementName(){
        retrieveMeasurementMainTypes()
            .then(response => setTypes(response.data))
            .catch(error => console.log(error))
    }
    function refreshMain(){
        retrieveMeasurementMainById(idMain)
            .then(response => {
                setMain(response.data)
                setDiscriminator(setDiscriminatorIndex(response.data.measurementName))
                setUoTest(response.data.measurementEntries[0].uo)
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    function controlEntriesQuantity() {
        if(reachedMaxEntriesQuantity(main)){
            setEntriesMax(true)
            showError('Maksymalna ilość wpisów ' + maxEntries)
        } else {
            setEntriesMax(false)
            setMessageVisible(false)
        }
    }
    function reachedMaxEntriesQuantity(measurement) {
        return measurement!== null && measurement.measurementEntries !== null && measurement.measurementEntries.length === maxEntries
    }

    function showError(text) {
        setMessageVisible(true)
        setMessage(text)
    }

    function isFieldValueCorrect(value) {
        return value !== '' && value > 0
    }
    function addEntryLogic(entryObj)
    {
        addMeasurementEntry(discriminator, entryObj)
        .then(response => {
            console.log(response)
            setEntry(response.data)
                addEntryToMainApi(discriminator, main.id, response.data.id)
                .then(response => {
                    console.log(response)
                    setRender(render + 1)
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error)) 
    }        
    function updateEntryLogic(entryObj)
    {
        updateMeasurementEntryApi(discriminator, entryInEdit.id, entryObj)
            .then(response => {
                console.log(response)
                setRender(render + 1)
                })
            .catch(error => console.log(error))
    }   

    function handleAddEntryBtn() {

        if(discriminator == 0) {
            const newProtectionMeasurementEntry = {
                symbol : symbol.current.value,
                uo : uo.current.value,
                measuringPoint : point.current.value,
                cutout : cutout.current.value,
                type : type.current.value,
                iNom : iNom.current.value,
                zs : zs.current.value
            }
            if(cutout.current.value !== '' && type.current.value !== '' && isFieldValueCorrect(iNom.current.value) 
            && isFieldValueCorrect(zs.current.value) && isFieldValueCorrect(uo.current.value)) {

                addEntryLogic(newProtectionMeasurementEntry)       
            } else {
                showError('Wypełnij wszystkie pola.')
            }
        }
        if(discriminator == 1) {

            if(allPhases) {
            const newCircuitInsulationTnsEntry = {
                symbol: symbol.current.value,
                circuitName : circuitName.current.value,
                l1l2 : l1l2.current.value,
                l2l3 : l2l3.current.value,
                l3l1 : l3l1.current.value,
                l1pe : l1pe.current.value,
                l2pe : l2pe.current.value,
                l3pe : l3pe.current.value,
                l1n : l1n.current.value,
                l2n : l2n.current.value,
                l3n : l3n.current.value,
                npe : npe.current.value,
                ra : ra.current.value
            }
            if(isFieldValueCorrect(l1l2.current.value) && isFieldValueCorrect(l2l3.current.value) && isFieldValueCorrect(l3l1.current.value)
                && isFieldValueCorrect(l1pe.current.value) && isFieldValueCorrect(l2pe.current.value) && isFieldValueCorrect(l3pe.current.value)
                && isFieldValueCorrect(l1n.current.value) && isFieldValueCorrect(l2n.current.value) && isFieldValueCorrect(l3n.current.value) 
                && isFieldValueCorrect(npe.current.value) && isFieldValueCorrect(ra.current.value)) {

                addEntryLogic(newCircuitInsulationTnsEntry)            
            } else {
                showError('Wypełnij wszystkie pola.')
            }
            } else if (firstPhase) {
                const newCircuitInsulationTnsEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l1pe : l1pe.current.value,
                    l1n : l1n.current.value,
                    npe : npe.current.value,
                    ra : ra.current.value
                }
                if(isFieldValueCorrect(l1pe.current.value) && isFieldValueCorrect(l1n.current.value)
                    && isFieldValueCorrect(npe.current.value) && isFieldValueCorrect(ra.current.value)) {
                    addEntryLogic(newCircuitInsulationTnsEntry)            
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            } else if (secondPhase) {
                const newCircuitInsulationTnsEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l2pe : l2pe.current.value,
                    l2n : l2n.current.value,
                    npe : npe.current.value,
                    ra : ra.current.value
                }
                if(isFieldValueCorrect(l2pe.current.value) && isFieldValueCorrect(l2n.current.value)
                    && isFieldValueCorrect(npe.current.value) && isFieldValueCorrect(ra.current.value)) {
                    addEntryLogic(newCircuitInsulationTnsEntry)            
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            } else if(thirdPhase) {
                const newCircuitInsulationTnsEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l3pe : l3pe.current.value,
                    l3n : l3n.current.value,
                    npe : npe.current.value,
                    ra : ra.current.value
                }
                if(isFieldValueCorrect(l3pe.current.value) && isFieldValueCorrect(l3n.current.value)
                    && isFieldValueCorrect(npe.current.value) && isFieldValueCorrect(ra.current.value)) {
                    addEntryLogic(newCircuitInsulationTnsEntry)            
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            }
        }
        if(discriminator == 2) {

            if(allPhases) {
                const newCircuitInsulationTncEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l1l2 : l1l2.current.value,
                    l2l3 : l2l3.current.value,
                    l3l1 : l3l1.current.value,
                    l1pen : l1pen.current.value,
                    l2pen : l2pen.current.value,
                    l3pen : l3pen.current.value,
                    ra : ra.current.value
                }
                if(isFieldValueCorrect(l1l2.current.value) && isFieldValueCorrect(l2l3.current.value) && isFieldValueCorrect(l3l1.current.value)
                && isFieldValueCorrect(l1pen.current.value) && isFieldValueCorrect(l2pen.current.value) && isFieldValueCorrect(l3pen.current.value) 
                && isFieldValueCorrect(ra.current.value)){
                
                    addEntryLogic(newCircuitInsulationTncEntry)         
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            } else if(firstPhase) {
                const newCircuitInsulationTncEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l1pen : l1pen.current.value,
                    ra : ra.current.value
                }
                if(isFieldValueCorrect(l1pen.current.value) && isFieldValueCorrect(ra.current.value)){
                    addEntryLogic(newCircuitInsulationTncEntry)         
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            } else if(secondPhase) {
                const newCircuitInsulationTncEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l2pen : l2pen.current.value,
                    ra : ra.current.value
                }
                if(isFieldValueCorrect(l2pen.current.value) && isFieldValueCorrect(ra.current.value)){
                    addEntryLogic(newCircuitInsulationTncEntry)         
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            } else if(thirdPhase) {
                const newCircuitInsulationTncEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l3pen : l3pen.current.value,
                    ra : ra.current.value
                }
                if(isFieldValueCorrect(l3pen.current.value) && isFieldValueCorrect(ra.current.value)){
                    addEntryLogic(newCircuitInsulationTncEntry)         
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            }
        }
        if(discriminator == 3) {
            const newResidualCurrentProtectionEntry = {
                symbol: symbol.current.value,
                measuringPoint : point.current.value,
                circuitBreaker : cutout.current.value,
                rcdType : type.current.value,
                iNom : iNom.current.value,
                ia : ia.current.value,
                ta : ta.current.value,
                trcd : trcd.current.value,
                ub : ub.current.value,
                ui : ui.current.value
            }
            if(cutout.current.value !== '' && type.current.value !== '' && isFieldValueCorrect(iNom.current.value) && isFieldValueCorrect(ia.current.value)
             && isFieldValueCorrect(ta.current.value) && isFieldValueCorrect(trcd.current.value) && isFieldValueCorrect(ub.current.value)
              && isFieldValueCorrect(ui.current.value)) {
            
                addEntryLogic(newResidualCurrentProtectionEntry)         
            } else {
                showError('Wypełnij wszystkie pola.')
            }
        }
        if(discriminator == 4) {
            const newSoilResistanceEntry = {
                symbol : symbol.current.value,
                measuringPoint : point.current.value,
                l : lm.current.value,
                d : dm.current.value,
                p : p.current.value,
            }
            if(isFieldValueCorrect(lm.current.value) && isFieldValueCorrect(dm.current.value) && isFieldValueCorrect(p.current.value)) {
                addEntryLogic(newSoilResistanceEntry)           
            } else {
                showError('Wypełnij wszystkie pola.')
            }
        }
        if(discriminator == 5) {
            const newContinuityOfSmallResistanceEntry = {
                symbol : symbol.current.value,
                continuity : continuity.current.value,
                rs : rs.current.value,
                ra : ra.current.value,
            }
            if(continuity.current.value !== '' && isFieldValueCorrect(rs.current.value) && isFieldValueCorrect(ra.current.value)) {
                addEntryLogic(newContinuityOfSmallResistanceEntry)           
            } else {
                showError('Wypełnij wszystkie pola.')
            }
        }
    }
    function handleUpdateMainBtn() {

        if(discriminator == 0 ) {
            const updatedProtectionMeasurementMain = {
                un : un.current.value,
                ui : ui.current.value,
                ko : ko.current.value,
                ta : ta.current.value,
                networkType : networkType.current.value,
            }
            if(isFieldValueCorrect(un.current.value) && isFieldValueCorrect(ui.current.value) && isFieldValueCorrect(ko.current.value)
            && isFieldValueCorrect(ta.current.value) && networkType.current.value !== ''&& isFieldValueCorrect(uo.current.value)) {
                updateMeasurementMainApi(discriminator, main.id, updatedProtectionMeasurementMain)
                .then(response => {
                    setMain(response.data)
                    setMessageVisible(false)
                    .then(response => console.log(response))
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
            } else {
                showError('Wypełnij wszystkie pola.')
            }
        }
        if(discriminator == 1 || discriminator == 2) {

            const updatedCircuitInsulationMain = {
                uiso : uiso.current.value
            }
            if(isFieldValueCorrect(uiso.current.value)) {
                updateMeasurementMainApi(discriminator, main.id, updatedCircuitInsulationMain)
                .then(response => {
                    setMain(response.data)
                    setMessageVisible(false)
                    .then(response => console.log(response))
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
            } else {
                showError('Wypełnij wszystkie pola.')
            }
        }
    }

    function handleDeleteEntryBtn(entryId) {

        console.log('Delete id: ' + entryId)

        deleteEntryByIdApi(discriminator, entryId, main.id)
            .then(response => {
                console.log(response)
                setRender(render + 1)
            })
            .catch(error => console.log(error))
    }
    function handleUpdateEntrySaveBtn() {

        if(discriminator == 0) {
            const updatedProtectionMeasurementEntry = {
                symbol : symbol.current.value,
                uo : uo.current.value,
                measuringPoint : point.current.value,
                cutout : cutout.current.value,
                type : type.current.value,
                iNom : iNom.current.value,
                zs : zs.current.value
            }
            if(cutout.current.value !== '' && type.current.value !== '' && isFieldValueCorrect(iNom.current.value) 
            && isFieldValueCorrect(zs.current.value) && isFieldValueCorrect(uo.current.value)) {
                updateEntryLogic(updatedProtectionMeasurementEntry)  
                setEditEntryOn(false)    
                setPhaseSelectorDisable(false) 
            } else {
                showError('Wypełnij wszystkie pola.')
            }
        }
        if(discriminator == 1) {

            if(allPhases) {
            const updatedCircuitInsulationTnsEntry = {
                symbol: symbol.current.value,
                circuitName : circuitName.current.value,
                l1l2 : l1l2.current.value,
                l2l3 : l2l3.current.value,
                l3l1 : l3l1.current.value,
                l1pe : l1pe.current.value,
                l2pe : l2pe.current.value,
                l3pe : l3pe.current.value,
                l1n : l1n.current.value,
                l2n : l2n.current.value,
                l3n : l3n.current.value,
                npe : npe.current.value,
                ra : ra.current.value
            }
            if(isFieldValueCorrect(l1l2.current.value) && isFieldValueCorrect(l2l3.current.value) && isFieldValueCorrect(l3l1.current.value)
                && isFieldValueCorrect(l1pe.current.value) && isFieldValueCorrect(l2pe.current.value) && isFieldValueCorrect(l3pe.current.value)
                && isFieldValueCorrect(l1n.current.value) && isFieldValueCorrect(l2n.current.value) && isFieldValueCorrect(l3n.current.value) 
                && isFieldValueCorrect(npe.current.value) && isFieldValueCorrect(ra.current.value)) {

                updateEntryLogic(updatedCircuitInsulationTnsEntry)  
                setEditEntryOn(false)    
                setPhaseSelectorDisable(false)           
            } else {
                showError('Wypełnij wszystkie pola.')
            }
            } else if (firstPhase) {
                const updatedCircuitInsulationTnsEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l1pe : l1pe.current.value,
                    l1n : l1n.current.value,
                    npe : npe.current.value,
                    ra : ra.current.value
                }
                if(isFieldValueCorrect(l1pe.current.value) && isFieldValueCorrect(l1n.current.value)
                    && isFieldValueCorrect(npe.current.value) && isFieldValueCorrect(ra.current.value)) {

                    updateEntryLogic(updatedCircuitInsulationTnsEntry)  
                    setEditEntryOn(false)   
                    setPhaseSelectorDisable(false)          
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            } else if (secondPhase) {
                const updatedCircuitInsulationTnsEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l2pe : l2pe.current.value,
                    l2n : l2n.current.value,
                    npe : npe.current.value,
                    ra : ra.current.value
                }
                if(isFieldValueCorrect(l2pe.current.value) && isFieldValueCorrect(l2n.current.value)
                    && isFieldValueCorrect(npe.current.value) && isFieldValueCorrect(ra.current.value)) {

                    updateEntryLogic(updatedCircuitInsulationTnsEntry)  
                    setEditEntryOn(false)  
                    setPhaseSelectorDisable(false)                  
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            } else if(thirdPhase) {
                const updatedCircuitInsulationTnsEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l3pe : l3pe.current.value,
                    l3n : l3n.current.value,
                    npe : npe.current.value,
                    ra : ra.current.value
                }
                if(isFieldValueCorrect(l3pe.current.value) && isFieldValueCorrect(l3n.current.value)
                    && isFieldValueCorrect(npe.current.value) && isFieldValueCorrect(ra.current.value)) {
                    
                    updateEntryLogic(updatedCircuitInsulationTnsEntry)  
                    setEditEntryOn(false)  
                    setPhaseSelectorDisable(false) 
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            }
        }
        if(discriminator == 2) {

            if(allPhases) {
                const updatedCircuitInsulationTncEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l1l2 : l1l2.current.value,
                    l2l3 : l2l3.current.value,
                    l3l1 : l3l1.current.value,
                    l1pen : l1pen.current.value,
                    l2pen : l2pen.current.value,
                    l3pen : l3pen.current.value,
                    ra : ra.current.value
                }
                if(isFieldValueCorrect(l1l2.current.value) && isFieldValueCorrect(l2l3.current.value) && isFieldValueCorrect(l3l1.current.value)
                && isFieldValueCorrect(l1pen.current.value) && isFieldValueCorrect(l2pen.current.value) && isFieldValueCorrect(l3pen.current.value) 
                && isFieldValueCorrect(ra.current.value)){
                
                    updateEntryLogic(updatedCircuitInsulationTncEntry)  
                    setEditEntryOn(false)    
                    setPhaseSelectorDisable(false)         
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            } else if(firstPhase) {
                const updatedCircuitInsulationTncEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l1pen : l1pen.current.value,
                    ra : ra.current.value
                }
                if(isFieldValueCorrect(l1pen.current.value) && isFieldValueCorrect(ra.current.value)){
                    updateEntryLogic(updatedCircuitInsulationTncEntry)  
                    setEditEntryOn(false)    
                    setPhaseSelectorDisable(false)           
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            } else if(secondPhase) {
                const updatedCircuitInsulationTncEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l2pen : l2pen.current.value,
                    ra : ra.current.value
                }
                if(isFieldValueCorrect(l2pen.current.value) && isFieldValueCorrect(ra.current.value)){
                    updateEntryLogic(updatedCircuitInsulationTncEntry)  
                    setEditEntryOn(false)    
                    setPhaseSelectorDisable(false)             
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            } else if(thirdPhase) {
                const updatedCircuitInsulationTncEntry = {
                    symbol: symbol.current.value,
                    circuitName : circuitName.current.value,
                    l3pen : l3pen.current.value,
                    ra : ra.current.value
                }
                if(isFieldValueCorrect(l3pen.current.value) && isFieldValueCorrect(ra.current.value)){
                    updateEntryLogic(updatedCircuitInsulationTncEntry)  
                    setEditEntryOn(false)    
                    setPhaseSelectorDisable(false)          
                } else {
                    showError('Wypełnij wszystkie pola.')
                }
            }
        }
        if(discriminator == 3) {
            const updatedResidualCurrentProtectionEntry = {
                symbol: symbol.current.value,
                measuringPoint : point.current.value,
                circuitBreaker : cutout.current.value,
                rcdType : type.current.value,
                iNom : iNom.current.value,
                ia : ia.current.value,
                ta : ta.current.value,
                trcd : trcd.current.value,
                ub : ub.current.value,
                ui : ui.current.value
            }
            if(cutout.current.value !== '' && type.current.value !== '' && isFieldValueCorrect(iNom.current.value) && isFieldValueCorrect(ia.current.value)
             && isFieldValueCorrect(ta.current.value) && isFieldValueCorrect(trcd.current.value) && isFieldValueCorrect(ub.current.value)
              && isFieldValueCorrect(ui.current.value)) {
            
                updateEntryLogic(updatedResidualCurrentProtectionEntry)  
                setEditEntryOn(false)    
                setPhaseSelectorDisable(false)          
            } else {
                showError('Wypełnij wszystkie pola.')
            }
        }
        if(discriminator == 4) {
            const updatedSoilResistanceEntry = {
                symbol : symbol.current.value,
                measuringPoint : point.current.value,
                l : lm.current.value,
                d : dm.current.value,
                p : p.current.value,
            }
            if(isFieldValueCorrect(lm.current.value) && isFieldValueCorrect(dm.current.value) && isFieldValueCorrect(p.current.value)) {
                updateEntryLogic(updatedSoilResistanceEntry)  
                setEditEntryOn(false)    
                setPhaseSelectorDisable(false)          
            } else {
                showError('Wypełnij wszystkie pola.')
            }
        }
        if(discriminator == 5) {
            const updatedContinuityOfSmallResistanceEntry = {
                symbol : symbol.current.value,
                continuity : continuity.current.value,
                rs : rs.current.value,
                ra : ra.current.value,
            }
            if(continuity.current.value !== '' && isFieldValueCorrect(rs.current.value) && isFieldValueCorrect(ra.current.value)) {
                updateEntryLogic(updatedContinuityOfSmallResistanceEntry)  
                setEditEntryOn(false)    
                setPhaseSelectorDisable(false)       
            } else {
                showError('Wypełnij wszystkie pola.')
            }
        }
    }
    function handleUpdateEntryBtn(entryId) {

        setEditEntryOn(true)
        main.measurementEntries.map(entry => {
            if(entry.id == entryId) {
                setEntryInEdit(entry)
                setUseRefsValues(entry)
            }
        } )
        console.log(entryInEdit)
    }
    function setUseRefsValues(entryToUpdate) {

        setPhaseOfEntryToEdit(entryToUpdate)
        setPhaseSelectorDisable(true)

        symbol.current.value = entryToUpdate.symbol
        if(discriminator == 0) {
            point.current.value = entryToUpdate.measuringPoint
            cutout.current.value = entryToUpdate.cutout
            type.current.value = entryToUpdate.type
            iNom.current.value = entryToUpdate.iNom
            zs.current.value = entryToUpdate.zs
        }
        if(discriminator == 1){
            circuitName.current.value = entryToUpdate.circuitName
            l1l2.current.value = entryToUpdate.l1l2
            l2l3.current.value = entryToUpdate.l2l3
            l3l1.current.value = entryToUpdate.l3l1
            l1pe.current.value = entryToUpdate.l1pe
            l2pe.current.value = entryToUpdate.l2pe
            l3pe.current.value = entryToUpdate.l3pe
            l1n.current.value = entryToUpdate.l1n
            l2n.current.value = entryToUpdate.l2n
            l3n.current.value = entryToUpdate.l3n
            npe.current.value = entryToUpdate.npe
            ra.current.value = entryToUpdate.ra
        }
        if(discriminator == 2){
            circuitName.current.value = entryToUpdate.circuitName
            l1l2.current.value = entryToUpdate.l1l2
            l2l3.current.value = entryToUpdate.l2l3
            l3l1.current.value = entryToUpdate.l3l1
            l1pen.current.value = entryToUpdate.l1pen
            l2pen.current.value = entryToUpdate.l2pen
            l3pen.current.value = entryToUpdate.l3pen
            ra.current.value = entryToUpdate.ra
        }
        if(discriminator == 3){
            point.current.value = entryToUpdate.measuringPoint
            cutout.current.value = entryToUpdate.circuitBreaker
            type.current.value = entryToUpdate.rcdType
            iNom.current.value = entryToUpdate.iNom
            ia.current.value = entryToUpdate.ia
            ta.current.value = entryToUpdate.ta
            trcd.current.value = entryToUpdate.trcd
            ub.current.value = entryToUpdate.ub
            ui.current.value = entryToUpdate.ui
        }
        if(discriminator == 4) {
            point.current.value = entryToUpdate.measuringPoint
            lm.current.value = entryToUpdate.l
            dm.current.value = entryToUpdate.d
            p.current.value = entryToUpdate.p
        }
        if(discriminator == 5) {
            continuity.current.value = entryToUpdate.continuity
            ra.current.value = entryToUpdate.ra
            rs.current.value = entryToUpdate.rs
        }
    
    }

    function setPhaseOfEntryToEdit(entryEditing) {

        if(entryEditing.l1l2 > 0){
            setFirstPhase(false)
            setSecondPhase(false)
            setThirdPhase(false)
            setAllPhases(true)
            phase.current.value = 4
        }
        if(entryEditing.l1l2 == '' && (entryEditing.l1n > 0 || entryEditing.l1pen > 0)){
            setFirstPhase(true)
            setSecondPhase(false)
            setThirdPhase(false)
            setAllPhases(false)
            phase.current.value = 1
        }
        if(entryEditing.l1l2 == '' && (entryEditing.l2n > 0 || entryEditing.l2pen > 0)){
            setFirstPhase(false)
            setSecondPhase(true)
            setThirdPhase(false)
            setAllPhases(false)
            phase.current.value = 2
        }
        if(entryEditing.l1l2 == '' && (entryEditing.l3n > 0 || entryEditing.l3pen > 0)){
            setFirstPhase(false)
            setSecondPhase(false)
            setThirdPhase(true)
            setAllPhases(false)
            phase.current.value = 3
        }
    }
    function handleDeleteAllEntriesBtn() {

        deleteAllEntriesApi(discriminator, main.id)
            .then(response => {
                setMessageVisible(false)
                console.log(response)
                setRender(render - 1)
            })
            .catch(error => console.log(error))
    }
    //btn to delete entry
    function deleteEntryButton(entryId) {
        return (
            <td><button className="btn btn-outline-dark btn-sm" onClick = {() => handleDeleteEntryBtn(entryId)}>Usuń</button></td>
        )
    }
    //btn to update entry
    function updateEntryButton(entryId) {
        return (
            <td><button className="btn btn-outline-dark btn-sm" onClick = {() => handleUpdateEntryBtn(entryId)}>Edytuj wpis</button></td>
        )
    }
    //btn to delete all entries
    function deleteAllEntriesButton() {
        return (
            (main!= null && main.measurementEntries!= null) &&
            <button className="btn btn-outline-dark" onClick = {handleDeleteAllEntriesBtn}>Usuń wszystkie wpisy</button>
        )
    }

    return (
        <div className="EditMeasurementComponent">

            <button className = "btn btn-outline-dark w-25 m-2" 
                onClick = {() => navigate(`/${projectName}/project/structure/rooms/${id}`)}>Wstecz
            </button>

        {/* add room name */}
            <h3>{main.measurementMainCascadeNameWithoutMeasurementName}</h3> 

            <div className="message">
                {messageVisible && message}
            </div>

        {/* Edit main  */}

            { (discriminator == 0) &&
                <table className="table">
                    <thead>
                        <tr>
                            <th>Un[V]</th>
                            <th>Ui[V]</th>
                            <th>Ko[V]</th>
                            <th>ta[ms]</th>
                            <th>Typ sieci[V]</th>
                            <th>Uo[V]</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><MainInput defaultValue={main.un} inputRef = {un} title = {main0TextPL[0]}/></td>
                            <td><MainInput defaultValue={main.ui} inputRef = {ui} title = {main0TextPL[1]}/></td>
                            <td><MainInput defaultValue={main.ko} inputRef = {ko}/></td>       
                            <td><MainInput defaultValue={main.ta}  inputRef = {ta}/></td>
                            <td><select className="form-select"  ref={networkType}>
                                    <option value = "TNS">TNS</option>
                                    <option value = "TNC">TNC</option>
                                    <option value = "TNC_S">TN-C-S</option>
                                </select>
                            </td>
                            <td><MainInput defaultValue={uoTest}  inputRef = {uo} title = {main0TextPL[2]}/></td>
                        </tr>
                    </tbody>
                </table>   
            }
            { (discriminator == 1 || discriminator == 2) &&
                <table className="table">
                    <thead>
                        <tr>
                            <th>Uiso[V]</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><MainInput defaultValue={main.uiso} inputRef={uiso}/></td>
                        </tr>
                    </tbody>
                </table>   
            }
            { (discriminator < 4) && // todo !
                <button className="btn btn-outline-dark m-1" onClick={handleUpdateMainBtn} disabled = {editEntryOn}>Aktualizuj pomiar</button>
            }
            {/* Add entry */}

            { (discriminator == 0) &&
                <table className="table">
                <thead>
                    <tr>
                        {entry0LabelsPL.map ( label => (<th>{label}</th> ) ) }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><EntryInputRef type = "text" inputRef = {symbol} size = {5} maxLength = {6}/></td>
                        <td className="col-md-2"><EntryInputRef type = "text" inputRef = {point} maxLength = {20}/></td>
                        <td><EntryInputRef type = "text" inputRef = {cutout} maxLength = {6} title = {entry0TextPL[0]}/></td>
                        <td className="col-md-1"><select className="form-select" ref={type}
                            data-toggle="tooltip" data-placement="top" title = {entry0TextPL[1]}>
                                    <option value = "B">B</option>
                                    <option value = "C">C</option>
                                    <option value = "D">D</option>
                            </select>
                        </td>
                        <td><EntryInputRef type = "number" inputRef = {iNom} title = {entry0TextPL[2]}/></td>
                        <td><EntryInputVal type = "text" disabled = {true} value = {entry.ia} title = {entry0TextPL[3]}/></td>
                        <td><EntryInputRef type = "number" inputRef = {zs} title = {entry0TextPL[4]}/></td>
                        <td><EntryInputVal type = "text" disabled = {true} value = {entry.za} title = {entry0TextPL[5]}/></td>
                        <td><EntryInputVal type = "text" disabled = {true} value = {entry.ik} title = {entry0TextPL[6]}/></td>
                        <td className="col-md-2"><EntryInputVal type = "text" disabled = {true} value = {handleResult(entry.result)} 
                            title = {entry0TextPL[7]}/></td>
                    </tr>
                </tbody>
            </table>
            }
            { (discriminator == 1) &&
            <div>
                <div className="col-2 m-1">
                <select className="form-select" disabled = {phaseSelectorDisable} onChange = {handlePhaseSelect} ref={phase}>
                                    <option value = '4'>Obwód 3 fazowy</option>
                                    <option value = '1'>Faza 1</option>
                                    <option value = '2'>Faza 2</option>
                                    <option value = '3'>Faza 3</option>
                </select>
                </div>
                <table className="table">
                <thead>
                    <tr>
                        {entry1LabelsPL.map ( label => (<th>{label}</th> ) ) }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="col-md-1"><EntryInputRef type = "text" maxLength = {6} inputRef = {symbol}/></td>
                        <td className="col-md-2"><EntryInputRef type = "text" maxLength = {20}  inputRef = {circuitName}/></td>
                        <td><EntryInputRef type = "number" inputRef = {l1l2} title = {entry1TextPL[0]} disabled = {!(allPhases)}/></td>
                        <td><EntryInputRef type = "number" inputRef = {l2l3} title = {entry1TextPL[1]} disabled = {!(allPhases)}/></td>
                        <td><EntryInputRef type = "number" inputRef = {l3l1} title = {entry1TextPL[2]} disabled = {!(allPhases)}/></td>
                        <td><EntryInputRef type = "number" inputRef = {l1pe} title = {entry1TextPL[3]} disabled = {!((firstPhase || allPhases))}/></td>
                        <td><EntryInputRef type = "number" inputRef = {l2pe} title = {entry1TextPL[4]} disabled = {!((secondPhase || allPhases))}/></td>
                        <td><EntryInputRef type = "number" inputRef = {l3pe} title = {entry1TextPL[5]} disabled = {!((thirdPhase || allPhases))}/></td>
                        <td><EntryInputRef type = "number" inputRef = {l1n} title = {entry1TextPL[6]} disabled = {!((firstPhase || allPhases))}/></td>
                        <td><EntryInputRef type = "number" inputRef = {l2n} title = {entry1TextPL[7]} disabled = {!((secondPhase || allPhases))}/></td>
                        <td><EntryInputRef type = "number" inputRef = {l3n} title = {entry1TextPL[8]} disabled = {!((thirdPhase || allPhases))}/></td>
                        <td><EntryInputRef type = "number" inputRef = {npe} title = {entry1TextPL[9]}/></td>
                        <td className="col-md-1"><EntryInputRef type = "number" inputRef = {ra} title = {entry1TextPL[10]}/></td>
                        <td className="col-md-1"><EntryInputVal type = "text" disabled = {true} value = {handleResult(entry.result)} title = {entry1TextPL[11]}/></td>
                    </tr>
                </tbody>
            </table>
            </div>
            }
            { (discriminator == 2) &&
            <div>
                <div className="col-2 m-1">
                <select className="form-select" onChange={handlePhaseSelect} ref={phase}>
                                    <option value = '4'>Obwód 3 fazowy</option>
                                    <option value = '1'>Faza 1</option>
                                    <option value = '2'>Faza 2</option>
                                    <option value = '3'>Faza 3</option>
                </select>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            {entry2LabelsPL.map ( label => (<th>{label}</th> ) ) }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="col-md-1"><EntryInputRef type = "text" size = {5} maxLength = {6} inputRef = {symbol}/></td>
                            <td className="col-md-2"><EntryInputRef type = "text" maxLength = {20}inputRef = {circuitName}/></td>
                            <td><EntryInputRef type = "number" inputRef = {l1l2} title = {entry2TextPL[0]} disabled = {!(allPhases)}/></td>
                            <td><EntryInputRef type = "number" inputRef = {l2l3} title = {entry2TextPL[1]} disabled = {!(allPhases)}/></td>
                            <td><EntryInputRef type = "number" inputRef = {l3l1} title = {entry2TextPL[2]} disabled = {!(allPhases)}/></td>
                            <td><EntryInputRef type = "number" inputRef = {l1pen} title = {entry2TextPL[3]} disabled = {!((firstPhase || allPhases))}/></td>
                            <td><EntryInputRef type = "number" inputRef = {l2pen} title = {entry2TextPL[4]} disabled = {!((secondPhase || allPhases))}/></td>
                            <td><EntryInputRef type = "number" inputRef = {l3pen} title = {entry2TextPL[5]} disabled = {!( (thirdPhase || allPhases))}/></td>
                            <td><EntryInputRef type = "number" inputRef = {ra} title = {entry2TextPL[6]}/></td>
                            <td><EntryInputVal type = "text" disabled = {true} value = {handleResult(entry.result)} title = {entry1TextPL[7]}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            }
            { (discriminator == 3) &&
                <table className="table">
                <thead>
                    <tr>
                        {entry3LabelsPL.map ( label => (<th>{label}</th> ) ) }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><EntryInputRef type = "text" size = {5} maxLength = {6} inputRef = {symbol}/></td>
                        <td className="col-md-2"><EntryInputRef type = "text" maxLength = {20} inputRef = {point}/></td>
                        <td><EntryInputRef type = "text" maxLength = {8} inputRef = {cutout}title = {entry3TextPL[0]}/></td>
                        <td className="col-md-1"><select className="form-select" ref={type}
                            data-toggle="tooltip" data-placement="top" title = {entry3TextPL[1]}>
                                    <option value = '[AC]'>[AC]</option>
                                    <option value = '[A]'>[A]</option>
                                    <option value = '[B]'>[B]</option>
                            </select>
                        </td>
                        <td><EntryInputRef type = "number" inputRef = {iNom} title = {entry3TextPL[2]}/></td>
                        <td><EntryInputRef type = "number" inputRef = {ia}  title = {entry3TextPL[3]}/></td>
                        <td><EntryInputRef type = "number" inputRef = {ta}  title = {entry3TextPL[4]}/></td>
                        <td><EntryInputRef type = "number" inputRef = {trcd} title = {entry3TextPL[5]}/></td>
                        <td><EntryInputRef type = "number" inputRef = {ub}  title = {entry3TextPL[6]}/></td>
                        <td><EntryInputRef type = "number" inputRef = {ui}  title = {entry3TextPL[7]}/></td>
                        <td><EntryInputVal type = "text" disabled = {true} value = {handleResult(entry.result)} title = {entry3TextPL[8]}/></td>
                    </tr>
                </tbody>
            </table>
            }
            { (discriminator == 4) &&
                <table className="table">
                <thead>
                    <tr>
                        {entry4LabelsPL.map ( label => (<th>{label}</th> ) ) }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><EntryInputRef type = "text" size = {5} maxLength = {6} inputRef = {symbol}/></td>
                        <td className="col-md-2"><EntryInputRef type = "text" maxLength = {20} inputRef = {point}/></td>
                        <td><EntryInputRef type = "number" inputRef = {lm} title = {entry4TextPL[0]}/></td>
                        <td><EntryInputRef type = "number" inputRef = {dm} title = {entry4TextPL[1]}/></td>
                        <td><EntryInputRef type = "number" inputRef = {p} title = {entry4TextPL[2]}/></td>
                    </tr>
                </tbody>
            </table>
            }
            { (discriminator == 5) &&
                <table className="table">
                <thead>
                    <tr>
                        {entry5LabelsPL.map ( label => (<th>{label}</th> ) ) }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><EntryInputRef type = "text" size = {5} maxLength = {6} inputRef = {symbol}/></td>
                        <td><select className="form-select" ref={continuity}>
                                    <option value = 'PRESERVED'>Zachowana</option>
                                    <option value = 'NOTPRESERVED'>Niezachowana</option>
                            </select>
                        </td>
                        <td><EntryInputRef type = "number" inputRef = {rs} title = {entry5TextPL[0]}/></td>
                        <td><EntryInputRef type = "number" inputRef = {ra} title = {entry5TextPL[1]}/></td>
                        <td><EntryInputVal type = "text" disabled = {true} value = {handleResult(entry.result)} title = {entry5TextPL[2]}/></td>
                    </tr>
                </tbody>
            </table>
            }
            <button className="btn btn-dark" disabled = {entriesMax || editEntryOn} onClick={handleAddEntryBtn}>Dodaj wpis do pomiaru</button> 
            <button className="btn btn-dark m-2" disabled = {!editEntryOn} onClick={handleUpdateEntrySaveBtn}>Aktualizuj wpis</button>
            <button className="btn btn-dark m-2" disabled = {!editEntryOn} onClick={() => {setEditEntryOn(false); setPhaseSelectorDisable(false)}}>Anuluj</button>
            <hr></hr>

            {/* view entry */}

            { (discriminator == 0) &&
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Lp.</th>
                            {entry0LabelsPL.map ( label => (<th>{label}</th> ) ) }
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        main?.measurementEntries?.map (
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.measuringPoint}</td>
                                    <td>{entry.cutout}</td>
                                    <td>{entry.type}</td>
                                    <td>{entry.iNom}</td>
                                    <td>{entry.ia}</td>
                                    <td>{entry.zs}</td>
                                    <td>{entry.za}</td>
                                    <td>{entry.ik}</td>
                                    <td>{handleResult(entry.result)}</td>
                                    {deleteEntryButton(entry.id)}
                                    {updateEntryButton(entry.id)}
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            { (discriminator == 1) &&
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Lp.</th>
                        {entry1LabelsPL.map ( label => (<th>{label}</th> ) ) }
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        main?.measurementEntries?.map (
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.circuitName}</td>
                                    <td>{(entry.l1l2) != 0 && entry.l1l2}</td>
                                    <td>{(entry.l2l3) != 0 && entry.l2l3}</td>
                                    <td>{(entry.l3l1) != 0 && entry.l3l1}</td>
                                    <td>{(entry.l1pe) != 0 && entry.l1pe}</td>
                                    <td>{(entry.l2pe) != 0 && entry.l2pe}</td>
                                    <td>{(entry.l3pe) != 0 && entry.l3pe}</td>
                                    <td>{(entry.l1n) != 0 && entry.l1n}</td>
                                    <td>{(entry.l2n) != 0 && entry.l2n}</td>
                                    <td>{(entry.l3n) != 0 && entry.l3n}</td>
                                    <td>{entry.npe}</td>
                                    <td>{entry.ra}</td>
                                    <td>{handleResult(entry.result)}</td>
                                    {deleteEntryButton(entry.id)}
                                    {updateEntryButton(entry.id)}
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            { (discriminator == 2) &&
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Lp.</th>
                        {entry2LabelsPL.map ( label => (<th>{label}</th> ) ) }
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        main?.measurementEntries?.map (
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.circuitName}</td>
                                    <td>{(entry.l1l2) != 0 && entry.l1l2}</td>
                                    <td>{(entry.l2l3) != 0 && entry.l2l3}</td>
                                    <td>{(entry.l3l1) != 0 && entry.l3l1}</td>
                                    <td>{(entry.l1pen) != 0 && entry.l1pen}</td>
                                    <td>{(entry.l2pen) != 0 && entry.l2pen}</td>
                                    <td>{(entry.l3pen) != 0 && entry.l3pen}</td>
                                    <td>{entry.ra}</td>
                                    <td>{handleResult(entry.result)}</td>
                                    {deleteEntryButton(entry.id)}
                                    {updateEntryButton(entry.id)}
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            { (discriminator == 3) &&
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Lp.</th>
                        {entry3LabelsPL.map ( label => (<th>{label}</th> ) ) }
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        main?.measurementEntries?.map (
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.measuringPoint}</td>
                                    <td>{entry.circuitBreaker}</td>
                                    <td>{entry.rcdType}</td>
                                    <td>{entry.iNom}</td>
                                    <td>{entry.ia}</td>
                                    <td>{entry.ta}</td>
                                    <td>{entry.trcd}</td>
                                    <td>{entry.ub}</td>
                                    <td>{entry.ui}</td>
                                    <td>{handleResult(entry.result)}</td>
                                    {deleteEntryButton(entry.id)}
                                    {updateEntryButton(entry.id)}
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            { (discriminator == 4) &&
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Lp.</th>
                        {entry4LabelsPL.map ( label => (<th>{label}</th> ) ) }
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        main?.measurementEntries?.map (
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.symbol}</td>
                                    <td>{entry.measuringPoint}</td>
                                    <td>{entry.l}</td>
                                    <td>{entry.d}</td>
                                    <td>{entry.p}</td>
                                    {deleteEntryButton(entry.id)}
                                    {updateEntryButton(entry.id)}
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            { (discriminator == 5) &&
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Lp.</th>
                        {entry5LabelsPL.map ( label => (<th>{label}</th> ) ) }
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        main?.measurementEntries?.map (
                            (entry, index) => (
                                <tr key={entry.id}>
                                    <td>{index + 1}</td>
                                    <td>{entry.symbol}</td>
                                    <td>{handleContinuity(entry.continuity)}</td>
                                    <td>{entry.rs}</td>
                                    <td>{entry.ra}</td>
                                    <td>{handleResult(entry.result)}</td>
                                    {deleteEntryButton(entry.id)}
                                    {updateEntryButton(entry.id)}
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            }
            {deleteAllEntriesButton()}
        </div>
    )
}
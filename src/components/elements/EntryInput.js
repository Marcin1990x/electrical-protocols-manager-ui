import React from "react";

const EntryInput  = ({type, disabled, inputRef, title, size, maxLength, viewValue}) => {
    return (
        <input type = {type} className = "form-control" size = {size} maxLength = {maxLength} disabled = {disabled} ref = {inputRef} 
            data-toggle = "tooltip" data-placement = "top" title = {title} value = {viewValue}/>
    )
}
export default EntryInput;
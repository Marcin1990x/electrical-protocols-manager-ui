import React from "react";

export const EntryInputRef  = ({defaultValue, type, disabled, inputRef, title, size, maxLength}) => {
    return (
        <input type = {type} defaultValue={defaultValue} className = "form-control" size = {size} maxLength = {maxLength} disabled = {disabled} ref = {inputRef} 
            data-toggle = "tooltip" data-placement = "top" title = {title}/>
    )
}
export const EntryInputVal  = ({type, disabled, title, size, maxLength, value}) => {
    return (
        <input type = {type} className = "form-control" size = {size} maxLength = {maxLength} disabled = {disabled} 
            data-toggle = "tooltip" data-placement = "top" title = {title} value = {value}/>
    )
}
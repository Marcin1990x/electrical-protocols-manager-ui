import React from "react";

const MainInput  = ({defaultValue, disabled, inputRef, title}) => {

    return (
        <input type = "number" defaultValue={defaultValue} className = "form-control" disabled = {disabled} ref={inputRef}
            data-toggle = "tooltip" data-placement = "top" title = {title}/>
    )
}
export default MainInput;
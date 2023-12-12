import React from "react";

const MainInput  = ({disabled, inputRef, title}) => {

    return (
        <input type = "number" className = "form-control" disabled = {disabled} ref={inputRef}
            data-toggle = "tooltip" data-placement = "top" title = {title}/>
    )
}
export default MainInput;
import React from "react"
import classNames from "classnames"

import { iTextarea } from "../../interfaces/atoms"

import { useInput } from "../Input/hook"

import '../Input/index.scss'
import './index.scss'

export const Textarea = ({ label, name, customClass, fieldError = false, rows = 3, cols, resize = false}: iTextarea) => {
    const {
        value,
        hasError,
        changeValue,
        handleKeyUp,
    } = useInput(fieldError, "textarea")

    return (
    <>
        <div className={classNames("textarea-container", "input-container", customClass)}>
            <textarea 
                rows={rows}
                cols={cols}
                value={value}
                onKeyUp={handleKeyUp}
                onChange={changeValue}
                name={name} 
                id={`textarea-${name}`}
                className={classNames("textarea", "input", { filled: !!value, error: hasError, "no-resize": !resize})} 
            />
            
            {label && <label className="label" htmlFor={`textarea-${name}`}>{label}</label>}
        </div>
    </>
)}
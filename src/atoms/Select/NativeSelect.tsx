import React, { useId } from "react"
import classNames from "classnames"
import { iNativeSelect } from "../../interfaces/atoms"
import "./index.scss"

export const NativeSelect = ({ label, options, fieldError, id, className, ...props }: iNativeSelect) => {
    const generatedId = useId()
    const inputId = id || generatedId

    return (
        <div className="input-container">
            <select {...props} id={inputId} aria-invalid={fieldError} className={classNames("input", "select", "filled", className, { error: fieldError })}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {label && <label className="label" htmlFor={inputId}>{label}</label>}
        </div>
    )
}

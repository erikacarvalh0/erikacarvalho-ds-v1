import React, { useId } from "react"
import classNames from "classnames"
import { iNativeInput } from "../../interfaces/atoms"
import "./index.scss"

export const NativeInput = ({ label, fieldError, id, className, ...props }: iNativeInput) => {
    const generatedId = useId()
    const inputId = id || generatedId

    return (
        <div className="input-container">
            <input {...props} id={inputId} aria-invalid={fieldError} className={classNames("input", "filled", className, { error: fieldError })} />
            {label && <label className="label" htmlFor={inputId}>{label}</label>}
        </div>
    )
}

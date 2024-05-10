import React from "react"
import classNames from "classnames"

import { iSelectOptions } from "../../../interfaces/atoms"

import './index.scss'

export const SelectOptions = ({ optionsRef, showOptions, onClick, onMouseEnter, selectedOption, options, hasError }: iSelectOptions) => {
    return (showOptions) 
    ? ( <ul ref={optionsRef} className={classNames("option__container", { "has-focus": selectedOption > -1 })} onMouseEnter={onMouseEnter}>
            { hasError && <li className="option disabled">Não existe a opção desejada</li>}
            { !hasError && options.map((option: string, index: number) =>  (
                <li 
                    role="button"
                    onClick={onClick}
                    className={classNames("option", {
                        "focus": selectedOption === index, 
                        // "has-pointer": 
                    })} 
                    key={`option-${index}`}
                >
                    {option}
                </li>
            ))}
        </ul> )
    : <></>
}
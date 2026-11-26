import React from "react"
import classNames from "classnames"

import { iSelect } from "../../interfaces/atoms"

import { SelectOptions } from "./SelectOptions"
import { useSelect } from "./hook"

import './index.scss'

export const Select = ({ label, name, customClass, options, fieldError = false}: iSelect) => {
    const {
        randId,
        optionsRef,
        filteredOptions,
        value,
        showOptions,
        hasError,
        selectedOption,
        changeValue,
        handleClickOption,
        handleClickClose,
        handleKeyUp,
        handleMouseContainer,
        handleShowOptions
    } = useSelect(fieldError, options)

    return (
    <>
        <div className={classNames("input-container", customClass, {"top-element": showOptions})}>
            <input 
                value={value}
                onKeyUp={handleKeyUp}
                onChange={changeValue}
                type="text" 
                onClick={handleShowOptions}
                name={name} 
                id={`input-${name}-${randId}`}
                className={classNames("input", "select", { filled: !!value, error: hasError})} 
            />
            
            {label && <label className="label" htmlFor={`input-${name}-${randId}`}>{label}</label>}
            
            { showOptions && 
                <SelectOptions 
                    options={filteredOptions}
                    optionsRef={optionsRef}
                    onClick={handleClickOption}
                    onMouseEnter={handleMouseContainer}
                    selectedOption={selectedOption}
                    hasError={hasError}
                    showOptions={showOptions}

                />
            }

            <button type="button" className={classNames("input__btn-select", { "open": showOptions})} aria-expanded={showOptions} aria-label="Alterar visibilidade das opções" onClick={handleShowOptions}>
            </button>
        </div>

        { showOptions &&  <div onClick={handleClickClose} className="option__bg"></div> }
    </>
)}
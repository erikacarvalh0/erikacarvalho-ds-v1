import React, { useState } from "react"
import classNames from "classnames"

import { iSelect } from "../../interfaces/atoms"

import { SelectOptions } from "./SelectOptions"
import { useSelect } from "./hook"

import './index.scss'

export const Select = ({ label, name, customClass, options, fieldError = false, defaultValue = '', isRequired = false, onValueChange}: iSelect) => {
    const entries = options.map(option => typeof option === 'string' ? { value: option, label: option } : option)
    const [selectedValue, setSelectedValue] = useState(defaultValue)
    const usesIdentifiers = options.some(option => typeof option !== 'string')

    function handleSelection(label: string) {
        const nextValue = entries.find(option => option.label === label)?.value ?? ''
        setSelectedValue(nextValue)
        onValueChange?.(nextValue)
    }

    const {
        handleBlur,
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
    } = useSelect(fieldError, entries.map(option => option.label), entries.find(option => option.value === defaultValue)?.label, handleSelection, isRequired)

    return (
    <>
        <div className={classNames("input-container", customClass, {"top-element": showOptions})}>
            <input 
                value={value}
                onKeyUp={handleKeyUp}
                onBlur={handleBlur}
                onChange={changeValue}
                type="text" 
                onClick={handleShowOptions}
                name={usesIdentifiers ? undefined : name}
                aria-required={isRequired}
                aria-invalid={hasError} 
                id={`input-${name}-${randId}`}
                className={classNames("input", "select", { filled: !!value, error: hasError})} 
            />
            
            {usesIdentifiers && <input type="hidden" name={name} value={selectedValue} />}
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
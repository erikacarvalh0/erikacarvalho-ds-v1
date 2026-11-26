import React from "react"
import classNames from "classnames"

import { iInput } from "../../interfaces/atoms"

import { Eye, EyeClosed } from "../Icons"
import { List } from "../List"

import { EmailDomains } from "./EmailDomains"
import { useInput } from "./hook"

import './index.scss'

export const Input = ({ preventValidation, handleOnChange, label, type = "text", name, customClass, rules, isRequired = false , fieldError = false, formValuesState, defaultValue, validate, onValueChange}: iInput) => {
    const {
        validationMessage,
        inputId,
        domainsRef,
        typeState,
        value,
        isEmail,
        isPassword,
        isPasswordVisible,
        showDomains,
        hasError,
        selectedDomain,
        passwordRulesStatus,
        changeValue,
        handleClickDomain,
        closeDomainList,
        handleKeyUp,
        handleMouseContainer,
        handlePasswordType,
        handleBlur
    } = useInput(fieldError, type, rules, name, formValuesState, handleOnChange, preventValidation, defaultValue, validate, onValueChange, isRequired)

    const showDomainsElements = isEmail && showDomains && hasError;

    return (
    <>
        <div className={classNames("input-container", customClass, {"top-element": showDomainsElements})}>
            <input 
                value={value}
                onKeyUp={handleKeyUp}
                onChange={changeValue}
                onBlur={handleBlur}
                type={typeState} 
                name={name} 
                id={inputId}
                required={isRequired}
                aria-invalid={hasError}
                aria-describedby={validationMessage ? `${inputId}-error` : undefined}
                className={classNames("input", type, { filled: !!value, error: hasError})} 
            />
            
            {validationMessage && <span id={`${inputId}-error`} role="alert">{validationMessage}</span>}
            {label && <label className="label" htmlFor={inputId}>{label}</label>}
            
            { showDomainsElements && 
                <EmailDomains 
                    domainsRef={domainsRef}
                    onClick={handleClickDomain}
                    onMouseEnter={handleMouseContainer}
                    selectedDomain={selectedDomain}
                    hasError={hasError}
                    showDomains={showDomains}

                />
            }

            { isPassword && <button className="input__btn-password" aria-label="Alterar visibilidade da senha" onClick={handlePasswordType}>
              { value.length > 0 && (isPasswordVisible
                ?  <Eye />
                : <EyeClosed />)
              } 
            </button>}
        </div>

        { isPassword && rules && 
            <List items={rules} status={passwordRulesStatus} validateError={!!value.length} />
        }

        { showDomainsElements &&  <div onClick={closeDomainList} className="domain__bg"></div> }
    </>
)}
import React from "react"
import classNames from "classnames"

import { iInput } from "../../interfaces/atoms"

import { EmailDomains } from "./EmailDomains"
import { useInput } from "./hook"

import './index.scss'
import { Eye, EyeClosed } from "../Icons"

export const Input = ({ label, type, name, customClass, fieldError = false}: iInput) => {
    const {
        domainsRef,
        typeState,
        value,
        isEmail,
        isPassword,
        isPasswordVisible,
        showDomains,
        hasError,
        selectedDomain,
        changeValue,
        handleClickDomain,
        closeDomainList,
        handleKeyUp,
        handleMouseContainer,
        handlePasswordType
    } = useInput(fieldError, type)

    const showDomainsElements = isEmail && showDomains && hasError;

    return (
    <>
        <div className={classNames("input-container", customClass, {"top-element": showDomainsElements})}>
            <input 
                value={value}
                onKeyUp={handleKeyUp}
                onChange={changeValue}
                type={typeState} 
                name={name} 
                id={`input-${name}`}
                className={classNames("input", type, { filled: !!value, error: hasError})} 
            />
            
            {label && <label className="label" htmlFor="input-text">{label}</label>}
            
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

        { showDomainsElements &&  <div onClick={closeDomainList} className="domain__bg"></div> }
    </>
)}
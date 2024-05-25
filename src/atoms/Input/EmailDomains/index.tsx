import React from "react"
import classNames from "classnames"

import { iEmailDomains } from "../../../interfaces/atoms"
import { emailDomains } from "../../../data/emailDomains"

import './index.scss'

export const EmailDomains = ({ domainsRef, showDomains, hasError, onClick, onMouseEnter, selectedDomain }: iEmailDomains) => {
    return (showDomains && hasError) 
    ? ( <ul ref={domainsRef} className={classNames("domain__container", { "has-focus": selectedDomain > -1 })} onMouseEnter={onMouseEnter}>
            { emailDomains.map((domain: string, index: number) =>  (
                <li 
                    role="button"
                    onClick={onClick}
                    className={classNames("domain", {
                        "focus": selectedDomain === index
                    })} 
                    key={`domain-${index}`}
                >
                    {domain}
                </li>
            ))}
        </ul> )
    : <></>
}
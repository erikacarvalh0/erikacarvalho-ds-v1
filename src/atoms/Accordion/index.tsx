import React from "react"
import classNames from "classnames"

import { iAccordion } from "../../interfaces/atoms"

import './index.scss'

export const Accordion = ({ title, children, hasArrow, acqua, pink, size } : iAccordion) => {
    const randId = Math.floor(Math.random() * 10)
    return (
        <div className="accordion">
            <input type="checkbox" id={`accordion-btn-${randId}`} role="button"  />
            <label className={classNames("accordion__label", size, {"has-arrow": hasArrow, acqua, pink})} htmlFor={`accordion-btn-${randId}`}>
                {title}
            </label>
            <div className="accordion__item">
                {children}
            </div>
        </div>
)}
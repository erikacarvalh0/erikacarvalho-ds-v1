import React from "react"
import classNames from "classnames"

import { iAccordion } from "../../interfaces/atoms"

import './index.scss'

export const Accordion = ({ title, children, hasArrow, acqua, pink } : iAccordion) => {
    return (
        <div className="accordion">
            <input type="checkbox" id="accordion-btn" role="button"  />
            <label className={classNames("accordion__label", {"has-arrow": hasArrow, acqua: acqua, pink: pink,})} htmlFor="accordion-btn">
                {title}
            </label>
            <div className="accordion__item">
                {children}
            </div>
        </div>
)}
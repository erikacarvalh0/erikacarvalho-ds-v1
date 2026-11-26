import React, { useId } from "react"
import classNames from "classnames"

import { iAccordion } from "../../interfaces/atoms"

import './index.scss'

export const Accordion = ({ title, children, hasArrow, acqua, pink, size, defaultOpen = false } : iAccordion) => {
    const id = useId()

    return (
        <div className="accordion">
            <input type="checkbox" id={id} role="button" defaultChecked={defaultOpen} />
            <label className={classNames("accordion__label", size, {"has-arrow": hasArrow, acqua, pink})} htmlFor={id}>
                {title}
            </label>
            <div className="accordion__item">
                {children}
            </div>
        </div>
    )
}

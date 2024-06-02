import React from "react"
import classNames from "classnames"

import { iTooltip } from "../../interfaces/atoms"

import './index.scss'

export const Tooltip = ({ children, customClass, highlight, closeOnClick, ...props } : iTooltip) => {
    return (<>
        <div className={classNames("tooltip", customClass, { highlight })} {...props}>
            { children }
        </div>
       {closeOnClick && <div onClick={closeOnClick} className="tooltip__bg"></div>}
    </>
)}
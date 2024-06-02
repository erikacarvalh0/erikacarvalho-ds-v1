import React from "react"
import './index.scss'
import { iButton } from "../../interfaces/atoms"
import classNames from "classnames"

export const Button =({action, isDisabled = false, title, text, theme, children, customClass}: iButton) => (
    <button
        disabled={isDisabled}
        onClick={action}
        title={text || title}
        className={classNames("button", theme, customClass, {"no-hover": children})}
    >
        {text}
        {children}
    </button>
)
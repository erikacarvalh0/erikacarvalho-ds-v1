import React from "react"
import './index.scss'
import { iButton } from "../../interfaces/atoms"
import classNames from "classnames"

export const Button =({action, isDisabled = false, title, text, theme, children, customClass, type}: iButton) => (
    <button
        type={type}
        disabled={isDisabled}
        onClick={action}
        title={text || title}
        className={classNames("button", theme, customClass)}
    >
        {text}
        {children}
    </button>
)
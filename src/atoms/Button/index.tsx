import React from "react"
import './index.scss'
import { iButton } from "../../interfaces/atoms"
import classNames from "classnames"

export const Button =({action, isDisabled = false, text, theme = "neutral", children, customClass}: iButton) => (
    <button
        disabled={isDisabled}
        onClick={action}
        title={text}
        className={classNames("button", theme, customClass, {"no-hover": children})}
    >
        {text}
        {children}
    </button>
)
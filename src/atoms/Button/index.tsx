import React from "react"
import './index.scss'
import { iButton } from "../../interfaces/atoms"
import classNames from "classnames"

export const Button =({action, text, theme = "neutral", children, customClass}: iButton) => (
    <button onClick={action} className={classNames("buttom", theme, customClass, {"no-hover": children})}>
        {text}
        {children}
    </button>
)
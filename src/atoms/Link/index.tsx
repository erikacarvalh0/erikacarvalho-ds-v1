import React from "react"
import './index.scss'
import { iLink } from "../../interfaces/atoms"
import classNames from "classnames"

export const Link =({href, target, text, theme = "default", children}: iLink) => (
    <a className={classNames("link", theme, {"no-hover": children})} href={href} target={target} title={text}>
        {text}
        {children}
    </a>
)
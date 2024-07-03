import React from "react"
import './index.scss'
import { iLink } from "../../interfaces/atoms"
import classNames from "classnames"

export const Link =({href, target, text, theme = "default", children, routerContext}: iLink) => {
    const linkProps = {
        className: classNames("link", theme, {"no-hover": children}),
        title: text
    }

    const LinkChildren = () => (<>
        {!children && text}
        {children}
    </>)

    return (
        routerContext 
        ? <button onClick={() => routerContext(href)} aria-roledescription="link" {...linkProps} >
            <LinkChildren />
        </button>
        : <a href={href} target={target} {...linkProps}>
            <LinkChildren />
        </a>
)}
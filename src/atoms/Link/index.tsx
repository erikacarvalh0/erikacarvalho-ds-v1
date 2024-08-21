import React from "react"
import classNames from "classnames"
import { iLink } from "../../interfaces/atoms"
import './index.scss'

export const Link =({href, target, text, theme = "default", children, routerContext}: iLink) => {
    const linkProps = {
        className: classNames("link", theme, {"no-hover": children}),
        title: text
    }

    const LinkChildren = () => (<>
        {!children && text}
        {children}
    </>)

    const isExternal = href.includes('http')

    return (
        routerContext && !isExternal
        ? <button onClick={() => routerContext(href)} aria-roledescription="link" {...linkProps} >
            <LinkChildren />
        </button>
        : <a href={href} target={target} {...linkProps}>
            <LinkChildren />
        </a>
)}
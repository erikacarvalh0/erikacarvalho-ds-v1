import React from "react"
import classNames from "classnames"
import { iLink } from "../../interfaces/atoms"
import './index.scss'

export const Link =({href, target, text, theme = "default", children, routerContext, customClass, preserveHover = false, ...props}: iLink) => {
    const linkProps = {
        className: classNames("link", theme, customClass, {"no-hover": children && !preserveHover}),
        title: text
    }

    const LinkChildren = () => (<>
        {!children && text}
        {children}
    </>)

    const isExternal = href.includes('http')

    return (
        routerContext && !isExternal
        ? <button type="button" onClick={() => routerContext(href)} aria-roledescription="link" {...linkProps} {...props}>
            <LinkChildren />
        </button>
        : <a href={href} target={target} {...linkProps} {...props}>
            <LinkChildren />
        </a>
)}
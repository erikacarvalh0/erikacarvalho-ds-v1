import React from "react"
import { Link } from "../../../atoms/Link"
import type { iHeaderLinks } from "../../../interfaces/organisms"

interface HeaderMenuItemProps {
    item: iHeaderLinks
    routerContext: (href: string) => void
    onFocus: () => void
}

export function HeaderMenuItem({ item, routerContext, onFocus }: HeaderMenuItemProps) {
    const { text, href, target, icon, isActive } = item
    return (
        <li className="header__menu-item">
            <Link
                onFocus={onFocus}
                routerContext={routerContext}
                theme="light"
                customClass="header__menu-link"
                href={href}
                target={target}
                text={text}
                aria-current={isActive ? "page" : undefined}
                preserveHover
            >
                {icon != null ? <><span className="header__item-icon" aria-hidden="true">{icon}</span><span>{text}</span></> : undefined}
            </Link>
        </li>
    )
}

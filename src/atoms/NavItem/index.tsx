import React, { ReactNode } from "react"
import classNames from "classnames"
import "./index.scss"

type CommonProps = { label: string; icon?: ReactNode; active?: boolean; customClass?: string }
export type NavItemProps = CommonProps & (
    { href: string; onClick?: never } |
    { href?: never; onClick: () => void }
)

export const NavItem = ({ label, icon, active = false, customClass, href, onClick }: NavItemProps) => {
    const itemClass = classNames("nav-item", customClass, { "nav-item--active": active })
    const content = <>
        {icon && <span className="nav-item__icon" aria-hidden="true">{icon}</span>}
        <span className="nav-item__label">{label}</span>
    </>
    return href !== undefined
        ? <a className={itemClass} href={href} aria-current={active ? "page" : undefined}>{content}</a>
        : <button className={itemClass} type="button" onClick={onClick}>{content}</button>
}

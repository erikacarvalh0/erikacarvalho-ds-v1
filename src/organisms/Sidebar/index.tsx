import React, { ReactNode } from "react"
import { NavItem, NavItemProps } from "../../atoms/NavItem"
import "./index.scss"

export interface SidebarProps {
    brand: ReactNode
    items: NavItemProps[]
    footerItems?: NavItemProps[]
    navigationLabel: string
    footer?: ReactNode
}

export const Sidebar = ({ brand, items, footerItems = [], navigationLabel, footer }: SidebarProps) => (
    <aside className="sidebar">
        <div className="sidebar__brand">{brand}</div>
        <nav aria-label={navigationLabel} className="sidebar__navigation">
            <ul className="sidebar__list">
                {items.map(item => <li key={item.label}><NavItem {...item} /></li>)}
            </ul>
            <ul className="sidebar__list sidebar__list--footer">
                {footerItems.map(item => <li key={item.label}><NavItem {...item} /></li>)}
            </ul>
        </nav>
        {footer && <div className="sidebar__footer">{footer}</div>}
    </aside>
)

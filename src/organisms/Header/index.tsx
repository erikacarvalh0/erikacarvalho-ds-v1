import React, { useId } from "react"
import { Dialog } from "../../molecules/Dialog"
import { Logo, Menu } from "../../atoms/Icons"

import { useHeader } from  './hook'
import './index.scss'
import { iHeader } from "../../interfaces/organisms"
import { Link } from "../../atoms/Link"
import { HeaderMenuItem } from "./HeaderMenuItem"

export const Header = ({ title, content, links, routerContext, isFixed, logo, logoHref, footerLinks, footerContent }: iHeader) => {
	const { isHome, isOpen, isMenuOpen, toggleDialog, onChangeMenu, openMenu, inputRef, closeMenu } = useHeader();
	const menuId = useId()
    const fixedClass = isFixed ? "header--fixed" : ""

    return (
		<header onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) closeMenu() }} data-component className={`header ${fixedClass}`}>
			<nav className="header__nav">
				<label className="header__nav-icon" htmlFor={menuId}>
					<Menu className="header__image" aria-label="Menu icon" />
					<div className="header__hamburguer"  aria-hidden></div>
				</label>
				<input ref={inputRef} onChange={onChangeMenu} type="checkbox" id={menuId} className="header__toggle" role="button" aria-label="Menu" aria-expanded={isMenuOpen}  />
				
				<ul data-js="menu" className={`header__menu${footerLinks?.length || footerContent != null ? " header__menu--with-footer" : ""}`} >
					<label htmlFor={menuId} data-js="closeMenu" className="header__menu-button">
						<Menu className="header__menu-icon" />
					</label>
					{links?.map(item => (
                        <HeaderMenuItem key={item.href} item={item} routerContext={routerContext} onFocus={openMenu} />
                    ))}
                    {(footerLinks?.length || footerContent != null) ? (
                        <li className="header__footer">
                            {footerLinks?.length ? (
                                <ul className="header__footer-links">
                                    {footerLinks.map(item => (
                                        <HeaderMenuItem key={item.href} item={item} routerContext={routerContext} onFocus={openMenu} />
                                    ))}
                                </ul>
                            ) : null}
                            {footerContent != null && <div className="header__footer-content">{footerContent}</div>}
                        </li>
                    ) : null}
                    { content && 
						<button onClick={toggleDialog} className="header__info" data-js="showInfo"> 
							<span>i</span> 
							{ title }
						</button>
					}
				</ul>
		
				<Dialog title={title} content={content} isOpen={isOpen} toggleDialog={toggleDialog} />
			</nav>

			{(logo != null || isFixed || !isHome) &&
				<Link href={logoHref ?? "https://erikacarvalho.dev"} routerContext={routerContext} customClass="header__brand">
					{logo ?? <Logo className="header__image" />}
				</Link>
			}
		</header>
        
    )
}
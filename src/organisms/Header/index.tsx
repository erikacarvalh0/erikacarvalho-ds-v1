import React from "react"
import { Dialog } from "../../molecules/Dialog"
import { Logo, Menu } from "../../atoms/Icons"

import { useHeader } from  './hook'
import './index.scss'
import { iHeader, iHeaderLinks } from "../../interfaces/organisms"
import { Link } from "../../atoms/Link"

export const Header = ({ title, content, links }: iHeader) => {
	const { isHome, isOpen, toggleDialog } = useHeader();

    return (
		<header data-component className="header">
			<nav className="header__nav">
                <label  className="header__nav-icon" htmlFor="menu-btn">
                    <Menu className="header__image" />
                    <div className="header__hamburguer"></div>
                </label>
                <input type="checkbox" id="menu-btn" role="button"  />
				
				<ul data-js="menu" className="header__menu">
					<label htmlFor="menu-btn" data-js="closeMenu" className="header__menu-button">
						<Menu className="header__menu-icon" />
					</label>
					{ links?.map(({ text, href, target}: iHeaderLinks, index: number) => (
						<li key={index} className="header__menu-item">
							<Link theme="light" customClass="header__menu-link" href={href} target={target} text={text} />
						</li>
					)) }
					{ content && 
						<button onClick={toggleDialog} className="header__info" data-js="showInfo"> 
							<span>i</span> 
							{ title }
						</button>
					}
				</ul>
		
				<Dialog title={title} content={content} isOpen={isOpen} toggleDialog={toggleDialog} />
            </nav>

			{!isHome &&
				<Link href="https://erikacarvalho.dev">
					<Logo className="header__image" />
				</Link>
			}
		</header>
        
    )
}
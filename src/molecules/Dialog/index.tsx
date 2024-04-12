import React from "react"
import classnames from "classnames"

import { iContentDialog, iDialog } from "../../interfaces/molecules"

import { useDialog } from "./hook"
import "./index.scss"
import { isObject } from "../../utils/isObject"


export const Dialog = ({ isOpen, toggleDialog, theme = 'default', icon, title, content, message }: iDialog) => {
	const { dialogRef, closeDialog, mustHide, themeTitle, themeText } = useDialog({ isOpen, toggleDialog })
    
	return (
		<dialog ref={dialogRef} className={classnames("dialog", { hide: mustHide, [theme]: theme})}>
			<button onClick={closeDialog} className="dialog__close" data-js="hideInfo"></button>
			<header className="dialog__header">
				{ icon }
				<h2 className="dialog__title">{title || themeTitle[theme]}</h2>
			</header>

			<section className="dialog__body">
				{ !content && !message && 
					<p className="dialog__text">
						{ themeText[theme] }
					</p>
				}

				{ message && 
					<p className="dialog__text">
						{ message }
					</p>
				}

				{ content?.map(({ highlight, text, href, target, button}: iContentDialog) => (
					<>
						<p className="dialog__text">
							{highlight && <strong>{highlight}</strong>}
							{ href && <a href={href} target={target}>{text}</a>}
							{ !href && text}
						</p>
						{button && <a href={button.href}>{button.text}</a>}
					</>
				)) }
			</section>	
		</dialog>
    )
}
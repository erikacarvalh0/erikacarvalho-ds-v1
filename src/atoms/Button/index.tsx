import React from "react"
import './index.scss'
import { iButton } from "../../interfaces/atoms"
import classNames from "classnames"

export type ButtonProps = iButton & {
    rounded?: boolean
    outline?: boolean
    icon?: React.ReactNode
    iconPosition?: 'start' | 'end'
    ariaLabel?: string
}

export const Button = ({action, isDisabled = false, title, text, theme, children, customClass, type, rounded = false, outline = false, icon, iconPosition = 'start', ariaLabel}: ButtonProps) => {
    const iconElement = icon == null ? null : <span className="button__icon" aria-hidden="true">{icon}</span>
    return (
        <button
            type={type}
            disabled={isDisabled}
            onClick={action}
            title={text || title}
            aria-label={ariaLabel || (!text && !children ? title : undefined)}
            className={classNames("button", theme, customClass, {
                "button--rounded": rounded,
                "button--outline": outline,
                "button--with-icon": iconElement !== null,
                "button--icon-only": iconElement !== null && !text && !children
            })}
        >
            {iconPosition === 'start' && iconElement}
            {text}
            {children}
            {iconPosition === 'end' && iconElement}
        </button>
    )
}

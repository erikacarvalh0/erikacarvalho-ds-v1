import React, { ReactElement, useState, useRef, useEffect } from "react"
import classNames from "classnames"
import { Button } from "../../atoms/Button"
import { iForm } from "../../interfaces/molecules"

import "./index.scss"

export const Form = ({ children, handleSubmit, buttonText = "Enviar", customClass }: iForm) => {
    const formValuesState = useState({})
    const formRef = useRef<HTMLFormElement>(null)
    const [isDisabled, setIsDisabled] = useState(true)

    function updateAvailability() {
        const fields = Array.from(formRef.current?.querySelectorAll<HTMLInputElement>('input:not([type="hidden"])') ?? [])
        setIsDisabled(fields.some(field => ((field.required || field.getAttribute('aria-required') === 'true') && !field.value.trim()) || field.classList.contains('error') || field.getAttribute('aria-invalid') === 'true'))
    }

    useEffect(() => {
        const form = formRef.current
        if (!form) return
        const observer = new MutationObserver(updateAvailability)
        observer.observe(form, { subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'aria-invalid', 'required', 'aria-required'] })
        updateAvailability()
        return () => observer.disconnect()
    }, [])

    function decorateChildren(nodes: React.ReactNode): React.ReactNode {
        return React.Children.map(nodes, child => {
            if (!React.isValidElement(child)) return child

            const element = child as ReactElement<any>
            const props = element.props
            const nested = props.children ? { children: decorateChildren(props.children) } : {}

            if (typeof element.type === 'string') {
                return React.cloneElement(element, nested)
            }

            return React.cloneElement(element, {
                ...nested,
                ...(props.name ? { formValuesState, fieldError: props.fieldError } : {})
            })
        })
    }

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const form = event.currentTarget
        const values: Record<string, string> = {}
        new FormData(form).forEach((value, name) => {
            if (typeof value === 'string') values[name] = value
        })

        if (isDisabled) return

        handleSubmit?.(values)
    }


    return (
        <form ref={formRef} className={classNames("form", customClass)} noValidate onSubmit={onSubmit} onChange={updateAvailability} onBlur={updateAvailability}>
            {decorateChildren(children)}
            <Button isDisabled={isDisabled} theme="cta" type="submit" action={() => {}}>{buttonText}</Button>
        </form>
    )
}

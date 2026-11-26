import React, { ReactElement, useState } from "react"
import classNames from "classnames"
import { Button } from "../../atoms/Button"
import { iForm } from "../../interfaces/molecules"

import "./index.scss"

export const Form = ({ children, handleSubmit, buttonText = "Enviar", customClass, validate, onValidationError }: iForm) => {
    const formValuesState = useState({})
    const [errors, setErrors] = useState<Record<string, string | undefined>>({})

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
                ...(props.name ? { formValuesState, fieldError: !!errors[props.name] || props.fieldError } : {})
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

        const nextErrors = { ...validate?.(values) }
        const fields = Array.from(form.querySelectorAll<HTMLInputElement>('input:not([type="hidden"])'))

        fields.forEach(field => {
            const name = field.name || field.id
            if ((field.required || field.getAttribute('aria-required') === 'true') && !field.value.trim()) {
                nextErrors[name] = 'Campo obrigatório'
            } else if (field.classList.contains('error') || field.getAttribute('aria-invalid') === 'true') {
                nextErrors[name] = 'Campo inválido'
            }
        })

        setErrors(nextErrors)

        if (Object.values(nextErrors).some(Boolean)) {
            onValidationError?.(nextErrors)
            return
        }

        handleSubmit?.(values)
    }

    function clearErrors() {
        if (Object.keys(errors).length) setErrors({})
    }

    return (
        <form className={classNames("form", customClass)} noValidate onSubmit={onSubmit} onChange={clearErrors}>
            {decorateChildren(children)}
            <Button theme="cta" type="submit" action={() => {}}>{buttonText}</Button>
        </form>
    )
}

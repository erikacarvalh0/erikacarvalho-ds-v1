import React, { ReactElement, useEffect, useRef, useState } from "react"

import { Button } from "../../atoms/Button"
import { iForm } from "../../interfaces/molecules"

import "./index.scss"
import { ReactNode } from "../../interfaces/atoms"

export const Form = ({ children, handleSubmit, buttonText = "Enviar" }: iForm) => {
	const formRef = useRef<HTMLFormElement>(null)
	const formValuesState = useState({}) // TODO: [REFACTOR] create a context for forms
	const [ requiredInputs, setRequiredInputs ] = useState<HTMLInputElement[]>([])

	const [ isDisabled, setIsDisabled ] = useState(true)

	useEffect(() => {
		const formChildren = formRef?.current ? formRef?.current.querySelectorAll('.input-container') : []
		const formInputs = Array.from(formChildren).reduce((reqInputs: HTMLInputElement[], inputContainer: HTMLInputElement) => {
			const currentInput = inputContainer.querySelector('input')
			const isRequired = inputContainer.querySelector('input')?.hasAttribute('required')

			return isRequired 
				? [...reqInputs, currentInput]
				: [reqInputs]
		}, [])

		setRequiredInputs(formInputs)
	}, [])

	useEffect(() => {
		if (requiredInputs.length > 0) {
			Array.from(requiredInputs)
				.map((input: HTMLInputElement) => input?.addEventListener('keyup', handleRequiredChange))
		}
	}, [ requiredInputs ])

	const handleRequiredChange = () => {
		const isAllFilled = Array.from(requiredInputs)
			.every((input: HTMLInputElement) => input?.value && !input.classList.contains('error'))
		
		setIsDisabled(!isAllFilled)
	}

	const onSubmit = (e: Event) => {
		e.preventDefault()

		if (handleSubmit) {
			handleSubmit(formValuesState[0])
		}
	}

    return (
		<form ref={formRef} className="form">
			{ React.Children.map(children, (child: ReactElement, index: number) => {
                return (React.cloneElement(child, {
                    index,
                    formValuesState
                }))
			})
			}
			<Button isDisabled={isDisabled} theme="cta" type="submit" action={ onSubmit }> { buttonText } </Button>
		</form>
    )
}
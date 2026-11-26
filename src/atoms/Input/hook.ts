import { useEffect, useRef, useState } from "react"

import { getRandomNumber } from "../../utils/randomNumber"
import { emailDomains } from "../../data/emailDomains"
import { iObject } from "../../interfaces/atoms"

interface iRule { rule: (param:number | string) => string }

export const useInput = (fieldError: boolean, type: string, rules?: any[], name?: string, formValuesState?: any, handleOnChange?: any, preventValidation?: boolean) => {
    const [ showDomains, setShowDomains ] = useState(false)
    const [ value, setValue ] = useState('')
    const [ typeState, setTypeState ] = useState(type)
    const [ selectedDomain, setSelectedDomain ] = useState(-1)
    const [ hasError, setHasError ] = useState(fieldError)
    const passwordStatusControl : iObject = {}
    const [ passwordRulesStatus, setPasswordRulesStatus] = useState(passwordStatusControl)
    const domainsRef = useRef<HTMLElement>(null)

    const [ randId ] = useState(getRandomNumber())
    const inputId = `input-${name}-${randId}`
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const isEmail = type === "email"
    const isPassword = type === "password"
    const [isPasswordVisible, setIsPasswordVisible] = useState(false) 

    useEffect(() => {
        if (formValuesState) {
            const [ formValues, setFormValues ] = formValuesState
            
            setFormValues({
                ...formValues,
                [inputId]: value
            })
        }
    }, [value])


    const changeValue = (e: any) => {
        const currentValue = e.target.value
        
        setValue(currentValue)

        if (handleOnChange) {
            handleOnChange(e, setValue)
        }

        if (!preventValidation) {
            checkFields(e.target)
            
            setTimeout(() => {
                checkFields(e.target)
                checkRequired(e.target)
            }, 1000)
        }
    }

    const checkFields = (target: HTMLInputElement, isBlur?: boolean) => {
        const currentValue = target.value

        switch(type) {
            case "email": {
                checkEmail(currentValue, isBlur)
                break;
            }
            case "text": {
                checkText(currentValue)
                break;
            }
            case "password": {
                checkPassword(currentValue, isBlur)
                break;
            }
        }
    }

    const checkPassword = (currentValue: string, isBlur?: boolean) => {
        if(rules) {
            rules.map(({ rule } : iRule, index) => {
                passwordStatusControl[index] = !!rule(currentValue)
                setPasswordRulesStatus(passwordStatusControl)
            })
            const passwordHasError = !Object.values(passwordStatusControl).every(ruleStatus => ruleStatus)
            setHasError(passwordHasError)
        } else if (isBlur) {
            setHasError(false)
        }
    }

    const checkText = (currentValue: string) => {
        setHasError(currentValue.length < 2)
    }

    const checkEmail = (currentValue: string, isBlur?: boolean) => {
        if(currentValue?.includes('@')) {
            setShowDomains(true)
            
            if(emailRegex.test(currentValue)) {
                setHasError(false)
            } else {
                setHasError(true)
            }
        } else if (isBlur) {
            setHasError(true)
        } else {
            setShowDomains(false)
        }
    }

    const checkRequired = (target: HTMLInputElement) => {
        const currentValue = target.value

        if (target.hasAttribute('required') && !currentValue) {
            setHasError(true)
        }
    }

    const closeDomainList = () => {
        setShowDomains(false)
        setSelectedDomain(-1)
    }

    const scrollElementToView = (pressedDown: boolean, pressedUp: boolean) => {
        const domainsList = domainsRef?.current

        if( domainsList && selectedDomain > -1) {
            const listPosition = domainsList.getBoundingClientRect()
            const formParentTop = domainsList?.closest('form')?.parentElement?.getBoundingClientRect().top || 0
    
            const domainsElms = domainsList?.children
            const currentDomainElm = domainsElms[selectedDomain]
            const currentDomainPosition = currentDomainElm.getBoundingClientRect()
            const currentDomainBottom = currentDomainPosition.bottom + currentDomainPosition.height
            const currentDomainTop = currentDomainPosition.top + currentDomainPosition.height

            const upPosition = currentDomainPosition.height + listPosition.top + 2

            if (pressedDown && currentDomainBottom > listPosition.bottom){
                scrollElement(currentDomainElm, formParentTop)
            }

            if (pressedUp && currentDomainTop < upPosition){
                const previousDomainElm = domainsElms[selectedDomain - 1 ] || currentDomainElm
                scrollElement(previousDomainElm, formParentTop)
            } 
        }
    }

    const scrollElement = (elm: Element, top: number) => {
        elm.scrollIntoView()
        window.scrollTo(top, 0)
    }

    const handleDomainSelection = (selectedDomain: string) => {
        const [ newEmail ] = value.split('@')
        const newValue = `${newEmail}@${selectedDomain}`
        setValue(newValue)
        checkEmail(newValue)
        closeDomainList()
    }

    const handleMouseContainer = () => {
        setSelectedDomain(-1);
    }

    const handleClickDomain = (e: any) => {
        const selectedDomain = e.target.innerText
        handleDomainSelection(selectedDomain)
    }

    const handleKeyUp = (e: any) => {
        const pressedUp = e.keyCode === 38
        const pressedDown = e.keyCode === 40
        const pressedEnter = e.keyCode === 13
        const pressedEsc = e.keyCode === 27
        
        if ((pressedUp || pressedDown) && selectedDomain === -1) {
            setSelectedDomain(0)
            return
        }

        if (pressedUp && selectedDomain > 0) {
            setSelectedDomain(selectedDomain - 1)
        }
        
        if (pressedDown && selectedDomain < emailDomains.length - 1) {
            setSelectedDomain(selectedDomain + 1)
        }

        if (pressedEnter && selectedDomain > -1) {
            handleDomainSelection(emailDomains[selectedDomain])
        }

        if(selectedDomain >= emailDomains.length) {
            setSelectedDomain(emailDomains.length - 1)
        }

        if (pressedEsc) {
            closeDomainList()
        }

        if (selectedDomain > -1 && selectedDomain < emailDomains.length) {
            scrollElementToView(pressedDown, pressedUp)
        }
    }

    const handlePasswordType = () => {
        if (typeState === type) {
            setTypeState('text')
            setIsPasswordVisible(true)
        } else {
            setIsPasswordVisible(false)
            setTypeState(type)
        }
    }

    const handleBlur = ({ target }: { target: HTMLInputElement}) => {
        checkRequired(target)

        if (value) {
            checkFields(target, true)
        }
    }

    return {
        inputId,
        domainsRef,
        typeState,
        value,
        isEmail,
        isPassword,
        isPasswordVisible,
        showDomains,
        hasError,
        selectedDomain,
        passwordRulesStatus,
        changeValue,
        handleClickDomain,
        closeDomainList,
        handleKeyUp,
        handleMouseContainer,
        handlePasswordType,
        handleBlur
    }
}
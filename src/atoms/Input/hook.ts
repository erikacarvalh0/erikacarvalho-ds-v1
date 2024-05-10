import { useRef, useState } from "react"
import { emailDomains } from "../../data/emailDomains"
import { iObject } from "../../interfaces/atoms"

export const useInput = (fieldError: boolean, type: string, rules?: iObject[]) => {
    const [ showDomains, setShowDomains ] = useState(false)
    const [ value, setValue ] = useState('')
    const [ typeState, setTypeState ] = useState(type)
    const [ selectedDomain, setSelectedDomain ] = useState(-1)
    const [ hasError, setHasError ] = useState(fieldError)
    const passwordStatusControl = {}
    const [ passwordRulesStatus, setPasswordRulesStatus] = useState(passwordStatusControl)
    const domainsRef = useRef(null)

    const randId = Math.random()
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const isEmail = type === "email"
    const isPassword = type === "password"
    const [isPasswordVisible, setIsPasswordVisible] = useState(false) 

    const changeValue = (e: any) => {
        const currentValue = e.target.value
        
        setValue(currentValue)

        switch(type) {
            case "email": {
                checkEmail(currentValue)
                break;
            }
            case "text": {
                checkText(currentValue)
                break;
            }
            case "password": {
                checkPassword(currentValue)
                break;
            }
        }
    }

    const checkPassword = (currentValue: string) => {
        if(rules) {
            rules.map(({text, rule} : iObject, index) => {
                passwordStatusControl[index] = !!rule(currentValue)
                setPasswordRulesStatus(passwordStatusControl)
            })
            const passwordHasError = !Object.values(passwordStatusControl).every(ruleStatus => ruleStatus)
            setHasError(passwordHasError)
        }
    }

    const checkText = (currentValue: string) => {
        setHasError(currentValue.length < 2)
    }

    const checkEmail = (currentValue: string) => {
        if(currentValue?.includes('@')) {
            setShowDomains(true)
            
            if(emailRegex.test(currentValue)) {
                setHasError(false)
            } else {
                setHasError(true)
            }
        }
    }

    const closeDomainList = () => {
        setShowDomains(false)
        setSelectedDomain(-1)
    }

    const scrollElementToView = (pressedDown: boolean, pressedUp: boolean) => {
        if( domainsRef?.current && selectedDomain > -1) {
            const listPosition = domainsRef?.current.getBoundingClientRect()

            const domainsElms = domainsRef?.current?.children
            const currentDomainElm = domainsElms[selectedDomain]
            const currentDomainPosition = currentDomainElm.getBoundingClientRect()
            const currentDomainBottom = currentDomainPosition.bottom + currentDomainPosition.height
            const currentDomainTop = currentDomainPosition.top + currentDomainPosition.height

            const upPosition = currentDomainPosition.height + listPosition.top + 2

            if (pressedDown && currentDomainBottom > listPosition.bottom){
                currentDomainElm.scrollIntoView()
                
            }

            if (pressedUp && currentDomainTop < upPosition){
                const previousDomainElm = domainsElms[selectedDomain - 1 ] || currentDomainElm
                previousDomainElm.scrollIntoView()
            } 
        }
    }

    const handleDomainSelection = (selectedDomain: string) => {
        const [ newEmail ] = value.split('@')
        setValue(`${newEmail}@${selectedDomain}`)
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
    return {
        randId,
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
        handlePasswordType
    }
}
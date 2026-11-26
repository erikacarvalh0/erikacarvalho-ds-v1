import * as React from "react"
import { useRef, useState } from "react"

// Runtime peers are React 18/19; legacy build declarations still target React 17.
const { useId } = React as typeof React & { useId: () => string }



export const useSelect = (fieldError: boolean, options: string[], initialLabel = '', onSelection?: (label: string) => void, isRequired = false) => {
    const [ showOptions, setShowOptions ] = useState(false)
    const [ value, setValue ] = useState(initialLabel)
    const [ selectedOption, setSelectedOption ] = useState(-1)
    const [ hasError, setHasError ] = useState(fieldError)
    const optionsRef = useRef<HTMLElement>(null)
    const [ filteredOptions, setFilteredOptions ] = useState(options)

    const randId = useId()

    const changeValue = (e: any) => {
        const currentValue = e.target.value
        setValue(currentValue)
        onSelection?.(options.includes(currentValue) ? currentValue : '')
    }


    const closeOptionList = (index: number) => {
        const hasOnlyOneChoice = filteredOptions.length === 1 && filteredOptions[0].toLowerCase() === value.toLocaleLowerCase()
        const hasValue = options.findIndex(option => option === value)
        
        if (hasOnlyOneChoice) {
            setValue(filteredOptions[0])
        } else if (index < 0 && hasValue < 0) {
            setValue('')
        }

        setFilteredOptions(options)
        setShowOptions(false)
        setSelectedOption(-1)

        if (hasOnlyOneChoice) onSelection?.(filteredOptions[0])
        else if (index < 0 && hasValue < 0) onSelection?.('')
    }

    const handleClickClose = () => {
        closeOptionList(-1)
    }

    const scrollElementToView = (pressedDown: boolean, pressedUp: boolean) => {
        if( optionsRef?.current && selectedOption > -1) {
            const listPosition = optionsRef?.current ? optionsRef?.current.getBoundingClientRect() : { top: -1, bottom: -1}

            if (listPosition?.top > -1 ) {
                const optionsElms = optionsRef?.current?.children
                const currentOptionElm = optionsElms[selectedOption]
                if (!currentOptionElm) return
                const currentOptionPosition = currentOptionElm.getBoundingClientRect()
                const currentOptionBottom = currentOptionPosition.bottom + currentOptionPosition.height
                const currentOptionTop = currentOptionPosition.top + currentOptionPosition.height
    
                const upPosition = currentOptionPosition.height + listPosition.top + 2
    
                if (pressedDown && currentOptionBottom > listPosition.bottom){
                    currentOptionElm.scrollIntoView()
                    
                }
    
                if (pressedUp && currentOptionTop < upPosition){
                    const previousOptionElm = optionsElms[selectedOption - 1 ] || currentOptionElm
                    previousOptionElm.scrollIntoView()
                } 
            }
        }
    }

    const handleOptionSelection = (selectedOption: string) => {
        const index = filteredOptions.findIndex(option => option === selectedOption)

        setValue(selectedOption)
        onSelection?.(selectedOption)
        closeOptionList(index)
    }

    const handleMouseContainer = () => {
        setSelectedOption(-1);
    }

    const handleClickOption = (e: any) => {
        const selectedOption = e.target.innerText
        handleOptionSelection(selectedOption)
    }

    const searchOption = () => {
        if (value) {
            const newOptions = options.filter(option => option.toLowerCase().includes(value.toLowerCase()))

            if (newOptions.length <= 0) {
                setFilteredOptions(options)
            } else {
                setFilteredOptions(newOptions)
            }
        } 
        
        if (!value) {
            setFilteredOptions(options)
        }
    }

    const handleKeyUp = (e: any) => {
        const pressedUp = e.keyCode === 38
        const pressedDown = e.keyCode === 40
        const pressedEnter = e.keyCode === 13
        const pressedEsc = e.keyCode === 27
        
        if ((pressedUp || pressedDown) && selectedOption === -1) {
            setSelectedOption(0)
            return
        }

        if (pressedUp && selectedOption > 0) {
            setSelectedOption(selectedOption - 1)
        }
        
        if (pressedDown && selectedOption < filteredOptions.length - 1) {
            setSelectedOption(selectedOption + 1)
        }

        if (pressedEnter && selectedOption > -1 && selectedOption < filteredOptions.length) {
            handleOptionSelection(filteredOptions[selectedOption])
        }

        if(selectedOption >= filteredOptions.length) {
            setSelectedOption(filteredOptions.length - 1)
        }

        if (pressedEsc) {
            handleClickClose()
        }

        if (selectedOption > -1 && selectedOption < filteredOptions.length && filteredOptions.length > 1) {
            scrollElementToView(pressedDown, pressedUp)
        }

        if (!pressedUp && !pressedDown && !pressedEnter && !pressedEsc) {
            searchOption()
        }
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
        const currentValue = event.currentTarget.value
        setHasError((isRequired && !currentValue.trim()) || (!!currentValue && !options.includes(currentValue)))
    }

    const handleShowOptions = () => { 
        setShowOptions(true)
    }

    return {
        handleBlur,
        randId,
        optionsRef,
        filteredOptions,
        value,
        showOptions,
        hasError,
        selectedOption,
        changeValue,
        handleClickOption,
        handleClickClose,
        handleKeyUp,
        handleMouseContainer,
        handleShowOptions
    }
}
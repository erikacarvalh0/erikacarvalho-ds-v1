import { useEffect, useRef, useState } from "react"

import { getRandomNumber } from "../../utils/randomNumber"

export const useTab = () => {
    const randId = getRandomNumber()
    const tabsContentRef = useRef<HTMLElement>(null)
    const [ activeId, setActiveId ] = useState('tab-0')
    const [ maxHeight, setMaxHeight ] = useState(0)

    const setContentHeight = (activeId: string) => {
        const itemIndex = Number(activeId.split('-')[1])
        const activeContent = tabsContentRef?.current?.children?.[itemIndex]
        const activeContentHeight = activeContent?.clientHeight ?? 0

        setMaxHeight(activeContentHeight)
    }

    const onChange = ({ target } : { target: any}) => {
        const activeId = target.getAttribute('id')
        setContentHeight(activeId)
        setActiveId(activeId)
    }

    const onPressEnter = (target: any) => {
        const activeId = target.getAttribute('id')
        setContentHeight(activeId)
        setActiveId(activeId)
    }

    const onChangeContent = () => {
        const initialHeight = maxHeight
        const initialActive = activeId
        let intervalCounter = 0
        
        const heightInterval = setInterval(() => {
            if (initialActive !== activeId) clearInterval(heightInterval)
            setContentHeight(activeId)

            if (maxHeight === initialHeight) {
                intervalCounter++

                if (intervalCounter >= 25) {
                    clearInterval(heightInterval)
                }
            } else {
                intervalCounter = 0
            }
        }, 10)
    }

    useEffect(() => {
        setContentHeight(activeId)
    }, [])

    return {
        randId,
        tabsContentRef,
        maxHeight,
        activeId,
        onChange,
        onChangeContent,
        onPressEnter
    }
}
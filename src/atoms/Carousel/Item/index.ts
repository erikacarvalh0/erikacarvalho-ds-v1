import React, { useContext, useEffect, useRef } from "react"

import { getRandomNumber } from "../../../utils/randomNumber"
import { CarouselContext } from "../hook"

export const CItem = ({ children }) => {
    const { config, childrenArr, activeItem, isPrevious } = useContext(CarouselContext)
    const itemRef = useRef(null)

    const currentIndex = childrenArr.findIndex((childArr) => childArr.props.children === children)
    const isActive = isPrevious ? currentIndex === activeItem - 1 : currentIndex === activeItem
    const isLastItem = currentIndex === childrenArr.length - 1  && activeItem === children.length
    const isFirstItem = currentIndex === 0 && activeItem === 0
    
    const { itemsPerPage } = config
    const itemWidth = 100 / itemsPerPage
    
    const randId = getRandomNumber()

    useEffect(() => {
        if (isActive || isLastItem || isFirstItem) {
            itemRef.current.scrollIntoView()
        }
    }, [])

    return (<li ref={itemRef} style={{ minWidth: `${itemWidth}%` }} className={classNames("carousel__item", { 'active': isActive})} key={randId}>
            { children }
    </li>)
}
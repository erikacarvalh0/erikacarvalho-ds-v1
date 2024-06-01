import { Children, createContext, useState } from "react"

export const CarouselContext = createContext({})

export const useCarousel = (config, children) => {
    const { itemsPerPage } = config
    const childrenArr = Children.toArray(children)
    const [ activeItem, setActiveItem ] = useState(0)
    const [ isPrevious, setIsPrevious ] = useState(false)
    const [ activeIndex, setActiveIndex ] = useState(0)
    const context = { config, activeItem, childrenArr, isPrevious  }

    const dotsAmount = Math.ceil(childrenArr.length / itemsPerPage)

    const handleNext = () => {
        if (activeItem === 0) {
            handleDot(1)
        } else if (activeItem >= childrenArr.length - 1) {
            handleDot(0)
        } else {
            handleDot(Math.ceil(activeItem / itemsPerPage))
        }
    }

    const handlePrevious = () => {
        const previousPage = Math.floor(activeItem / itemsPerPage) - 1

        if (previousPage <= - 1) {
            handleDot(dotsAmount - 1)
        } else {
            handleDot(Math.floor(activeItem / itemsPerPage) - 1)
        }
    }

    const handleDot = (index) => {
        const goToItem = itemsPerPage === 1 || index === 0
            ? index 
            : (2 * index) + 1

        setIsPrevious(goToItem < activeItem)
        setActiveItem(goToItem)
        setActiveIndex(index)
    }

    return {
        dotsAmount,
        activeIndex,
        context,
        handleNext,
        handlePrevious,
        handleDot,
    }
}
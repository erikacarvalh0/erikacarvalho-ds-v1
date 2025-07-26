import { Children, useRef, useState } from "react"
import { iCarousel } from "../../interfaces/molecules"

export const useCarousel = ({ children, config } : iCarousel) => {
    const carouselRef = useRef<HTMLParagraphElement | null>(null)
    const childrenArr = Children.toArray(children)

    const visibleItemsState = useState(childrenArr)

    const defaultPaginationConfig = {
        maxPagesNums: 4,
        itemsPerPage: 3,
        arrows: true,
        dots: true,
    }

    const currPaginationConfig = {
        ...defaultPaginationConfig, 
        ...config?.pagination
    }
    
    return {
        currPaginationConfig,
        childrenArr,
        visibleItemsState,
        carouselRef,
    }
}
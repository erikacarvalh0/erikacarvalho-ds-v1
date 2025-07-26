import React, { useRef } from "react"
import classNames from "classnames"

import { getRandomNumber } from "../../utils/randomNumber"

import { iCompChildren } from "../../interfaces/atoms"
import { iCarousel } from "../../interfaces/molecules"

import { Pagination } from "../../atoms/Pagination"

import { useCarousel } from "./hook"
import './index.scss'

export const CItem = ({ children } : iCompChildren) => {
    const itemRef = useRef<HTMLLIElement | null>(null)
    const randId = getRandomNumber()
    
    return (<li 
        ref={itemRef}
        className={classNames("carousel__item", { 'active': false})} 
        key={randId}>
            { children }
    </li>)
}

export const Carousel = ({ children, config, title }: iCarousel) => {
    const {
        currPaginationConfig,
        childrenArr,
        visibleItemsState,
        carouselRef,
    } = useCarousel({ children , config })

    const [ visibleItems ] = visibleItemsState

     return (
        <section ref={carouselRef} className="carousel__container">
            { title && <p className="carousel__title">{title}</p>}
            <ul style={{ gap: config?.gap }} className="carousel">
                { visibleItems }
            </ul>
            <Pagination 
                allItems={childrenArr} 
                config={currPaginationConfig} 
                visibleItemsState={visibleItemsState}
            />
        </section>
    )
}
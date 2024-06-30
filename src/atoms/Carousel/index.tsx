import React, { useContext, useEffect, useRef } from "react"
import classNames from "classnames"

import { getRandomNumber } from "../../utils/randomNumber"
import { ReactNode, iCarousel, iCompChildren } from "../../interfaces/atoms"

import { Button } from "../Button"
import { CarouselContext, useCarousel } from "./hook"
import './index.scss'


export const CItem = ({ children } : iCompChildren) => {
    const { config, childrenArr, activeItem, isPrevious } = useContext(CarouselContext)
    const itemRef = useRef<HTMLElement>(null)

    const currentIndex = childrenArr?.findIndex((childArr: ReactNode) => childArr?.props?.children === children)
    const isActive = isPrevious ? currentIndex === activeItem - 1 : currentIndex === activeItem
    const isLastItem = currentIndex === childrenArr?.length - 1  && activeItem === children?.length
    const isFirstItem = currentIndex === 0 && activeItem === 0
    
    const { itemsPerPage } = config || {}
    const itemWidth = 100 / ( itemsPerPage || 1 )
    
    const randId = getRandomNumber()

    useEffect(() => {
        if (itemRef?.current && (isActive || isLastItem || isFirstItem)) {
            itemRef?.current?.scrollIntoView()
        }
    }, [])

    return (<li 
        ref={itemRef}
        // style={{ minWidth: `${itemWidth}%` }}
        className={classNames("carousel__item", { 'active': isActive})} 
        key={randId}>
            { children }
    </li>)
}

export const Carousel = ({ children, config, title }: iCarousel) => {
    const {
        dotsAmount,
        activeIndex,
        context,
        handleNext,
        handlePrevious,
        handleDot,
    } = useCarousel(config, children)

     return (<CarouselContext.Provider value={context}>
        <section className="carousel__container">
            { title && <p className="carousel__title">{title}</p>}
            <ul style={{ gap: config?.gap }} className="carousel">
                {children}
            </ul>
            {dotsAmount > 1 && <footer className="carousel__footer">
                <Button customClass="carousel__btn carousel__btn-previous" action={handlePrevious} />
                { config.dots && Array.from(Array(dotsAmount)).map((_, index) => 
                    <Button key={index} customClass={classNames("carousel__btn", "carousel__btn-dot", {  'active': activeIndex === index})} action={() => handleDot(index)} />
                )}
                <Button customClass="carousel__btn carousel__btn-next" action={handleNext} />
            </footer>}
        </section>
     </CarouselContext.Provider>
)}
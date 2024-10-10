import {  useEffect, useState } from "react"
import { createArray } from "../../utils/createArray"
import { iPagination } from "../../interfaces/atoms"

export const usePagination = ({ config, allItems, visibleItemsState }: iPagination) => {
    const { itemsPerPage, maxPagesNums } = config
    const maxPagesNumsDefault = maxPagesNums || 0
    const maxPages = Math.ceil(allItems.length / itemsPerPage)
    const minPagesNums = 3
    const childrenArr = allItems
    const [ , setVisibleItems ] = visibleItemsState

    const [ pagesNums, setPagesNums ] = useState(createArray(maxPagesNumsDefault))
    const [ activePage, setActivePage ] = useState(1)
    const [ isLastPage, setIsLastPage ] = useState(false)
    const [ hasNext, setHasNext ] = useState(true)
    const [ hasPrevious, setHasPrevious ] = useState(false)

    const context = { config, activePage, childrenArr  }
    
    useEffect(() => {
        if (maxPagesNumsDefault <= minPagesNums) {
            setPagesNums(createArray(minPagesNums))
        }

        setVisibleItems(allItems.slice(0, itemsPerPage))
    }, [])

    const handlePagesNums = (index: number) => {
        const isNext = index > activePage 
        const pagesAround = Math.floor(maxPagesNumsDefault / 2)
        const isOdd = maxPagesNumsDefault % 2 == 0
        const isFirsts = isNext ? index <= pagesAround + 1 : index <= pagesAround
        const isLasts = isOdd 
            ?  index > maxPages - (pagesAround - 1) 
            : index > maxPages - pagesAround

        if (!isFirsts && !isLasts) {
            if (isNext) {
                setPagesNums(pagesNums.map(num => num + 1))
            } 
        }
        
        if (!isLastPage && !isNext && !isFirsts) {
            setPagesNums(pagesNums.map(num => num - 1))
        }
     }

    const handleNext = () => {
        if (config.return && isLastPage) {
            handlePageItems(0)
        } else if(!isLastPage) {
            handlePageItems(activePage + 1)
        } else {
            setHasNext(false)
        }

        setHasPrevious(true)
    }

    const handlePrevious = () => {
        if (activePage > 1) {
            handlePageItems(activePage - 1)
        }
        
        setHasNext(true)
    }

    const handlePageItems = (index: number) => {
        const indexOfLastPost = index * itemsPerPage;
        const indexOfFirstPost = indexOfLastPost - itemsPerPage;
        const currentItems = allItems.slice(indexOfFirstPost, indexOfLastPost);

        handlePagesNums(index)
        
        setActivePage(index)
        setVisibleItems(currentItems)
        setIsLastPage(index >= maxPages)
        

        if (index >= maxPages) {
            setHasNext(false)
        } 

        if (index <= 1) {
            setHasPrevious(false)
        }

    }

    return {
        activePage,
        context,
        pagesNums,
        hasPrevious,
        hasNext,
        handleNext,
        handlePrevious,
        handlePageItems,
    }
}
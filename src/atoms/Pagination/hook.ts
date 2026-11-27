import { useEffect, useState } from "react"
import { iPagination } from "../../interfaces/atoms"

export const usePagination = ({ config, allItems, visibleItemsState }: iPagination) => {
    const { itemsPerPage, maxPagesNums } = config
    const maxPages = Math.ceil(allItems.length / itemsPerPage)
    const [requestedPage, setActivePage] = useState(1)
    const activePage = Math.min(requestedPage, Math.max(1, maxPages))
    const count = Math.min(maxPages, maxPagesNums || 0)
    const start = Math.max(1, Math.min(activePage - Math.floor(count / 2), maxPages - count + 1))
    const pagesNums = Array.from({ length: count }, (_, index) => start + index)
    const hasPrevious = activePage > 1
    const hasNext = activePage < maxPages || (!!config.return && maxPages > 1)
    const [, setVisibleItems] = visibleItemsState

    useEffect(() => {
        if (requestedPage !== activePage) setActivePage(activePage)
        setVisibleItems(allItems.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage))
    }, [allItems, activePage, requestedPage, itemsPerPage, setVisibleItems])

    const handlePageItems = (index: number) => {
        if (index >= 1 && index <= maxPages) setActivePage(index)
    }

    const handleNext = () => {
        if (activePage < maxPages) handlePageItems(activePage + 1)
        else if (config.return) handlePageItems(1)
    }

    const handlePrevious = () => handlePageItems(activePage - 1)
    const context = { config, activePage, childrenArr: allItems }

    return { activePage, context, pagesNums, hasPrevious, hasNext, handleNext, handlePrevious, handlePageItems }
}

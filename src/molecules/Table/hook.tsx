import { createContext, useEffect, useRef, useState } from "react"

import { iObject } from "../../interfaces/atoms"

export const TableContext = createContext([])

export const useTable = (data: iObject[]) => {
    const paginationConfig = {
        maxPagesNums: 4,
        itemsPerPage: 1,
        arrows: true
    }
    
    const sortState = useState({
        id: null,
        dir: 'asc'
    })

    const [ isSorted, setIsSorted ] = useState(true)
    const hiddenColsState = useState([])
    const visibleItemsState = useState(data)
    const [ visibleItems, setVisibleItems ] = visibleItemsState
    const [ hiddenCols, setHiddenCols ] = hiddenColsState
    const [ sortValues ] = sortState
    
    const hiddenIndexes = []

    const tableRef = useRef(null)

    // useEffect(() => { // TODO: SORT NEW VISIBLE ITEMS
    //     if (!isSorted) {
    //         sortTable()
    //     }
    // }, [ visibleItems, sortValues.dir ])

    const sortTable = () => {
        const dataToSort = visibleItems || []
        const sortedByCol = dataToSort.sort((a: iObject, b: iObject) => {
            const id = sortValues.id || 0

            return (sortValues.dir === 'desc')
                ? a?.[id] < b?.[id] ? 1 : -1
                : a?.[id] > b?.[id] ? 1 : -1
        })
        setVisibleItems([...sortedByCol])
        setIsSorted(true)
    }

    const hideCols = () => {
        const currTableWidth = tableRef.current.getBoundingClientRect().width
        const windowWidth = window.innerWidth

        if (currTableWidth > windowWidth) {
            const headerCols = tableRef.current.querySelectorAll('th')

            Array.from(headerCols).map((td, i) => {
                const rightPos = td.getBoundingClientRect().right
                
                if (rightPos > windowWidth && !hiddenIndexes.includes(i)) {
                    hiddenIndexes.push(i)
                }
            })
        }

        setHiddenCols([...hiddenIndexes.sort()])
    }

    useEffect(() => {
        hideCols()

        window.addEventListener('resize', hideCols)
    }, [])

    useEffect(() => {
        if (sortValues?.id) {
            sortTable()
        }
    }, [sortValues])

    return {
        hiddenCols,
        sortState,
        tableRef,
        paginationConfig,
        visibleItemsState,
        visibleItems
    }
}
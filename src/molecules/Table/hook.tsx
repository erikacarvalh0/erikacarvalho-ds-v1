import { createContext, useEffect, useRef, useState } from "react"

import { iObject } from "../../interfaces/atoms"

export const TableContext = createContext({})

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

    const hiddenColsState = useState<number[]>([])
    const visibleItemsState = useState(data)
    const [ visibleItems, setVisibleItems ] = visibleItemsState
    const [ hiddenCols, setHiddenCols ] = hiddenColsState
    const [ sortValues ] = sortState
    
    const hiddenIndexes: number[] = []

    const tableRef = useRef<HTMLTableElement | null>(null)


    const sortTable = () => {
        const dataToSort = visibleItems || []
        const sortedByCol = dataToSort.sort((a: iObject, b: iObject) => {
            const id = sortValues.id || 0

            return a?.[id] && b?.[id] 
                ? (sortValues.dir === 'desc')
                    ? a?.[id] < b?.[id] ? 1 : -1
                    : a?.[id] > b?.[id] ? 1 : -1
                : - 1
        })
        setVisibleItems([...sortedByCol])
    }

    const hideCols = () => {
        const currTableWidth = tableRef?.current ? tableRef?.current.getBoundingClientRect().width : 0
        const windowWidth = window.innerWidth

        if (currTableWidth > windowWidth) {
            const headerCols = tableRef?.current ? tableRef?.current.querySelectorAll('th') : []

            Array.from(headerCols).map((td, i) => {
                const rightPos = td.getBoundingClientRect().right
                
                if (rightPos > windowWidth && !hiddenIndexes.includes(i)) {
                    hiddenIndexes.push(i)
                }
            })
        }
        const newHidden = [...hiddenIndexes.sort()]
        setHiddenCols(newHidden)
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
import { createContext, useEffect, useRef, useState } from "react"

import { iObject } from "../../interfaces/atoms"

export const TableContext = createContext({} as any)

export const useTable = (data: iObject[]) => {
    const defaultPaginationConfig = {
        maxPagesNums: 4,
        itemsPerPage: 10,
        arrows: true
    }
    
    const sortState = useState({
        id: null,
        dir: 'asc',
        index: -1,
        text: ''
    })

    const hiddenColsState = useState<number[]>([])
    const visibleItemsState = useState(data)
    const [ visibleItems, setVisibleItems ] = visibleItemsState
    const [ hiddenCols, setHiddenCols ] = hiddenColsState
    let previouWidth = 0
    const [ sortValues ] = sortState
    const [ sortMsg, setSortMsg ] = useState(sortValues.text)
    
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

        setVisibleItems(sortedByCol)
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

    const sortedMessage = () => {
        const sorttedHidden = hiddenCols.includes(sortValues.index)
        const currentMsg = sorttedHidden ? sortValues.text : ''
        setSortMsg(currentMsg)
    }

    const showCols = () => {
        hiddenIndexes.shift()
  
        setHiddenCols([...hiddenIndexes])
    }

    const controlCols = ({ target } : any) => {
        if (tableRef.current) {
            const currWidth = target?.innerWidth
            const diffWidths = Math.abs(previouWidth - currWidth)
            const thead = tableRef.current.querySelector('th')
            const firstThElm = thead ? getComputedStyle(thead) : null
            const minWith = firstThElm?.["min-width"] as string
            const colWidth = firstThElm ? parseInt(minWith.replace('px', '')) : 0
            const treshold = previouWidth > currWidth ? colWidth - (colWidth * .25) : colWidth
            
            if (diffWidths > treshold) {
                if  (previouWidth > currWidth) {
                    hideCols()
                } else {
                    showCols()
                }
                previouWidth = currWidth
            }
        }
    }

    useEffect(() => {
        hideCols()
        window.addEventListener('resize', controlCols)
    }, [])

    useEffect(() => {
        if (sortValues?.id) {
            sortTable()
        }
    }, [sortValues])

    useEffect(() => {
        sortedMessage()
    }, [hiddenCols])

    return {
        hiddenCols,
        sortState,
        sortMsg,
        tableRef,
        defaultPaginationConfig,
        visibleItemsState,
        visibleItems
    }
}
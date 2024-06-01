import { createContext, useEffect, useRef, useState } from "react"

import { iObject } from "../../interfaces/atoms"

export const TableContext = createContext([])

export const useTable = (data: iObject[]) => {
    
    const sortState = useState({
        id: null,
        dir: 'asc'
    })

    const hiddenColsState = useState([])
    const [ sortedData, setSortedData ] = useState(data)

    const [ sortValues ] = sortState
    const [ hiddenCols, setHiddenCols ] = hiddenColsState
    const hiddenIndexes = []

    const tableRef = useRef(null)

    const sortTable = () => {
        const dataToSort = sortedData || []
        const sortedByCol = dataToSort.sort((a: iObject, b: iObject) => {
            const id = sortValues.id || 0

            return (sortValues.dir === 'desc')
                ? a?.[id] < b?.[id] ? 1 : -1
                : a?.[id] > b?.[id] ? 1 : -1
        })
        setSortedData([...sortedByCol])
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
        sortedData,
        tableRef
    }
}
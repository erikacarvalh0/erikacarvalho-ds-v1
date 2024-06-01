
import React, { useContext } from "react"

import { iTCol } from "../../interfaces/atoms"

import { TableContext } from "./hook"
import classNames from "classnames"

export const TCol = ({ children, sort, id } : iTCol) => {
    const context = useContext(TableContext)
    const [ sortValues, setSortValues ] = context?.sortState

    const handleSorting = () =>{ 
        const nextDir =  sortValues?.dir === 'asc' ? 'desc' : 'asc'
        setSortValues({ id, dir: nextDir })
    }
    
    return (  
        <th onClick={sort && handleSorting} className={classNames("table__cell", { "has-arrow": sort, [sortValues?.dir]: sortValues.id === id})}>
            {children}
        </th>
    )
}
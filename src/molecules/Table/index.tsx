import React, { Children } from "react"

import { iTable } from "../../interfaces/molecules"
import { iTableRow } from "../../interfaces/atoms"

import { Accordion } from "../../atoms/Accordion"
import { Pagination } from "../../atoms/Pagination"

import { TableContext, useTable } from "./hook"
import './index.scss'

export const CombinedRow = ({rowIndex, row, hiddenCols, rowsIndexes, header} : iTableRow) => {
    return (<>
        <tr className="table__row" key={rowIndex}>{
            Object.values(row).map((col, colIndex) => {
                return hiddenCols.includes(colIndex)
                    ? null
                    : <td className="table__cell" key={colIndex}>{col}</td>
            })
        }</tr>
        <tr>
            <td colSpan={rowsIndexes.length - hiddenCols.length}>
                <Accordion title="Mais informações" hasArrow size="small">
                    { hiddenCols.map((hiddenCol, colIndex) => {
                        const tColText = Children.toArray(header)[hiddenCol].props.children
                        const rowText = row[rowsIndexes[hiddenCol]]
                        
                        return (<p key={colIndex} className="table__inner-text"><strong>{ tColText }:</strong> { rowText }</p>)
                    }) }
                </Accordion>

            </td>
        </tr>
        </>
    )
}

export const Table =({ data, children } : iTable) => {
    const { 
        hiddenCols,
        sortState,
        tableRef,
        paginationConfig,
        visibleItemsState,
        visibleItems
    } = useTable(data)

    const context: any = { sortState }

    return (
        <TableContext.Provider value={context}>
            <table ref={tableRef} className="table">
                <thead className="table__header">
                    <tr className="table__row">{ 
                        React.Children.map(children, (child, index) => !hiddenCols.includes(index)
                            ? child
                            : null
                        )
                    }</tr>
                </thead>
                <tbody>
                    { visibleItems.map((row, rowIndex) =>{
                        const rowsIndexes = Object.keys(row)
                        return hiddenCols.length === 0
                            ? <tr className="table__row" key={rowIndex}>{Object.values(row).map((col, colIndex) => <td className="table__cell" key={colIndex}>{col}</td>)}</tr>
                            : <CombinedRow key={rowIndex} rowIndex={rowIndex} row={row} hiddenCols={hiddenCols} rowsIndexes={rowsIndexes} header={children}/>
                    }) }
                </tbody>
            </table>
            <Pagination allItems={data} config={paginationConfig} visibleItemsState={visibleItemsState} />
        </TableContext.Provider>
    )
}
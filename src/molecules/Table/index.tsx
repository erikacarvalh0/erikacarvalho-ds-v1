import React, { Children, ReactElement } from "react"

import { iTable } from "../../interfaces/molecules"
import { iTableRow } from "../../interfaces/atoms"

import { Accordion } from "../../atoms/Accordion"
import { Pagination } from "../../atoms/Pagination"

import { TableContext, useTable } from "./hook"
import './index.scss'
import { i18n } from "../../utils/i18n"

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
                        const childElement = Children.toArray(header)[hiddenCol] as ReactElement
                        const tColText = childElement.props.children
                        const rowText = row[rowsIndexes[hiddenCol]]

                        return (<p key={colIndex} className="table__inner-text"><strong>{ tColText }:</strong> { rowText }</p>)
                    }) }
                </Accordion>

            </td>
        </tr>
        </>
    )
}

export const Table =({ data, children, paginationConfig } : iTable) => {
    const { 
        hiddenCols,
        sortState,
        sortMsg,
        tableRef,
        defaultPaginationConfig,
        visibleItemsState,
        visibleItems
    } = useTable(data)

    const context: any = { sortState }
    const currPaginationConfig = {
        ...defaultPaginationConfig,
        ...paginationConfig
    }

    return (
        <TableContext.Provider value={context}>
            {sortMsg && <p>{i18n('Ordenado por')}: {sortMsg}</p>}
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
            <Pagination allItems={data} config={currPaginationConfig} visibleItemsState={visibleItemsState} />
        </TableContext.Provider>
    )
}
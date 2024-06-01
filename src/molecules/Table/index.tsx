import React, { Children } from "react"

import { iTable } from "../../interfaces/molecules"
import { TableContext, useTable } from "./hook"
import './index.scss'
import { Accordion } from "../../atoms/Accordion"

export const CombinedRow = ({rowIndex, row, hiddenCols, rowsIndexes, header}) => {
    return (<>
        <tr className="table__row" key={rowIndex}> {
            Object.values(row).map((col, colIndex) => {
                return hiddenCols.includes(colIndex)
                    ? <></>
                    : <td className="table__cell" key={colIndex}>{ col }</td>
            })}
        </tr>
        <tr>
            <td colSpan={rowsIndexes.length - hiddenCols.length}>
                <Accordion title="Mais informações" hasArrow size="small">
                    { hiddenCols.map(hiddenCol => {
                        const tColText = Children.toArray(header)[hiddenCol].props.children
                        const rowText = row[rowsIndexes[hiddenCol]]
                        
                        return (<p className="table__inner-text"><strong>{ tColText }:</strong> { rowText }</p>)
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
        sortedData,
        tableRef 
    } = useTable(data)

    return (
        <TableContext.Provider value={{ sortState }}>
            <table ref={tableRef} className="table">
                <thead className="table__header">
                    <tr className="table__row">
                        { React.Children.map(children, (child, index) => {
                            return !hiddenCols.includes(index)
                                ? child
                                : <></>
                        })
                        }
                    </tr>
                </thead>
                <tbody>
                    { sortedData.map((row, rowIndex) =>{
                        const rowsIndexes = Object.keys(row)
                        return hiddenCols.length === 0
                            ? <tr className="table__row" key={rowIndex}> {
                                Object.values(row).map((col, colIndex) => <td className="table__cell" key={colIndex}>{ col }</td>
                            )}</tr>
                            : <CombinedRow rowIndex={rowIndex} row={row} hiddenCols={hiddenCols} rowsIndexes={rowsIndexes} header={children}/>
                    }) }
                </tbody>
            </table>
        </TableContext.Provider>
    )
}
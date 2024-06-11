import React from "react"
import classNames from "classnames"

import './index.scss'

export interface iChart {
    title: string,
    config: any,
    data: any
}

export const Chart = ({ title, config, data } : iChart) => {
    
    const { type } = config

    const isBarChart = type === 'bar'
    const chartDir = isBarChart ? 'gridColumn' : 'gridRow';
    const labels = Object.keys(data)

    const maxValue: number  = Object.values(data).reduce((maxAll, val: number[]) => {
        const maxColVal = val.reduce((max, colVal: number) => {
            return colVal > max ? colVal : val
        }, 0)
        
        return maxColVal > maxAll ? maxColVal : maxAll
    }, 0)
        
    const valuesGrouped = Object.values(data)[0].reduce((all, value, index) => {
        const groupedByPeriod = labels.reduce((allLabelsGrouped, label) => {
            return {...allLabelsGrouped, [label]: data?.[label][index]}
        }, {})

        return [...all, groupedByPeriod]
    }, [])

    return (
        <section className="chart__container">
            <p className="chart__title">{ title }</p>
            <ul className={classNames("chart", type)}>
                { valuesGrouped.map((values, chartI) => {
                    return Object.keys(values).map((label, i) => {

                        const valueDir = {
                            start: isBarChart ? values[label] + 1 : 1,
                            end: isBarChart ? `span ${maxValue - values[label]}` : (maxValue - values[label]) + 1
                        }
                        
                        const itemDir = {
                            start: isBarChart ? 2 : valueDir.end + 1 ,
                            end: isBarChart ? `span ${values[label] - 1}` : maxValue + 1
                        }
                        
                        const textDir = {
                            start: isBarChart ? 1 : itemDir.end + 1,
                            end: isBarChart ? `span 1` : itemDir.end + 2
                        }

                        return <>
                            <p style={{ 
                                [`${chartDir}Start`]: textDir.start,
                                [`${chartDir}End`]: textDir.end,
                            }}
                            className={classNames("chart__label", { 
                                'space': i === 0
                            })} >{ label }</p>
                            <li 
                                key={`${chartI}-${i}`} 
                                className={classNames("chart__col", { 
                                    'space': i === 0
                                })} 
                                style={{ 
                                    [`${chartDir}Start`]: itemDir.start,
                                    [`${chartDir}End`]: itemDir.end,
                                }} />
                            <span
                                className={classNames("chart__value", { 
                                    'space': i === 0
                                })} 
                                style={{ 
                                    [`${chartDir}Start`]: valueDir.start,
                                    [`${chartDir}End`]: `${valueDir.end}`,
                                }}>{ values[label]}</span>
                        </>}
                    )}
                )}
            </ul>
        </section>
)}
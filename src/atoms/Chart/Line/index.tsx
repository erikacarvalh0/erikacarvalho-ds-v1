import React from 'react'

import { iChart } from '..'

import { useLine } from './hook'
import "./index.scss"

export const Line = ({ config, data }: iChart) => {
    const { interval } = config
    const { chartRef, chartWidth, getPointInfos } = useLine({ data, interval })

    return ( <section style={{width: chartWidth}} ref={chartRef} className="line__wrapper"> 
            { data.map((point: number, index: number) => {
                const {
                    pointPos,
                    labelPos,
                    linePos,
                    lineWidth,
                    deg
                } = getPointInfos(index, interval)

                return (<div key={index} className="line__chart"> 
                    { pointPos && <div 
                        style={pointPos} 
                        id={`point${index + 1}`} 
                        className='line__point'
                    /> }
                    {labelPos && <p style={labelPos} className="line__point-label">{ point }</p> }
                    { index < data.length - 1 && 
                        <div 
                            style={{
                                ...linePos,
                                width: `${lineWidth}px`,
                                transform: `rotate(${deg}deg)`
                            }}
                            className='line__line' 
                            id={`line${index + 1}`}
                        />
                    }
                </div> 
            )})}
        </section> )
}
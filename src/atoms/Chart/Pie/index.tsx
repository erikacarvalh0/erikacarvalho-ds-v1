import React from 'react'

import { iPieData } from '../../../interfaces/atoms'

import { usePie } from './hook'

export const Pie = ({ data } : { data: iPieData[]}) => {
    const { getPieGradient } = usePie({ data })
    const gradientValues = getPieGradient()

    return ( <section className="pie__wrapper">
        <div className="pie__chart"  style={{ background: `conic-gradient(${gradientValues})`}}/>
        <ul className="pie__labels">
            {data?.map(({label, color, percentage} : iPieData, key: number) => (
                <li key={key} className="pie__label-item">
                    <div className="pie__label-color" style={{ background: color}} />
                    {label} - {percentage}%
                </li>
            ))}
        </ul>
    </section> )
}
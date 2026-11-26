import React from 'react'

import { iPieData } from '../../../interfaces/atoms'

import { usePie } from './hook'

export const Pie = ({ data, donut = false, centerLabel } : { data: iPieData[]; donut?: boolean; centerLabel?: string }) => {
    const { getPieGradient } = usePie({ data })
    const gradientValues = getPieGradient()

    return ( <section className="pie__wrapper">
        <div className={donut ? "pie__chart pie__chart--donut" : "pie__chart"} style={{ background: data.length ? `conic-gradient(${gradientValues})` : "var(--grey6)" }} aria-hidden="true">{donut && <span className="pie__center">{centerLabel}</span>}</div>
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
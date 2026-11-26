import React from 'react'

import { iPieData } from '../../../interfaces/atoms'

import { usePie } from './hook'

export const Pie = ({ data, donut = false, centerLabel } : { data: iPieData[]; donut?: boolean; centerLabel?: string }) => {
    const { getPieGradient } = usePie({ data })
    const gradientValues = getPieGradient()
    const donutClass = donut ? 'pie__chart--donut' : ''
    const background = data.length ? `conic-gradient(${gradientValues})` : 'var(--grey6)'

    return ( <section className="pie__wrapper">
        <div className={`pie__chart ${donutClass}`.trim()} style={{ background }} aria-hidden="true">{donut && <span className="pie__center">{centerLabel}</span>}</div>
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
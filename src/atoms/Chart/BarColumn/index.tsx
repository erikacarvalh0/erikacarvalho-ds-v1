import classNames from 'classnames'
import React, { Fragment } from 'react'

import { getRandomNumber } from '../../../utils/randomNumber'
import { iChart } from '..'

import { useBarColumn } from './hook'
import { iBarColumnData } from '../../../interfaces/atoms'

export const BarColumn = ({ config, data } : iChart) => {
    const { type } = config
    const {
        chartDir,
        valuesGrouped,
        directions,
    } = useBarColumn({ type, data })

    return (<ul className={classNames("chart", type)}>
    { valuesGrouped?.map((values: Record<string, number>, chartI: number) => {
        return Object.keys(values).map((label, i) => {
            const {
                valueDir,
                itemDir,
                textDir
            } = directions(values, label)
            const randId = getRandomNumber()

            return <Fragment key={`${type}-${chartI}${randId + 2}`}>
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
            </Fragment>}
        )}
    )}
</ul>)
}
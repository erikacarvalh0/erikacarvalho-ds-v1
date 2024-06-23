import React from "react"

import { Pie } from "./Pie"
import { BarColumn } from "./BarColumn"

import './index.scss'

export interface iChart {
    title: string,
    config: any,
    data: any
}

export const Chart = ({ title, config, data } : iChart) => {
    const { type } = config
    return (
        <section className="chart__container">
            <p className="chart__title">{ title }</p>
            {type == 'pie' 
            ?  <Pie data={data} />
            : <BarColumn type={type} data={data} />
            // :<p></p>
        }
        </section>
)}
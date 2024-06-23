import React from "react"

import { BarColumn } from "./BarColumn"
import { Line } from "./Line"
import { Pie } from "./Pie"

import './index.scss'

export interface iChart {
    title?: string,
    config: any,
    data: any
}

export const Chart = ({ title, config, data } : iChart) => {
    const { type } = config

    const ChartComponent = () => {
        switch (type) {
            case 'pie':
                return <Pie data={data} />
            case 'line':
                return <Line config={config} data={data} />
            default:
                return <BarColumn config={config} data={data} />
        }
    }
    return (
        <section className="chart__container">
            <p className="chart__title">{ title }</p>
            <ChartComponent />
        </section>
)}
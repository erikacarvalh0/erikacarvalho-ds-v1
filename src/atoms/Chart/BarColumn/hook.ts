import { iBarColumnData } from "../../../interfaces/atoms"
const GRID_SCALE = 100
const LABEL_START = 1
const PLOT_START = LABEL_START + 1
const PLOT_END = PLOT_START + GRID_SCALE
const GRID_END = PLOT_END + 1

interface iValuesDirections {
    [key: string]: number
}
interface iBarColumnHook {
    type: string,
    data: iBarColumnData
}

export const useBarColumn = ({ type, data } : iBarColumnHook) => {
    const isBarChart = type === 'bar'
    const chartDir = isBarChart ? 'gridColumn' : 'gridRow'
    const series = data as Record<string, number[]>
    const labels = Object.keys(series)

    const maxValue = Object.values(series).reduce(
        (max, values) => values.reduce((current, value) =>
            Number.isFinite(value) ? Math.max(current, value) : current, max), 0)
    const scale = (value: number) => maxValue > 0 && Number.isFinite(value)
        ? Math.max(0, Math.min(GRID_SCALE, Math.round(value / maxValue * GRID_SCALE))) : 0

    const valuesGrouped = Object.values(series)?.[0]?.reduce((all: any, value: number, index: number) => {
        const groupedByPeriod = labels.reduce((allLabelsGrouped, label: string) => {
            return {...allLabelsGrouped, [label]: series?.[label][index]}
        }, {})

        return [...all, groupedByPeriod]
    }, [])

    const directions = (values: iValuesDirections, label: string) => {
        const size = scale(values[label])
        const valueDir = isBarChart ? { start: PLOT_START + size, end: GRID_END } : { start: LABEL_START, end: PLOT_END - size }
        const itemDir = isBarChart ? { start: PLOT_START, end: PLOT_START + size } : { start: PLOT_END - size, end: PLOT_END }
        const textDir = isBarChart ? { start: LABEL_START, end: PLOT_START } : { start: PLOT_END, end: GRID_END }
        return { valueDir, itemDir, textDir }
    }

    return {
        chartDir,
        valuesGrouped,
        directions
    }
}
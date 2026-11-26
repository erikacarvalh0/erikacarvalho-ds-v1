import { iBarColumnData, iObject } from "../../../interfaces/atoms"
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
        ? Math.max(0, Math.min(100, Math.round(value / maxValue * 100))) : 0

    const valuesGrouped = Object.values(series)?.[0]?.reduce((all: any, value: number, index: number) => {
        const groupedByPeriod = labels.reduce((allLabelsGrouped, label: string) => {
            return {...allLabelsGrouped, [label]: series?.[label][index]}
        }, {})

        return [...all, groupedByPeriod]
    }, [])

    const directions = (values: iValuesDirections, label: string) => {
        const size = scale(values[label])
        const valueDir = isBarChart ? { start: size + 2, end: 103 } : { start: 1, end: 102 - size }
        const itemDir = isBarChart ? { start: 2, end: size + 2 } : { start: 102 - size, end: 102 }
        const textDir = isBarChart ? { start: 1, end: 2 } : { start: 102, end: 103 }
        return { valueDir, itemDir, textDir }
    }

    return {
        chartDir,
        valuesGrouped,
        directions
    }
}
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
    const labels = Object.keys(data)

    const maxValue: number  = Object.values(data).reduce((maxAll: number, val: number[], index: number) => {
        const maxColVal = val.reduce((max: number, colVal: number) => {
            return colVal > max ? colVal : val[index]
        }, 0)
        
        return maxColVal > maxAll ? maxColVal : maxAll
    }, 0)
        
    const valuesGrouped = Object.values(data)?.[0]?.reduce((all: any, value: number, index: number) => {
        const groupedByPeriod = labels.reduce((allLabelsGrouped, label: string) => {
            return {...allLabelsGrouped, [label]: data?.[label][index]}
        }, {})

        return [...all, groupedByPeriod]
    }, [])

    const directions = (values: iValuesDirections, label: string) => {
        const valueDir = {
            start: isBarChart ? values[label] + 1 : 1,
            end: isBarChart ? `span ${maxValue - values[label]}` : (maxValue - values[label]) + 1
        }
        
        const itemDir = {
            start: isBarChart ? 2 : typeof valueDir?.end === 'number' ? valueDir?.end + 1 : ``,
            end: isBarChart ? `span ${values[label] - 1}` : maxValue + 1
        }
        
        const textDir = {
            start: isBarChart ? 1 :  typeof itemDir?.end === 'number' ? itemDir?.end + 1 : ``,
            end: isBarChart ? `span 1` : typeof itemDir?.end === 'number' ? itemDir?.end + 2 : ``
        }

        return {
            valueDir,
            itemDir,
            textDir
        }
    }

    return {
        chartDir,
        valuesGrouped,
        directions
    }
}
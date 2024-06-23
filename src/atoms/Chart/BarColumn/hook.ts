export const useBarColumn = ({ type, data }) => {
    const isBarChart = type === 'bar'
    const chartDir = isBarChart ? 'gridColumn' : 'gridRow'
    const labels = Object.keys(data)

    const maxValue: number  = Object.values(data).reduce((maxAll, val: number[]) => {
        const maxColVal = val.reduce((max, colVal: number) => {
            return colVal > max ? colVal : val
        }, 0)
        
        return maxColVal > maxAll ? maxColVal : maxAll
    }, 0)
        
    const valuesGrouped = Object.values(data)?.[0]?.reduce((all, value, index) => {
        const groupedByPeriod = labels.reduce((allLabelsGrouped, label) => {
            return {...allLabelsGrouped, [label]: data?.[label][index]}
        }, {})

        return [...all, groupedByPeriod]
    }, [])

    const directions = (values, label) => {
        const valueDir = {
            start: isBarChart ? values[label] + 1 : 1,
            end: isBarChart ? `span ${maxValue - values[label]}` : (maxValue - values[label]) + 1
        }
        
        const itemDir = {
            start: isBarChart ? 2 : valueDir.end + 1 ,
            end: isBarChart ? `span ${values[label] - 1}` : maxValue + 1
        }
        
        const textDir = {
            start: isBarChart ? 1 : itemDir.end + 1,
            end: isBarChart ? `span 1` : itemDir.end + 2
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
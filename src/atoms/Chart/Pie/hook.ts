export const usePie = ({ data }) => {
    const getPieGradient = () => {
        let lastCalcEnd = ``
        return data.reduce((gradient, item, index) => {
            const calcInit = index === 0 ? `0` : lastCalcEnd
            const calcEnd = index === 0 
                ? `calc(${item.percentage}%)` 
                : lastCalcEnd.replace(`)`, ` + ${item.percentage}%)`)
            lastCalcEnd = calcEnd
            
            return `${gradient},
                ${item.color} ${calcInit},
                ${item.color} ${calcEnd}`
        }, `from 0deg`)
    }

    return {
        getPieGradient
    }
}
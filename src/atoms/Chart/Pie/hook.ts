import { iPieData } from "../../../interfaces/atoms"

export const usePie = ({ data } : { data: iPieData[]}) => {
    const getPieGradient = () => {
        let lastCalcEnd = ``
        return data.reduce((gradient: string, item: iPieData, index: number) => {
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
import { useEffect, useRef, useState } from "react"

interface iLineHook {
    data: number[],
    interval: number
}

export const useLine = ({ data, interval }: iLineHook) => {
    const chartRef = useRef<HTMLDivElement>(null)
    const chartWidth = (data.length * interval) + (interval * 2)
    const [ pointsPos, setPointsPos ] = useState<number[]>([])
    const maxValue = Math.max(...data)
    const percentages = data.reduce((all: number[], point: number) => {
        const percent = (100 * point) / maxValue
        return [...all, percent]
    }, [])

    useEffect(() => {
        if (chartRef.current) {
            const chartHeight = chartRef.current?.getBoundingClientRect().height
            const pointsPositions = percentages.map((percent: number) => (chartHeight / 100) * percent)
            
            setPointsPos(pointsPositions)
        }
    }, [chartRef.current])

    const getPointInfos = (index: number, interval: number) => {
        const left = interval * (index + 1)
        const currentPos = {x: left, y: pointsPos[index]}
        const nextPos = {x: interval * (index + 2), y: pointsPos[index + 1]}
        const pointPos = {bottom: pointsPos[index], left: left }
        const linePos = {bottom: pointsPos[index] + 5, left: (left + 5)}
        const lineDistande = pointsPos[index] > pointsPos[index + 1] 
            ? pointsPos[index] - pointsPos[index + 1] + 10
            : pointsPos[index + 1] - pointsPos[index] + 10

        const deg = (Math.atan2(nextPos.y-currentPos.y, nextPos.x-currentPos.x) * 180 / Math.PI) * - 1
        const lineWidth = lineDistande > interval ? lineDistande : interval

        const labelPos = { bottom: pointPos.bottom + 10, left: pointPos.left - 10}

        return {
            pointPos,
            labelPos,
            linePos,
            lineWidth,
            deg
        }
    }

    return {
        maxValue,
        chartRef,
        chartWidth,
        getPointInfos
    }
}
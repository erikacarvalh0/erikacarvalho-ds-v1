import { useEffect, useState } from "react"

export const useMediaControls = (mediaRef: any) => {
    const [isPlaying, setIsPlaying ] = useState(false)
    const [ currTime, setCurrTime ] = useState('00:00')
    const [ currTimelineWidth, setCurrTimelineWidth ] = useState(0)

    const handlePlay = () => {
        if (mediaRef?.current?.paused) {
            mediaRef?.current?.play()
        } else {
            mediaRef?.current?.pause()
        }

        setIsPlaying(!mediaRef?.current?.paused)
    }
    
    const handleDownload = (e: any) => {
        e.preventDefault()
        let a = document.createElement('a')
        a.href = mediaRef?.current?.src 
        a.target = "_blank"
        a.download = ""
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
    
    const handleRewind = () => {
        mediaRef.current.currentTime = mediaRef?.current?.currentTime - ((mediaRef?.current?.duration/100) * 5)
        mediaRef?.current?.play()
        setIsPlaying(!mediaRef?.current?.paused)
    }
    
    const handleForward = () => {
        mediaRef.current.currentTime = mediaRef?.current?.currentTime + ((mediaRef?.current?.duration/100) * 5)
        mediaRef?.current?.play()
        setIsPlaying(!mediaRef?.current?.paused)
    }

    const handleFullScreen = (e: any) => {
        e.preventDefault()
        mediaRef?.current?.requestFullscreen()
    }

    useEffect(() => {
        const currAsset = mediaRef.current

        currAsset?.addEventListener("timeupdate", () => {
            const timelineWidth = (currAsset?.currentTime / currAsset?.duration) * 100
            const mediaTimeNum = ((currAsset?.currentTime / 60) % 60).toFixed(2)
            const splittedTime = mediaTimeNum.split('.')
            const formattedMin = splittedTime[0] < '10' ? `0${splittedTime[0]}` : splittedTime[0]
            const mediaTime = `${formattedMin}:${splittedTime[1]}`
            
            setCurrTimelineWidth(timelineWidth)
            setCurrTime(mediaTime)
            setIsPlaying(!currAsset?.ended && !currAsset.paused)
            
        })
    }, [])

    return {
        isPlaying,
        currTime,
        currTimelineWidth,
        handlePlay,
        handleDownload,
        handleRewind,
        handleForward,
        handleFullScreen
    }
}
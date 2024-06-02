import React, { useEffect, useRef, useState } from "react"
import classNames from "classnames"

import { Button } from "../Button"
import { Download, Expand, FastForward, Pause, Play, Rewind } from "../Icons"

import './index.scss'

export const Video = ({ src, forward, rewind, fullScreen, download, title, theme }) => {
    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying ] = useState(false)
    const [ currTime, setCurrTime ] = useState('00:00')
    const [ currTimelineWidth, setCurrTimelineWidth ] = useState(0)

    const handlePlay = () => {
        if (videoRef?.current?.paused) {
            videoRef?.current?.play()
        } else {
            videoRef?.current?.pause()
        }

        setIsPlaying(!videoRef?.current?.paused)
    }
    
    const handleFullScreen = (e) => {
        e.preventDefault()
        videoRef?.current?.requestFullscreen()
    }
    
    const handleDownload = (e) => {
        e.preventDefault()
        let a = document.createElement('a')
        a.href = videoRef?.current?.src 
        a.target = "_blank"
        a.download = ""
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
    
    const handleRewind = () => {
        videoRef.current.currentTime = videoRef?.current?.currentTime - ((videoRef?.current?.duration/100) * 5)
        videoRef?.current?.play()
        setIsPlaying(!videoRef?.current?.paused)
    }
    
    const handleForward = () => {
        videoRef.current.currentTime = videoRef?.current?.currentTime + ((videoRef?.current?.duration/100) * 5)
        videoRef?.current?.play()
        setIsPlaying(!videoRef?.current?.paused)
    }

    useEffect(() => {
        const currVideo = videoRef.current

        currVideo?.addEventListener("timeupdate", () => {
            const timelineWidth = (currVideo?.currentTime / currVideo?.duration) * 100
            const videoTimeNum = ((currVideo?.currentTime / 60) % 60).toFixed(2)
            const splittedTime = videoTimeNum.split('.')
            const formattedMin = splittedTime[0] < '10' ? `0${splittedTime[0]}` : splittedTime[0]
            const videoTime = `${formattedMin}:${splittedTime[1]}`
            
            setCurrTimelineWidth(timelineWidth)
            setCurrTime(videoTime)
            setIsPlaying(!currVideo?.ended && !currVideo.paused)
            
        })
    }, [])
    return (
    <div className={classNames("video__container", theme, {'paused': !isPlaying})}>
        { !isPlaying && <Button customClass="video__btn video__btn-large" action={handlePlay}>
            <Play />
        </Button>}
        <video ref={videoRef} className="video" onClick={handlePlay} src={src} title={title} />
        <div className={classNames("video__controls", {'paused': !isPlaying})}>
            <Button customClass="video__btn" action={handlePlay}>
                { !isPlaying && <Play />}
                { isPlaying && <Pause />}
            </Button>
            { rewind && <Button customClass="video__btn video__btn-rewind" action={handleRewind}><Rewind /></Button>}
            
            <progress className="video__timeline" id="timeline" value={currTimelineWidth} max="100"> {currTimelineWidth}% </progress>
            <label className="video__time" htmlFor="timeline">{ currTime } </label>

            { forward && <Button customClass="video__btn video__btn-forward" action={handleForward}><FastForward /></Button> }
            { fullScreen && <Button customClass="video__btn video__btn-fullScreen" action={handleFullScreen}><Expand /></Button> }
            { download && <Button customClass="video__btn video__btn-download" action={handleDownload}><Download /></Button> }
        </div>
    </div>
)}
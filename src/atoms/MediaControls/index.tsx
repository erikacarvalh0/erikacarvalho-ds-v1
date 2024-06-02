import React from "react"
import classNames from "classnames"

import { iMediaControls } from "../../interfaces/atoms"

import { Button } from "../Button"
import { Download, Expand, FastForward, Pause, Play, Rewind } from "../Icons"

import { useMediaControls } from "./hook"
import './index.scss'

export const MediaControls = ({ mediaRef, forward, rewind, download, fullScreen }: iMediaControls) => {
    const {
        isPlaying,
        currTime,
        currTimelineWidth,
        handlePlay,
        handleDownload,
        handleRewind,
        handleForward,
        handleFullScreen
    } = useMediaControls(mediaRef)
    
    return (
        <div className={classNames("media__controls", {'paused': !isPlaying})}>
            <Button customClass="media__btn" action={handlePlay}>
                { !isPlaying && <Play />}
                { isPlaying && <Pause />}
            </Button>
            { rewind && <Button customClass="media__btn media__btn-rewind" action={handleRewind}><Rewind /></Button>}
            
            <progress className="media__timeline" id="timeline" value={currTimelineWidth} max="100"> {currTimelineWidth}% </progress>
            <label className="media__time" htmlFor="timeline">{ currTime } </label>

            { forward && <Button customClass="media__btn media__btn-forward" action={handleForward}><FastForward /></Button> }
            { fullScreen && <Button customClass="video__btn video__btn-fullScreen" action={handleFullScreen}><Expand /></Button> }
            { download && <Button customClass="media__btn media__btn-download" action={handleDownload}><Download /></Button> }
        </div>
)}
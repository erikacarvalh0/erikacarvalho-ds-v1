import React, { useRef } from "react"
import classNames from "classnames"

import { iMedia } from "../../interfaces/atoms"

import { Button } from "../../atoms/Button"
import { Play} from "../../atoms/Icons"

import { MediaControls } from "../../atoms/MediaControls"
import { useMediaControls } from "../../atoms/MediaControls/hook"
import '../../atoms/MediaControls/index.scss'

export const Video = ({ src, forward, rewind, fullScreen, download, title, theme }: iMedia) => {
    const videoRef = useRef(null)
    const { isPlaying, handlePlay } = useMediaControls(videoRef)
   
    return (
    <div className={classNames("video__container", theme, {'paused': !isPlaying})}>
        { !isPlaying && <Button customClass="media__btn media__btn-large" action={handlePlay}>
            <Play />
        </Button>}
        <video ref={videoRef} className="video" onClick={handlePlay} src={src} title={title} />
        <MediaControls mediaRef={videoRef}  forward={forward} rewind={rewind} download={download} fullScreen={fullScreen} />
    </div>
)}
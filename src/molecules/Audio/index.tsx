import React, { useRef } from "react"
import classNames from "classnames"

import { iMedia } from "../../interfaces/atoms"

import { MediaControls } from "../../atoms/MediaControls"
import { useMediaControls } from "../../atoms/MediaControls/hook"

import '../../atoms/MediaControls/index.scss'

export const Audio = ({ src, forward, rewind, download, title, theme }: iMedia) => {
    const audioRef = useRef(null)
    const { isPlaying, handlePlay } = useMediaControls(audioRef)
    
    
    return (
    <div className={classNames("media__container", theme, {'paused': !isPlaying})}>
        <audio ref={audioRef} className="audio" onClick={handlePlay} src={src} title={title} />
        <MediaControls mediaRef={audioRef} forward={forward} rewind={rewind} download={download} />
    </div>
)}
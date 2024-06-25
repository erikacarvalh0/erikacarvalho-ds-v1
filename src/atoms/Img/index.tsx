import React from "react"
import classNames from "classnames"

import { iImg } from "../../interfaces/atoms"

export const Img =({srcmobile, maxWidth, media, src, customClass, styled, ...props} : iImg) => {
    const width = maxWidth ? maxWidth : media ? media : 0
    
    return (<>
        { (srcmobile) &&
            <picture>
            <source media={`(max-width: ${width}px)`} srcSet={srcmobile} />
            <source media={`(min-width: ${media}px)`} srcSet={src} />
            <img className={classNames('img', customClass, { "styled": styled})} src={src} {...props } />
            </picture>
        }
        
        { (!srcmobile) && <img src={src} className={classNames('img', customClass, { "styled": styled})} {...props } /> }
    </>)
}
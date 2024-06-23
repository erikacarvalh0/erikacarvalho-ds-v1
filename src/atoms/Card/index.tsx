import React from "react"
import { iCard, ReactNode } from "../../interfaces/atoms"

import { Img } from "../Img"
import { List } from "../List"
import { Button } from "../Button"
import { Link } from "../Link"

import './index.scss'

export const Card =({ title, subtitle, img, text, list, button, link, children} : iCard) => (
    <article className='card'>
        <header>
            <h2 className="card__title">{ title }</h2>
            <h3 className="card__subtitle">{ subtitle }</h3>
        </header>
        <div className="card__content">
            { img && <Img src={img.src} srcmobile={img?.srcmobile} maxWidth={img.maxWidth} media={img.media} />}
            { text && <p className="card__text">{ text }</p> }
            { list && <List items={list} />}
            { button && <Button action={button.action} text={button.text} theme={button?.theme} customClass={button.customClass}>
                {button.children}
                </Button>
            }
            { link && <Link href={link.href} target={link.target} text={link.text} theme={link?.theme}>
                {link.children}
                </Link>
            }
            { children }
        </div>
    </article>
)

export const CardContainer = ({ children } : { children : ReactNode }) => {
    return (<section className="cards">
        { children }
    </section>)
}
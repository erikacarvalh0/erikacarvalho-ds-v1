import React from "react"
import classNames from "classnames"

import { iNotes } from "../../interfaces/molecules"

import { Button } from "../../atoms/Button"
import { Book } from "../../atoms/Icons"
import { List } from "../../atoms/List"

import { NotesTooltip } from "./NotesTooltip"
import { useNotes } from "./hook"
import './index.scss'

export const Notes = ({ notesRef }: iNotes) => {
    const {
        selectedText,
        storedNotes,
        mouseCoord,
        hasNewNote,
        showList,
        setHasNewNote,
        setSelectedText,
        handleNotes,
        handleClose
    } = useNotes(notesRef)
    
    return (
        <>
            <div className="notes">
                <Button customClass={classNames({'new': hasNewNote})} action={handleNotes}><Book /></Button>
                { showList && <div className="list__container">
                    {storedNotes && <List items={storedNotes} />}
                    { !storedNotes && <p>Nenhuma nota salva</p>}
                </div>}
                { showList && <div onClick={handleClose} className="notes__bg"></div>}
            </div>
            { selectedText && <NotesTooltip setHasNewNote={setHasNewNote} coord={mouseCoord} text={selectedText} setText={setSelectedText} />}
        </>
)}

import React from "react"
import classNames from "classnames"

import { iNotes } from "../../interfaces/molecules"

import { i18n } from "../../utils/i18n"

import { Button } from "../../atoms/Button"
import { Book } from "../../atoms/Icons"
import { default as SvgSad } from "../../atoms/Icons/Sad"

import { NotesList } from "./NotesList"
import { NotesTooltip } from "./NotesTooltip"
import { useNotes } from "./hook"
import './index.scss'

export const Notes = ({ notesRef }: iNotes) => {
    const {
        selectedText,
        mouseCoord,
        hasNewNote,
        showList,
        storedNotesState,
        setHasNewNote,
        setSelectedText,
        handleNotes,
        handleClose
    } = useNotes(notesRef)

    const hasNotes = !!storedNotesState[0].length
    
    return (
        <>
            <div className="notes">
                <Button customClass={classNames({'new': hasNewNote})} action={handleNotes}><Book /></Button>
                { showList && <div className="list__container">
                    { hasNotes 
                        ? <NotesList handleClose={handleClose} storedNotesState={storedNotesState} /> 
                        : <div className="notes__empty">
                            <SvgSad />
                            <p>{i18n('Nenhuma nota salva')}</p>
                        </div>
                    }
                </div>}
                { showList && <div onClick={handleClose} className="notes__bg"></div>}
            </div>
            { selectedText && <NotesTooltip setHasNewNote={setHasNewNote} coord={mouseCoord} text={selectedText} setText={setSelectedText} />}
        </>
)}

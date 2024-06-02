import React from "react"

import { iNotesTooltip } from "../../../interfaces/molecules"

import { Bookmark, Copy, Search } from "../../../atoms/Icons"
import { Button } from "../../../atoms/Button"
import { Tooltip } from "../../../atoms/Tooltip"

import { useNotesTooltip } from "./hook"
import './index.scss'

export const NotesTooltip = ({ coord, text, setText, setHasNewNote } : iNotesTooltip) => {
    const {
        copyBtnText,
        saveNote,
        copyText,
        searchText,
        handleClose
    } = useNotesTooltip(text, setHasNewNote, setText)


    return  (<>
        <Tooltip customClass="notes__tooltip" closeOnClick={handleClose}  highlight style={{ top: coord.y, left: coord.x }}>
            <Button action={saveNote} title="Salvar nota">
                <Bookmark /> Salvar nota
            </Button>
            <Button action={copyText} title="Salvar nota">
                <Copy /> { copyBtnText }
            </Button>
            <Button action={searchText} title="Salvar nota">
                <Search /> Buscar texto
            </Button>
        </Tooltip>
    </>
)}
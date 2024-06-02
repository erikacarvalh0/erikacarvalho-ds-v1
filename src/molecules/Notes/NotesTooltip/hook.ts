import { useState } from "react"

import { getLSItem, setLSItem } from "../../../utils/storage"

export const useNotesTooltip = (text: string, setHasNewNote: any, setText: any) => {
    const [ copyBtnText, setCopyBtnText ] = useState('Copiar texto')
    
    const saveNote = () => {
        const storedNotes = getLSItem('notes')
        const newNote = {
            page: document.title,
            text
        }
        const allNotes = storedNotes ? [newNote, ...storedNotes] : [newNote]
        setLSItem('notes', allNotes)
        setHasNewNote(true)
        handleClose()
        setTimeout(() => setHasNewNote(false), 3000)
    }

    const copyText = () => {
        document.execCommand('copy')
        setCopyBtnText("Text copiado!")
        setTimeout(handleClose, 1000)
    }

    const searchText = () => {
        const queryText = text.replaceAll(/\n/g, '+')
        let a = document.createElement('a')
        a.href = `https://www.google.com/search?q=${queryText}`
        console.log('queryText', a.href)
        a.target = "_blank"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        handleClose()
    }

    const handleClose = () => {
        setText('')
    }

    return {
        copyBtnText,
        saveNote,
        copyText,
        searchText,
        handleClose,
    }
}
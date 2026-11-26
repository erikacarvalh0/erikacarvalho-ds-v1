import { useEffect, useState } from "react"

import { getLSItem } from "../../utils/storage"
import { iNotesRef } from "../../interfaces/molecules"

const getStoredNotes = () => {
    const storedNotes = getLSItem('notes')
    return Array.isArray(storedNotes) ? storedNotes : []
}

export const useNotes = (notesRef: iNotesRef) => {
    const [ selectedText, setSelectedText ] = useState('')
    const storedNotesState = useState(getStoredNotes)
    const [ , setStoredNotes ] = storedNotesState
    const [ showList, setShowList ] = useState(false)
    const [ mouseCoord, setMouseCoord ] = useState({ x: 0, y: 0 })
    const [ hasNewNote, setHasNewNote ] = useState(false)

    const handleNotes = () => {
        const recentStoredNotes = getStoredNotes()
        setStoredNotes(recentStoredNotes)
        setShowList(!showList)
    }

    const addNoteOnMouseUp = (e: any) => {
        const selection = window.getSelection()?.toString() || ''
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setSelectedText(selection)
        setMouseCoord({ x, y })
    }

    useEffect(() => {
        if (notesRef?.current) {
            notesRef.current.addEventListener('mouseup', addNoteOnMouseUp)
        }
    }, [])

    const handleClose = () => {
        setShowList(false)
    }

    return {
        selectedText,
        mouseCoord,
        hasNewNote,
        showList,
        storedNotesState,
        setHasNewNote,
        setSelectedText,
        handleNotes,
        handleClose
    }
}
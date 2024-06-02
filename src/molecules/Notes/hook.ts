import { useEffect, useState } from "react"

import { getLSItem } from "../../utils/storage"
import { iNotes } from "../../interfaces/molecules"

export const useNotes = (notesRef: iNotes) => {
    const [ selectedText, setSelectedText ] = useState('')
    const [ storedNotes, setStoredNotes ] = useState(getLSItem('notes'))
    const [ showList, setShowList ] = useState(false)
    const [ mouseCoord, setMouseCoord ] = useState({ x: 0, y: 0 })
    const [ hasNewNote, setHasNewNote ] = useState(false)

    const handleNotes = () => {
        const recentStoredNotes = getLSItem('notes')
        setStoredNotes(recentStoredNotes)
        setShowList(!showList)
    }

    useEffect(() => {
        if (notesRef?.current) {
            notesRef.current.addEventListener('mouseup', (e: any) => {
                const selection = window.getSelection()?.toString() || ''
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                setSelectedText(selection)
                setMouseCoord({ x, y })
            })
        }
    }, [])

    const handleClose = () => {
        setShowList(false)
    }

    return {
        selectedText,
        storedNotes,
        mouseCoord,
        hasNewNote,
        showList,
        setHasNewNote,
        setSelectedText,
        handleNotes,
        handleClose
    }
}
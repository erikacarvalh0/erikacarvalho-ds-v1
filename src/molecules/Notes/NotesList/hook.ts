import { useRef } from "react"

import { setLSItem } from "../../../utils/storage"

import { iNotesList } from "../../../interfaces/molecules"

import { printCss } from "./print"

export const useNotesList = ({ storedNotesState, handleClose }: iNotesList) => {
	const notesListRef = useRef(null)
	const [ storedNotes, setStoredNotes ] = storedNotesState

	const handleClick = (index: number) => {
		const isAll = index === -1
		if (isAll) {
			setStoredNotes([])
			setLSItem('notes', [])
		} else {
			storedNotes.splice(index, 1)
			setStoredNotes([...storedNotes])
			setLSItem('notes', storedNotes)
		}
	}

	const handleExport = () => {
		handleClose();

		const w = window.open();
		const style = w?.document.createElement('style')
		const main = w?.document.createElement("main")
		
		if (notesListRef?.current && style && main) {
			style?.append(printCss)

			main?.appendChild(notesListRef?.current)
			main?.appendChild(style)

			w?.document.write(main?.innerHTML)
			w?.print()
		}

		w.close()
	}

	const handleCopy = ({ target }: any) => {
		const list = notesListRef?.current?.querySelector('ul')
		if (list) {
			const text = list.innerText
			const tempTextArea = document.createElement('textarea')
			tempTextArea.value = text
			document.body.appendChild(tempTextArea)
			tempTextArea.select()
			document.execCommand('copy')
			document.body.removeChild(tempTextArea)

			const button = target.closest('button')
			button.classList.add('copied');

			setTimeout(() => button.classList.remove('copied'), 2000)
		}
	}

	return {
		notesListRef,
		storedNotes,
		handleClick,
		handleExport,
		handleCopy
	}
}
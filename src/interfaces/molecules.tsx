import { ReactElement } from "react"
import { ReactNode, iFn, iObject } from "./atoms"

export interface iContentDialog {
    text: string,
    highlight?: string,
    href?: string,
    target?: string,
    button?: {
        text: string,
        href: string
    }
}

export interface iDialog { 
    isOpen: boolean, 
    toggleDialog: () => void,
    theme?: 'default' | 'success' | 'error',
    icon?: any,
    title?: string,
    message?: string,
    content?: iContentDialog[]
}

export interface iDialogHook { isOpen: boolean, toggleDialog: () => void }

export interface iForm {
	children: ReactElement[],
    handleSubmit?: (values: iObject) => void,
    buttonText?: string
}

export interface iTable {
    data: iObject[],
    children: ReactNode
}

export interface iNotesTooltip { 
    coord: iObject
    text: string
    setText: any
    setHasNewNote: any
}
export interface iNotesRef{
    current?: HTMLElement | null
}
export interface iNotes {
    notesRef: iNotesRef
}
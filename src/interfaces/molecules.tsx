import { ReactElement } from "react"
import { ReactNode, iObject, iPagConfig, tChildren } from "./atoms"

export interface iCarouselConfig {
    gap?: number
    pagination?: iPagConfig
}

export interface iCarousel {
    children: tChildren[],
    config?: iCarouselConfig
    title?: string
}

export interface iCommentData {
    id: number;
    text: string;
    replies: iCommentData[];
    handleDeleteComment?: any
 }
export interface iComment {
    comment: iCommentData
    handleDeleteComment: any
 }
export interface iComments {
    label?: string
    comments: iCommentData[]
 }


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
    headerActions?: import('react').ReactNode,
    children?: import('react').ReactNode, 
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
	children: ReactElement[] | ReactElement,
    handleSubmit?: (values: iObject) => void,
    buttonText?: string
    customClass?: string
    validate?: (values: Record<string, string>) => Record<string, string | undefined>
    onValidationError?: (errors: Record<string, string | undefined>) => void
}

export interface iTable {
    data: Record<string, ReactNode>[],
    children: ReactNode,
    paginationConfig?: iPagConfig
}

export interface iTags {
    label?: string
}

export interface iNotesTooltip { 
    coord: iObject
    text: string
    setText: any
    setHasNewNote: any
}

export interface iNotesList {
    storedNotesState: any,
    handleClose: any,
}
export interface iNotesRef{
    current?: HTMLElement | null
}
export interface iNotes {
    notesRef: iNotesRef
}
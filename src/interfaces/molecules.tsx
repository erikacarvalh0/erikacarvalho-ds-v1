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
	children?: ReactNode,
    handleSubmit?: (values: iObject) => void,
    buttonText?: string
}

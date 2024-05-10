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

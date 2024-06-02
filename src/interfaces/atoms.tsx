import { MouseEventHandler, ReactElement, ReactPortal } from "react";

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;

export type iFn = () => void
export type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

export interface iLink {
    text?: string,
    href: string,
    target?: string | undefined,
    theme?: "default" | "highlight" | "alert" | "light",
    customClass?: string,
    children?: ReactNode
}
export interface iButton {
    isDisabled?: boolean
    text?: string,
    children?: ReactNode,
    theme?: "neutral" | "cta" | "cancel",
    customClass?: string,
    action: (event: any) => void,
    type?: "submit"
}
export interface iInput {
    label?: string,
    type: "text" | "number" | "date" | "email" | "password"
    customClass?: string,
    name: string,
    fieldError?: boolean,
    rules?: iObject[]
    isRequired?: boolean,
    formValuesState?: any
}
export interface iSelect {
    label?: string,
    customClass?: string,
    name: string,
    fieldError?: boolean,
    options: string[]
}

export interface iObject {
    [key: string]: string | number | boolean | iObject | undefined | iFunction
}

export interface iFunction {
    (value: string): void
}
export interface iTextarea {
    label?: string,
    customClass?: string,
    name: string,
    fieldError?: boolean,
    rows?: number,
    cols?: number,
    resize?: boolean
}
export interface iEmailDomains {
    onClick: (e: any) => void,
    onMouseEnter: (e: any) => void,
    selectedDomain: number,
    showDomains: boolean,
    hasError: boolean,
    domainsRef: any
}
export interface iSelectOptions {
    onClick: (e: any) => void,
    onMouseEnter: (e: any) => void,
    selectedOption: number,
    showOptions: boolean,
    hasError: boolean,
    optionsRef: any,
    options: string[]
}

export interface iImg {
    src: string, 
    srcmobile?: string, 
    maxWidth?: number, 
    media?: number, 
    styled?: boolean,
    customClass?: string
}

export interface iList {
    items: iObject[],
    status?: iObject,
    validateError?: boolean
}

export interface iCard {
    title: string,
    subtitle: string,
    img?: iImg,
    text?: string,
    list?: iList,
    button?: iButton,
    link?: iLink,
    children?: ReactNode
}

export interface iAccordion {
    title: string,
    children: ReactNode,
    hasArrow?: boolean,
    acqua?: boolean,
    pink?: boolean,
    size?: 'large' | 'small'
}

export interface iTab { 
    title: string,
    icon?: any,
    children: ReactNode,
    index?: number,
    activeId?: string
}

export interface iTabs { 
    theme: 'default' | 'primary' | 'secondary'
}

export interface iTabsHeader {
    children: ReactNode, 
    handleOnChange: any, 
    id: number
}

export interface iTCol {
    children: ReactNode 
    sort: string
    id: string
}

export interface iMedia {
    src: string
    title: string
    forward?: boolean
    rewind?: boolean
    download?: boolean
    fullScreen?: boolean
    theme?: 'highlight'
}

export interface iMediaControls {
    mediaRef: any
    forward?: boolean
    rewind?: boolean
    download?: boolean
    fullScreen?: boolean
}
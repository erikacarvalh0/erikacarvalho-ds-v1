import { ReactElement, ReactPortal } from "react";

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;


export interface iLink {
    text?: string,
    href: string,
    target?: string | undefined,
    theme?: "default" | "highlight" | "alert" | "light",
    customClass?: string,
    children?: ReactNode
}
export interface iButton {
    text?: string,
    children?: ReactNode,
    theme?: "neutral" | "cta" | "cancel",
    customClass?: string,
    action: () => void
}
export interface iInput {
    label?: string,
    type: "text" | "number" | "date" | "email" | "password"
    customClass?: string,
    name: string,
    fieldError?: boolean
}
export interface iEmailDomains {
    onClick: (e: any) => void,
    onMouseEnter: (e: any) => void,
    selectedDomain: number,
    showDomains: boolean,
    hasError: boolean,
    domainsRef: any
}
import { iContentDialog } from "./molecules";

export interface iHeaderLinks {
    text: string,
    href: string,
    target?: string | undefined,
}

export interface iHeader {
    content?: iContentDialog[],
    links: iHeaderLinks[],
    title: string,
    routerContext: any
}
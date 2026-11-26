import type React from "react";
import { iContentDialog } from "./molecules";

export interface iHeaderLinks {
    text: string,
    href: string,
    target?: string | undefined,
    icon?: React.ReactNode,
    isActive?: boolean,
}

export interface iHeader {
    content?: iContentDialog[],
    links: iHeaderLinks[],
    title: string,
    routerContext: any,
    isFixed?: boolean,
    logo?: React.ReactNode,
    logoHref?: string,
    footerLinks?: iHeaderLinks[],
    footerContent?: React.ReactNode
}
import type { ReactElement, ReactNode as NativeReactNode } from "react";

export type ReactChild = ReactElement | string | number | ReactElement[];
export type iFn = () => void
export type ReactNode = NativeReactNode;
export type tChildren = ReactElement

export type iCarouselLayout = "ctrls-in-line" | "vertical-align"
export interface iCarouselResponsive {
    breakpoint: number,
    settings: {
      layout: iCarouselLayout,
      centerSingleItemAW?: boolean
    }
  }
export interface iCarouselConfig  {
    autoWidth?: boolean,
    maxDots?: boolean,
    groupScroll?: boolean,
    layout?: iCarouselLayout,
    dots?: boolean,
    itemsPerPage: number,
    responsive?: iCarouselResponsive[]
}

export interface iCarouselContext { 
    itemsPerPage?: number,
    config?: iCarouselConfig,
    childrenArr?: ReactNode[],
    activeItem: number,
    isPrevious: boolean
}

export interface iCompChildren {
    children: ReactNode
}

export interface iLink {
    text?: string,
    href: string,
    target?: string | undefined,
    theme?: "default" | "highlight" | "alert" | "light",
    customClass?: string,
    children?: ReactNode
    routerContext?: any
    onFocus?: any
}

export interface iBreadcrumbData {
	id: number;
	name: string;
	children?: iBreadcrumbData[];
};
export interface iBreadcrumb {
	data: iBreadcrumbData[];
    selectedId: number;
};
export interface iButton {
    isDisabled?: boolean
    text?: string,
    title?: string,
    children?: ReactNode,
    theme?: "neutral" | "cta" | "cancel",
    customClass?: string,
    action: (event: any) => void,
    type?: "button" | "submit" | "reset"
}
export type FieldValidator = (value: string) => string | undefined

export interface iInput {
    label?: string,
    type?: "text" | "number" | "date" | "email" | "password" | "month" | "search"
    defaultValue?: string
    validate?: FieldValidator
    onValueChange?: (value: string) => void
    customClass?: string,
    name: string,
    fieldError?: boolean,
    rules?: iObject[]
    isRequired?: boolean,
    formValuesState?: any
    handleOnChange?: any
    preventValidation?: boolean
}
export interface iSelect {
    label?: string,
    customClass?: string,
    name: string,
    fieldError?: boolean,
    options: Array<string | { value: string; label: string }>
    defaultValue?: string
    isRequired?: boolean
    onValueChange?: (value: string) => void
}

export interface iObject {
    [key: string | number]: string | number | boolean | iObject | undefined | iFunction | ReactNode
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
    items: (iObject & { text?: ReactNode })[],
    status?: iObject,
    validateError?: boolean
}

export interface iCard {
    title: string,
    subtitle: string,
    img?: iImg,
    text?: string,
    list?: iList["items"],
    button?: iButton,
    link?: iLink,
    children?: ReactNode
}

export interface iAccordion {
    defaultOpen?: boolean,
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
    onPressEnter: any, 
    id: number,
    activeId: string
}

export interface iTCol {
    children: ReactNode 
    sort?: boolean
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

export interface iTooltip {
    children: ReactChild[]
    customClass?: string
    highlight?: boolean
    closeOnClick?: iFn
    props?: any
    style?: any
}

export interface iPagConfig {
    maxPagesNums?: number,
    itemsPerPage: number,
    arrows?: boolean,
    dots?: boolean,
    theme?: 'default' | 'highlight' | 'cta',
    return?: boolean
}

export interface iPagination {
    config: iPagConfig,
    allItems: any[],
    visibleItemsState: any
}

export interface iTableRow {
    rowIndex: number
    row: Record<string, ReactNode>
    hiddenCols: any[]
    rowsIndexes: string[]
    header: ReactNode
}

export interface iBarColumnData {
    [key: string]: number[] | iObject[] | number
}
export interface iPieData {
    label: string,
    percentage: number,
    color: string,
}
export interface iChartConfig {
    interval?: number,
    type: 'line' |  'bar' | 'column' | 'pie'
}

export interface iChart {
    config: iChartConfig,
    data: number[] | iPieData[] | iBarColumnData
}
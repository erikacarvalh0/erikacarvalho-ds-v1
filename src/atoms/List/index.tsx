import React from "react"
import classNames from "classnames"

import { iList, iObject } from "../../interfaces/atoms"

import './index.scss'

export const List = ({ items, status, validateError }: iList) => {
    return (
    <ul className="list" tabIndex={0}>
        { items.map((item: iObject, index: number) => item.text && 
            <li tabIndex={index + 1} key={index} className={classNames("list__item", {
                "success": status?.[index], 
                "error": !validateError ? (!status?.[index] && validateError) : !status?.[index]
            })}>
                { item.text }
            </li>
        )}
    </ul>
)}
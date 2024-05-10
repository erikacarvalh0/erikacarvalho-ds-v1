import React from "react"
import classNames from "classnames"

import { iList, iObject } from "../../interfaces/atoms"

import './index.scss'

export const List = ({ items, status, validateError }: iList) => {
    return (
    <ul className="list">
        { items.map((item: iObject, index: number) => item.text && 
            <li key={index} className={classNames("list__item", {
                "success": status?.[index], 
                "error": !validateError ? (!status?.[index] && validateError) : !status?.[index]
            })}>
                { item.text }
            </li>
        )}
    </ul>
)}
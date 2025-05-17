import React from "react"
import classNames from "classnames"

import { i18n } from "../../../utils/i18n"

import { iObject } from "../../../interfaces/atoms"
import { iNotesList } from "../../../interfaces/molecules"

import { Copy, Download } from "../../../atoms/Icons"
import { default as SvgTrash } from "../../../atoms/Icons/Trash"
import { Button } from "../../../atoms/Button"

import { useNotesList } from "./hook"
import './index.scss'

export const NotesList = (props: iNotesList) => {
	const {  notesListRef, storedNotes, handleClick, handleCopy, handleExport } = useNotesList(props)

    return (
		<section ref={notesListRef}>
			<header className="list__header">
				<p>{i18n('Suas notas')}</p>
				<div className="list__buttons">
					<Button action={handleCopy}><Copy /></Button>
					<Button action={handleExport}><Download /></Button>
					<Button action={() => handleClick(-1)}><SvgTrash /></Button>
				</div>
			</header>
			<ul className="list" tabIndex={0}>
				{ storedNotes.map((item: iObject, index: number) => item.text && 
					<li tabIndex={index + 1} key={index} className={classNames("list__item")}>
						<p className="list__text">{item.text}</p>
						<Button action={() => handleClick(index)}><SvgTrash /></Button>
					</li>
				)}
			</ul>
		</section>
)}
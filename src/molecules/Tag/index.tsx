import React, { useState } from "react"

import { iTags } from "../../interfaces/molecules"

import { default as SvgTrash } from "../../atoms/Icons/Trash"
import { Input } from "../../atoms/Input"
import { Button } from "../../atoms/Button"

import "./index.scss"

export const Tags = ({ label }: iTags) => {
	const [tags, setTags] = useState<Set<string>>(new Set());
	let typingTimer: any

	const handleOnChange = ({ target } : any, setValue: any) => {
		clearTimeout(typingTimer);

        typingTimer = setTimeout(() => {
			const newTag = target.value.trim();

			if (newTag && !tags.has(newTag)) {
				const updatedTags = new Set(tags);
				updatedTags.add(newTag);
				setTags(updatedTags);
				setValue('')
			}
		}, 500);
		
	}
	const handleDeleteTag = (tagToDelete: string) => {
		const updatedTags = new Set(tags);
		updatedTags.delete(tagToDelete);
		setTags(updatedTags);
	  };

	return (
		<section className="tag__container">
			<Input preventValidation={true} handleOnChange={handleOnChange} customClass="tag__input" name="tag" label={label || "Tag name"} />
			{!!tags.size && <ul className="tag__list">
				{ [...tags].map((tag: string) => (
					<li className="tag__list-item" key={tag} >
						<p>{tag}</p>
						<Button action={() => handleDeleteTag(tag)}><SvgTrash /></Button>
					</li>
				))}
			</ul>}
		</section>

    )
}
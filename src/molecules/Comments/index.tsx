import React, { useState } from "react"

import { iComment, iCommentData, iComments } from "../../interfaces/molecules"
import { default as SvgTrash } from "../../atoms/Icons/Trash"

import { Input } from "../../atoms/Input"
import { Button } from "../../atoms/Button"
import "./index.scss"
import { Form } from "../Form"
import { Comment } from "./Comment"


export const Comments = ({ comments, label }: iComments) => {
	const [allComments, setAllComments] = useState(comments);
	// const [ reply, setReply ] = useState(false)

	const handleSubmit = (inputs : any) => {
		const [text] = Object.values(inputs)
		const randId = Math.random()
		const currComment = {
			id: randId,
			text,
			replies: []

		}
		setAllComments([currComment, ...allComments])
	}
	const handleDeleteComment = (currId: number) => {
		const updatedComments = allComments.filter(({ id }) => id === currId)
		setAllComments(updatedComments);
	};
	
	// const handleReply = () => {
	// 	setReply(true)
	// }

	return (
		<section className="comments__container">
			<Form buttonText="Add" handleSubmit={handleSubmit} >
				<Input isRequired preventValidation={true} customClass="comment__input" name="comment" label={label || "Add your comment"} />
			</Form>
			{!!allComments.length && <ul className="comments__list">
				{ allComments.map((comment: iCommentData) => (
					<li key={comment.id} className="comments__list-item">
						<Comment handleDeleteComment={handleDeleteComment} comment={comment} />
						{/* <Button action={() => handleReply()}><SvgTrash /></Button> */}
					</li>
				))}
			</ul>}
		</section>

    )
}
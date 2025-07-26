import React from "react"
import { iComment } from "../../../interfaces/molecules";

import { default as SvgTrash } from "../../../atoms/Icons/Trash"
import { Button } from "../../../atoms/Button";

export const Comment: React.FC<iComment> = ({ comment, handleDeleteComment }) => {
	const { id, text, replies } = comment
	return (
	  <article key={id}>
		<div>
			<p>🗨️ {text}</p>
			<Button action={() => handleDeleteComment(id)}><SvgTrash /></Button>
		</div>
		{replies.length > 0 && (
		  <section>
			{replies.map(reply => (
			  <Comment key={reply.id} comment={reply} handleDeleteComment={handleDeleteComment} />
			))}
		  </section>
		)}
	  </article>
	);
  };
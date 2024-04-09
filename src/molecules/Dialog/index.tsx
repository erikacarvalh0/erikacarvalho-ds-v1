import React from "react"

export const Dialog = () => {
    return (
		<dialog data-js="infoModal" className="modal__info">
			<button  className="modal__close" data-js="hideInfo">X</button>
			<header className="modal__header">
				<h2 className="modal__title"> About this project</h2>
			</header>

			<section className="modal__body">
				<p className="modal__text">
					<strong>Objetivo técnico:</strong>
					Treinar manipulação de SVG com animações CSS.
				</p>
				
				<p className="modal__text">
					<strong>Stack utilizada:</strong>
					Pug/Jade, Stylus, JS vanilla
				</p>
				
				<p className="modal__text">
					<strong>Tempo para desenvolvimento v1:</strong>
					Aproximadamente 18h
				</p>
				
				<p className="modal__text">
					<strong>Repositório:</strong>
					<a href="https://github.com/erikacarvalh0/badges-display" target="_blank"> Github</a>
				</p>
			</section>	
		</dialog>
    )
}
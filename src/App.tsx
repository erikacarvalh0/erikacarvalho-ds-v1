import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Header } from "./organisms/Header";
import { headerContent, headerLinks } from "./data/example/header";
import { Dialog } from "./molecules/Dialog";
import { dialogErrorContent, dialogSuccessContent } from "./data/example/dialog";
import { Button } from "./atoms/Button";
const App = () => {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [isErrorOpen, setIsErrorOpen] = useState(false)
  const toggleSuccess = () => setIsSuccessOpen(!isSuccessOpen)
  const toggleError = () => setIsErrorOpen(!isErrorOpen)

  return (<div className="container">
    <Header title="Sobre o Projeto" content={headerContent} links={headerLinks} />
    <div>Name: ecds</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Empty CSS</div>

    <Button theme="cta" text="Open Success" action={toggleSuccess} />
    <Button theme="cancel" text="Open Error" action={toggleError} />

    <Dialog 
      theme="success"
      isOpen={isSuccessOpen}
      toggleDialog={toggleSuccess}
      message={dialogSuccessContent}
    />
    <Dialog 
      theme="error"
      isOpen={isErrorOpen}
      toggleDialog={toggleError}
      content={[dialogErrorContent]}
      title="Não foi possível enviar a sua mensagem"
    />
  </div>
)};
ReactDOM.render(<App />, document.getElementById("app"));

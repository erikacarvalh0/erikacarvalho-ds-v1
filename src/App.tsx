import React from "react";
import ReactDOM from "react-dom";

import { Header } from "./organisms/Header";
const App = () => (
  <div className="container">
    <Header />
    <div>Name: ecds</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Empty CSS</div>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));

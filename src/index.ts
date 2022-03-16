import ReactDOM from './react-dom';
import React from './react'

ReactDOM.render(React.createElement("h1", {style:"color:red"}, "Hello, world!",React.createElement("span",{style:"color:yellow"},"hi children",React.createElement("div",{style:"color:#000"},"hi,mini-react"))), document.getElementById("root"));
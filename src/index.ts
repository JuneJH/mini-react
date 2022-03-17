import ReactDOM from './react-dom';
import React from './react'

ReactDOM.render(React.createElement("div", {style:"color:red"}, "Hello, world!",React.createElement("span",{style:"color:yellow"},"hi children",React.createElement("a",{style:"color:#000"},"hi,mini-react"))), document.getElementById("root"));
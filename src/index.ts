import ReactDOM from './react-dom';
import React from './react';

function Title(props:any) {
    return React.createElement(
        "div",
        null,
        props.title
    );
}

ReactDOM.render(React.createElement("div", {style:"color:red"}, React.createElement(Title, { title: "函数组件" }),React.createElement("span",{style:"color:yellow"},"hi children",React.createElement("a",{style:"color:#000"},"hi,mini-react"))), document.getElementById("root"));
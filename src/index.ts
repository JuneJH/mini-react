import ReactDOM from './react-dom';
import React from './react';

function Title(props:any) {
    return React.createElement(
        "div",
        null,
        props.title
    );
}
class HelloMessage extends React.Component {
    render() {
        return React.createElement(
            "div",
            null,
            "Hello ",
            this.props.name,
        );
    }
}

ReactDOM.render(React.createElement("div", {style:"color:red"},React.createElement(HelloMessage,{name:"类组件"}), React.createElement(Title, { title: "函数组件" }),React.createElement("div",{style:"color:orange"},"hi children",React.createElement("div",{style:"color:#000"},"hi,mini-react"))), document.getElementById("root"));
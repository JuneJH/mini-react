import ReactDOM from './react-dom';
import React,{useState} from './react';

function Title(props:any) {
    const [state,setState] = useState(0);
    console.log("获得的state",state)
    // return React.createElement(
    //     "div",
    //     null,
    //     React.createElement("button",{onClick:()=>{setState(state+1)}},state),
    //     state % 2 == 0 ? React.createElement("div",null,"测试是否显示"):null,

    // );
    return <div>
        <button onClick={()=>{setState(state + 1)}}>{state}</button>
        {state % 2 == 0 ?<div>测试是否显示</div>:null}
    </div>
}
// class HelloMessage extends React.Component {
//     render() {
//         return React.createElement(
//             "div",
//             null,
//             "Hello ",
//             this.props.name,
//         );
//     }
// }

// ReactDOM.render(React.createElement("div", {style:"color:red"},React.createElement(HelloMessage,{name:"类组件"}), React.createElement(Title, { title: "函数组件" }),React.createElement("div",{style:"color:orange"},"hi children",React.createElement("div",{style:"color:#000"},"hi,mini-react"))), document.getElementById("root"));
ReactDOM.render(React.createElement(Title, { title: "函数组件" }), document.getElementById("root"));
// ReactDOM.render(React.createElement(Title, { title: "函数组件" }), document.getElementById("root"));
// ReactDOM.render(<div>hello react</div>,document.getElementById("root"))


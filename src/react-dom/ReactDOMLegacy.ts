function render(vdom:any,container:any){
    const node = createNode(vdom);
    container.appendChild(node);

}

function createNode(vdom:any){
    const {type} = vdom;
    if(typeof type === "string"){
        const node = updateHostComponent(vdom);
        return node;
    }
}

function updateHostComponent(vdom:any){
    const {type,children} = vdom;
    const node = document.createElement(type);
    if(children.length === 1){
        const text = document.createTextNode(children[0]);
        node.appendChild(text);
    }
    return node;
}

export {
    render
}
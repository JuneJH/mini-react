function render(node:any,container:any){
    const {type,children} = node;
    if(typeof type === "string"){
        const n = document.createElement(type);
        const text = document.createTextNode(children[0]);
        n.appendChild(text);
        container.appendChild(n);
    }
}

export {
    render
}
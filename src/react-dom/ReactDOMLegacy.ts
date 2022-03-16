function render(vdom: any, container: any) {
    const node = createNode(vdom);
    container.appendChild(node);

}

function createNode(vdom: any) {
    const { type } = vdom;
    if (typeof type === "string") {
        const node = updateHostComponent(vdom);
        return node;
    }
}

function updateHostComponent(vdom: any) {
    const { type, children,props } = vdom;
    console.log(children)
    const node = document.createElement(type);
    updateProps(node,props);
    reconcileChildren(children, node);
    return node;
}

function updateProps(node:any,props:any){
    Object.keys(props).forEach((key:string)=>{
        node.setAttribute(key,props[key]);
    })
}

function reconcileChildren(children: any, node: any) {
    children.forEach((child: any) => {
        if(typeof child !== "object"){
            const text = document.createTextNode(child);
            node.appendChild(text);
        }else{
            render(child,node);
        }
    })
}
export {
    render
}
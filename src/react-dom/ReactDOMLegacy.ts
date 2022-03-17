function render(vDom: any, container: any) {
    workInProgressRoot = {
        stateNode:container,
        props:{children:vDom}
    };
    nextUnitWork = workInProgressRoot;
    console.log(workInProgressRoot)
}

function updateHostComponent(workInProgress: any) {
    const { props } = workInProgress;
    console.log("updateHost",workInProgress)
    if(!workInProgress.stateNode){
        console.log("runnn update")
        workInProgress.stateNode = createNode(workInProgress);
    }
    reconcileChildren(workInProgress,props.children);

}
function createNode(workInProgress: any) {
    const { type,props } = workInProgress;
    let node = null;
    if (typeof type === "string") {
        node = document.createElement(type);
    }
    updateProps(node,props);
    return node;
}
function  updateFunctionComponent(workInProgress:any){

}

function updateProps(node:any,props:any){
    Object.keys(props).forEach((key:string)=>{
        if(key === "children"){
            if(typeof props[key] === "string"){
                const  text = document.createTextNode(props[key]);
                node.appendChild(text);
            }else if(Array.isArray(props[key])){
                props[key].forEach((p:any)=>{
                    if(typeof p === "string"){
                        const  text = document.createTextNode(p);
                        node.appendChild(text);
                    }
                })
            }

        }else {
            node.setAttribute(key,props[key]);
        }
    })
}

function reconcileChildren(workInProgress: any, children: any) {
    if(typeof children !== "object" && typeof  children !== "function"){
        return;
    }
    children = Array.isArray(children)?children:[children];
    let previousNewFiber:any = null;
    let flag = 0;
    for(let i = 0; i < children.length; i ++){
        const child = children[i];
        if(typeof child !== "object"){
            if(i === 0){
                flag ++;
            }
            continue;
        }
        const newFiber = {
            child:null,
            sibling:null,
            return:workInProgress,
            type:child.type,
            props:child.props,
            stateNode:null
        }
        if(i === flag){
            workInProgress.child = newFiber;
        }else{
            previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
    }

}
function  workLoop(idleDeadline:any){
    while(idleDeadline.timeRemaining() > 0 && nextUnitWork){
        nextUnitWork =  performUintWork(nextUnitWork);
    }
    if(!nextUnitWork && workInProgressRoot){
        commitRoot();
    }
}
function  performUintWork(workInProgress:any){
    const {type} = workInProgress;
    if(typeof type === "function"){
        updateFunctionComponent(workInProgress);
    }else{
        updateHostComponent(workInProgress);
    }
    if(workInProgress.child){
        console.log("have child",workInProgress.child)
        return workInProgress.child;
    }
    let nextWorkInProgress = workInProgress;
    while (nextWorkInProgress){
        if(nextWorkInProgress.sibling){
            return  nextWorkInProgress.sibling;
        }
        nextWorkInProgress = nextWorkInProgress.return;
    }
}
function  commitRoot(){
    commitWork(workInProgressRoot.child);
    workInProgressRoot = null;
}
function commitWork(workInProgress:any){
    if(!workInProgress){
        return;
    }
    let parentFiber = workInProgress.return;
    while (!parentFiber.stateNode){
        parentFiber = parentFiber.return;
    }
    if(workInProgress.stateNode){
        parentFiber.stateNode.appendChild(workInProgress.stateNode);
    }
    commitWork(workInProgress.child);
    commitWork(workInProgress.sibling);

}
let nextUnitWork:any = null;
let workInProgressRoot:any = null;

requestIdleCallback(workLoop)



export {
    render
}
/**
 * render函数，设置协调条件
 * @param vDom
 * @param container
 */
function render(vDom: any, container: any) {
    workInProgressRoot = {
        stateNode:container,
        props:{children:vDom}
    };
    nextUnitWork = workInProgressRoot;
    console.log(workInProgressRoot)
}

/**
 * 更新原生组件
 * @param workInProgress
 */
function updateHostComponent(workInProgress: any) {
    const { props } = workInProgress;
    if(!workInProgress.stateNode){
        workInProgress.stateNode = createNode(workInProgress);
    }
    reconcileChildren(workInProgress,props.children);

}

/**
 * 创建DOM
 * @param workInProgress
 */
function createNode(workInProgress: any) {
    const { type,props } = workInProgress;
    let node = null;
    if (typeof type === "string") {
        node = document.createElement(type);
    }
    updateProps(node,props);
    return node;
}

/**
 * 处理函数组件
 * @param workInProgress
 */
function  updateFunctionComponent(workInProgress:any){
    const {type,props} = workInProgress;
    const children = type(props);
    reconcileChildren(workInProgress,children)
}

/**
 * 处理类组件
 * @param workInProgress
 */
function  updateClassComponent(workInProgress:any){
    const {type,props} = workInProgress;
    const instance = new type(props);
    const children = instance.render();
    reconcileChildren(workInProgress,children);

}

/**
 * 更新属性
 * @param node
 * @param props
 */
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

/**
 * 协调子元素,生成fiber架构
 * @param workInProgress
 * @param children
 */
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

/**
 * 空闲时间工作
 * @param idleDeadline
 */
function  workLoop(idleDeadline:any){
    while(idleDeadline.timeRemaining() > 0 && nextUnitWork){
        nextUnitWork =  performUintWork(nextUnitWork);
    }
    if(!nextUnitWork && workInProgressRoot){
        commitRoot();
    }
}

/**
 * 执行最小单元，返回下一个
 * @param workInProgress
 */
function  performUintWork(workInProgress:any){
    const {type} = workInProgress;
    if(typeof type === "function"){
        type.isClassComponent ?  updateClassComponent(workInProgress):updateFunctionComponent(workInProgress);
    }else{
        updateHostComponent(workInProgress);
    }
    if(workInProgress.child){
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

/**
 * 提交任务
 */
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
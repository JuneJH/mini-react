import { ClassComponent, createFiber, Deletion, FunctionComponent, HostComponent, Placement, Update } from "../react-reconciler";

let nextUnitWork: any = null;
let workInProgressRoot: any = null;
let fiberRoot: any = null;
let fiberWorking: any = null;
let delDep: any = [];

function setWorkInProgressRoot(val: any) {
    workInProgressRoot = val;
}
function setNextUnitWork(val: any) {
    nextUnitWork = val
}
function getFiberRoot(): any {
    return fiberRoot;
}
function getFiberWorking() {
    return fiberWorking;
}
function setDelDep(val: any) {
    delDep = val;
}
function getDelDep(): any {
    return delDep;
}

/**
 * render函数，设置协调条件
 * @param vDom
 * @param container
 */
function render(vDom: any, container: any) {
    console.log("cofom",vDom)
    workInProgressRoot = {
        stateNode: container,
        props: { children: vDom }
    };
    nextUnitWork = workInProgressRoot;
    setDelDep([]);
}

/**
 * 更新原生组件
 * @param workInProgress
 */
function updateHostComponent(workInProgress: any) {
    const { props } = workInProgress;
    if (!workInProgress.stateNode) {
        workInProgress.stateNode = createNode(workInProgress);
    }
    reconcileChildren(workInProgress, props.children);
}

/**
 * 创建DOM
 * @param workInProgress
 */
function createNode(workInProgress: any) {
    const { type, props } = workInProgress;
    let node = null;
    if (typeof type === "string") {
        node = document.createElement(type);
    }
    updateProps(node, props);
    return node;
}

/**
 * 处理函数组件
 * @param workInProgress
 */
function updateFunctionComponent(workInProgress: any) {
    const { type, props } = workInProgress;
    fiberWorking = workInProgress;
    fiberWorking.hooks = [];
    fiberWorking.hooksIndex = 0;
    const children = type(props);
    reconcileChildren(workInProgress, children)
}

/**
 * 处理类组件
 * @param workInProgress
 */
function updateClassComponent(workInProgress: any) {
    const { type, props } = workInProgress;
    const instance = new type(props);
    const children = instance.render();
    reconcileChildren(workInProgress, children);

}
const eventMap: any = {
    "onClick": "onclick"
}
/**
 * 更新属性
 * @param node
 * @param props
 */
function updateProps(node: any, props: any) {
    Object.keys(props).forEach((key: string) => {
        if (key === "children") {
            if (typeof props[key] === "string") {
                const text = document.createTextNode(props[key]);
                node.appendChild(text);
            } else if (Array.isArray(props[key])) {
                props[key].forEach((p: any) => {
                    if (typeof p === "string" || typeof p === "number") {
                        node.innerHTML = p;
                    }
                })
            }

        } else if (key.includes("on")) {
            node[eventMap[key]] = props[key];
        } else {
            node.setAttribute(key, props[key]);
        }
    })
}

/**
 * 协调子元素,生成fiber架构
 * @param workInProgress
 * @param children
 */
function reconcileChildren(workInProgress: any, children: any) {
    children = Array.isArray(children) ? children : [children];
    children = children.filter((child: any) => typeof child === "object");
    let previousNewFiber: any = null;
    let oldFiber = workInProgress.elementType && workInProgress.elementType.child;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const isSame = oldFiber && child && oldFiber.type === child.type;
        let newFiber = null;
        if (isSame) {
            const tag = typeof child.type === "function" ? child.type.isClassComponent ? ClassComponent : FunctionComponent : HostComponent;
            newFiber = createFiber({ tag, key: child.key, pendingProps: child.props });
            newFiber.flags = Update;
            newFiber.stateNode = oldFiber.stateNode;
            newFiber.child = oldFiber.child;
            newFiber.sibling = oldFiber.sibling;
            newFiber.return = oldFiber.return;
            newFiber.type = oldFiber.type;
            newFiber.stateNode = oldFiber.stateNode;
            newFiber.elementType = oldFiber;
        }
        if (!isSame && child) {
            const tag = typeof child.type === "function" ? child.type.isClassComponent ? ClassComponent : FunctionComponent : HostComponent;
            newFiber = createFiber({ tag, key: child.key, pendingProps: child.props });
            newFiber.flags = Placement;
            newFiber.type = child.type;
            newFiber.return = workInProgress;
        }
        if (!isSame && oldFiber) {
            oldFiber.flags = Deletion
            delDep.push(oldFiber);
        }
        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }
        if (i === 0) {
            workInProgress.child = newFiber;
        } else {
            previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
    }

}
/**
 * 执行最小单元，返回下一个
 * @param workInProgress
 */
function performUintWork(workInProgress: any) {
    const { type } = workInProgress;
    if (typeof type === "function") {
        type.isClassComponent ? updateClassComponent(workInProgress) : updateFunctionComponent(workInProgress);
    } else {
        updateHostComponent(workInProgress);
    }

    if (workInProgress.child) {
        return workInProgress.child;
    }
    let nextWorkInProgress = workInProgress;
    while (nextWorkInProgress) {
        if (nextWorkInProgress.sibling) {
            return nextWorkInProgress.sibling;
        }
        nextWorkInProgress = nextWorkInProgress.return;
    }
}

/**
 * 提交任务
 */
function commitRoot() {
    delDep.forEach(commitWork);
    commitWork(workInProgressRoot.child);
    fiberRoot = workInProgressRoot;
    workInProgressRoot = null;
}

function commitWork(workInProgress: any) {
    console.log(workInProgress)
    if (!workInProgress) {
        return;
    }
    let parentFiber = workInProgress.return;
    while (!parentFiber.stateNode) {
        parentFiber = parentFiber.return;
    }
    if (workInProgress.flags === Placement && workInProgress.stateNode) {
        parentFiber.stateNode.appendChild(workInProgress.stateNode);
    } else if (workInProgress.flags === Update && workInProgress.stateNode) {
        updateProps(workInProgress.stateNode, workInProgress.props);
    } else if (workInProgress.flags === Deletion && workInProgress.stateNode) {
        commitDel(parentFiber, workInProgress);
    }
    commitWork(workInProgress.child);
    commitWork(workInProgress.sibling);
}
function commitDel(parentFiber: any, workInProgress: any) {
    if (workInProgress.stateNode) {
        parentFiber.stateNode.removeChild(workInProgress.stateNode);
    } else {
        commitDel(parentFiber, workInProgress.child);
    }

}
/**
 * 空闲时间工作
 * @param idleDeadline
 */
function workLoop(idleDeadline: any) {
    while (idleDeadline.timeRemaining() > 0 && nextUnitWork) {
        nextUnitWork = performUintWork(nextUnitWork);
    }
    if (!nextUnitWork && workInProgressRoot) {
        commitRoot();
    }
    requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop)

export {
    render,
    setWorkInProgressRoot,
    setNextUnitWork,
    getFiberRoot,
    getFiberWorking,
    setDelDep
}
//递归中 递

import { ReactElementType } from "shared/ReactTypes";
import { FiberNode } from "./fiber";
import { processUpdateQueue, UpdateQueue } from "./updateQueue";
import { HostComponent, HostRoot, HostText } from "./workTags";

export const beginWork = (wip: FiberNode) => {
    // 比较，返回子fiberNode
    switch (wip.tag) {
        case HostRoot:
            return updateHostRoot(wip);

        case HostComponent:
            return updateHostComponent(wip);

        case HostText:
            return null;

        default:
            if (__DEV__) {
                console.warn("TODO未实现类型 ")
            }
    }

}

function updateHostRoot(wip: FiberNode) {
    const baseState = wip.memoizedState;
    const updateQueue = wip.updateQueue as UpdateQueue<Element>;
    const pending = updateQueue.shared.pending;
    updateQueue.shared.pending = null;
    const { memoizedState } = processUpdateQueue(baseState, pending);

    wip.memoizedState = memoizedState;

    const nextChildren = wip.memoizedState;
    reconcileChildren(wip, nextChildren);
    return wip.child;

}

function updateHostComponent(wip: FiberNode) {
    const nextProps: any = wip.pendingProps;
    const nextChildren = nextProps.children;
    reconcileChildren(wip, nextChildren);
    return wip.child;

}

function reconcileChildren(wip: FiberNode, children?: ReactElementType) {
    const current = wip.alternate;


    reconcileChildFiber(wip, children);
}


function reconcileChildFiber(wip: FiberNode, children?: ReactElementType) {
    const current = wip.alternate;
    if (current !== null) {
        // update
    } else {
        // mount
    }

    reconcileChildren(wip, current?.child, children)

}
import { beginWork } from "./beginWork";
import { completeWork } from "./completeWork";
import { createWorkInProgress, FiberNode } from "./fiber";
import { HostRoot } from "./workTags";
import { FiberRootNode } from "./fiber";
import { Props } from "shared/ReactTypes";

let workInProgress: FiberNode | null = null;


function prepareFreshStack(root: FiberRootNode) {
    workInProgress = createWorkInProgress(root.current, {} as Props);

}

export function scheduleUpdateOnFiber(fiber: FiberNode) {
    const root = markUpdateFromFiberToRoot(fiber);
    if (root !== null) {
        renderRoot(root);
    }
}

export function markUpdateFromFiberToRoot(fiber: FiberNode) {
    let node = fiber;
    let parent = node.return;
    while (parent !== null) {
        node = parent;
        parent = node.return;
    }
    if (node.tag === HostRoot) {
        return node.stateNode;
    }
    return null;
}

export function renderRoot(root: FiberRootNode) {
    // 初始化
    prepareFreshStack(root);

    do {
        try {
            workLoop();
        } catch (error) {
            if (__DEV__) {
                console.error("workLoop", error);
            }
            workInProgress = null;
        }

    } while (workInProgress !== null);
}

function workLoop() {
    while (workInProgress !== null) {
        performUnitOfWork(workInProgress)
    }
}

function performUnitOfWork(fiber: FiberNode) {

    const next = beginWork(fiber);
    fiber.memoizedProps = fiber.pendingProps;

    if (next === null) {
        completeUnitOfWork(next)
    } else {
        workInProgress = next;
    }

}

function completeUnitOfWork(fiber: FiberNode) {
    let node: FiberNode | null = fiber;

    do {
        completeWork(node);
        const sibling = node?.sibling;
        if (sibling) {
            workInProgress = sibling;
            return;
        }
        node = node?.return;
        workInProgress = node;

    } while (node !== null);
}
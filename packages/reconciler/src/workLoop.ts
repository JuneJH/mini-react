import { beginWork } from "./beginWork";
import { completeWork } from "./completeWork";
import { FiberNode } from "./fiber";

let workInProgress: FiberNode | null = null;


function prepareFreshStack(fiber: FiberNode) {
    workInProgress = fiber;

}

export function renderRoot(root: FiberNode) {
    // 初始化
    prepareFreshStack(root);

    do {
        try {
            workLoop();
        } catch (error) {
            console.error("workLoop", error);
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
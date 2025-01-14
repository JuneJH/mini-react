import { Container } from "hostConfig";
import { createUpdate, createUpdateQueue, enqueueUpdate } from "./updateQueue";
import { FiberNode, FiberRootNode } from "./fiber";
import { HostRoot } from "./workTags";
import { Key, Props, ReactElementType } from "shared/ReactTypes";
import { scheduleUpdateOnFiber } from "./workLoop";

export function createContainer(containerInfo: Container) {
    const hostRootFiber = new FiberNode(HostRoot, {} as Props, null as unknown as Key);
    const fiberRoot = new FiberRootNode(containerInfo, hostRootFiber);
    hostRootFiber.updateQueue = createUpdateQueue();
    return fiberRoot;
}

export function updateContainer(element: ReactElementType | null, root: FiberRootNode) {
    const hostRootFiber = root.current;
    const update = createUpdate(element);
    if (hostRootFiber.updateQueue) {
        enqueueUpdate(hostRootFiber.updateQueue, update);
    }
    // TODO: Implement scheduleUpdateOnFiber
    scheduleUpdateOnFiber(hostRootFiber);

    return element;
}
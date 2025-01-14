import { Props, Key, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';
import { UpdateQueue } from './updateQueue';

export class FiberNode {
    type: unknown
    tag: WorkTag
    key: Key;
    stateNode: FiberRootNode
    ref: Ref | null;
    memoizedProps: Props | null
    memoizedState: any
    pendingProps: Props | null

    return: FiberNode | null;
    sibling: FiberNode | null;
    child: FiberNode | null;
    index: number;
    updateQueue: UpdateQueue<any> | null;

    // 辅助切换工作Fiber 双缓冲技术
    alternate: FiberNode | null;

    flags: Flags


    constructor(tag: WorkTag, pendingProps: Props, key: Key) {
        this.tag = tag;
        this.key = key;
        // HostComponent <div></div> 真实Dom
        this.stateNode = null;
        // FunctionComponent 函数本身
        this.type = null;
        // 构造树  DFS 深度优先遍历
        this.return = null;
        this.sibling = null;
        this.child = null;
        this.index = 0;
        this.ref = null;
        // 工作单元
        this.pendingProps = pendingProps;
        this.memoizedProps = null;
        this.updateQueue = null;
        this.memoizedState = null;


        this.alternate = null;
        // 副作用
        this.flags = NoFlags;
    }
}

export class FiberRootNode {
    container: Container;
    current: FiberNode;
    finishedWork: FiberNode | null;
    constructor(container: Container, hostRootFiber: FiberNode) {
        this.container = container;
        this.current = hostRootFiber;
        hostRootFiber.stateNode = this;
        this.finishedWork = null;
    }
}
export const createWorkInProgress = (current: FiberNode, pendingProps: Props): FiberNode => {
    let wip = current.alternate;

    if (wip === null) {
        // mount
        wip = new FiberNode(current.tag, pendingProps, current.key);
        wip.type = current.type;
        wip.stateNode = current.stateNode;
        current.alternate = wip;
    } else {
        // update
        wip.pendingProps = pendingProps;
        wip.flags = NoFlags;
    }
    wip.type = current.type;
    wip.updateQueue = current.updateQueue;
    wip.child = current.child;
    wip.memoizedProps = current.memoizedProps;
    wip.memoizedState = current.memoizedState;


    return wip;

}
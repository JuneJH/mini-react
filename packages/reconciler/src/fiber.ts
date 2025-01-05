import { Props, Key, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';

export class FiberNode {
    type: any
    tag: WorkTag
    key: Key;
    stateNode: any
    ref: Ref | null;
    memoizedProps: Props | null
    pendingProps: Props | null

    return: FiberNode | null;
    sibling: FiberNode | null;
    child: FiberNode | null;
    index: number;

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

        this.alternate = null;
        // 副作用
        this.flags = NoFlags;
    }
}
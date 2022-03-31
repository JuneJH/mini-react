import { NoFlags } from './ReactFiberFlags';
import { NoLanes } from './ReactFiberLane';
import { WorkTag } from './ReactWorkTags';
type FiberParams = {
    tag: WorkTag
    pendingProps: any
    key: null | any
}
class FiberNode {
    public tag: WorkTag;
    public key: string;
    public type: string;
    public stateNode: any;
    public elementType: any;

    public return: FiberNode;
    public child: FiberNode;
    public sibling: FiberNode;
    public index: number;

    public ref: any;

    public pendingProps: any;
    public memoizedProps: any;
    public updateQueue: any;
    public memoizedState: any;
    public dependencies: any;

    public mode: any;// TODO

    public flags:number;
    public subtreeFlags:number;
    public deletions:any;

    public lanes:number;
    public childLanes:number;

    public alternate:any;


    constructor({ tag, pendingProps, key }: FiberParams) {
        this.tag = tag;
        this.pendingProps = pendingProps;
        this.key = key;
        this.flags = NoFlags;
        this.subtreeFlags = NoFlags;
        this.lanes = NoLanes;
        this.childLanes = NoLanes;
        this.return = null;
    }
}

function createFiber(props:FiberParams){
    return new FiberNode({...props});
}
export {
    FiberNode,
    createFiber
}
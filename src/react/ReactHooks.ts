import { setWorkInProgressRoot, setNextUnitWork, getFiberRoot, getFiberWorking,setDelDep } from '../react-dom';

export function useState(initState: any): [state: any, setState: any] {
    const workInProgress = getFiberWorking();
    const baseHook = workInProgress.elementType && workInProgress.elementType.hooks[workInProgress.hooksIndex];
    const hook = baseHook ? {
        state: baseHook.state,
        queue: baseHook.queue,
    } : { state: initState, queue: [] };
    hook.queue.forEach((val: any) => {
        hook.state = val;
    })
    const setState = (val: any) => {
        const workInProgressRoot = getFiberRoot();
        hook.queue.push(val);
        const fiberTemp = {
            stateNode: workInProgressRoot.stateNode,
            props: workInProgressRoot.props,
            elementType: workInProgressRoot
        }
        setNextUnitWork(fiberTemp);
        setWorkInProgressRoot(fiberTemp);
        setDelDep([]);
    }



    workInProgress.hooks.push(hook);
    workInProgress.hooksIndex++;




    return [hook.state, setState]
}
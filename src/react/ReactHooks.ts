import { setWorkInProgressRoot, setNextUnitWork, getFiberRoot, getFiberWorking } from '../react-dom';

export function useState(initState: any): [state: any, setState: any] {
    const workInProgress = getFiberWorking();
    const baseHook = workInProgress.base && workInProgress.base.hooks[workInProgress.hooksIndex];
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
            base: workInProgressRoot
        }
        setNextUnitWork(fiberTemp);
        setWorkInProgressRoot(fiberTemp);
    }



    workInProgress.hooks.push(hook);
    workInProgress.hooksIndex++;




    return [hook.state, setState]
}
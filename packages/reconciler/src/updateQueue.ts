import { Action } from "shared/ReactTypes";

export interface Update<State> {
    action: Action<State>;
}

export interface UpdateQueue<State> {
    shared: {
        pending: Update<State> | null;
    }
    dispatch: (action: State) => void;
}

export const createUpdate = <State>(action: Action<State>) => {
    return {
        action
    }
}

export const createUpdateQueue = <State>() => {
    return {
        shared: {
            pending: null
        },
        dispatch: () => { }
    } as UpdateQueue<State>
}
export const enqueueUpdate = <State>(updateQueue: UpdateQueue<State>, update: Update<State>) => {
    updateQueue.shared.pending = update;
}

export const processUpdateQueue = <State>(baseState: State, pendingUpdate: Update<State> | null): { memoizedState: State } => {
    const result: ReturnType<typeof processUpdateQueue> = {
        memoizedState: baseState
    }
    if (pendingUpdate !== null) {
        const action = pendingUpdate.action;
        if (action instanceof Function) {
            result.memoizedState = action(baseState);
        } else {
            result.memoizedState = action;
        }
    }
    return result as { memoizedState: State };
}
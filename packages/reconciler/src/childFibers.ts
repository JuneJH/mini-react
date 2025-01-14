import { ReactElementType } from "shared/ReactTypes";
import { FiberNode } from "./fiber";


function ChildReconciler(shouldTrackEffects: boolean) {

    return function reconcileChildFibers(returnFiber: FiberNode, currentFiber: FiberNode | null, newChild: ReactElementType) {

    }
}


export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);
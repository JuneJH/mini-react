export type Type = "Type";
export type Key = "Key";
export type Ref = "Ref";
export type Props = "props";

export interface ReactElementType {
    $$typeof: symbol;
    type: Type;
    key: Key;
    ref: Ref;
    props: Props;
    __mark: string;
}

export type Action<State> = State | ((prevState: State) => State);
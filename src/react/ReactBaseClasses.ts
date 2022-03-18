class Component {
    props:any
    static isClassComponent = true;
    constructor(props:any) {
      this.props = props;
    }

}

function PureComponent(){


}

export { 
    Component,
    PureComponent,
}
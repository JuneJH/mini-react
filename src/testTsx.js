console.log('runnn jsx')
function createElement(type, props, ...children) {

    return {
        type,
        props:{...props,children}

    }
}

const jsx = <div>chillll</div>;
console.log(jsx)

 export default jsx;


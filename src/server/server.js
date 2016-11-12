const foo = "bar";
console.log(`hello ${foo}`);

const obj = {hey: 1};
const obj2 = {...obj, foo: 2};
console.log(obj2);

class AppComponent {
    static PropTypes = {
        foo: "bar"
    };
}

console.log(<AppComponent/>);
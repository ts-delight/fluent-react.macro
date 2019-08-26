import React from 'react';
import R from '../../fluent-react.macro';

// Usage of DOM Helpers:
const C1 = () =>
    R.div().className('hello')();

// Nesting with helpers:
const C2 = () =>
    R.div().id('outer')(
        R.div().id('inner')()
    )

// Nesting with multiple children:
const C3 = () =>
    R.div().id('outer')(
        R.div().id('inner-1')(),
        R.div().id('inner-2')(),
    );

// Nesting without terminating invocation:
const C4 = () =>
    R.div().id('outer')(
        R.div().id('inner-1'),
        R.div().id('inner-2')
    );

// Usage of other function components:
const C5 = () =>
    R(C1)();

// Function components with props:
interface C6Props {
    id: string;
    user: {
        name: string;
    }
}
const C6 = (props: C6Props) =>
    R.div().id(props.id)(
        R.div()(props.user.name)
    );

// DOM Nodes without helpers:
const C7 = (props: C6Props) =>
    R("div" as const).id(props.id)(
        R("div" as const)(props.user.name)
    );

// Class components:
class C8 extends React.Component {
    render() {
        return R.div()("Hello");
    }
}

// Class components with arrow functions:
class C9 extends React.Component {
    render = () => R.div()("Hello")
}

// Class components with props and nesting:
class C10 extends React.Component<{ id: string; user: { name: string }; children?: any }> {
    render() {
        return R.div({ id: this.props.id })(
            R.div()(this.props.user.name)
        )
    }
}

// Composition in class components:
class C11 extends React.Component<{ id: string }> {
    render() {
        return R.div({ id: this.props.id })(
            R.div()("container-1"),
            R(C10, { id: this.props.id, user: { name: 'lorefnon' } })(),
            R.div()("container-2"),
        )
    }
}

// Render props and hooks:
interface C12Props {
    id: string;
    render: (count: number) => React.ReactChild
}
const C12 = (p: C12Props) => {
    const [count, setCount] = React.useState(0);
    return R.a({ id: p.id, onClick: (e) => setCount(count + 1) })(
        p.render(count)
    )
}

// Nesting inside arrays and fragments:
const C13 = () =>
    R(React.Fragment)(
        R.div()([
            R.div()("a"),
            [
                null,
                undefined,
                R.div()(
                    R.div()("b"),
                    R.div()("c")
                )
            ]
        ]),
        R.div()([1, 2, 3].map(i =>
            R.div()(i)
        ))
    )

const Popover: any = null;
const Button: any = null;

R(Popover)
    .content("foo")
    .children(R(Button).icon('more')())()

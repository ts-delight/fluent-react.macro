# About

Fluent, Terse and Type-safe alternative to JSX for React.

## Examples

```js
import R from "@ts-delight/fluent-react.macro";

// Your component:
const Container = () =>

  // Helpers are exposed from top level for all DOM & SVG tags:
  // |
  // V
  R.div().id("name")()
      //  ^         ^
      //  |         |_ | Complete the chain by invoking the last
      //  |            | part of the chain as a function
      //  |
      //  `- Use setter functions to specify props

  // Equivalent to:
  // <div id="name" />

const UserAvatar = (props: {user: User}) =>

  //  _ For custom components just call R as a function:
  // |
  // |        __ Use similar setter functions for custom component specific props
  // |       |       (Your IDE will auto-complete them for you)
  // V       V
  R(Popover).containerId(user.id)(
    // As a shorthand children can be passed through the terminating function call
    R.div()
      .className("popover-inner-container")
      .children(user.name)(),     // <------------|  Of course you can also
    R.span().className("arrow")() //              |  use children as a prop
                          //   ^
                          //   |___ For nested components this tailing invocation is
                          //        optional
  );

  // So the above can be more tersely written as:
  R(Popover).containerId(user.id)(
    R.div().className("popover-inner-container")(user.name),
    R.span().className("arrow")
  )

  // Equivalent to:
  // <Popover containerId={user.id}>
  //     <div className="popover-inner-container">
  //         {user.name}
  //     </div>
  // </Popover>

  // Dynamic attributes can be passed to the factory functions directly:
  //
  // So the above can be written as:
  R(Popover, {containerId: user.id})(
    R.div({className: "popover-inner-container"})(user.name),
    R.span({className: "arrow"})()
  )
```

In above snippet, when we say "equivalent", we don't just mean conceptually equivalent.
During build, the fluent API is compiled down to the same `React.createElement` invocations as the JSX syntax so
there is no additional overhead of using this.

See [more examples](https://github.com/ts-delight/fluent-react.macro/blob/master/__specs__/__fixtures__/index.ts).

## Why ?

We wanted an XML-free typescript-friendly alternative to JSX that didn't bring in any additional overhead.

We found that using createElement directly results in code that is not quite as readable. Also when using createElement directly, the `__source: {fileName, lineNumber}` prop auto-injected by the babel transformer is not present which makes debugging a bit harder.

## Installation

This utility is implemented as a [babel-macro](https://github.com/kentcdodds/babel-plugin-macros).

Refer babel's [setup instructions](https://babeljs.io/setup) to learn how to setup your project to use [babel](https://babeljs.io) for compilation.

1. Install `babel-plugin-macros` and `@ts-delight/fluent-react.macro`:

```sh
npm install --save-dev babel-plugin-macros @ts-delight/fluent-react.macro
```

2. Add babel-plugin-macros to .babelrc (if not already preset):

```js
// .babelrc

module.exports = {
  presets: [
    // ... other presets
  ],
  plugins: [
    "babel-plugin-macros" // <-- REQUIRED
    // ... other plugins
  ]
};
```

3. Import `@ts-delight/fluent-react.macro` in your code:

```js
// src/foo.js

import R from "@ts-delight/fluent-react.macro";

const Hello = () =>
  R("div")
    .children("hello")
    .end();
```

## Usage with TypeScript

This library is type-safe and comes with type definitions.

All code must be processed through babel. Compilation through tsc (only) is not supported.

Recommended babel configuration:

```js
// .babelrc

module.exports = {
  presets: [
    "@babel/preset-typescript"
    // ... other presets
  ],
  plugins: [
    "babel-plugin-macros"
    // ... other plugins
  ]
};
```

## Caveats

1. Every fluent builder chain must end with an `.end` invocation without interruptions.

For example:

```js
const intermediate = R.div().id("container");
const result = intermediate.className("large")();
```

Above code will fail to compile.

Because the entire fluent chain is compiled away, anything returned by R, or the prop setters, can not be assigned, referenced, or used in any computation.

2. This plugins currently assumes that files are ES6 modules. At the moment, this is not configurable.

## You may also like:

- **[if-expr.macro](https://github.com/ts-delight/if-expr.macro):** Type-safe expression-oriented alternative to Javascript if statements
- **[switch-expr.macro](https://github.com/ts-delight/switch-expr.macro):** Type-safe expression-oriented alternative to Javascript switch statements

## Alternatives:

1. [react-hyperscript](https://github.com/mlmorg/react-hyperscript): Encourages some patterns which are not type-safe: eg. `h('h1#heading')`.
2. [ijk](https://github.com/lukejacksonn/ijk): Terser, but also not type-safe.
3. [babel-plugin-transform-react-pug](https://github.com/pugjs/babel-plugin-transform-react-pug): Nice indented syntax, also not type-safe.

## License

MIT

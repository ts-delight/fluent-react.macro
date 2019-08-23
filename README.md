# About

Fluent type-safe alternative to JSX for React.

## Example

Source:

```js
import React from "react";
import R from "fluent-react.macro";

const UserProfile = (props: {user: User}) =>
    R("div")
        .id(`user-profile-${props.user.id}`)
        .className('user-profile-container')
        .children([
            R(UserAvatar)
                .user(props.user)
                .end(),
            R("div")
                .className(`user-name`)
                .children(props.user.name)
                .end()
        ])
        .end()
```

Equivalent to:

```js
const UserProfile = (props: {user: User}) =>
    <div id={`user-profile-${props.user.id}`} className="user-profile-container">
        <UserAvatar user={props.user} />
        <div className="user-name">{props.user.name}</div>
    </div>
```

Compiled output:

```js
import {createElement} from 'react';

const UserProfile = (props: {user: User}) =>
    createElement({
        id: `user-profile-${props.user.id}`,
        className: 'user-profile-container',
        children: [
            createElement(UserAvatar, {user: props.user }),
            createElement("div", {className: 'user-name', children: props.user.name })
        ]
    })

```

Note that all the extra invocations for setters are simply compiled away, so there is no extra runtime overhead over using React API directly.

## Why ?

I wanted an XML-free typescript-friendly alternative to JSX that didn't bring in any additional overhead.

I found that using createElement directly results in code that is not quite as readable.

## Installation

This utility is implemented as a [babel-macro](https://github.com/kentcdodds/babel-plugin-macros).

Refer babel's [setup instructions](https://babeljs.io/setup) to learn how to setup your project to use [babel](https://babeljs.io) for compilation.

1. Install `babel-plugin-macros` and `fluent-react.macro`:

```js
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
    'babel-plugin-macros'    // <-- REQUIRED
    // ... other plugins
  ],
};
```

3. Import `@ts-delight/fluent-react.macro` in your code:

```js
// src/foo.js

import R from '@ts-delight/fluent-react.macro';

const Hello = () => R("div").children("hello").end()
```

## Usage with TypeScript

This library is type-safe and comes with type definitions.

All code must be processed through babel. Compilation through tsc (only) is not supported.

Recommended babel configuration:

```js
// .babelrc

module.exports = {
  presets: [
    '@babel/preset-typescript',
    // ... other presets
  ],
  plugins: [
    'babel-plugin-macros'
    // ... other plugins
  ],
};
```

## Caveats

Every fluent builder chain must end with an `.end` invocation without interruptions.

For example:

```js
const intermediate = R("div").id("container");
const result = intermediate.className("large").end();
```

Above code will fail to compile.

Because the entire fluent chain is compiled away, anything return by R, or the prop setters, can not be assigned, referenced, or used in any computation.

## You may also like:

- **[if-expr.macro](https://github.com/ts-delight/if-expr.macro):** Type-safe expression-oriented alternative to Javascript if statements
- **[switch-expr.macro](https://github.com/ts-delight/switch-expr.macro):** Type-safe expression-oriented alternative to Javascript switch statements

## License

MIT

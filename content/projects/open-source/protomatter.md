Protomatter.js is a simple tool for managing prototypal inheritance in
JavaScript without the use of constructor functions and the `new` keyword. Since
becoming a JavaScript developer, I've worked hard to discovered JS's true
prototypal nature, which its implementation of constructor functions tends to
obscure. I wanted a mechanism that enabled me to work easily and directly
with JavaScript prototypes. This is available in the ES5 version of JavaScript
via `Object.create()`. I created Protomatter to be a small wrapper around this
and other native JS object methods to make it easy to work with JavaScript
prototypes and embrace prototypal inheritance. I have made it conveniently
available from [NPM][protomatter_npm] and Bower.

**Key Features:**

* Replace object initialization via constructors with `initialize()` methods.
* Easily link parent and child prototypes via `Protomatter.create()`.
* Call parent prototype's version of an overridden method via `callSuper()`.

[protomatter_npm]: https://www.npmjs.org/package/protomatter

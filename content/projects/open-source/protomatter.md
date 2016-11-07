Protomatter.js is an object creation and inheritance library for JavaScript,
featuring private instance properties and private methods. It is my exploration
of how to achieve privacy for objects in JavaScript, a feature that the language
is sorely missing.  Protomatter allows you to define object types with private
methods. When creating an instance from a type, no code outside that instance's
own public methods can invoke its private methods. Additionally, no outside code
can access the instance's properties. For more on what Protomatter can do and
how privacy is implemented, see its [README][readme].

Protomatter is more of a realization of a thought experiment than a really
practical invention, as these days I prefer ES6 classes for their
standardization. But I've still made it available via [npm][npm] for those who
want true object privacy for their JS codebases.

**Key Features:**

* Protect instance properties and private methods from outside access.
* Invoke super class methods with `callSuper()`.
* Support for mixins.

[npm]: https://www.npmjs.org/package/protomatter
[readme]: https://github.com/whastings/protomatter.js/blob/master/README.md

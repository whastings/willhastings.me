Delivered to fellow engineers at LinkedIn in 2015, this presentation covers
various methods and libraries for object creation and inheritance in JavaScript,
with a particular focus on those that support code reuse through mixins and
encapsulation through state privacy. It argues that traditional JS constructors
and the "underscore" convention for denoting privacy are insufficient for modern
applications, and that we need solutions that easily support multiple
inheritance and encapsulation.

*Note:* My view on this subject has softened slightly since I gave this
presentation. Now, I mostly prefer ES6 classes for creating objects in JS, given
they don't require additional runtime libraries to work and are a standard
everyone can recognize.

**Key Topics:**

* Constructors vs. `Object.create()` vs. ES6 classes vs. libraries.
* Concatenative inheritance (inheritance through mixins).
* Closure-based privacy.
* Varying approaches through libraries.

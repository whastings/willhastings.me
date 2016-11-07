Promises are my favorite tool for managing asynchronous operations in
JavaScript. To understand them better, I implemented my own promise library,
testing it against the [Promises/A+ spec's][promises] test suite. The name, a
reference to the phrase "unbreakable promise", is for the state privacy I built
into the promise objects the library produces. As promises are a crucial
abstraction for managing code flow, it seems like their state should be
protected from external modification. I accomplished this state encapsulation
via closures and partial application.

[promises]: https://promisesaplus.com/

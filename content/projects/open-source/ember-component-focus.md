Ember Component Focus is an Ember addon I created that provides a mixin you can
use to add methods to your Ember components for managing the currently focused
element. Focus management is an important aspect of making a web app usable for
users of screen readers and other assistive technologies. This addon makes it
easy for the developer to programmatically move focus as the UI updates,
handling issues like setting `tabindex` on elements that aren't focusable by
default and removing `tabindex="-1"` on blur. For example, if a user deletes an
item in a list, you can move focus to the next item in the list.

Originally released as a LinkedIn open source project, it has since moved to
the [Ember A11y GitHub organization][ember-a11y] to join other tools that
support creating accessible Ember applications.

[ember-a11y]: https://github.com/ember-a11y

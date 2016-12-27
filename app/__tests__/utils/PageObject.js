export default class PageObject {
  constructor(wrapper) {
    this.wrapper = wrapper;
  }

  fillIn(inputName, value) {
    let input = this[inputName];
    input.simulate('change', {target: {value}});
  }

  getValueFor(inputName) {
    return this[inputName].prop('value');
  }

  hasLabelFor(inputName) {
    let input = this[inputName];
    let inputId = input.prop('id');
    let inputLabel = this.wrapper.find(`[htmlFor="${inputId}"]`);
    return inputLabel.length === 1 && inputLabel.is('label');
  }

  hasOne(elementName, options = {}) {
    let element = this[elementName];

    if (!element || element.length !== 1) {
      return false;
    }

    if (options.type && options.type !== element.type()) {
      return false;
    }

    return true;
  }
}

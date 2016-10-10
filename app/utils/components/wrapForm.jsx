import React from 'react';
import { autobindMethods } from '@whastings/js_utils';

const { Component, DOM } = React;

export default function wrapForm({component: FormComponent, fields, initials = {}}) {
  class WrappedForm extends Component  {
    constructor(props) {
      super(props);
      let initVals = initials;

      if (typeof initials === 'function') {
        initVals = initials(props) || {};
      }

      this.state = fields.reduce((state, field) => {
        let fieldName = (typeof field === 'string') ? field : field.name;
        let FieldType = field.type || String;
        let initVal = initVals[fieldName];
        state[`${fieldName}Value`] = (initVal === undefined) ? new FieldType() : initVal;
        return state;
      }, {});

      this.state.WrappedInput = createWrappedInput(this.getValue, this.updateValue);
    }

    getValue(field) {
      return this.state[`${field}Value`];
    }

    updateValue(field, value) {
      this.setState({[`${field}Value`]: value});
    }

    render() {
      return <FormComponent {...this.props} {...this.state}/>;
    }
  }

  autobindMethods(WrappedForm, 'getValue', 'updateValue');

  return WrappedForm;
}


function createWrappedInput(getValue, updateValue) {
  class WrappedInput extends Component {
    handleChange() {
      let { props } = this;
      let { field } = props;
      let newValue = this._isRadio() ? props.value : this.refs.input.value;
      updateValue(field, newValue);
    }

    render() {
      let { props } = this;
      let { inputType, field, ...inputProps } = props;
      let value = props.hasOwnProperty('value') ? props.value : getValue(field);

      let createInput = DOM[inputType] || DOM.input;

      if (this._isRadio()) {
        inputProps.checked = (value === getValue(field));
      }

      return createInput({
        ref: 'input',
        value,
        onChange: this.handleChange,
        ...inputProps
      });
    }

    _isRadio() {
      return this.props.type === 'radio';
    }
  }

  autobindMethods(WrappedInput, 'handleChange');

  return WrappedInput;
}

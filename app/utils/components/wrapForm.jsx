import autobind from 'autobind-decorator';
import React from 'react';

const { Component, DOM } = React;

export default function wrapForm({component: FormComponent, fields, initVals = {}}) {
  return class WrappedForm extends Component  {
    constructor(props) {
      super(props);

      if (typeof initVals === 'function') {
        initVals = initVals(props);
      }
      initVals = initVals || {};

      this.state = fields.reduce((state, field) => {
        let initVal = initVals[field];
        state[`${field}Value`] = (initVal === undefined) ? '' : initVal;
        return state;
      }, {});

      this.state.WrappedInput = createWrappedInput(this.getValue, this.updateValue);
    }

    @autobind
    getValue(field) {
      return this.state[`${field}Value`];
    }

    @autobind
    updateValue(field, value) {
      this.setState({[`${field}Value`]: value});
    }

    render() {
      return <FormComponent {...this.props} {...this.state}/>;
    }
  };
}

function createWrappedInput(getValue, updateValue) {
  return class WrappedInput extends Component {
    @autobind
    handleChange() {
      let { field } = this.props;
      updateValue(field, this.refs.input.value);
    }

    render() {
      let { inputType, field } = this.props,
          value = getValue(field);

      let createInput = DOM[inputType] || DOM.input;

      return createInput({
        ref: 'input',
        value,
        onChange: this.handleChange,
        ...this.props
      });
    }
  };
}

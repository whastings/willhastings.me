import autobind from 'autobind-decorator';
import React from 'react';

const { Component } = React;

export default function wrapForm(FormComponent, ...valueNames) {
  return class WrappedForm extends Component  {
    constructor(props) {
      super(props);

      this.state = valueNames.reduce((state, valueName) => {
        state[`${valueName}Value`] = '';
        return state;
      }, {});

      this.state.WrappedInput = createWrappedInput(this.getValue, this.updateValue);
    }

    @autobind
    getValue(valueName) {
      return this.state[`${valueName}Value`];
    }

    @autobind
    updateValue(valueName, value) {
      this.setState({[`${valueName}Value`]: value});
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
      let { valueName } = this.props;
      updateValue(valueName, this.refs.input.value);
    }

    render() {
      let { valueName } = this.props,
          value = getValue(valueName);

      return (
        <input
          ref="input"
          value={value}
          onChange={this.handleChange}
          {...this.props}
        />
      );
    }
  };
}

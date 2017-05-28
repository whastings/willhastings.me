// @flow

import './styles.scss';
import React from 'react';
import wrapForm from 'app/utils/components/wrapForm';
import { autobindMethods } from '@whastings/js_utils';

const { Component } = React;

class SignInPage extends Component {
  props: {
    onSubmit: (string, string) => void,
    passwordValue: string,
    usernameValue: string,
    WrappedInput: any,
  };

  handleSubmit(event: Event) {
    let { usernameValue, passwordValue } = this.props;
    event.preventDefault();
    this.props.onSubmit(usernameValue, passwordValue);
  }

  render() {
    let { WrappedInput } = this.props;

    return (
      <section className="sign-in-page">
        <form className="sign-in-form card-primary" method="post" onSubmit={this.handleSubmit}>
          <h2>Sign In</h2>
          <label htmlFor="username-input">Username:</label>
          <WrappedInput
            field="username"
            id="username-input"
          />
          <label htmlFor="password-input">Password:</label>
          <WrappedInput
            field="password"
            type="password"
            id="password-input"
          />
          <button className="sign-in-form__submit">Go</button>
        </form>
      </section>
    );
  }
}

autobindMethods(SignInPage, 'handleSubmit');

export default wrapForm({component: SignInPage, fields: ['username', 'password']});

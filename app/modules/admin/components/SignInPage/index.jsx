import './styles.scss';
import React from 'react';
import wrapForm from 'app/utils/components/wrapForm';
import { autobindMethods } from '@whastings/js_utils';

const { Component, PropTypes } = React;

class SignInPage extends Component {
  handleSubmit(event) {
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

SignInPage.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

autobindMethods(SignInPage, 'handleSubmit');

export default wrapForm({component: SignInPage, fields: ['username', 'password']});

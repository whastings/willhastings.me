import autobind from 'autobind-decorator';
import React from 'react';
import wrapForm from 'app/components/utils/wrapForm';

const { Component, PropTypes } = React;

class SignInPage extends Component {
  @autobind
  handleSubmit(event) {
    let { usernameValue, passwordValue } = this.props;
    event.preventDefault();
    this.props.onSubmit(usernameValue, passwordValue);
  }

  render() {
    let { WrappedInput } = this.props;

    return (
      <section className="sign-in-page">
        <h1>Sign In</h1>
        <form className="sign-in-form" method="post" onSubmit={this.handleSubmit}>
          <label htmlFor="username-input">Username:</label>
          <WrappedInput
            valueName="username"
            id="username-input"
          />
          <label htmlFor="password-input">Password:</label>
          <WrappedInput
            valueName="password"
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

export default wrapForm(SignInPage, 'username', 'password');

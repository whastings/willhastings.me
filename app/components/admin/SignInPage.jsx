import React from 'react';

const { Component, PropTypes } = React;

export default class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput() {
    this.setState({
      username: this.refs.usernameInput.value,
      password: this.refs.passwordInput.value
    });
  }

  handleSubmit(event) {
    let { username, password } = this.state;
    event.preventDefault();
    this.props.onSubmit(username, password);
  }

  render() {
    let { username, password } = this.state;

    return (
      <section className="sign-in-page">
        <h1>Sign In</h1>
        <form className="sign-in-form" method="post" onSubmit={this.handleSubmit}>
          <label htmlFor="username-input">Username:</label>
          <input
            id="username-input"
            ref="usernameInput"
            value={username}
            onChange={this.handleInput}
          />
          <label htmlFor="password-input">Password:</label>
          <input
            type="password"
            id="password-input"
            ref="passwordInput"
            value={password}
            onChange={this.handleInput}
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

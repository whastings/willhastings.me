import autobind from 'autobind-decorator';
import PostList from 'app/components/posts/PostList';
import React from 'react';

const { Component, PropTypes } = React;

export default class AdminIndexPage extends Component {
  render() {
    let { onSignOut, posts } = this.props;

    return (
      <section className="admin-index-page admin-index">
        <div className="admin-index__actions">
          <button type="button" className="btn-sign-out" onClick={onSignOut}>
            Sign Out
          </button>
        </div>

        <h1>Your Posts</h1>
        <PostList posts={posts}/>
      </section>
    );
  }
}

AdminIndexPage.propTypes = {
  onSignOut: PropTypes.func.isRequired
};

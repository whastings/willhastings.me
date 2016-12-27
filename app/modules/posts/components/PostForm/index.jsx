import React from 'react';
import wrapForm from 'app/utils/components/wrapForm';
import { autobindMethods } from '@whastings/js_utils';
import { PostType } from 'posts/propTypes';

const { Component, PropTypes } = React;

class PostForm extends Component {
  handleSubmit(event) {
    event.preventDefault();
    let {
      post,
      titleValue: title,
      bodyValue: body,
      publishedValue: published
    } = this.props;
    let id = post && post.id;
    this.props.onSubmit({id, title, body, published});
  }

  render() {
    let { WrappedInput } = this.props;

    return (
      <form className="post-form" onSubmit={this.handleSubmit}>
        <label htmlFor="post-form__title-input">Title</label>
        <WrappedInput
          field="title"
          id="post-form__title-input"
        />

        <label htmlFor="post-form__body-input">Body</label>
        <WrappedInput
          field="body"
          inputType="textarea"
          id="post-form__body-input"
        />

        <fieldset>
          <legend>Published</legend>
          <div className="radio-wrapper">
            <WrappedInput
              field="published"
              id="post-form__published-yes-input"
              type="radio"
              value={true}
            />
            <label htmlFor="post-form__published-yes-input">Yes</label>
          </div>
          <div className="radio-wrapper">
            <WrappedInput
              field="published"
              id="post-form__published-no-input"
              type="radio"
              value={false}
            />
            <label htmlFor="post-form__published-no-input">No</label>
          </div>
        </fieldset>

        <div className="post-form__actions">
          <button>Submit</button>
        </div>
      </form>
    );
  }
}

PostForm.propTypes = {
  bodyValue: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  post: PostType,
  publishedValue: PropTypes.bool,
  titleValue: PropTypes.string,
  WrappedInput: PropTypes.func.isRequired
};

autobindMethods(PostForm, 'handleSubmit');

export default wrapForm({
  component: PostForm,
  fields: [
    'title',
    'body',
    {name: 'published', type: Boolean}
  ],
  initials: (props) => {
    if (!props.post) {
      return null;
    }
    let { bodyRaw, ...postData } = props.post;
    return {...postData, body: bodyRaw};
  }
});

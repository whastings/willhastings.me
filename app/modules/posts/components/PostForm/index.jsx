// @flow

import React from 'react';
import wrapForm from 'app/utils/components/wrapForm';
import { autobindMethods } from '@whastings/js_utils';
import type { Post } from 'posts/types';

class PostForm extends React.Component {
  props: {
    post?: Post,
    bodyValue: string,
    imageUrlValue: string,
    publishedValue: boolean,
    titleValue: string,
    WrappedInput: any, // TODO: Fix to not use any.
    onSubmit: (data: {
      id?: number,
      title: string,
      body: string,
      imageUrl: string,
      published: boolean,
    }) => void
  };

  handleSubmit(event: Event) {
    event.preventDefault();
    const {
      post,
      titleValue: title,
      bodyValue: body,
      imageUrlValue: imageUrl,
      publishedValue: published
    } = this.props;
    const id = post && post.id;
    this.props.onSubmit({ id, title, body, imageUrl, published });
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

        <label htmlFor="post-form__image-url-input">Image URL</label>
        <WrappedInput
          field="imageUrl"
          id="post-form__image-url-input"
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

autobindMethods(PostForm, 'handleSubmit');

export default wrapForm({
  component: PostForm,
  fields: [
    'title',
    'body',
    'imageUrl',
    { name: 'published', type: Boolean },
  ],
  initials: (props: { post: Post }) => {
    if (!props.post) {
      return null;
    }
    let { bodyRaw, ...postData } = props.post;
    return {...postData, body: bodyRaw};
  }
});

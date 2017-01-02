import PageObject from 'app/__tests__/utils/PageObject';

export class PostFormPageObject extends PageObject {
  constructor(wrapper) {
    super(wrapper);

    let form = this.form = wrapper.find('.post-form');
    this.titleInput = form.find('#post-form__title-input');
    this.bodyInput = form.find('#post-form__body-input');
    this.imageUrlInput = form.find('#post-form__image-url-input');
    this.publishedRadioNo = form.find('#post-form__published-no-input');
    this.publishedRadioYes = form.find('#post-form__published-yes-input');
  }

  isPublishedCheckedNo() {
    return this.publishedRadioNo.prop('checked');
  }

  isPublishedCheckedYes() {
    return this.publishedRadioYes.prop('checked');
  }
}

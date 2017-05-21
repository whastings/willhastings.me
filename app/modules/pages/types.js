// @flow

type PageId = string;

export type Page = {
  id: string,
  content: string,
};

export type PageAddAction = {
  type: 'PAGE_ADD',
  payload: Page,
};

export type PagesState = {
  [PageId]: Page,
};

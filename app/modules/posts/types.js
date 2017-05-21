// @flow

type PostId = string;

export type Post = {
  id: number,
  title: string,
  permalink: string,
  preview: string,
  body?: string,
  bodyRaw?: string,
  published: boolean,
  publishDate: string,
  imageUrl: string,
  createdAt: string,
};

export type PostsState = {
  [PostId]: Post,
};

export type PostAddAction = {
  type: 'POST_ADD',
  payload: Post,
};

export type PostsAddAction = {
  type: 'POSTS_ADD',
  payload: Post[],
};

export type PostRemoveAction = {
  type: 'POST_REMOVE',
  payload: number,
};

export type PostUpdateAction = {
  type: 'POST_UPDATE',
  payload: Post,
};

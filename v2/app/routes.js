import requireSignedInUser from 'v2/app/utils/requireSignedInUser';

export default [
  {
    path: '/',
    module: 'home',
    name: 'index',
  },
  {
    path: '/projects',
    module: 'projects',
    name: 'index',
  },
  {
    path: '/blog',
    module: 'blog',
    name: 'index',
  },
  {
    path: '/blog/:post',
    module: 'blog',
    name: 'view',
  },
  {
    path: '/admin',
    module: 'admin',
    name: 'index',
    before: requireSignedInUser,
  },
  {
    path: '/admin/sign-in',
    module: 'admin',
    name: 'signIn',
    before: requireSignedInUser,
  },
  {
    path: '/admin/posts/new',
    module: 'admin',
    name: 'newPost',
    before: requireSignedInUser,
  },
  {
    path: '/admin/posts/:post/edit',
    module: 'admin',
    name: 'editPost',
    before: requireSignedInUser,
  },
  // TODO: Handle 404
];

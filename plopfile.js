module.exports = function(plop) {
  plop.setGenerator('actions-tests', {
    description: 'Create tests for a module\'s actions',
    prompts: [
      {
        type: 'input',
        name: 'module',
        message: 'Module?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'app/modules/{{module}}/__tests__/actions-test.js',
        templateFile: 'tools/generator-templates/actions-test.hbs'
      }
    ]
  }),

  plop.setGenerator('component-tests', {
    description: 'Create tests for a component',
    prompts: [
      {
        type: 'input',
        name: 'module',
        message: 'Module component is in?'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Name of component to test?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'app/modules/{{module}}/components/{{name}}/__tests__.js',
        templateFile: 'tools/generator-templates/component-test.hbs'
      }
    ]
  });
};

module.exports = function(plop) {
  plop.setGenerator('component-test', {
    description: 'Create a test for a component',
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

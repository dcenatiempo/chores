// import { NodePlopAPI } from 'plop';
const Handlebars = require('handlebars');

module.exports = function plopCLI(plop) {
  plop.setGenerator('BaseComponent', {
    description: 'Create a Base Component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'components/base/{{PascalCase name}}/index.tsx',
        templateFile: 'plop-templates/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: `components/base/{{PascalCase name}}/{{PascalCase name}}.module.CSS`,
        templateFile: 'plop-templates/Component.module.CSS.hbs',
      },
    ],
  });
  plop.setGenerator('Component', {
    description: 'Create a Component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'components/{{PascalCase name}}/index.tsx',
        templateFile: 'plop-templates/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: `components/{{PascalCase name}}/{{PascalCase name}}.module.CSS`,
        templateFile: 'plop-templates/Component.module.CSS.hbs',
      },
    ],
  });
};

Handlebars.registerHelper('camelCase', (str) => {
  return toCamelCase(str);
});

Handlebars.registerHelper('PascalCase', (str) => {
  return toPascalCase(str);
});

function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

function capitalize(str) {
  return str[0].toUpperCase() + str.substr(1);
}

function toPascalCase(str) {
  return capitalize(toCamelCase(str));
}

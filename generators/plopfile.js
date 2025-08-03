module.exports = plop => {
  // ===== GERADOR DE COMPONENTE =====
  plop.setGenerator('component', {
    description: 'Create a React component with TypeScript',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
        validate: input => {
          if (!input) return 'Component name is required';
          if (!/^[A-Z][a-zA-Z]*$/.test(input)) {
            return 'Component name must start with uppercase letter and contain only letters';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'type',
        message: 'What type of component?',
        choices: [
          { name: 'Functional Component', value: 'functional' },
          { name: 'Class Component', value: 'class' },
          { name: 'Compound Component', value: 'compound' },
        ],
        default: 'functional',
      },
      {
        type: 'confirm',
        name: 'withProps',
        message: 'Does this component need props?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'withStyles',
        message: 'Include styles file?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'withTests',
        message: 'Include test file?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'withStories',
        message: 'Include Storybook stories?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'withTypes',
        message: 'Include types file?',
        default: true,
      },
    ],
    actions: data => {
      const actions = [
        {
          type: 'add',
          path: '../src/components/{{pascalCase name}}/index.tsx',
          templateFile: 'templates/Component.tsx.hbs',
        },
      ];

      if (data.withTypes) {
        actions.push({
          type: 'add',
          path: '../src/components/{{pascalCase name}}/types.ts',
          templateFile: 'templates/types.ts.hbs',
        });
      }

      if (data.withStyles) {
        actions.push({
          type: 'add',
          path: '../src/components/{{pascalCase name}}/styles.ts',
          templateFile: 'templates/styles.ts.hbs',
        });
      }

      if (data.withTests) {
        actions.push({
          type: 'add',
          path: '../src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
          templateFile: 'templates/test.tsx.hbs',
        });
      }

      if (data.withStories) {
        actions.push({
          type: 'add',
          path: '../src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
          templateFile: 'templates/stories.tsx.hbs',
        });
      }

      return actions;
    },
  });

  // ===== GERADOR DE PÁGINA =====
  plop.setGenerator('page', {
    description: 'Create a Next.js page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your page name?',
        validate: input => {
          if (!input) return 'Page name is required';
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'withLayout',
        message: 'Include layout file?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'withLoading',
        message: 'Include loading file?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'withError',
        message: 'Include error file?',
        default: false,
      },
    ],
    actions: data => {
      const actions = [
        {
          type: 'add',
          path: '../src/app/{{kebabCase name}}/page.tsx',
          templateFile: 'templates/Page.tsx.hbs',
        },
      ];

      if (data.withLayout) {
        actions.push({
          type: 'add',
          path: '../src/app/{{kebabCase name}}/layout.tsx',
          templateFile: 'templates/Layout.tsx.hbs',
        });
      }

      if (data.withLoading) {
        actions.push({
          type: 'add',
          path: '../src/app/{{kebabCase name}}/loading.tsx',
          templateFile: 'templates/Loading.tsx.hbs',
        });
      }

      if (data.withError) {
        actions.push({
          type: 'add',
          path: '../src/app/{{kebabCase name}}/error.tsx',
          templateFile: 'templates/Error.tsx.hbs',
        });
      }

      return actions;
    },
  });

  // ===== GERADOR DE HOOK =====
  plop.setGenerator('hook', {
    description: 'Create a custom React hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your hook name?',
        validate: input => {
          if (!input) return 'Hook name is required';
          if (!input.startsWith('use')) {
            return 'Hook name must start with "use"';
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'withTests',
        message: 'Include test file?',
        default: true,
      },
    ],
    actions: data => {
      const actions = [
        {
          type: 'add',
          path: '../src/hooks/{{camelCase name}}.ts',
          templateFile: 'templates/Hook.ts.hbs',
        },
      ];

      if (data.withTests) {
        actions.push({
          type: 'add',
          path: '../src/hooks/{{camelCase name}}.test.ts',
          templateFile: 'templates/Hook.test.ts.hbs',
        });
      }

      return actions;
    },
  });

  // ===== GERADOR DE UTILITÁRIO =====
  plop.setGenerator('util', {
    description: 'Create a utility function',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your utility name?',
        validate: input => {
          if (!input) return 'Utility name is required';
          return true;
        },
      },
      {
        type: 'list',
        name: 'category',
        message: 'What category?',
        choices: [
          { name: 'General', value: 'general' },
          { name: 'Format', value: 'format' },
          { name: 'Validation', value: 'validation' },
          { name: 'DOM', value: 'dom' },
          { name: 'Storage', value: 'storage' },
        ],
        default: 'general',
      },
      {
        type: 'confirm',
        name: 'withTests',
        message: 'Include test file?',
        default: true,
      },
    ],
    actions: data => {
      const actions = [
        {
          type: 'add',
          path: '../src/utils/{{camelCase name}}.ts',
          templateFile: 'templates/Util.ts.hbs',
        },
      ];

      if (data.withTests) {
        actions.push({
          type: 'add',
          path: '../src/utils/{{camelCase name}}.test.ts',
          templateFile: 'templates/Util.test.ts.hbs',
        });
      }

      return actions;
    },
  });

  // ===== GERADOR DE API ROUTE =====
  plop.setGenerator('api', {
    description: 'Create an API route',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your API route name?',
        validate: input => {
          if (!input) return 'API route name is required';
          return true;
        },
      },
      {
        type: 'list',
        name: 'method',
        message: 'What HTTP method?',
        choices: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        default: 'GET',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/app/api/{{kebabCase name}}/route.ts',
        templateFile: 'templates/ApiRoute.ts.hbs',
      },
    ],
  });
};

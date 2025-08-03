import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  // ===== CONFIGURAÇÕES BÁSICAS =====
  stories: [
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/**/stories.@(js|jsx|mjs|ts|tsx)',
    '../docs/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  staticDirs: ['../public'],

  // ===== ADDONS =====
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-toolbars',
    '@storybook/addon-highlight',
    '@storybook/addon-jest',
  ],

  // ===== FRAMEWORK =====
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },

  // ===== DOCUMENTAÇÃO =====
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
  },

  // ===== CONFIGURAÇÕES DE WEBPACK =====
  webpackFinal: async config => {
    // Resolver para módulos
    if (config.resolve) {
      config.resolve.modules = [
        ...(config.resolve.modules || []),
        `${process.cwd()}/src`,
      ];

      // Aliases
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': `${process.cwd()}/src`,
        '@/components': `${process.cwd()}/src/components`,
        '@/lib': `${process.cwd()}/src/lib`,
        '@/utils': `${process.cwd()}/src/utils`,
        '@/styles': `${process.cwd()}/src/styles`,
        '@/types': `${process.cwd()}/src/types`,
      };
    }

    return config;
  },

  // ===== CONFIGURAÇÕES DE TYPESCRIPT =====
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  // ===== CONFIGURAÇÕES DE PERFORMANCE =====
  core: {
    builder: '@storybook/builder-webpack5',
    disableTelemetry: true,
  },

  // ===== CONFIGURAÇÕES DE FEATURES =====
  features: {
    storyStoreV7: true,
    interactionsDebugger: true,
    breakingChangesV7: true,
  },

  // ===== CONFIGURAÇÕES DE LOGS =====
  logLevel: 'warn',

  // ===== CONFIGURAÇÕES DE BUILD =====
  build: {
    test: {
      disableAutodocs: true,
    },
  },
};

export default config;

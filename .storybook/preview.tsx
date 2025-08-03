import type { Decorator, Preview } from '@storybook/react';
import React from 'react';
import '../src/app/globals.css';

// ===== DECORATORS =====
const withThemeProvider: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'light';

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Story />
      </div>
    </div>
  );
};

const _withCentered: Decorator = (Story) => (
  <div className="flex items-center justify-center min-h-screen p-4">
    <Story />
  </div>
);

const withPadding: Decorator = (Story) => (
  <div className="p-4">
    <Story />
  </div>
);

// ===== CONFIGURAÇÃO DO PREVIEW =====
const preview: Preview = {
  // ===== PARÂMETROS GLOBAIS =====
  parameters: {
    // ===== AÇÕES =====
    actions: {
      argTypesRegex: '^on[A-Z].*',
      handles: ['click', 'submit', 'change', 'focus', 'blur']
    },

    // ===== CONTROLES =====
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
        boolean: /^(is|has|can|should|will)/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },

    // ===== BACKGROUNDS =====
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
        {
          name: 'primary',
          value: '#3b82f6',
        },
        {
          name: 'secondary',
          value: '#10b981',
        },
      ],
    },

    // ===== VIEWPORT =====
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        wide: {
          name: 'Wide',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
        ultrawide: {
          name: 'Ultra Wide',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
      },
      defaultViewport: 'desktop',
    },

    // ===== ACESSIBILIDADE =====
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'button-name',
            enabled: true,
          },
        ],
      },
    },

    // ===== DOCS =====
    docs: {
      toc: true,
      source: {
        state: 'open',
      },
    },

    // ===== LAYOUT =====
    layout: 'centered',

    // ===== PERFORMANCE =====
    chromatic: {
      delay: 1000,
    },

    // ===== TESTES =====
    test: {
      disable: false,
    },
  },

  // ===== DECORATORS GLOBAIS =====
  decorators: [
    withThemeProvider,
    withPadding,
  ],

  // ===== GLOBAIS =====
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'pt-BR',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'pt-BR', right: '🇧🇷', title: 'Português' },
          { value: 'en-US', right: '🇺🇸', title: 'English' },
          { value: 'es-ES', right: '🇪🇸', title: 'Español' },
        ],
      },
    },
  },
};

export default preview;

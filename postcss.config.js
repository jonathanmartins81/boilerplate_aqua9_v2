export default {
  plugins: {
    // ===== PLUGINS PRINCIPAIS =====
    tailwindcss: {},
    autoprefixer: {},

    // ===== PLUGINS ADICIONAIS =====
    // Descomente se necessário
    // 'postcss-preset-env': {
    //   stage: 3,
    //   features: {
    //     'nesting-rules': true,
    //     'custom-media-queries': true,
    //     'media-query-ranges': true,
    //   },
    // },
    // 'cssnano': process.env.NODE_ENV === 'production' ? {
    //   preset: ['default', {
    //     discardComments: {
    //       removeAll: true,
    //     },
    //     normalizeWhitespace: true,
    //   }],
    // } : false,
  },
};

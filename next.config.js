/** @type {import('next').NextConfig} */
const nextConfig = {
  // ===== CONFIGURAÇÕES DE EXPERIMENTAL =====
  experimental: {
    // Otimizações de performance
    optimizePackageImports: ['framer-motion', 'clsx'],
    // Melhor suporte a TypeScript
    typedRoutes: true,
  },

  // ===== CONFIGURAÇÕES DE IMAGENS =====
  images: {
    // Domínios permitidos para otimização de imagens
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Formatos de imagem suportados
    formats: ['image/webp', 'image/avif'],
  },

  // ===== CONFIGURAÇÕES DE HEADERS =====
  async headers() {
    return [
      {
        // Headers para todas as rotas
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // ===== CONFIGURAÇÕES DE REDIRECTS =====
  async redirects() {
    return [
      // Exemplo de redirect (descomente se necessário)
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ];
  },

  // ===== CONFIGURAÇÕES DE REWRITES =====
  async rewrites() {
    return [
      // Exemplo de rewrite (descomente se necessário)
      // {
      //   source: '/api/:path*',
      //   destination: 'https://api.example.com/:path*',
      // },
    ];
  },

  // ===== CONFIGURAÇÕES DE COMPILAÇÃO =====
  compiler: {
    // Remover console.log em produção
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ===== CONFIGURAÇÕES DE WEBPACK =====
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Configurações customizadas do webpack
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },

  // ===== CONFIGURAÇÕES DE OUTPUT =====
  output: 'standalone',

  // ===== CONFIGURAÇÕES DE TRAILING SLASH =====
  trailingSlash: false,

  // ===== CONFIGURAÇÕES DE BASE PATH =====
  // basePath: '', // Descomente se necessário

  // ===== CONFIGURAÇÕES DE ASSET PREFIX =====
  // assetPrefix: '', // Descomente se necessário

  // ===== CONFIGURAÇÕES DE POWERED BY =====
  poweredByHeader: false,

  // ===== CONFIGURAÇÕES DE REACT STRICT MODE =====
  reactStrictMode: true,
};

export default nextConfig;

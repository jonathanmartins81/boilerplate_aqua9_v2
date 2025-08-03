# 🔍 Sistema de SEO Dinâmico - Aqua9 Boilerplate v2

Este documento explica o sistema completo de SEO dinâmico implementado no Aqua9 Boilerplate v2, incluindo configurações, uso e personalização.

## 📋 Visão Geral

O sistema de SEO dinâmico foi projetado para fornecer metadados otimizados para cada página da aplicação, incluindo:

- **Metadados básicos** (title, description, keywords)
- **Open Graph** para redes sociais
- **Twitter Cards** otimizados
- **JSON-LD** para dados estruturados
- **Sitemap dinâmico**
- **Robots.txt configurável**

## 🏗️ Arquitetura do Sistema

### **Estrutura de Arquivos**

```
src/
├── utils/
│   └── SEO.ts              # Sistema principal de SEO
├── components/
│   ├── DynamicSEO.tsx      # Componente para SEO dinâmico
│   └── JsonLd.tsx          # Dados estruturados
└── app/
    ├── layout.tsx          # Layout principal com metadados
    ├── page.tsx            # Página inicial
    ├── about/page.tsx      # Página sobre
    ├── portfolio/page.tsx  # Página portfólio
    └── portfolio/[slug]/page.tsx  # Página dinâmica
```

## ⚙️ Configuração Central

### **SEOConfig**

```typescript
export const SEOConfig = {
  developer: {
    name: 'Jonathan Simão',
    email: 'contato@aqua9.com.br',
    website: 'https://aqua9.com.br',
    twitter: '@aqua9dev',
    linkedin: 'https://linkedin.com/in/jonathansimao',
    github: 'https://github.com/jonathansimao',
  },
  project: {
    name: 'Aqua9 Boilerplate v2',
    description: '...',
    version: '2.0.0',
    url: 'https://aqua9.com.br',
    repository: 'https://github.com/aqua9/boilerplate_aqua9_v2',
    license: 'MIT',
    category: 'Web Development Tools',
  },
  keywords: [...],
  theme: {...},
  locale: {...}
};
```

## 🛠️ Como Usar

### **1. SEO Automático por Rota**

O sistema automaticamente aplica SEO baseado na rota da página:

```typescript
// src/app/page.tsx
import { generateDynamicSEO } from '@/utils/SEO';
import { Metadata } from 'next';

export const metadata: Metadata = generateDynamicSEO('/');
```

### **2. SEO Personalizado**

Para páginas com dados dinâmicos:

```typescript
// src/app/portfolio/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData[slug];

  return generateDynamicSEO(`/portfolio/${slug}`, {
    slug: project.title,
  });
}
```

### **3. Componente DynamicSEO**

Para SEO dinâmico em componentes:

```typescript
import { DynamicSEO } from '@/components/DynamicSEO';

export default function MyPage() {
  return (
    <>
      <DynamicSEO
        title="Título Personalizado"
        description="Descrição personalizada"
        keywords={['palavra', 'chave']}
        type="article"
        image="/og-image.png"
        canonical="https://aqua9.com.br/custom-page"
      />
      {/* Conteúdo da página */}
    </>
  );
}
```

## 📄 Configurações por Rota

### **Página Inicial (`/`)**

```typescript
'/': {
  title: 'Aqua9 Boilerplate v2 - Next.js Profissional',
  description: 'Boilerplate Next.js profissional da Aqua9 v2...',
  keywords: ['boilerplate', 'nextjs', 'react', 'typescript', 'aqua9', 'template'],
  type: 'website',
  image: '/og-home.png',
  canonical: 'https://aqua9.com.br',
  priority: 1.0,
  changeFreq: 'weekly',
  openGraph: {...},
  twitter: {...}
}
```

### **Página Sobre (`/about`)**

```typescript
'/about': {
  title: 'Sobre - Aqua9 Boilerplate v2',
  description: 'Conheça mais sobre o Aqua9 Boilerplate v2...',
  keywords: ['sobre', 'aqua9', 'jonathan simão', 'desenvolvedor', 'template', 'nextjs'],
  type: 'website',
  image: '/og-about.png',
  canonical: 'https://aqua9.com.br/about',
  priority: 0.8,
  changeFreq: 'monthly',
  openGraph: {...},
  twitter: {...}
}
```

### **Página Portfólio (`/portfolio`)**

```typescript
'/portfolio': {
  title: 'Portfólio - Aqua9 Boilerplate v2',
  description: 'Portfólio de projetos desenvolvidos com o Aqua9 Boilerplate v2...',
  keywords: ['portfólio', 'projetos', 'aplicações', 'sites', 'exemplos', 'nextjs', 'typescript'],
  type: 'website',
  image: '/og-portfolio.png',
  canonical: 'https://aqua9.com.br/portfolio',
  priority: 0.9,
  changeFreq: 'weekly',
  openGraph: {...},
  twitter: {...}
}
```

### **Página Dinâmica (`/portfolio/[slug]`)**

```typescript
'/portfolio/[slug]': {
  title: 'Projeto {slug} - Aqua9 Boilerplate v2',
  description: 'Detalhes do projeto {slug} desenvolvido com o Aqua9 Boilerplate v2...',
  keywords: ['projeto', 'detalhes', 'tecnologias', 'funcionalidades', 'resultados'],
  type: 'article',
  image: '/og-project.png',
  canonical: 'https://aqua9.com.br/portfolio/{slug}',
  priority: 0.8,
  changeFreq: 'monthly',
  openGraph: {...},
  twitter: {...}
}
```

## 🎨 Open Graph e Twitter Cards

### **Configuração Open Graph**

```typescript
openGraph: {
  title: 'Título para Redes Sociais',
  description: 'Descrição otimizada para compartilhamento',
  type: 'website',
  siteName: 'Aqua9 Boilerplate',
  images: [
    {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Descrição da imagem',
    },
  ],
}
```

### **Configuração Twitter Cards**

```typescript
twitter: {
  card: 'summary_large_image',
  title: 'Título para Twitter',
  description: 'Descrição para Twitter',
  image: '/og-image.png',
  creator: '@aqua9dev',
  site: '@aqua9dev',
}
```

## 📊 Dados Estruturados (JSON-LD)

O sistema inclui dados estruturados para:

### **SoftwareApplication**

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Aqua9 Boilerplate v2",
  "description": "...",
  "url": "https://aqua9.com.br",
  "applicationCategory": "DeveloperApplication",
  "author": {
    "@type": "Person",
    "name": "Jonathan Simão"
  }
}
```

### **Organization**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Aqua9",
  "url": "https://aqua9.com.br",
  "logo": "https://aqua9.com.br/logo.png"
}
```

### **Person**

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jonathan Simão",
  "jobTitle": "Full Stack Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Aqua9"
  }
}
```

## 🗺️ Sitemap Dinâmico

### **Configuração**

```typescript
export const sitemapConfig = {
  baseUrl: SEOConfig.project.url,
  staticPages: [
    {
      url: '/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // ... outras páginas
  ],
  generateDynamicPages: async () => {
    // Lógica para gerar páginas dinâmicas
  },
};
```

### **Geração Automática**

O sitemap é gerado automaticamente em `/sitemap.xml` com:

- Páginas estáticas
- Páginas dinâmicas baseadas em dados
- Prioridades e frequências de atualização
- Datas de última modificação

## 🤖 Robots.txt

### **Configuração**

```typescript
export const robotsConfig = {
  userAgent: '*',
  allow: '/',
  disallow: ['/api/', '/_next/', '/admin/'],
  sitemap: `${SEOConfig.project.url}/sitemap.xml`,
  host: SEOConfig.project.url,
};
```

### **Geração Automática**

O robots.txt é gerado automaticamente em `/robots.txt` com:

- Regras de indexação
- Links para sitemap
- Host canônico
- Diretórios protegidos

## 🔧 Personalização

### **Adicionar Nova Rota**

```typescript
// Em src/utils/SEO.ts
export const routeSEOConfig: Record<string, DynamicSEOConfig> = {
  // ... rotas existentes

  '/nova-pagina': {
    title: 'Nova Página - Aqua9 Boilerplate v2',
    description: 'Descrição da nova página',
    keywords: ['nova', 'página', 'keywords'],
    type: 'website',
    image: '/og-nova-pagina.png',
    canonical: 'https://aqua9.com.br/nova-pagina',
    priority: 0.7,
    changeFreq: 'monthly',
    openGraph: {...},
    twitter: {...}
  },
};
```

### **Modificar Configuração Central**

```typescript
// Em src/utils/SEO.ts
export const SEOConfig = {
  developer: {
    name: 'Seu Nome',
    email: 'seu@email.com',
    website: 'https://seusite.com',
    twitter: '@seutwitter',
    // ... outras informações
  },
  project: {
    name: 'Seu Projeto',
    description: 'Descrição do seu projeto',
    // ... outras informações
  },
  // ... outras configurações
};
```

## 📈 Métricas e Performance

### **SEO Score**

O sistema otimiza para:

- ✅ Títulos únicos e descritivos
- ✅ Meta descriptions otimizadas
- ✅ Open Graph completo
- ✅ Twitter Cards otimizados
- ✅ Dados estruturados
- ✅ Sitemap XML
- ✅ Robots.txt
- ✅ URLs canônicas

### **Performance**

- ⚡ Geração estática de metadados
- ⚡ Otimização automática de imagens
- ⚡ Cache de configurações
- ⚡ Lazy loading de dados dinâmicos

## 🚀 Próximas Melhorias

### **Planejadas para v2.1**

- [ ] Suporte a múltiplos idiomas
- [ ] SEO para e-commerce
- [ ] Analytics integrado
- [ ] A/B testing para SEO
- [ ] Relatórios de performance

### **Planejadas para v2.2**

- [ ] SEO para aplicações móveis
- [ ] Integração com Google Search Console
- [ ] SEO para vídeos
- [ ] Schema.org avançado

## 📚 Recursos Adicionais

### **Documentação**

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Schema.org](https://schema.org/)

### **Ferramentas de Teste**

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

**Desenvolvido por**: [Jonathan Simão](https://aqua9.com.br)
**Versão**: 2.0.0
**Última atualização**: 2024-01-01

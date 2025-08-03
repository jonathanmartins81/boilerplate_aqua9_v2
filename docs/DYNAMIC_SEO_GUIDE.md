# 🚀 SEO Dinâmico - Boilerplate Aqua9

## 🎯 **Visão Geral**

O Boilerplate Aqua9 implementa um sistema completo de SEO dinâmico que permite configurar metadados específicos para cada página e rota, otimizando a indexação e descoberta do conteúdo pelos motores de busca.

## 📋 **Funcionalidades Principais**

### **✅ SEO Dinâmico por Rota**

- Configurações específicas para cada página
- Metadados personalizados por rota
- URLs canônicas dinâmicas
- Palavras-chave otimizadas por página

### **✅ Geração Automática de Metadados**

- Títulos dinâmicos baseados no conteúdo
- Descrições personalizadas
- Imagens específicas por página
- Structured Data (JSON-LD)

### **✅ Sitemap Dinâmico**

- Páginas estáticas predefinidas
- Páginas dinâmicas baseadas em dados
- Configuração de prioridade e frequência
- Geração automática

### **✅ Open Graph e Twitter Cards**

- Configuração específica por página
- Imagens otimizadas para redes sociais
- Títulos e descrições personalizados
- URLs canônicas

## 🛠️ **Arquitetura do Sistema**

### **1. Configuração Centralizada (`src/utils/SEO.ts`)**

```typescript
// Configurações básicas do projeto
export const SEOConfig = {
  developer: { name: 'Jonathan Simão', ... },
  project: { name: 'Boilerplate Aqua9', ... },
  keywords: ['boilerplate', 'nextjs', ...],
};

// Configurações por rota
export const routeSEOConfig: Record<string, DynamicSEOConfig> = {
  '/': { title: 'Boilerplate Aqua9', ... },
  '/about': { title: 'Sobre - Boilerplate Aqua9', ... },
  '/portfolio': { title: 'Portfólio - Boilerplate Aqua9', ... },
  '/portfolio/[slug]': { title: 'Projeto {slug} - Boilerplate Aqua9', ... },
};
```

### **2. Funções de Geração**

```typescript
// Gera metadados dinâmicos baseados na rota
export function generateDynamicSEO(
  pathname: string,
  dynamicData?: Record<string, string>
): Metadata;

// Gera metadados específicos de página
export function generatePageSEO(
  title: string,
  description?: string,
  keywords?: string[],
  image?: string
): Metadata;
```

### **3. Componente DynamicSEO**

```typescript
// Componente para SEO dinâmico em tempo real
<DynamicSEO
  title="Título da Página"
  description="Descrição personalizada"
  image="/custom-image.png"
  type="article"
  canonical="https://aqua9.com.br/page"
/>
```

## 📁 **Estrutura de Arquivos**

```
src/
├── utils/
│   └── SEO.ts                    # Configuração centralizada
├── components/
│   ├── DynamicSEO.tsx           # Componente para SEO dinâmico
│   └── JsonLd.tsx               # Structured Data
├── app/
│   ├── layout.tsx               # Layout com metadados globais
│   ├── page.tsx                 # Página inicial
│   ├── about/
│   │   └── page.tsx             # Página sobre
│   ├── portfolio/
│   │   ├── page.tsx             # Lista de projetos
│   │   └── [slug]/
│   │       └── page.tsx         # Projeto específico
│   ├── sitemap.ts               # Sitemap dinâmico
│   └── robots.ts                # Robots.txt
```

## 🔧 **Como Usar**

### **1. Configuração de Rota Estática**

```typescript
// src/app/about/page.tsx
import { generateDynamicSEO } from '@/utils/SEO';

export const metadata: Metadata = generateDynamicSEO('/about');
```

### **2. Configuração de Rota Dinâmica**

```typescript
// src/app/portfolio/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getProject(params.slug);

  return generateDynamicSEO(`/portfolio/${params.slug}`, {
    slug: project.title,
  });
}
```

### **3. Uso do Componente DynamicSEO**

```typescript
// Em qualquer componente
import { DynamicSEO } from '@/components/DynamicSEO';

export default function MyPage() {
  return (
    <>
      <DynamicSEO
        title="Título Personalizado"
        description="Descrição específica da página"
        keywords={['palavra1', 'palavra2']}
        image="/custom-image.png"
        type="article"
        canonical="https://aqua9.com.br/custom-page"
      />
      {/* Conteúdo da página */}
    </>
  );
}
```

### **4. Hook useDynamicSEO**

```typescript
// Hook para SEO dinâmico em componentes
import { useDynamicSEO } from '@/components/DynamicSEO';

export default function MyComponent() {
  const { updateSEO } = useDynamicSEO({
    title: 'Título Dinâmico',
    description: 'Descrição dinâmica',
  });

  // Atualiza SEO baseado no estado
  useEffect(() => {
    updateSEO({ title: 'Novo Título' });
  }, [state]);

  return <div>Conteúdo</div>;
}
```

## 📊 **Configurações por Rota**

### **Página Inicial (`/`)**

```typescript
{
  title: 'Boilerplate Aqua9 - Next.js Profissional',
  description: 'Boilerplate Next.js profissional da Aqua9...',
  keywords: ['boilerplate', 'nextjs', 'react', 'typescript', 'aqua9'],
  type: 'website',
  image: '/og-home.png',
  canonical: 'https://aqua9.com.br',
}
```

### **Página Sobre (`/about`)**

```typescript
{
  title: 'Sobre - Boilerplate Aqua9',
  description: 'Conheça mais sobre o Boilerplate Aqua9...',
  keywords: ['sobre', 'aqua9', 'jonathan simão', 'desenvolvedor'],
  type: 'website',
  image: '/og-about.png',
  canonical: 'https://aqua9.com.br/about',
}
```

### **Página de Projeto (`/portfolio/[slug]`)**

```typescript
{
  title: 'Projeto {slug} - Boilerplate Aqua9',
  description: 'Detalhes do projeto {slug}...',
  keywords: ['projeto', 'detalhes', 'tecnologias'],
  type: 'article',
  image: '/og-project.png',
  canonical: 'https://aqua9.com.br/portfolio/{slug}',
}
```

## 🎨 **Exemplos Práticos**

### **Página de Blog com SEO Dinâmico**

```typescript
// src/app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  return generateDynamicSEO(`/blog/${params.slug}`, {
    slug: post.title,
  });
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  return (
    <>
      <DynamicSEO
        title={post.title}
        description={post.excerpt}
        keywords={post.tags}
        type="article"
        author={post.author}
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
        image={post.featuredImage}
        canonical={`https://aqua9.com.br/blog/${params.slug}`}
      />
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  );
}
```

### **Página de Produto com SEO Dinâmico**

```typescript
// src/app/products/[id]/page.tsx
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id);

  return generateDynamicSEO(`/products/${params.id}`, {
    id: product.name,
  });
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <>
      <DynamicSEO
        title={`${product.name} - Aqua9 Store`}
        description={product.description}
        keywords={[...product.categories, product.brand]}
        type="product"
        image={product.images[0]}
        canonical={`https://aqua9.com.br/products/${params.id}`}
      />
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <img src={product.images[0]} alt={product.name} />
      </div>
    </>
  );
}
```

## 🔍 **Sitemap Dinâmico**

### **Configuração**

```typescript
// src/utils/SEO.ts
export const sitemapConfig = {
  baseUrl: 'https://aqua9.com.br',

  // Páginas estáticas
  staticPages: [
    { url: '/', changeFrequency: 'weekly', priority: 1.0 },
    { url: '/about', changeFrequency: 'monthly', priority: 0.8 },
  ],

  // Função para gerar páginas dinâmicas
  generateDynamicPages: async () => {
    const projects = await getProjects();
    return projects.map(project => ({
      url: `/portfolio/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
  },
};
```

### **Geração Automática**

```typescript
// src/app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapData = await sitemapConfig.generateSitemap();

  return sitemapData.map(page => ({
    url: `${sitemapConfig.baseUrl}${page.url}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
```

## 📈 **Benefícios do SEO Dinâmico**

### **Para Desenvolvedores**

- 🎯 **Configuração Centralizada**: Todas as configurações SEO em um local
- 🔄 **Reutilização**: Funções e componentes reutilizáveis
- 📝 **TypeScript**: Tipagem completa para evitar erros
- 🚀 **Performance**: Geração estática otimizada

### **Para SEO**

- 📊 **Indexação Melhorada**: Metadados específicos por página
- 🔗 **URLs Canônicas**: Evita conteúdo duplicado
- 📱 **Redes Sociais**: Open Graph e Twitter Cards otimizados
- 🗺️ **Sitemap Dinâmico**: Inclui todas as páginas automaticamente

### **Para Usuários**

- 🔍 **Descoberta**: Melhor ranking nos motores de busca
- 📱 **Compartilhamento**: Previews ricos nas redes sociais
- ⚡ **Performance**: Carregamento otimizado
- 📖 **Acessibilidade**: Metadados estruturados

## 🧪 **Testando o SEO Dinâmico**

### **1. Verificar Metadados**

```bash
# Verificar se os metadados estão sendo gerados corretamente
curl -s https://aqua9.com.br | grep -i "meta name"
```

### **2. Testar Sitemap**

```bash
# Verificar se o sitemap está sendo gerado
curl -s https://aqua9.com.br/sitemap.xml
```

### **3. Validar Structured Data**

```bash
# Usar Google Rich Results Test
# https://search.google.com/test/rich-results
```

### **4. Verificar Open Graph**

```bash
# Usar Facebook Sharing Debugger
# https://developers.facebook.com/tools/debug/
```

## 🔧 **Configurações Avançadas**

### **Personalização de Templates**

```typescript
// src/utils/SEO.ts
export const defaultSEO: Metadata = {
  title: {
    default: 'Boilerplate Aqua9 - Next.js Profissional',
    template: '%s | Boilerplate Aqua9', // Template para páginas específicas
  },
  // ... outras configurações
};
```

### **Configuração de Robots**

```typescript
// src/app/robots.ts
export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/admin/'] },
    ],
    sitemap: 'https://aqua9.com.br/sitemap.xml',
  };
}
```

### **Structured Data Dinâmico**

```typescript
// src/components/JsonLd.tsx
export function JsonLd({ type, data }: { type: string; data: any }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

## 📚 **Boas Práticas**

### **✅ Faça**

- Use títulos únicos e descritivos para cada página
- Inclua palavras-chave relevantes nas descrições
- Configure URLs canônicas para evitar conteúdo duplicado
- Use imagens otimizadas para Open Graph
- Mantenha o sitemap atualizado
- Configure structured data apropriado

### **❌ Evite**

- Títulos duplicados entre páginas
- Descrições muito longas ou muito curtas
- Palavras-chave irrelevantes
- Imagens não otimizadas
- URLs canônicas incorretas
- Structured data desatualizado

## 🎯 **Próximos Passos**

### **Melhorias Futuras**

- [ ] Integração com CMS headless
- [ ] Geração automática de imagens Open Graph
- [ ] Analytics de SEO integrado
- [ ] Cache de metadados para performance
- [ ] Validação automática de SEO
- [ ] Relatórios de SEO

---

**Desenvolvido por:** Jonathan Simão
**Empresa:** Aqua9
**Site:** https://aqua9.com.br

---

_Este guia documenta o sistema completo de SEO dinâmico implementado no Boilerplate Aqua9, fornecendo todas as informações necessárias para usar e estender o sistema._

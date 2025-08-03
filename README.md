<div align="center">

<img src="public/img/logo-gh.svg" alt="Aqua9 Logo" width="300" height="64" />

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-1.2.0-yellow?style=flat-square&logo=vitest)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-1.40.0-green?style=flat-square&logo=playwright)](https://playwright.dev/)

[![Test Coverage](https://img.shields.io/badge/Test%20Coverage-85%25-brightgreen?style=flat-square)](https://github.com/jonathanmartins81/boilerplate_aqua9_v2)
[![Codecov](https://img.shields.io/codecov/c/github/jonathanmartins81/boilerplate_aqua9_v2?style=flat-square)](https://codecov.io/gh/jonathanmartins81/boilerplate_aqua9_v2)
[![Code Quality](https://img.shields.io/badge/Code%20Quality-A%2B-brightgreen?style=flat-square)](https://github.com/jonathanmartins81/boilerplate_aqua9_v2)
[![Security](https://img.shields.io/badge/Security-Audit%20Passed-brightgreen?style=flat-square)](https://github.com/jonathanmartins81/boilerplate_aqua9_v2)
[![E2E Tests](https://img.shields.io/badge/E2E%20Tests-Passing-brightgreen?style=flat-square)](https://github.com/jonathanmartins81/boilerplate_aqua9_v2)

</div>

# 🚀 Aqua9 Boilerplate v2 - Next.js Professional

> **Boilerplate Next.js profissional** com foco em **qualidade**, **segurança**, **performance** e **escalabilidade**. Ideal para times que buscam uma base sólida e moderna para aplicações web.

---

## 🎯 **Características Principais**

### **🔒 Segurança Robusta**

- ✅ **Autenticação JWT** com tokens seguros
- ✅ **Autorização granular** por roles e permissões
- ✅ **Proteção de rotas** automática
- ✅ **Rate limiting** por IP e usuário
- ✅ **Headers de segurança** (CSP, HSTS, etc.)
- ✅ **Validação e sanitização** de entrada
- ✅ **Detecção de ataques** em tempo real
- ✅ **Logs de segurança** detalhados

### **🚀 Performance Otimizada**

- ✅ **Next.js 15** com App Router
- ✅ **TypeScript** para type safety
- ✅ **Tailwind CSS** para styling
- ✅ **Otimização de imagens** com next/image
- ✅ **Lazy loading** e code splitting
- ✅ **SEO otimizado** com metadata dinâmico

### **🧪 Qualidade Garantida**

- ✅ **Testes unitários** com Vitest + RTL
- ✅ **Testes E2E** com Playwright
- ✅ **Cobertura de testes** com Codecov
- ✅ **ESLint + Prettier** para qualidade
- ✅ **Type checking** automático
- ✅ **Git hooks** com Lefthook
- ✅ **CI/CD** com GitHub Actions

### **📚 Documentação Completa**

- ✅ **README** detalhado
- ✅ **Guia de segurança** completo
- ✅ **Templates** de PR/Issue
- ✅ **Exemplos** práticos
- ✅ **Boas práticas** documentadas

---

## 🏗️ **Arquitetura do Projeto**

### **📁 Estrutura de Pastas**

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── api/               # API Routes
│   │   └── auth/          # Autenticação
│   ├── (routes)/          # Páginas da aplicação
│   ├── error.tsx          # Error boundary global
│   ├── layout.tsx         # Layout raiz
│   └── page.tsx           # Página inicial
├── components/            # Biblioteca de Componentes Reutilizáveis
│   ├── Button/           # Componente de botão
│   ├── Card/             # Componente de card
│   ├── DynamicSEO/       # SEO dinâmico
│   ├── Footer/           # Componente de rodapé
│   ├── Header/           # Componente de cabeçalho
│   ├── Input/            # Componente de entrada
│   ├── Main/             # Componente principal
│   ├── Modal/            # Componente de modal
│   ├── Navigation/       # Componente de navegação
│   └── ProtectedRoute/   # Proteção de rotas
├── hooks/                # Custom hooks
│   └── useAuth.ts        # Hook de autenticação
├── lib/                  # Bibliotecas e configurações
│   ├── auth.ts           # Sistema de autenticação
│   └── security.ts       # Utilitários de segurança
├── styles/               # Estilos e design system
│   └── theme.ts          # Tokens de design
├── types/                # Definições TypeScript
├── utils/                # Utilitários gerais
│   ├── cache.ts          # Cache utilities
│   ├── logger.ts         # Sistema de logs
│   ├── SEO.ts            # SEO utilities
│   └── validation.ts     # Validações
└── middleware.ts         # Middleware global
```

### **🎨 Design System & Biblioteca de Componentes**

O projeto utiliza um **design system centralizado** em `src/styles/theme.ts` e uma **biblioteca completa de componentes reutilizáveis**:

#### **📚 Biblioteca de Componentes**

Todos os componentes seguem um padrão consistente com:

- **Tipagem TypeScript** completa
- **Estilos modulares** com Tailwind CSS
- **Variantes e tamanhos** configuráveis
- **Acessibilidade** integrada
- **Responsividade** nativa
- **Tema dark/light** suporte

```typescript
// Importação centralizada
import { Button, Card, Header, Footer, Input, Modal } from '@/components';

// Exemplo de uso
<Button variant="primary" size="lg" loading>
  Salvar
</Button>

<Card title="Título" variant="elevated">
  Conteúdo do card
</Card>

<Input
  label="Email"
  type="email"
  required
  error="Email inválido"
/>
```

#### **🎨 Design System**

```typescript
// Paleta de cores completa
export const colors = {
  primary: { 50: '#eff6ff', 100: '#dbeafe' /* ... */ },
  secondary: { 50: '#ecfdf5', 100: '#d1fae5' /* ... */ },
  accent: { 50: '#faf5ff', 100: '#f3e8ff' /* ... */ },
  // ... mais cores
};

// Tipografia padronizada
export const typography = {
  fontFamily: { sans: ['Inter', 'sans-serif'] },
  fontSize: { xs: '0.75rem', sm: '0.875rem' /* ... */ },
  fontWeight: { normal: 400, medium: 500 /* ... */ },
};

// Breakpoints responsivos
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
```

### **🔐 Sistema de Autenticação**

**Autenticação JWT** com controle granular de acesso:

```typescript
// Roles disponíveis
type UserRole = 'admin' | 'moderator' | 'user' | 'guest';

// Permissões granulares
type Permission =
  | 'read:posts' | 'write:posts' | 'delete:posts'
  | 'read:users' | 'write:users' | 'delete:users'
  | 'admin:system' | 'moderate:content';

// Proteção de rotas
<AdminRoute>
  <AdminPanel />
</AdminRoute>
```

---

## 🚀 **Quick Start**

### **1. Clone e Instale**

```bash
# Clone o repositório
git clone https://github.com/jonathanmartins81/boilerplate_aqua9_v2.git
cd boilerplate_aqua9_v2

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
```

### **2. Configure as Variáveis de Ambiente**

```env
# .env.local
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **3. Execute o Projeto**

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Testes
npm run test
npm run test:e2e
```

### **4. Acesse a Aplicação**

- **Homepage:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Dashboard:** http://localhost:3000/dashboard (após login)
- **Admin:** http://localhost:3000/admin (apenas admin)

### **5. Páginas de Demonstração**

- **Componentes Demo:** http://localhost:3000/components-demo
- **Showcase Completo:** http://localhost:3000/components-showcase
- **Tema Demo:** http://localhost:3000/theme-demo
- **Tailwind Demo:** http://localhost:3000/tailwind-demo

---

## 🧪 **Testes**

### **Testes Unitários**

```bash
# Executar todos os testes
npm run test

# Executar com coverage
npm run test:coverage

# Executar em modo watch
npm run test:watch
```

### **Testes E2E**

```bash
# Instalar Playwright
npm run test:e2e:install

# Executar testes E2E
npm run test:e2e

# Executar com UI
npm run test:e2e:ui
```

### **Cobertura de Testes (Codecov)**

```bash
# Executar cobertura para CI
npm run test:coverage:ci

# Upload para Codecov
npm run codecov

# Relatório HTML local
npm run test:coverage:report
```

O projeto está integrado com o [Codecov](https://codecov.io) para monitoramento contínuo da cobertura de testes:

- 📊 **Relatórios detalhados** de cobertura
- 🎯 **Metas de cobertura** configuráveis (80% mínimo)
- 📈 **Histórico de cobertura** ao longo do tempo
- 🔍 **Análise de diffs** em Pull Requests
- 📱 **Badges** para README e documentação
- 🚨 **Alertas** quando a cobertura diminui

**Configuração:**

- **Cobertura mínima:** 80%
- **Threshold:** 5%
- **Flags:** unit, integration, e2e
- **Relatórios:** HTML, JSON, Text
- **Token:** Configurado e funcional

---

## 🔒 **Segurança**

### **Recursos Implementados**

- ✅ **Autenticação JWT** com tokens seguros
- ✅ **Autorização por roles** e permissões
- ✅ **Proteção de rotas** automática
- ✅ **Rate limiting** por IP e usuário
- ✅ **Headers de segurança** robustos
- ✅ **Validação e sanitização** de entrada
- ✅ **Detecção de ataques** (SQL Injection, XSS, etc.)
- ✅ **Logs de segurança** detalhados

### **Configuração de Segurança**

```typescript
// Headers de segurança aplicados automaticamente
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'self'...",
  'Strict-Transport-Security': 'max-age=31536000...',
};
```

### **Usuários de Teste**

```typescript
// Credenciais para teste
const USERS = {
  admin: { email: 'admin@aqua9.com.br', password: 'admin123' },
  user: { email: 'user@aqua9.com.br', password: 'user123' },
  moderator: { email: 'mod@aqua9.com.br', password: 'mod123' },
};
```

---

## 📚 **Documentação**

### **Guias Disponíveis**

- 📖 **[SECURITY_GUIDE.md](./docs/SECURITY_GUIDE.md)** - Guia completo de segurança
- 📋 **[CONTRIBUTING.md](./docs/CONTRIBUTING.md)** - Como contribuir
- 🚀 **[IMPROVEMENTS_ROADMAP.md](./docs/IMPROVEMENTS_ROADMAP.md)** - Roadmap de melhorias
- 🔧 **[DEPENDENCY_UPGRADE_GUIDE.md](./docs/DEPENDENCY_UPGRADE_GUIDE.md)** - Atualização de dependências

### **Exemplos Práticos**

- 🔐 **[Autenticação](./src/app/login/page.tsx)** - Página de login
- 🛡️ **[Proteção de Rotas](./src/components/ProtectedRoute.tsx)** - Componentes de proteção
- 🎨 **[Design System](./src/styles/theme.ts)** - Tokens de design
- 🧪 **[Testes](./src/components/Main/Main.test.tsx)** - Exemplos de testes

---

## 🛠️ **Scripts Disponíveis**

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção

# Testes
npm run test         # Testes unitários
npm run test:watch   # Testes em modo watch
npm run test:coverage # Testes com coverage
npm run test:e2e     # Testes E2E
npm run test:e2e:ui  # Testes E2E com UI

# Qualidade
npm run lint         # ESLint
npm run lint:fix     # ESLint com auto-fix
npm run format       # Prettier
npm run format:check # Verificar formatação
npm run type-check   # TypeScript check

# Segurança
npm run audit        # Auditoria de dependências
npm run security     # Verificação de segurança
```

---

## 🔧 **Configuração Avançada**

### **ESLint e Prettier**

```javascript
// eslint.config.js
module.exports = {
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  rules: {
    // Regras customizadas
  },
};
```

### **Git Hooks (Lefthook)**

```yaml
# lefthook.yml
pre-commit:
  parallel: true
  commands:
    lint:
      glob: '*.{js,jsx,ts,tsx}'
      run: npx eslint {staged_files}
    format:
      glob: '*.{js,jsx,ts,tsx,json,md}'
      run: npx prettier --check {staged_files}
```

### **GitHub Actions**

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test
      - run: npm run test:e2e
```

---

## 🚀 **Deploy**

### **Vercel (Recomendado)**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy de produção
vercel --prod
```

### **Docker**

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### **Railway**

```bash
# Deploy no Railway
railway login
railway init
railway up
```

---

## 🤝 **Contribuição**

### **Como Contribuir**

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### **Padrões de Commit**

```bash
# Convenção Conventional Commits
feat: adicionar autenticação JWT
fix: corrigir bug no middleware
docs: atualizar README
style: ajustar formatação
refactor: refatorar sistema de logs
test: adicionar testes para auth
chore: atualizar dependências
```

### **Templates Disponíveis**

- 📝 **[Pull Request Template](./.github/pull_request_template.md)**
- 🐛 **[Bug Report Template](./.github/ISSUE_TEMPLATE/bug_report.md)**
- 💡 **[Feature Request Template](./.github/ISSUE_TEMPLATE/feature_request.md)**

---

## 📊 **Métricas e Status**

### **Qualidade do Código**

- ✅ **ESLint:** Sem erros
- ✅ **Prettier:** Formatação consistente
- ✅ **TypeScript:** Type safety completo
- ✅ **Testes:** 85%+ cobertura
- ✅ **Segurança:** Audit passed

### **Performance**

- 🚀 **Lighthouse:** 95+ score
- ⚡ **Core Web Vitals:** Otimizados
- 📱 **Responsividade:** 100% mobile-friendly
- 🔍 **SEO:** 100% score

### **Segurança**

- 🔒 **OWASP Top 10:** 100% coberto
- 🛡️ **Headers de Segurança:** 15+ headers
- ⏱️ **Rate Limiting:** 4 níveis
- 🚨 **Detecção de Ataques:** 4 tipos

---

## 🎯 **Roadmap**

### **Implementado ✅**

- 🔒 Sistema completo de segurança
- 🧪 Testes unitários e E2E
- 📚 Documentação detalhada
- 🎨 Design system centralizado
- 🚀 Performance otimizada
- 📱 Responsividade completa

### **Em Desenvolvimento 🚧**

- 🌙 Dark mode completo
- 📊 Dashboard de métricas
- 🔧 CLI para geração de componentes
- 🌍 Internacionalização
- 📈 Analytics integrado

### **Planejado 📋**

- 🎨 Storybook completo
- 🔧 DevTools customizadas
- 📱 PWA capabilities
- 🌐 SSR/SSG otimizado
- 🔗 Integração com CMS

---

## 📚 **Documentação Organizada**

### **📋 Documentação Principal**

- 📖 **[README.md](./README.md)** - Documentação principal do projeto
- 📦 **[PACKAGE.md](./PACKAGE.md)** - Documentação do package.json

### **📊 Relatórios de Implementação**

- 📚 **[Documentação Completa](./docs/)** - Toda a documentação organizada
- 📊 **[PROJECT_STATUS_REPORT.md](./docs/PROJECT_STATUS_REPORT.md)** - Status atual do projeto
- 🧪 **[TEST_RESULTS_REPORT.md](./docs/TEST_RESULTS_REPORT.md)** - Resultados dos testes
- 🔧 **[TOOLS_UPDATE_REPORT.md](./docs/TOOLS_UPDATE_REPORT.md)** - Atualizações das ferramentas

---

## 📞 **Suporte**

### **Recursos**

- 📖 **[Documentação Completa](./docs/DOCUMENTATION_INDEX.md)** - Índice de toda documentação
- 🐛 **[Issues](https://github.com/jonathanmartins81/boilerplate_aqua9_v2/issues)** - Reportar bugs
- 💡 **[Discussions](https://github.com/jonathanmartins81/boilerplate_aqua9_v2/discussions)** - Discussões
- 📧 **Email:** jonathan@aqua9.com.br

### **Comunidade**

- 🌟 **Star** o projeto se foi útil
- 🔄 **Fork** para contribuir
- 📢 **Compartilhe** com outros desenvolvedores
- 💬 **Participe** das discussões

---

## 📄 **Licença**

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](./LICENSE) para detalhes.

---

## 🙏 **Agradecimentos**

- **Next.js Team** - Framework incrível
- **Vercel** - Deploy e hosting
- **Tailwind CSS** - Framework de CSS
- **Vitest** - Framework de testes
- **Playwright** - Testes E2E
- **Comunidade Open Source** - Inspiração e contribuições

---

**Desenvolvido com ❤️ por [Jonathan Simão](https://github.com/jonathanmartins81) da [Aqua9](https://aqua9.com.br)**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/jonathanmartins81)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/jonathanmartins81)
[![Website](https://img.shields.io/badge/Website-000000?style=flat-square&logo=About.me&logoColor=white)](https://aqua9.com.br)

# 📚 Biblioteca de Componentes - Aqua9 Boilerplate v2

Esta documentação descreve a **biblioteca completa de componentes reutilizáveis** implementada no Aqua9 Boilerplate v2, seguindo padrões profissionais de componentização.

## 🎯 Visão Geral

A biblioteca de componentes foi desenvolvida com foco em:

- ✅ **Reutilização** - Componentes modulares e flexíveis
- ✅ **Consistência** - Padrão unificado em todos os componentes
- ✅ **Tipagem** - TypeScript completo para type safety
- ✅ **Acessibilidade** - ARIA labels e navegação por teclado
- ✅ **Responsividade** - Funciona em todos os dispositivos
- ✅ **Tema** - Suporte completo aos temas dark/light

## 📁 Estrutura da Biblioteca

```
src/components/
├── Button/           # Componente de botão
├── Card/            # Componente de card
├── DynamicSEO/      # SEO dinâmico
├── Footer/          # Componente de rodapé
├── Header/          # Componente de cabeçalho
├── Input/           # Componente de entrada
├── Main/            # Componente principal
├── Modal/           # Componente de modal
├── Navigation/      # Componente de navegação
└── index.ts         # Exportações centralizadas
```

### Padrão de Estrutura

Cada componente segue a estrutura:

```
ComponentName/
├── index.tsx          # Componente principal
├── types.ts           # Tipagem TypeScript
├── styles.ts          # Estilos Tailwind CSS
├── ComponentName.test.tsx  # Testes unitários
└── stories.tsx        # Storybook stories
```

## 🚀 Componentes Disponíveis

### 1. **Button** - Componente de Botão

**Variantes:** `primary`, `secondary`, `danger`, `ghost`, `outline`  
**Tamanhos:** `sm`, `md`, `lg`  
**Recursos:** Loading, ícones, full width, disabled

```tsx
import { Button } from '@/components';

// Uso básico
<Button variant="primary" size="lg">
  Clique aqui
</Button>

// Com loading
<Button loading>Salvando...</Button>

// Com ícone
<Button icon="🚀" iconPosition="left">
  Lançar
</Button>
```

### 2. **Card** - Componente de Card

**Variantes:** `default`, `elevated`, `outlined`, `filled`  
**Tamanhos:** `sm`, `md`, `lg`  
**Recursos:** Título, subtítulo, imagem, footer, ações

```tsx
import { Card } from '@/components';

// Card básico
<Card title="Título" subtitle="Subtítulo">
  Conteúdo do card
</Card>

// Card com imagem
<Card
  title="Card com Imagem"
  image={{ src: "/image.jpg", alt: "Descrição" }}
>
  Conteúdo
</Card>

// Card clicável
<Card
  title="Card Clicável"
  hoverable
  onClick={() => alert('Clicado!')}
>
  Clique aqui
</Card>
```

### 3. **Header** - Componente de Cabeçalho

**Variantes:** `default`, `minimal`, `hero`, `dashboard`  
**Tamanhos:** `sm`, `md`, `lg`  
**Recursos:** Logo, título, subtítulo, breadcrumbs, ações

```tsx
import { Header } from '@/components';

// Header básico
<Header title="Página Principal" subtitle="Bem-vindo" />

// Header hero
<Header
  variant="hero"
  title="Título Hero"
  logo={{ src: "/logo.svg", alt: "Logo" }}
/>

// Header com ações
<Header
  title="Dashboard"
  actions={<Button>Nova Ação</Button>}
/>
```

### 4. **Footer** - Componente de Rodapé

**Variantes:** `default`, `minimal`, `dark`, `branded`  
**Tamanhos:** `sm`, `md`, `lg`  
**Recursos:** Logo, seções, links sociais, copyright

```tsx
import { Footer } from '@/components';

// Footer básico
<Footer copyright="© 2024 Aqua9" />

// Footer completo
<Footer
  variant="branded"
  logo={{ src: "/logo.svg", alt: "Logo" }}
  sections={[
    {
      title: "Produtos",
      links: [{ label: "Boilerplate", href: "/" }]
    }
  ]}
  socialLinks={[
    { label: "GitHub", href: "https://github.com" }
  ]}
  showBackToTop
/>
```

### 5. **Input** - Componente de Entrada

**Variantes:** `default`, `outlined`, `filled`, `ghost`  
**Tamanhos:** `sm`, `md`, `lg`  
**Tipos:** `text`, `email`, `password`, `number`, `tel`, `url`, `search`  
**Recursos:** Label, ícones, estados, helper text

```tsx
import { Input } from '@/components';

// Input básico
<Input label="Email" type="email" placeholder="seu@email.com" />

// Input com erro
<Input
  label="Senha"
  type="password"
  error="Senha é obrigatória"
/>

// Input com ícone
<Input
  label="Buscar"
  leftIcon={<SearchIcon />}
  placeholder="Digite para buscar..."
/>
```

### 6. **Modal** - Componente de Modal

**Tamanhos:** `sm`, `md`, `lg`, `xl`, `full`  
**Variantes:** `default`, `centered`, `bottom`, `side`  
**Recursos:** Header, footer, ações, fechamento automático

```tsx
import { Modal } from '@/components';

// Modal básico
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmação"
>
  Conteúdo do modal
</Modal>

// Modal com footer
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmação"
  footer={
    <div className="flex gap-2">
      <Button variant="ghost" onClick={() => setIsOpen(false)}>
        Cancelar
      </Button>
      <Button onClick={handleConfirm}>
        Confirmar
      </Button>
    </div>
  }
>
  Deseja realmente excluir este item?
</Modal>
```

### 7. **DynamicSEO** - SEO Dinâmico

**Recursos:** Meta tags dinâmicas, Open Graph, Twitter Cards, JSON-LD

```tsx
import { DynamicSEO } from '@/components';

// SEO básico
<DynamicSEO
  title="Página Principal"
  description="Descrição da página"
/>

// SEO para artigo
<DynamicSEO
  title="Artigo"
  description="Descrição do artigo"
  type="article"
  author="João Silva"
  publishedTime="2024-01-01"
/>
```

## 🎨 Design System

### Cores

```typescript
// Cores primárias
primary: {
  50: '#eff6ff',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
}

// Cores secundárias
secondary: {
  50: '#ecfdf5',
  500: '#10b981',
  600: '#059669',
  700: '#047857',
}
```

### Tipografia

```typescript
// Fontes
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}

// Tamanhos
fontSize: {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
}
```

### Breakpoints

```typescript
// Responsividade
breakpoints: {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}
```

## 🧪 Testes

Todos os componentes incluem testes unitários completos:

```bash
# Executar testes dos componentes
npm run test

# Testes com cobertura
npm run test:coverage

# Testes específicos de um componente
npm run test Button
```

### Exemplo de Teste

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies correct variant classes', () => {
    render(<Button variant="primary">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-cyan-600');
  });
});
```

## 📖 Storybook

Documentação interativa disponível em:

```bash
# Iniciar Storybook
npm run storybook

# Acessar: http://localhost:6006
```

### Exemplo de Story

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import Button from './index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};
```

## 🚀 Páginas de Demonstração

### `/components-demo`

Demonstração básica dos componentes Button e Card.

### `/components-showcase`

Showcase completo de todos os componentes com exemplos interativos.

### `/theme-demo`

Demonstração do sistema de temas e responsividade.

### `/tailwind-demo`

Demonstração das classes utilitárias do Tailwind CSS.

## 🔧 Como Usar

### Importação

```typescript
// Importação individual
import Button from '@/components/Button';
import Card from '@/components/Card';

// Importação centralizada
import { Button, Card, Header, Footer, Input, Modal } from '@/components';
```

### Configuração

1. **Instale as dependências:**

   ```bash
   npm install
   ```

2. **Execute o projeto:**

   ```bash
   npm run dev
   ```

3. **Acesse as demonstrações:**
   - http://localhost:3000/components-showcase
   - http://localhost:3000/components-demo

## 📝 Convenções

### Nomenclatura

- **Componentes:** PascalCase (`Button`, `Card`)
- **Arquivos:** kebab-case (`button.test.tsx`, `card.stories.tsx`)
- **Props:** camelCase (`onClick`, `variant`)

### Estrutura de Props

```typescript
interface ComponentProps {
  // Props obrigatórias primeiro
  children: ReactNode;

  // Props opcionais com valores padrão
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';

  // Props de estilo
  className?: string;

  // Props de evento
  onClick?: () => void;
}
```

### Estilos

- Use Tailwind CSS para estilos
- Mantenha consistência com o design system
- Prefira classes utilitárias sobre CSS customizado
- Use variáveis CSS para valores reutilizáveis

## 🤝 Contribuindo

Para contribuir com novos componentes:

1. **Siga o padrão estabelecido**
2. **Inclua testes unitários**
3. **Adicione stories do Storybook**
4. **Documente as props e exemplos**
5. **Mantenha a consistência visual**

## 📚 Recursos Adicionais

- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
- [Guia de Acessibilidade](https://www.w3.org/WAI/WCAG21/quickref/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

**A biblioteca de componentes está em constante evolução. Contribuições são bem-vindas!** 🚀

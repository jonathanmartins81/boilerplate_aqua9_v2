# 🤝 Contribuindo para o Aqua9 Boilerplate

Obrigado por se interessar em contribuir com o **Boilerplate Aqua9 v2**! Este documento fornece diretrizes e informações para tornar o processo de contribuição suave e eficiente.

## 📋 Índice

- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Padrões de Código](#padrões-de-código)
- [Testes](#testes)
- [Pull Requests](#pull-requests)
- [Issues](#issues)
- [Comunicação](#comunicação)
- [Recursos](#recursos)

---

## 🚀 Como Contribuir

### Tipos de Contribuições

Aceitamos diferentes tipos de contribuições:

- 🐛 **Bug Fixes** - Correções de bugs e problemas
- ✨ **Features** - Novas funcionalidades e melhorias
- 📚 **Documentação** - Melhorias na documentação
- 🧪 **Testes** - Adição ou melhoria de testes
- 🎨 **UI/UX** - Melhorias na interface e experiência
- 🔧 **DevOps** - Melhorias na infraestrutura
- 🔒 **Segurança** - Correções e melhorias de segurança

### Processo de Contribuição

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie** uma branch para sua feature
4. **Desenvolva** sua contribuição
5. **Teste** suas mudanças
6. **Commit** seguindo os padrões
7. **Push** para seu fork
8. **Abra** um Pull Request

---

## ⚙️ Configuração do Ambiente

### Pré-requisitos

- Node.js 18+
- npm 8+
- Git

### Setup Inicial

```bash
# Clone seu fork
git clone https://github.com/SEU_USUARIO/boilerplate_aqua9_v2.git
cd boilerplate_aqua9_v2

# Instale dependências
npm install

# Configure o ambiente
npm run setup

# Execute testes
npm test

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Úteis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção

# Testes
npm run test         # Executa todos os testes
npm run test:watch   # Testes em modo watch
npm run test:coverage # Testes com cobertura
npm run test:e2e     # Testes E2E

# Qualidade
npm run lint         # Verifica linting
npm run lint:fix     # Corrige problemas de linting
npm run format       # Formata código
npm run type-check   # Verifica tipos TypeScript

# Utilitários
npm run generate:component  # Gera novo componente
npm run generate:page       # Gera nova página
npm run generate:hook       # Gera novo hook
npm run generate:util       # Gera nova utilidade

# Demonstrações
npm run dev                 # Acesse http://localhost:3000/components-showcase
```

---

## 📝 Padrões de Código

### Estrutura de Pastas

```
src/
├── app/              # Páginas e rotas (App Router)
├── components/       # Componentes React
├── lib/             # Bibliotecas e configurações
├── hooks/           # Custom hooks
├── utils/           # Utilitários
├── types/           # Definições de tipos
└── styles/          # Estilos e design system
```

### Convenções de Nomenclatura

- **Arquivos**: `kebab-case` (ex: `user-profile.tsx`)
- **Componentes**: `PascalCase` (ex: `UserProfile`)
- **Hooks**: `camelCase` com prefixo `use` (ex: `useUserProfile`)
- **Utilitários**: `camelCase` (ex: `formatDate`)
- **Tipos**: `PascalCase` (ex: `UserProfileProps`)

### Padrões de Commit

Siga o padrão **Conventional Commits**:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Tipos de Commit

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação, ponto e vírgula, etc.
- `refactor:` - Refatoração de código
- `test:` - Adição ou correção de testes
- `chore:` - Tarefas de build, dependências, etc.

#### Exemplos

```bash
feat(auth): add JWT authentication system
fix(ui): resolve button alignment in mobile view
docs(readme): update installation instructions
test(components): add unit tests for Button component
refactor(utils): simplify date formatting function
```

### Padrões de Código

#### TypeScript

- Use tipos explícitos quando necessário
- Evite `any`, use `unknown` quando apropriado
- Use interfaces para objetos complexos
- Prefira `const` sobre `let`

```typescript
// ✅ Bom
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

const getUserProfile = async (id: string): Promise<UserProfile> => {
  // implementação
};

// ❌ Evite
const getUserProfile = async (id: any): Promise<any> => {
  // implementação
};
```

#### React

- Use componentes funcionais com hooks
- Prefira `useState` e `useEffect` sobre classes
- Use `React.memo` para otimização quando necessário
- Mantenha componentes pequenos e focados

```typescript
// ✅ Bom
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary'
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

#### Padrões de Componentes

Todos os componentes devem seguir o padrão estabelecido:

```
src/components/ComponentName/
├── index.tsx          # Componente principal
├── types.ts           # Tipagem TypeScript
├── styles.ts          # Estilos Tailwind CSS
├── ComponentName.test.tsx  # Testes unitários
└── stories.tsx        # Storybook stories
```

**Estrutura de um Componente:**

```typescript
// types.ts
export interface ComponentProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// styles.ts
export const componentVariants = {
  default: 'bg-white border border-gray-300',
  primary: 'bg-blue-600 text-white',
  secondary: 'bg-gray-600 text-white',
};

// index.tsx
'use client';

import { ComponentProps } from './types';
import { componentVariants } from './styles';

const Component = ({ children, variant = 'default', ...props }: ComponentProps) => {
  return (
    <div className={componentVariants[variant]} {...props}>
      {children}
    </div>
  );
};

export default Component;
```

#### CSS/Tailwind

```typescript
// ✅ Bom
<div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gradient-primary">
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
    Título
  </h1>
</div>

// ❌ Evite
<div style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '2rem',
  textAlign: 'center',
  background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
}}>
```

---

## 🧪 Testes

### Cobertura de Testes

Mantenha uma cobertura de testes de pelo menos **80%**:

```bash
npm run test:coverage
```

### Tipos de Teste

#### Testes Unitários

- Teste componentes isoladamente
- Use mocks para dependências externas
- Teste diferentes estados e props

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### Testes de Integração

- Teste fluxos completos
- Teste interações entre componentes
- Use `@testing-library/user-event` para interações

#### Testes E2E

- Teste cenários completos do usuário
- Use Playwright para testes E2E
- Teste em diferentes navegadores

### Utilitários de Teste

Use os utilitários em `src/test-utils/index.ts`:

```typescript
import { renderWithProviders, UserFactory } from '@/test-utils';

describe('UserProfile', () => {
  it('displays user information', () => {
    const user = UserFactory.create({
      name: 'João Silva',
      email: 'joao@example.com'
    });

    renderWithProviders(<UserProfile user={user} />);

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('joao@example.com')).toBeInTheDocument();
  });
});
```

---

## 🔄 Pull Requests

### Checklist do PR

Antes de abrir um PR, verifique:

- [ ] Código segue os padrões estabelecidos
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Build passa sem erros
- [ ] Linting passa sem warnings
- [ ] Commits seguem o padrão Conventional Commits

### Template do PR

```markdown
## 📝 Descrição

Breve descrição das mudanças realizadas.

## 🎯 Tipo de Mudança

- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação
- [ ] Refatoração

## 🧪 Testes

- [ ] Testes unitários adicionados/atualizados
- [ ] Testes de integração adicionados/atualizados
- [ ] Testes E2E adicionados/atualizados
- [ ] Todos os testes passam

## 📸 Screenshots (se aplicável)

Adicione screenshots para mudanças visuais.

## 🔍 Checklist

- [ ] Código segue os padrões do projeto
- [ ] Self-review do código foi realizado
- [ ] Comentários foram adicionados onde necessário
- [ ] Documentação foi atualizada
- [ ] Build e testes passam localmente

## 📋 Contexto Adicional

Informações adicionais que podem ser úteis para os revisores.
```

### Processo de Review

1. **Auto-review** - Revise seu próprio código
2. **Testes** - Execute todos os testes
3. **Linting** - Verifique se não há problemas de linting
4. **Documentação** - Atualize documentação se necessário
5. **Submissão** - Abra o PR com descrição clara

---

## 🐛 Issues

### Reportando Bugs

Use o template de bug report:

```markdown
## 🐛 Descrição do Bug

Descrição clara e concisa do bug.

## 🔄 Passos para Reproduzir

1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## ✅ Comportamento Esperado

Descrição do que deveria acontecer.

## 📸 Screenshots

Adicione screenshots se aplicável.

## 🖥️ Ambiente

- OS: [ex: macOS, Windows, Linux]
- Navegador: [ex: Chrome, Safari, Firefox]
- Versão: [ex: 22]
- Node.js: [ex: 18.0.0]

## 📋 Informações Adicionais

Qualquer informação adicional sobre o problema.
```

### Sugerindo Features

Use o template de feature request:

```markdown
## 💡 Descrição da Feature

Descrição clara da funcionalidade desejada.

## 🎯 Problema que Resolve

Descrição do problema que esta feature resolveria.

## 💭 Solução Proposta

Descrição da solução proposta.

## 🔄 Alternativas Consideradas

Outras soluções que foram consideradas.

## 📋 Informações Adicionais

Qualquer informação adicional.
```

---

## 💬 Comunicação

### Canais de Comunicação

- **Issues**: Para bugs e feature requests
- **Discussions**: Para discussões gerais
- **Email**: contato@aqua9.com.br

### Diretrizes de Comunicação

- Seja respeitoso e construtivo
- Use linguagem clara e objetiva
- Forneça contexto suficiente
- Responda prontamente a feedback

### Código de Conduta

- Respeite todos os contribuidores
- Mantenha discussões construtivas
- Reporte comportamento inadequado
- Ajude outros contribuidores

---

## 📚 Recursos

### Documentação

- [README.md](./README.md) - Documentação principal
- [SECURITY_GUIDE.md](./SECURITY_GUIDE.md) - Guia de segurança
- [CODECOV_GUIDE.md](./CODECOV_GUIDE.md) - Guia do Codecov

### Ferramentas

- **ESLint**: Linting de código
- **Prettier**: Formatação de código
- **TypeScript**: Tipagem estática
- **Vitest**: Framework de testes
- **Playwright**: Testes E2E
- **Storybook**: Documentação de componentes

### Links Úteis

- [Conventional Commits](https://www.conventionalcommits.org/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Next.js](https://nextjs.org/docs)

---

## 🎉 Agradecimentos

Obrigado por contribuir com o **Boilerplate Aqua9 v2**! Suas contribuições ajudam a tornar este projeto melhor para toda a comunidade.

### Contribuidores

Veja a lista de [contribuidores](https://github.com/aqua9/boilerplate_aqua9_v2/graphs/contributors) no GitHub.

---

**Desenvolvido com ❤️ pela [Aqua9](https://aqua9.com.br)**

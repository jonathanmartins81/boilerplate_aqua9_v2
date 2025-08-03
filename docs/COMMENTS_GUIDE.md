# 📝 Guia de Comentários - Boilerplate Aqua9

## 🎯 **Objetivo**

Este guia explica como os comentários foram implementados no projeto para facilitar o entendimento do código durante o desenvolvimento, mantendo a limpeza no build de produção.

## 📋 **Estrutura de Comentários**

### **1. Comentários JSDoc (Recomendado)**

```typescript
/**
 * Componente Main - Página Inicial
 *
 * Este é o componente principal que renderiza toda a interface da página inicial.
 * Contém o logo, título, descrição e ilustração da Aqua9.
 *
 * Funcionalidades:
 * - Exibe o logo da Aqua9
 * - Mostra o título "Boilerplate Aqua9"
 * - Apresenta descrição das tecnologias
 * - Renderiza ilustração decorativa
 * - Interface responsiva e acessível
 *
 * @param title - Título da página (opcional, tem valor padrão)
 * @param description - Descrição das tecnologias (opcional, tem valor padrão)
 * @returns Interface completa da página inicial
 */
```

### **2. Comentários de Seção**

```typescript
// ===== CONFIGURAÇÕES DE TARGET =====
"target": "ES2017", // Versão do JavaScript para compilação
"lib": ["dom", "dom.iterable", "es6"], // Bibliotecas TypeScript incluídas
```

### **3. Comentários Inline**

```typescript
const inter = Inter({ subsets: ['latin'] }); // Carrega apenas caracteres latinos para otimizar performance
```

## 🛠️ **Configuração do Prettier**

### **Preservação de Comentários**

O `.prettierrc.json` foi configurado para preservar comentários durante o desenvolvimento:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "proseWrap": "preserve",
  "overrides": [
    {
      "files": ["*.js", "*.jsx", "*.ts", "*.tsx"],
      "options": {
        "parser": "typescript"
      }
    }
  ]
}
```

## 📁 **Arquivos Comentados**

### **✅ Arquivos Principais**

| Arquivo                         | Tipo         | Descrição                          |
| ------------------------------- | ------------ | ---------------------------------- |
| `src/app/layout.tsx`            | Layout       | Layout principal com metadados SEO |
| `src/app/page.tsx`              | Página       | Página inicial da aplicação        |
| `src/components/Main/index.tsx` | Componente   | Componente principal da homepage   |
| `src/components/Main/styles.ts` | Estilos      | Estilos do componente Main         |
| `src/styles/global.ts`          | Estilos      | Estilos globais da aplicação       |
| `src/utils/SEO.ts`              | Utilitário   | Configurações SEO centralizadas    |
| `src/components/JsonLd.tsx`     | Componente   | Dados estruturados para SEO        |
| `next.config.js`                | Configuração | Configuração do Next.js            |
| `tsconfig.json`                 | Configuração | Configuração do TypeScript         |

### **❌ Arquivos sem Comentários**

| Arquivo                       | Motivo                       |
| ----------------------------- | ---------------------------- |
| `package.json`                | JSON não suporta comentários |
| Arquivos de configuração JSON | JSON não suporta comentários |

## 🔧 **Como Adicionar Comentários**

### **1. Para Componentes React**

```typescript
/**
 * Nome do Componente
 *
 * Descrição detalhada do que o componente faz.
 *
 * Funcionalidades:
 * - Lista de funcionalidades principais
 * - Explicação de props
 * - Comportamentos especiais
 *
 * @param prop1 - Descrição da prop1
 * @param prop2 - Descrição da prop2
 * @returns O que o componente retorna
 */
```

### **2. Para Funções Utilitárias**

````typescript
/**
 * Nome da Função
 *
 * Descrição do que a função faz e quando usar.
 *
 * @param param1 - Descrição do parâmetro
 * @param param2 - Descrição do parâmetro
 * @returns Descrição do retorno
 * @example
 * ```typescript
 * const result = functionName('value1', 'value2');
 * console.log(result); // Output esperado
 * ```
 */
````

### **3. Para Configurações**

```typescript
// ===== SEÇÃO DA CONFIGURAÇÃO =====
// Descrição do que esta seção faz
const config = {
  option1: 'value1', // Explicação da opção
  option2: 'value2', // Explicação da opção
};
```

## 🚀 **Build vs Desenvolvimento**

### **Durante o Desenvolvimento**

- ✅ Comentários são preservados
- ✅ Facilita entendimento do código
- ✅ Documentação inline disponível
- ✅ Prettier mantém formatação

### **Durante o Build**

- 🗑️ Comentários são removidos automaticamente
- 📦 Código otimizado para produção
- ⚡ Tamanho reduzido dos arquivos
- 🔒 Sem exposição de informações internas

## 📚 **Padrões de Comentário**

### **1. JSDoc para Componentes**

```typescript
/**
 * Componente [Nome]
 *
 * [Descrição detalhada]
 *
 * Funcionalidades:
 * - [Funcionalidade 1]
 * - [Funcionalidade 2]
 * - [Funcionalidade 3]
 *
 * Props:
 * - [prop1]: [tipo] - [descrição]
 * - [prop2]: [tipo] - [descrição]
 *
 * @returns [Descrição do retorno]
 */
```

### **2. JSDoc para Funções**

```typescript
/**
 * [Nome da Função]
 *
 * [Descrição detalhada]
 *
 * @param [param1] - [Descrição do parâmetro]
 * @param [param2] - [Descrição do parâmetro]
 * @returns [Descrição do retorno]
 * @throws [Descrição do erro, se aplicável]
 */
```

### **3. Comentários de Seção**

```typescript
// ===== [NOME DA SEÇÃO] =====
// [Descrição da seção]
```

### **4. Comentários Inline**

```typescript
const value = 'example'; // [Explicação breve]
```

## 🎨 **Exemplos Práticos**

### **Componente com Props**

```typescript
/**
 * Botão Personalizado
 *
 * Componente de botão reutilizável com diferentes variantes
 * e estados de loading.
 *
 * Funcionalidades:
 * - Múltiplas variantes (primary, secondary, outline)
 * - Estado de loading com spinner
 * - Tamanhos diferentes (sm, md, lg)
 * - Suporte a ícones
 *
 * @param variant - Variante do botão ('primary' | 'secondary' | 'outline')
 * @param size - Tamanho do botão ('sm' | 'md' | 'lg')
 * @param loading - Estado de loading
 * @param children - Conteúdo do botão
 * @returns Elemento button estilizado
 */
```

### **Função Utilitária**

````typescript
/**
 * Formata número para moeda brasileira
 *
 * Converte um número para o formato de moeda brasileira (R$)
 * com separadores de milhares e decimais.
 *
 * @param value - Valor numérico a ser formatado
 * @param currency - Código da moeda (padrão: 'BRL')
 * @returns String formatada em moeda brasileira
 * @example
 * ```typescript
 * formatCurrency(1234.56); // "R$ 1.234,56"
 * formatCurrency(1000, 'USD'); // "$ 1,000.00"
 * ```
 */
````

## 🔍 **Verificação de Comentários**

### **Comandos Úteis**

```bash
# Verificar se há arquivos sem comentários
npm run lint

# Formatar código preservando comentários
npm run format

# Verificar tipos (comentários JSDoc ajudam)
npm run type-check
```

## 📖 **Boas Práticas**

### **✅ Faça**

- Use JSDoc para componentes e funções
- Explique o "porquê" não apenas o "o quê"
- Mantenha comentários atualizados
- Use comentários de seção para organizar código
- Documente props e parâmetros

### **❌ Evite**

- Comentários óbvios demais
- Comentários desatualizados
- Comentários muito longos
- Comentários em JSON (não funciona)
- Comentários que explicam código ruim

## 🎯 **Benefícios**

### **Para Desenvolvedores**

- 📚 Documentação inline
- 🔍 Facilita debugging
- 👥 Melhora colaboração
- 🚀 Acelera onboarding

### **Para o Projeto**

- 🏗️ Código mais manutenível
- 📈 Melhor qualidade
- 🔄 Facilita refatoração
- 📖 Documentação sempre atualizada

---

**Desenvolvido por:** Jonathan Simão
**Empresa:** Aqua9
**Site:** https://aqua9.com.br

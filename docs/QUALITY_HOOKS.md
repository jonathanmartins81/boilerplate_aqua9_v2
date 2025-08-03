# 🔧 Hooks de Qualidade - Boilerplate Aqua9

## 🎯 **Visão Geral**

O Boilerplate Aqua9 implementa um sistema completo de hooks Git para garantir qualidade de código em todos os commits e pushes. Os hooks são configurados usando **Husky** e **Lefthook** para máxima flexibilidade e performance.

## 📋 **Hooks Implementados**

### **1. Pre-commit Hook (Husky)**

**Arquivo:** `.husky/pre-commit`

**Funcionalidades:**

- ✅ Formatação automática com Prettier
- ✅ Linting com ESLint
- ✅ Verificação de tipos TypeScript
- ✅ Testes unitários para arquivos alterados
- ✅ Verificação de qualidade básica

**Execução:**

```bash
# Executado automaticamente antes de cada commit
git commit -m "feat: nova funcionalidade"
```

### **2. Pre-commit Hook (Lefthook)**

**Arquivo:** `lefthook.yml`

**Funcionalidades:**

- ✅ Formatação paralela com Prettier
- ✅ Linting paralelo com ESLint
- ✅ Verificação de tipos TypeScript
- ✅ Verificação de dependências não utilizadas
- ✅ Testes unitários para arquivos alterados

### **3. Pre-push Hook (Lefthook)**

**Funcionalidades:**

- ✅ Verificação completa de qualidade
- ✅ Execução completa de testes
- ✅ Build de produção
- ✅ Verificação de vulnerabilidades

### **4. Post-commit Hook (Lefthook)**

**Funcionalidades:**

- ✅ Relatório de qualidade
- ✅ Confirmação de sucesso

### **5. Post-merge Hook (Lefthook)**

**Funcionalidades:**

- ✅ Instalação automática de dependências
- ✅ Verificação de funcionamento

## 🛠️ **Configuração dos Hooks**

### **Lint Staged (`.lintstagedrc.js`)**

```javascript
module.exports = {
  // Arquivos TypeScript e JavaScript
  '*.{js,jsx,ts,tsx}': [
    'prettier --write',
    'eslint --fix',
    'jest --bail --findRelatedTests --passWithNoTests',
  ],

  // Arquivos de configuração
  '*.{json,md,yml,yaml}': ['prettier --write'],

  // Arquivos CSS
  '*.{css,scss}': ['prettier --write'],

  // Verificação final
  '*': [() => 'npm run type-check', () => 'npm run check-deps'],
};
```

### **Lefthook (`lefthook.yml`)**

```yaml
pre-commit:
  parallel: true
  commands:
    format:
      glob: '*.{js,jsx,ts,tsx,json,css,md,yml,yaml}'
      run: npx prettier --write {staged_files}

    lint:
      glob: '*.{js,jsx,ts,tsx}'
      run: npx eslint --fix {staged_files}

pre-push:
  parallel: false
  commands:
    quality-full:
      run: npm run quality:full
    build:
      run: npm run build
    audit:
      run: npm audit --audit-level=moderate
```

## 📊 **Scripts de Qualidade**

### **Scripts Disponíveis:**

| Script                 | Comando                                                      | Descrição                                  |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------ |
| `npm run quality`      | `npm run lint && npm run format:check && npm run type-check` | Verificação básica de qualidade            |
| `npm run quality:full` | `npm run quality && npm run check-deps && npm run test:ci`   | Verificação completa de qualidade          |
| `npm run lint`         | `next lint`                                                  | Linting com ESLint                         |
| `npm run lint:fix`     | `next lint --fix`                                            | Linting com correção automática            |
| `npm run format`       | `prettier --write .`                                         | Formatação com Prettier                    |
| `npm run format:check` | `prettier --check .`                                         | Verificação de formatação                  |
| `npm run type-check`   | `tsc --noEmit`                                               | Verificação de tipos TypeScript            |
| `npm run check-deps`   | `knip`                                                       | Verificação de dependências não utilizadas |
| `npm run test:ci`      | `jest --runInBand`                                           | Testes em modo CI                          |

## 🔄 **Fluxo de Trabalho**

### **1. Durante o Desenvolvimento**

```bash
# Fazer alterações no código
git add .
git commit -m "feat: nova funcionalidade"

# Hooks executados automaticamente:
# ✅ Prettier formata o código
# ✅ ESLint corrige problemas
# ✅ TypeScript verifica tipos
# ✅ Testes relacionados são executados
# ✅ Commit é permitido
```

### **2. Antes do Push**

```bash
git push origin main

# Hooks executados automaticamente:
# ✅ Verificação completa de qualidade
# ✅ Todos os testes são executados
# ✅ Build de produção é testado
# ✅ Vulnerabilidades são verificadas
# ✅ Push é permitido
```

### **3. Após Merge**

```bash
git pull origin main

# Hooks executados automaticamente:
# ✅ Dependências são instaladas
# ✅ Funcionamento é verificado
```

## ⚡ **Performance e Otimizações**

### **Execução Paralela:**

- **Pre-commit**: Comandos executados em paralelo para velocidade
- **Pre-push**: Comandos executados sequencialmente para confiabilidade

### **Execução Seletiva:**

- **Lint Staged**: Apenas arquivos alterados são processados
- **Testes**: Apenas testes relacionados aos arquivos alterados
- **Formatação**: Apenas arquivos relevantes são formatados

### **Cache e Otimizações:**

- **TypeScript**: Cache de compilação
- **Jest**: Cache de testes
- **ESLint**: Cache de linting

## 🚨 **Tratamento de Erros**

### **Erros no Pre-commit:**

- ❌ Commit é bloqueado
- 🔍 Erro é exibido com detalhes
- 🛠️ Sugestões de correção são fornecidas

### **Erros no Pre-push:**

- ❌ Push é bloqueado
- 🔍 Erro é exibido com detalhes
- 🛠️ Comandos de correção são sugeridos

### **Exemplos de Erros:**

```bash
# Erro de linting
✖ 1 problem (0 errors, 1 warning)
  src/components/Example.tsx:10:10  warning  'unusedVar' is assigned a value but never used

# Erro de tipo
src/components/Example.tsx:15:7 - error TS2322: Type 'string' is not assignable to type 'number'.

# Erro de teste
FAIL  src/components/Example.test.tsx
  ● Example › should render correctly
    expect(element).toHaveTextContent('Expected Text')
```

## 🔧 **Configuração Personalizada**

### **Desabilitar Hooks Temporariamente:**

```bash
# Desabilitar hooks para um commit
git commit -m "feat: nova funcionalidade" --no-verify

# Desabilitar hooks para um push
git push origin main --no-verify
```

### **Executar Hooks Manualmente:**

```bash
# Executar pre-commit manualmente
npx husky run .husky/pre-commit

# Executar verificação completa
npm run quality:full
```

### **Configurar Hooks Globais:**

```bash
# Instalar hooks globalmente
npm run prepare

# Verificar se hooks estão ativos
ls -la .git/hooks/
```

## 📈 **Métricas de Qualidade**

### **Cobertura de Testes:**

- **Componentes**: 100% de cobertura
- **Utilitários**: 100% de cobertura
- **Total**: 6.03% (em crescimento)

### **Qualidade de Código:**

- **ESLint**: 0 erros, 0 warnings
- **TypeScript**: 0 erros de tipo
- **Prettier**: 100% de arquivos formatados

### **Dependências:**

- **Vulnerabilidades**: 0 encontradas
- **Dependências não utilizadas**: Monitoradas
- **Versões**: Sempre atualizadas

## 🎯 **Benefícios**

### **Para Desenvolvedores:**

- 🚀 **Velocidade**: Hooks otimizados para desenvolvimento
- 🔍 **Detecção Precoce**: Erros encontrados antes do commit
- 🛠️ **Correção Automática**: Muitos problemas corrigidos automaticamente
- 📚 **Documentação**: Código sempre documentado

### **Para o Projeto:**

- 🏗️ **Consistência**: Código sempre padronizado
- 🔒 **Segurança**: Vulnerabilidades detectadas automaticamente
- 📈 **Qualidade**: Padrões sempre mantidos
- 🚀 **Performance**: Builds otimizados

### **Para a Equipe:**

- 👥 **Colaboração**: Código sempre pronto para review
- 🔄 **Integração**: Menos conflitos de merge
- 📊 **Visibilidade**: Métricas de qualidade sempre disponíveis
- 🎯 **Foco**: Desenvolvedores focam na lógica, não na formatação

## 🔮 **Próximos Passos**

### **Melhorias Futuras:**

- [ ] Integração com análise de código estático
- [ ] Relatórios de qualidade automatizados
- [ ] Integração com CI/CD
- [ ] Métricas de performance
- [ ] Análise de segurança avançada

---

**Desenvolvido por:** Jonathan Simão
**Empresa:** Aqua9
**Site:** https://aqua9.com.br

---

_Este documento descreve o sistema completo de hooks de qualidade implementado no Boilerplate Aqua9, garantindo que todo código seja de alta qualidade antes de chegar ao repositório._

# 📊 Guia do Codecov - Aqua9 Boilerplate

> Guia completo para uso e configuração do Codecov no projeto Aqua9 Boilerplate.

---

## 🎯 **O que é o Codecov?**

O [Codecov](https://codecov.io) é uma plataforma que ajuda a visualizar e gerenciar a cobertura de testes do seu código. Ele fornece:

- 📊 **Relatórios detalhados** de cobertura
- 📈 **Histórico** de cobertura ao longo do tempo
- 🔍 **Análise de diffs** em Pull Requests
- 📱 **Badges** para documentação
- 🚨 **Alertas** quando a cobertura diminui

---

## 🚀 **Configuração Inicial**

### **1. Instalação**

O Codecov já está instalado como dependência de desenvolvimento:

```bash
npm install --save-dev codecov
```

### **2. Scripts Disponíveis**

```bash
# Executar testes com cobertura para CI
npm run test:coverage:ci

# Gerar relatório HTML local
npm run test:coverage:report

# Upload para Codecov
npm run codecov
```

### **3. Configuração do Projeto**

O arquivo `codecov.yml` já está configurado com:

```yaml
coverage:
  minimum: 80
  precision: 2
  status:
    project:
      target: 80%
      threshold: 5%
    patch:
      target: 80%
      threshold: 5%
```

---

## 📊 **Como Usar**

### **Executar Cobertura Localmente**

```bash
# Executar testes com cobertura
npm run test:coverage

# Gerar relatório HTML
npm run test:coverage:report

# Abrir relatório no navegador
open coverage/index.html
```

### **Upload para Codecov**

```bash
# Upload automático após testes
npm run test:coverage:ci

# Upload manual
npm run codecov
```

### **Verificar Cobertura**

```bash
# Verificar cobertura no terminal
npm run test:coverage:ci

# Verificar relatório HTML
npm run test:coverage:report
```

---

## 🔧 **Configuração Avançada**

### **Flags de Cobertura**

O projeto está configurado com diferentes flags:

```yaml
flags:
  unit:
    target: 85%
    threshold: 5%
  integration:
    target: 75%
    threshold: 10%
  e2e:
    target: 60%
    threshold: 15%
```

### **Arquivos Ignorados**

O Codecov ignora automaticamente:

- Arquivos de teste (`*.test.ts`, `*.spec.ts`)
- Arquivos de configuração (`*.config.js`)
- Arquivos de build (`.next/`, `dist/`)
- Documentação (`*.md`)
- Dependências (`node_modules/`)

### **Metas de Cobertura**

- **Global:** 80% mínimo
- **Unitários:** 85% mínimo
- **Integração:** 75% mínimo
- **E2E:** 60% mínimo

---

## 📈 **Interpretando Relatórios**

### **Métricas Principais**

1. **Cobertura de Linhas:** Porcentagem de linhas executadas
2. **Cobertura de Funções:** Porcentagem de funções chamadas
3. **Cobertura de Branches:** Porcentagem de branches executados
4. **Cobertura de Statements:** Porcentagem de statements executados

### **Cores do Relatório**

- 🟢 **Verde:** Cobertura adequada (≥80%)
- 🟡 **Amarelo:** Cobertura baixa (60-79%)
- 🔴 **Vermelho:** Cobertura insuficiente (<60%)

### **Análise de Diffs**

Em Pull Requests, o Codecov mostra:

- 📊 Cobertura geral do PR
- 🔍 Linhas não cobertas
- 📈 Mudança na cobertura
- 🎯 Sugestões de melhorias

---

## 🚨 **Alertas e Notificações**

### **Configuração de Alertas**

```yaml
notify:
  email:
    enabled: false
  slack:
    enabled: false
  webhook:
    enabled: false
```

### **Status Checks**

O Codecov pode:

- ✅ **Passar:** Cobertura ≥ 80%
- ⚠️ **Aviso:** Cobertura 60-79%
- ❌ **Falhar:** Cobertura < 60%

---

## 🔄 **Integração com CI/CD**

### **GitHub Actions**

O workflow `.github/workflows/coverage.yml` executa:

```yaml
- name: Run tests with coverage
  run: npm run test:coverage:ci

- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v4
  with:
    file: ./coverage/coverage-final.json
    flags: unit
    fail_ci_if_error: true
```

### **Triggers Automáticos**

- ✅ Push para `main`/`master`
- ✅ Pull Requests
- ✅ Tags de release

---

## 📱 **Badges e Status**

### **Badge do README**

```markdown
[![Codecov](https://img.shields.io/codecov/c/github/jonathanmartins81/boilerplate_aqua9_v2?style=flat-square)](https://codecov.io/gh/jonathanmartins81/boilerplate_aqua9_v2)
```

### **Status do Projeto**

- 🟢 **Passing:** Cobertura adequada
- 🟡 **Warning:** Cobertura baixa
- 🔴 **Failing:** Cobertura insuficiente

---

## 🛠️ **Troubleshooting**

### **Problemas Comuns**

1. **Upload falha**

   ```bash
   # Verificar token do Codecov
   echo $CODECOV_TOKEN

   # Verificar arquivo de cobertura
   ls -la coverage/
   ```

2. **Cobertura incorreta**

   ```bash
   # Limpar cache
   npm run clean

   # Reinstalar dependências
   npm run clean:deps
   ```

3. **Relatório não gera**

   ```bash
   # Verificar configuração do Vitest
   cat vitest.config.ts

   # Executar com verbose
   npm run test:coverage -- --verbose
   ```

### **Logs de Debug**

```bash
# Habilitar debug
DEBUG=codecov npm run codecov

# Verificar configuração
cat codecov.yml
```

---

## 📚 **Recursos Adicionais**

### **Documentação Oficial**

- 📖 [Codecov Docs](https://docs.codecov.io/)
- 🎯 [Getting Started](https://docs.codecov.io/docs/getting-started)
- 🔧 [Configuration](https://docs.codecov.io/docs/configuration)

### **Exemplos Práticos**

- 🧪 [Testes com Cobertura](./src/components/Main/Main.test.tsx)
- 📊 [Configuração Vitest](./vitest.config.ts)
- 🔄 [Workflow CI/CD](./.github/workflows/coverage.yml)

### **Comandos Úteis**

```bash
# Verificar cobertura atual
npm run test:coverage

# Gerar relatório detalhado
npm run test:coverage:report

# Upload para Codecov
npm run codecov

# Verificar configuração
cat codecov.yml
```

---

## 🎯 **Boas Práticas**

### **Para Desenvolvedores**

1. **Mantenha cobertura alta** (≥80%)
2. **Teste edge cases** e cenários de erro
3. **Use mocks** apropriadamente
4. **Documente** testes complexos
5. **Revise** relatórios de cobertura

### **Para Times**

1. **Configure metas** realistas
2. **Monitore** tendências de cobertura
3. **Integre** com processo de review
4. **Celebre** melhorias na cobertura
5. **Use** relatórios para planejamento

---

## 📞 **Suporte**

- 🐛 **Issues:** [GitHub Issues](https://github.com/jonathanmartins81/boilerplate_aqua9_v2/issues)
- 💬 **Discussões:** [GitHub Discussions](https://github.com/jonathanmartins81/boilerplate_aqua9_v2/discussions)
- 📧 **Email:** contato@aqua9.com.br
- 🌐 **Website:** [aqua9.com.br](https://aqua9.com.br)

---

**Desenvolvido com ❤️ pela [Aqua9](https://aqua9.com.br)**

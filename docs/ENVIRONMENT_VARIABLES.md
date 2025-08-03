# 🔧 Variáveis de Ambiente - Aqua9 Boilerplate

> Guia completo das variáveis de ambiente necessárias para o projeto.

---

## 🚀 **Configuração Inicial**

### **1. Criar arquivo .env**

```bash
# Copiar o arquivo de exemplo
cp .env.example .env

# Ou criar manualmente
touch .env
```

### **2. Variáveis Obrigatórias**

```bash
# ===== DESENVOLVIMENTO =====
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ===== AUTENTICAÇÃO =====
JWT_SECRET=seu-jwt-secret-super-seguro-aqui
JWT_EXPIRES_IN=7d

# ===== CODECOV =====
CODECOV_TOKEN=768383fe-5b94-4ab4-a625-cb7549f26b0b
```

---

## 📋 **Lista Completa de Variáveis**

### **🔧 Desenvolvimento**

| Variável              | Descrição            | Exemplo                             |
| --------------------- | -------------------- | ----------------------------------- |
| `NODE_ENV`            | Ambiente de execução | `development`, `production`, `test` |
| `NEXT_PUBLIC_APP_URL` | URL da aplicação     | `http://localhost:3000`             |

### **🔐 Autenticação**

| Variável         | Descrição                   | Exemplo                            |
| ---------------- | --------------------------- | ---------------------------------- |
| `JWT_SECRET`     | Chave secreta para JWT      | `seu-jwt-secret-super-seguro-aqui` |
| `JWT_EXPIRES_IN` | Tempo de expiração do token | `7d`, `24h`, `1h`                  |

### **📊 Cobertura de Testes (Codecov)**

| Variável        | Descrição                  | Exemplo                                |
| --------------- | -------------------------- | -------------------------------------- |
| `CODECOV_TOKEN` | Token de acesso ao Codecov | `768383fe-5b94-4ab4-a625-cb7549f26b0b` |

### **🗄️ Banco de Dados (Opcional)**

| Variável       | Descrição                | Exemplo                                    |
| -------------- | ------------------------ | ------------------------------------------ |
| `DATABASE_URL` | URL de conexão com banco | `postgresql://user:pass@localhost:5432/db` |
| `REDIS_URL`    | URL de conexão com Redis | `redis://localhost:6379`                   |

### **📧 Email (Opcional)**

| Variável    | Descrição     | Exemplo               |
| ----------- | ------------- | --------------------- |
| `SMTP_HOST` | Servidor SMTP | `smtp.gmail.com`      |
| `SMTP_PORT` | Porta SMTP    | `587`                 |
| `SMTP_USER` | Usuário SMTP  | `seu-email@gmail.com` |
| `SMTP_PASS` | Senha SMTP    | `sua-senha-de-app`    |

### **📈 Analytics (Opcional)**

| Variável                  | Descrição              | Exemplo                                |
| ------------------------- | ---------------------- | -------------------------------------- |
| `NEXT_PUBLIC_GA_ID`       | ID do Google Analytics | `G-XXXXXXXXXX`                         |
| `NEXT_PUBLIC_POSTHOG_KEY` | Chave do PostHog       | `phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

### **🔍 Monitoramento (Opcional)**

| Variável     | Descrição     | Exemplo                                                                 |
| ------------ | ------------- | ----------------------------------------------------------------------- |
| `SENTRY_DSN` | DSN do Sentry | `https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@xxxxx.ingest.sentry.io/xxxxx` |

### **🚀 Deployment (Opcional)**

| Variável        | Descrição        | Exemplo             |
| --------------- | ---------------- | ------------------- |
| `VERCEL_TOKEN`  | Token do Vercel  | `seu-vercel-token`  |
| `RAILWAY_TOKEN` | Token do Railway | `seu-railway-token` |
| `NETLIFY_TOKEN` | Token do Netlify | `seu-netlify-token` |

### **🛡️ Segurança**

| Variável                  | Descrição               | Exemplo                                         |
| ------------------------- | ----------------------- | ----------------------------------------------- |
| `RATE_LIMIT_WINDOW_MS`    | Janela de rate limiting | `900000` (15 min)                               |
| `RATE_LIMIT_MAX_REQUESTS` | Máximo de requisições   | `100`                                           |
| `CORS_ORIGIN`             | Origens permitidas CORS | `http://localhost:3000,https://seu-dominio.com` |

### **⚡ Performance**

| Variável         | Descrição               | Exemplo         |
| ---------------- | ----------------------- | --------------- |
| `CACHE_TTL`      | Tempo de vida do cache  | `3600` (1 hora) |
| `CACHE_MAX_SIZE` | Tamanho máximo do cache | `100`           |

### **📝 Logs**

| Variável     | Descrição        | Exemplo                          |
| ------------ | ---------------- | -------------------------------- |
| `LOG_LEVEL`  | Nível de log     | `info`, `debug`, `warn`, `error` |
| `LOG_FORMAT` | Formato dos logs | `json`, `text`                   |

---

## 🔧 **Configuração por Ambiente**

### **Desenvolvimento (.env.local)**

```bash
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=dev-secret-key
CODECOV_TOKEN=768383fe-5b94-4ab4-a625-cb7549f26b0b
```

### **Teste (.env.test)**

```bash
NODE_ENV=test
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=test-secret-key
CODECOV_TOKEN=768383fe-5b94-4ab4-a625-cb7549f26b0b
```

### **Produção (.env.production)**

```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://seu-dominio.com
JWT_SECRET=prod-secret-key-super-seguro
CODECOV_TOKEN=768383fe-5b94-4ab4-a625-cb7549f26b0b
```

---

## 🔐 **Segurança**

### **Boas Práticas**

1. **Nunca commite** arquivos `.env` no Git
2. **Use secrets** em produção
3. **Rotacione** chaves regularmente
4. **Valide** variáveis obrigatórias
5. **Use** valores diferentes por ambiente

### **Validação de Variáveis**

```typescript
// src/lib/env.ts
export function validateEnv() {
  const required = [
    'NODE_ENV',
    'NEXT_PUBLIC_APP_URL',
    'JWT_SECRET',
    'CODECOV_TOKEN',
  ];

  for (const var_name of required) {
    if (!process.env[var_name]) {
      throw new Error(`Missing required environment variable: ${var_name}`);
    }
  }
}
```

---

## 🚀 **Deploy**

### **Vercel**

```bash
# Configurar no dashboard do Vercel
vercel env add NODE_ENV
vercel env add JWT_SECRET
vercel env add CODECOV_TOKEN
```

### **Railway**

```bash
# Configurar via CLI
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=seu-secret
railway variables set CODECOV_TOKEN=768383fe-5b94-4ab4-a625-cb7549f26b0b
```

### **Netlify**

```bash
# Configurar no dashboard do Netlify
netlify env:set NODE_ENV production
netlify env:set JWT_SECRET seu-secret
netlify env:set CODECOV_TOKEN 768383fe-5b94-4ab4-a625-cb7549f26b0b
```

---

## 🧪 **Testes**

### **Configuração para Testes**

```bash
# .env.test
NODE_ENV=test
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=test-secret-key
CODECOV_TOKEN=768383fe-5b94-4ab4-a625-cb7549f26b0b
```

### **Executar Testes com Variáveis**

```bash
# Carregar variáveis de teste
NODE_ENV=test npm run test

# Com cobertura
NODE_ENV=test npm run test:coverage
```

---

## 📞 **Suporte**

- 🐛 **Issues:** [GitHub Issues](https://github.com/jonathanmartins81/boilerplate_aqua9_v2/issues)
- 💬 **Discussões:** [GitHub Discussions](https://github.com/jonathanmartins81/boilerplate_aqua9_v2/discussions)
- 📧 **Email:** contato@aqua9.com.br
- 🌐 **Website:** [aqua9.com.br](https://aqua9.com.br)

---

**Desenvolvido com ❤️ pela [Aqua9](https://aqua9.com.br)**

# 🔒 Guia de Segurança - Aqua9 Boilerplate v2

Este documento descreve as medidas de segurança implementadas no boilerplate e como utilizá-las corretamente.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Autenticação e Autorização](#autenticação-e-autorização)
- [Proteção de Rotas](#proteção-de-rotas)
- [Rate Limiting](#rate-limiting)
- [Headers de Segurança](#headers-de-segurança)
- [Validação e Sanitização](#validação-e-sanitização)
- [Detecção de Ataques](#detecção-de-ataques)
- [Criptografia](#criptografia)
- [Logs de Segurança](#logs-de-segurança)
- [Boas Práticas](#boas-práticas)
- [Configuração](#configuração)

---

## 🎯 Visão Geral

O sistema de segurança implementado oferece múltiplas camadas de proteção:

- **Autenticação JWT** com tokens seguros
- **Autorização baseada em roles e permissões**
- **Proteção de rotas** automática
- **Rate limiting** por IP e usuário
- **Headers de segurança** robustos
- **Validação e sanitização** de entrada
- **Detecção de ataques** em tempo real
- **Logs de segurança** detalhados

---

## 🔐 Autenticação e Autorização

### Sistema JWT

```typescript
// Gerar token
const token = await generateToken({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role,
  permissions: user.permissions,
  isActive: user.isActive,
});

// Verificar token
const user = await verifyToken(token);
```

### Roles e Permissões

**Roles Disponíveis:**

- `admin` - Acesso total ao sistema
- `moderator` - Moderação de conteúdo
- `user` - Usuário padrão
- `guest` - Acesso limitado

**Permissões Disponíveis:**

- `read:posts` - Ler posts
- `write:posts` - Criar/editar posts
- `delete:posts` - Deletar posts
- `read:users` - Ver usuários
- `write:users` - Criar/editar usuários
- `delete:users` - Deletar usuários
- `admin:system` - Acesso administrativo
- `moderate:content` - Moderar conteúdo

### Configuração de Roles

```typescript
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    'read:posts',
    'write:posts',
    'delete:posts',
    'read:users',
    'write:users',
    'delete:users',
    'admin:system',
    'moderate:content',
  ],
  moderator: [
    'read:posts',
    'write:posts',
    'delete:posts',
    'read:users',
    'moderate:content',
  ],
  user: ['read:posts', 'write:posts'],
  guest: ['read:posts'],
};
```

---

## 🛡️ Proteção de Rotas

### Middleware Automático

O middleware verifica automaticamente todas as rotas e aplica proteções baseadas na configuração:

```typescript
// Rotas protegidas configuradas
export const PROTECTED_ROUTES: Record<
  string,
  {
    requiredPermissions: Permission[];
    allowedRoles: UserRole[];
  }
> = {
  '/admin': {
    requiredPermissions: ['admin:system'],
    allowedRoles: ['admin'],
  },
  '/dashboard': {
    requiredPermissions: ['read:posts'],
    allowedRoles: ['admin', 'moderator', 'user'],
  },
};
```

### Componentes de Proteção

```typescript
// Proteção básica
<ProtectedRoute requiredPermissions={['read:posts']}>
  <PostList />
</ProtectedRoute>

// Proteção por role
<AdminRoute>
  <AdminPanel />
</AdminRoute>

// Proteção por permissão
<PostWriteRoute>
  <CreatePost />
</PostWriteRoute>
```

### Hook de Autenticação

```typescript
const { user, isAuthenticated, hasPermission, hasRole } = useAuth();

// Verificar permissão
if (hasPermission('write:posts')) {
  // Permitir criação de post
}

// Verificar role
if (hasRole('admin')) {
  // Mostrar funcionalidades admin
}
```

---

## ⏱️ Rate Limiting

### Configurações por Tipo de Rota

```typescript
const RATE_LIMIT_CONFIG = {
  sensitive: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    maxRequests: 100,
  },
  auth: {
    windowMs: 5 * 60 * 1000, // 5 minutos
    maxRequests: 10, // 10 tentativas de login
  },
  general: {
    windowMs: 60 * 1000, // 1 minuto
    maxRequests: 1000,
  },
};
```

### Rate Limiting por Usuário

```typescript
// Rate limiting específico para usuários autenticados
if (user && !checkRateLimit(user.id, 50, 15 * 60 * 1000)) {
  return new NextResponse(JSON.stringify({ error: 'Too Many Requests' }), {
    status: 429,
  });
}
```

---

## 🛡️ Headers de Segurança

### Headers Aplicados Automaticamente

```typescript
// Headers de segurança configurados
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline'...",
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
};
```

### Content Security Policy (CSP)

```typescript
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https: blob:",
  "media-src 'self'",
  "connect-src 'self' https: wss:",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');
```

---

## ✅ Validação e Sanitização

### Validação de Entrada

```typescript
// Validação de email
if (!ValidationUtils.isValidEmail(email)) {
  throw new Error('Email inválido');
}

// Validação de senha
const passwordValidation = ValidationUtils.validatePassword(password);
if (!passwordValidation.isValid) {
  console.log('Feedback:', passwordValidation.feedback);
}

// Validação de CPF
if (!ValidationUtils.isValidCPF(cpf)) {
  throw new Error('CPF inválido');
}
```

### Sanitização de Dados

```typescript
// Sanitizar string
const cleanInput = SanitizationUtils.sanitizeString(userInput);

// Sanitizar HTML
const cleanHTML = SanitizationUtils.sanitizeHTML(htmlContent);

// Sanitizar objeto completo
const cleanObject = SanitizationUtils.sanitizeObject(userData);
```

---

## 🚨 Detecção de Ataques

### Tipos de Ataques Detectados

```typescript
// SQL Injection
if (AttackDetection.detectSQLInjection(input)) {
  SecurityLogger.logAttack(request, 'sql_injection', { input });
  return new NextResponse('Forbidden', { status: 403 });
}

// XSS
if (AttackDetection.detectXSS(input)) {
  SecurityLogger.logAttack(request, 'xss', { input });
  return new NextResponse('Forbidden', { status: 403 });
}

// Path Traversal
if (AttackDetection.detectPathTraversal(input)) {
  SecurityLogger.logAttack(request, 'path_traversal', { input });
  return new NextResponse('Forbidden', { status: 403 });
}

// Command Injection
if (AttackDetection.detectCommandInjection(input)) {
  SecurityLogger.logAttack(request, 'command_injection', { input });
  return new NextResponse('Forbidden', { status: 403 });
}
```

---

## 🔐 Criptografia

### Hash de Senhas

```typescript
// Gerar salt e hash
const salt = CryptoUtils.generateSalt();
const hash = await CryptoUtils.hashPassword(password, salt);

// Verificar senha
const isValid = await CryptoUtils.verifyPassword(password, salt, hash);
```

### Geração de Tokens Seguros

```typescript
// Gerar token JWT seguro
const token = await new SignJWT(payload)
  .setProtectedHeader({ alg: 'HS256' })
  .setIssuedAt()
  .setExpirationTime('24h')
  .sign(new TextEncoder().encode(JWT_SECRET));
```

---

## 📊 Logs de Segurança

### Tipos de Logs

```typescript
// Log de tentativa de ataque
SecurityLogger.logAttack(request, 'sql_injection', {
  input: userInput,
  pattern: detectedPattern,
});

// Log de acesso negado
SecurityLogger.logAccessDenied(request, 'insufficient_permissions');

// Log de autenticação
SecurityLogger.logAuth('login', user.email, { ip: clientIP });
SecurityLogger.logAuth('failed_login', email, { reason: 'invalid_password' });
```

### Exemplo de Log

```json
{
  "type": "sql_injection",
  "ip": "192.168.1.100",
  "userAgent": "Mozilla/5.0...",
  "url": "https://example.com/api/users",
  "method": "POST",
  "details": {
    "input": "'; DROP TABLE users; --",
    "pattern": "union|select|insert|update|delete|drop|create|alter|exec|execute"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## ✅ Boas Práticas

### 1. Sempre Validar Entrada

```typescript
// ❌ Ruim
const userInput = req.body.data;

// ✅ Bom
const userInput = SanitizationUtils.sanitizeString(req.body.data);
if (!ValidationUtils.isValidEmail(userInput.email)) {
  throw new Error('Email inválido');
}
```

### 2. Usar Permissões Granulares

```typescript
// ❌ Ruim
if (user.role === 'admin') {
  // Permitir tudo
}

// ✅ Bom
if (hasPermission('write:posts')) {
  // Permitir apenas escrita de posts
}
```

### 3. Implementar Rate Limiting

```typescript
// ✅ Sempre aplicar rate limiting em APIs sensíveis
if (!checkRateLimit(clientIP, rateLimitConfig)) {
  return new NextResponse('Too Many Requests', { status: 429 });
}
```

### 4. Logs de Segurança

```typescript
// ✅ Sempre logar eventos de segurança
SecurityLogger.logAuth('login', user.email);
SecurityLogger.logAccessDenied(request, 'unauthorized_access');
```

### 5. Headers de Segurança

```typescript
// ✅ Aplicar headers em todas as respostas
const response = NextResponse.next();
applySecurityHeaders(response);
```

---

## ⚙️ Configuração

### Variáveis de Ambiente

```env
# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
ENABLE_HSTS=true
CSP_REPORT_URI=https://yourdomain.com/csp-report
```

### Configuração de Produção

```typescript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

---

## 🚀 Implementação Rápida

### 1. Proteger uma Rota

```typescript
// pages/admin.tsx
import { AdminRoute } from '@/components/ProtectedRoute';

export default function AdminPage() {
  return (
    <AdminRoute>
      <div>Conteúdo administrativo</div>
    </AdminRoute>
  );
}
```

### 2. Proteger uma API

```typescript
// pages/api/admin/users.ts
import { protectAPI } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const { user, isAuthorized } = await protectAPI(request, '/api/admin/users');

  if (!isAuthorized) {
    return new NextResponse('Unauthorized', { status: 403 });
  }

  // Lógica da API
}
```

### 3. Usar Hook de Autenticação

```typescript
// Componente qualquer
import { useAuth } from '@/hooks/useAuth';

export default function MyComponent() {
  const { user, hasPermission } = useAuth();

  if (hasPermission('write:posts')) {
    return <CreatePostButton />;
  }

  return <ReadOnlyView />;
}
```

---

## 📞 Suporte

### Recursos Úteis

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### Contato

- **Desenvolvedor:** Jonathan Simão
- **Empresa:** Aqua9
- **Email:** contato@aqua9.com.br

---

**Desenvolvido por:** Jonathan Simão
**Empresa:** Aqua9
**Última atualização:** $(date)

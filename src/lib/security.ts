/**
 * Configurações e Utilitários de Segurança Avançada
 *
 * Implementa medidas de segurança adicionais como:
 * - Validação de entrada
 * - Sanitização de dados
 * - Proteção contra ataques comuns
 * - Headers de segurança
 * - Rate limiting avançado
 */

import { NextRequest, NextResponse } from 'next/server';

// Configurações de segurança
export const SecuritySettings = {
  // Headers de segurança
  headers: {
    // Prevenção de XSS
    'X-XSS-Protection': '1; mode=block',
    // Prevenção de MIME sniffing
    'X-Content-Type-Options': 'nosniff',
    // Prevenção de clickjacking
    'X-Frame-Options': 'DENY',
    // Política de referrer
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    // Política de permissões
    'Permissions-Policy':
      'camera=(), microphone=(), geolocation=(), payment=()',
    // Content Security Policy
    'Content-Security-Policy': [
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
    ].join('; '),
    // HSTS (HTTP Strict Transport Security)
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    // Cache control para recursos sensíveis
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  },

  // Configurações de rate limiting
  rateLimit: {
    // Limites por IP
    ip: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      maxRequests: 100,
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
    },
    // Limites por usuário autenticado
    user: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      maxRequests: 200,
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
    },
    // Limites para autenticação
    auth: {
      windowMs: 5 * 60 * 1000, // 5 minutos
      maxRequests: 5,
      skipSuccessfulRequests: true,
      skipFailedRequests: false,
    },
    // Limites para APIs
    api: {
      windowMs: 60 * 1000, // 1 minuto
      maxRequests: 50,
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
    },
  },

  // Configurações de senha
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 dias
    historyCount: 5, // Não permitir reutilizar as últimas 5 senhas
  },

  // Configurações de sessão
  session: {
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    httpOnly: true,
    secure: true,
    sameSite: 'strict' as const,
    rolling: true, // Renovar sessão a cada requisição
    name: 'auth_session',
  },

  // Configurações de JWT
  jwt: {
    algorithm: 'HS256',
    expiresIn: '24h',
    refreshExpiresIn: '7d',
    issuer: 'aqua9-boilerplate',
    audience: 'aqua9-users',
  },

  // Configurações de CORS
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24 horas
  },
};

// Utilitários de validação
export const ValidationUtils = {
  /**
   * Valida email com regex robusto
   */
  isValidEmail(email: string): boolean {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
  },

  /**
   * Valida força da senha
   */
  validatePassword(password: string): {
    isValid: boolean;
    score: number;
    feedback: string[];
  } {
    const feedback: string[] = [];
    let score = 0;

    if (password.length < SecuritySettings.password.minLength) {
      feedback.push(
        `Senha deve ter pelo menos ${SecuritySettings.password.minLength} caracteres`
      );
    } else {
      score++;
    }

    if (SecuritySettings.password.requireUppercase && !/[A-Z]/.test(password)) {
      feedback.push('Senha deve conter pelo menos uma letra maiúscula');
    } else {
      score++;
    }

    if (SecuritySettings.password.requireLowercase && !/[a-z]/.test(password)) {
      feedback.push('Senha deve conter pelo menos uma letra minúscula');
    } else {
      score++;
    }

    if (SecuritySettings.password.requireNumbers && !/\d/.test(password)) {
      feedback.push('Senha deve conter pelo menos um número');
    } else {
      score++;
    }

    if (
      SecuritySettings.password.requireSpecialChars &&
      !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    ) {
      feedback.push('Senha deve conter pelo menos um caractere especial');
    } else {
      score++;
    }

    // Verificar senhas comuns
    const commonPasswords = [
      'password',
      '123456',
      'qwerty',
      'admin',
      'letmein',
    ];
    if (commonPasswords.includes(password.toLowerCase())) {
      feedback.push('Senha muito comum, escolha uma mais segura');
      score = Math.max(0, score - 2);
    }

    return {
      isValid: score >= 4 && feedback.length === 0,
      score,
      feedback,
    };
  },

  /**
   * Valida URL
   */
  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Valida número de telefone brasileiro
   */
  isValidPhone(phone: string): boolean {
    const phoneRegex = /^(\+55\s?)?(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/;
    return phoneRegex.test(phone);
  },

  /**
   * Valida CPF
   */
  isValidCPF(cpf: string): boolean {
    const cleanCPF = cpf.replace(/\D/g, '');

    if (cleanCPF.length !== 11) return false;

    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

    // Validar primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;

    // Validar segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;

    return true;
  },
};

// Utilitários de sanitização
export const SanitizationUtils = {
  /**
   * Sanitiza string removendo caracteres perigosos
   */
  sanitizeString(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove < e >
      .replace(/javascript:/gi, '') // Remove javascript:
      .replace(/on\w+=/gi, '') // Remove event handlers
      .replace(/data:/gi, '') // Remove data URLs
      .replace(/vbscript:/gi, '') // Remove VBScript
      .replace(/expression\(/gi, '') // Remove CSS expressions
      .trim();
  },

  /**
   * Sanitiza HTML removendo tags perigosas
   */
  sanitizeHTML(html: string): string {
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
      .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
      .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '')
      .replace(/<input\b[^>]*>/gi, '')
      .replace(/<textarea\b[^<]*(?:(?!<\/textarea>)<[^<]*)*<\/textarea>/gi, '')
      .replace(/<select\b[^<]*(?:(?!<\/select>)<[^<]*)*<\/select>/gi, '')
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/javascript\s*:/gi, '')
      .replace(/vbscript\s*:/gi, '')
      .replace(/data\s*:/gi, '');
  },

  /**
   * Sanitiza objeto removendo propriedades perigosas
   */
  sanitizeObject<T extends Record<string, any>>(obj: T): T {
    const sanitized = { ...obj } as T;

    for (const key in sanitized) {
      if (typeof sanitized[key] === 'string') {
        (sanitized as any)[key] = this.sanitizeString(sanitized[key] as string);
      } else if (
        typeof sanitized[key] === 'object' &&
        sanitized[key] !== null
      ) {
        (sanitized as any)[key] = this.sanitizeObject(
          sanitized[key] as Record<string, any>
        );
      }
    }

    return sanitized;
  },

  /**
   * Escapa caracteres especiais para SQL
   */
  escapeSQL(input: string): string {
    return input
      .replace(/'/g, "''")
      .replace(/\\/g, '\\\\')
      .replace(/%/g, '\\%')
      .replace(/_/g, '\\_');
  },
};

// Utilitários de criptografia
export const CryptoUtils = {
  /**
   * Gera salt aleatório
   */
  generateSalt(length: number = 16): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  /**
   * Gera hash simples (em produção, use bcrypt ou argon2)
   */
  async hashPassword(password: string, salt: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  /**
   * Verifica senha
   */
  async verifyPassword(
    password: string,
    salt: string,
    hash: string
  ): Promise<boolean> {
    const computedHash = await this.hashPassword(password, salt);
    return computedHash === hash;
  },
};

// Middleware de segurança
export function applySecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(SecuritySettings.headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

// Detecção de ataques
export const AttackDetection = {
  /**
   * Detecta tentativas de SQL Injection
   */
  detectSQLInjection(input: string): boolean {
    const sqlPatterns = [
      /(\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\b)/i,
      /(\b(and|or)\b\s+\d+\s*=\s*\d+)/i,
      /(\b(and|or)\b\s+['"]\w+['"]\s*=\s*['"]\w+['"])/i,
      /(--|\/\*|\*\/)/,
      /(\b(xp_|sp_)\w+)/i,
      /(\b(cast|convert)\s*\()/i,
    ];

    return sqlPatterns.some(pattern => pattern.test(input));
  },

  /**
   * Detecta tentativas de XSS
   */
  detectXSS(input: string): boolean {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/i,
      /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/i,
      /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/i,
      /data:text\/html/i,
      /vbscript:/i,
    ];

    return xssPatterns.some(pattern => pattern.test(input));
  },

  /**
   * Detecta tentativas de path traversal
   */
  detectPathTraversal(input: string): boolean {
    const pathPatterns = [
      /\.\.\//,
      /\.\.\\/,
      /%2e%2e%2f/i,
      /%2e%2e%5c/i,
      /\.\.%2f/i,
      /\.\.%5c/i,
    ];

    return pathPatterns.some(pattern => pattern.test(input));
  },

  /**
   * Detecta tentativas de command injection
   */
  detectCommandInjection(input: string): boolean {
    const commandPatterns = [
      /[;&|`$(){}[\]]/,
      /(\b(cat|ls|pwd|whoami|id|uname|hostname|ps|top|kill|rm|cp|mv|chmod|chown)\b)/i,
      /(\b(net|ipconfig|ifconfig|route|arp|ping|traceroute|nslookup|dig)\b)/i,
      /(\b(wget|curl|nc|telnet|ssh|ftp|scp|rsync)\b)/i,
    ];

    return commandPatterns.some(pattern => pattern.test(input));
  },
};

// Log de segurança
export const SecurityLogger = {
  /**
   * Log de tentativa de ataque
   */
  logAttack(request: NextRequest, attackType: string, details: any) {
    console.log(`[SECURITY] Attack detected:`, {
      type: attackType,
      ip:
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown',
      userAgent: request.headers.get('user-agent'),
      url: request.url,
      method: request.method,
      details,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Log de acesso negado
   */
  logAccessDenied(request: NextRequest, reason: string) {
    console.log(`[SECURITY] Access denied:`, {
      reason,
      ip:
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown',
      userAgent: request.headers.get('user-agent'),
      url: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
    });
  },

  /**
   * Log de autenticação
   */
  logAuth(
    event: 'login' | 'logout' | 'failed_login',
    user?: string,
    details?: any
  ) {
    console.log(`[AUTH] ${event}:`, {
      user: user || 'unknown',
      details,
      timestamp: new Date().toISOString(),
    });
  },
};

import '@testing-library/jest-dom/vitest';
import React from 'react';
import { vi } from 'vitest';

// ===== CONFIGURAÇÕES GLOBAIS PARA TESTES =====

// Mock do matchMedia para testes
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock do IntersectionObserver
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});

// Mock do ResizeObserver
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});

// Mock do Performance API
Object.defineProperty(window, 'performance', {
  writable: true,
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByType: vi.fn(() => []),
    getEntriesByName: vi.fn(() => []),
  },
});

// Mock do localStorage
Object.defineProperty(window, 'localStorage', {
  writable: true,
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
});

// Mock do sessionStorage
Object.defineProperty(window, 'sessionStorage', {
  writable: true,
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
});

// ===== INTERFACES PARA TIPAGEM DOS MOCKS =====

interface ImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  width?: number;
  height?: number;
  fill?: boolean;
  [key: string]: unknown;
}

interface LinkProps {
  children: React.ReactNode;
  href: string;
  prefetch?: boolean;
  [key: string]: unknown;
}

// ===== MOCKS DO NEXT.JS =====

// Mock do Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, fill, ...props }: ImageProps) => {
    const imgProps = {
      src,
      alt,
      ...(width && { width }),
      ...(height && { height }),
      ...(fill && { style: { objectFit: 'cover' } }),
      ...props,
    };
    return React.createElement('img', imgProps);
  },
}));

// Mock do Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href, prefetch = true, ...props }: LinkProps) => {
    return React.createElement('a', { href, ...props }, children);
  },
}));

// Mock do Next.js useRouter
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
  useParams: () => ({}),
  useSegments: () => [],
}));

// Mock do Next.js useSession
vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
  signIn: vi.fn(),
  signOut: vi.fn(),
  getSession: vi.fn(),
}));

// ===== MOCKS DE BIBLIOTECAS EXTERNAS =====

// Mock do Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) =>
      React.createElement('div', props, children),
    button: ({ children, ...props }: any) =>
      React.createElement('button', props, children),
    span: ({ children, ...props }: any) =>
      React.createElement('span', props, children),
  },
  AnimatePresence: ({ children }: any) => children,
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn(),
  }),
  useMotionValue: (initial: any) => ({
    get: () => initial,
    set: vi.fn(),
    on: vi.fn(),
  }),
}));

// Mock do Sentry
vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
  captureMessage: vi.fn(),
  setUser: vi.fn(),
  setTag: vi.fn(),
  setContext: vi.fn(),
  addBreadcrumb: vi.fn(),
  startTransaction: vi.fn(),
}));

// ===== CONFIGURAÇÕES DE TESTE =====

// Configuração global do console para testes
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  // Suprimir warnings específicos durante testes
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalConsoleError.call(console, ...args);
  };

  console.warn = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: componentWillReceiveProps') ||
        args[0].includes('Warning: componentWillUpdate'))
    ) {
      return;
    }
    originalConsoleWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

// Configuração global para limpeza após cada teste
afterEach(() => {
  vi.clearAllMocks();
  vi.clearAllTimers();
});

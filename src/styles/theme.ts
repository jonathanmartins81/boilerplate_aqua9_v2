/**
 * Design System - Aqua9 Boilerplate v2
 *
 * Sistema de design centralizado com tokens de design,
 * paleta de cores, tipografia e breakpoints padronizados.
 *
 * Este arquivo serve como fonte única da verdade para
 * todos os tokens visuais do projeto.
 */

// ===== TIPOS =====
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  // Cores base
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  chart: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
}

// ===== CORES BASE =====
export const colors = {
  // Cores primárias (Cyan)
  primary: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344',
  },

  // Cores secundárias (Indigo)
  secondary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },

  // Cores de acento (Amber)
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },

  // Cores neutras (Slate)
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Cores de estado
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },

  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
};

// ===== TEMAS CLARO E ESCURO =====
export const lightTheme: ThemeColors = {
  background: '#ffffff',
  foreground: '#0f172a',
  card: '#ffffff',
  cardForeground: '#0f172a',
  popover: '#ffffff',
  popoverForeground: '#0f172a',
  primary: colors.primary[600],
  primaryForeground: '#ffffff',
  secondary: colors.secondary[600],
  secondaryForeground: '#ffffff',
  muted: colors.gray[100],
  mutedForeground: colors.gray[600],
  accent: colors.accent[500],
  accentForeground: '#ffffff',
  destructive: colors.error[500],
  destructiveForeground: '#ffffff',
  border: colors.gray[200],
  input: colors.gray[200],
  ring: colors.primary[500],
  chart: colors.primary[500],
  chart2: colors.secondary[500],
  chart3: colors.accent[500],
  chart4: colors.success[500],
  chart5: colors.warning[500],
};

export const darkTheme: ThemeColors = {
  background: '#0f172a',
  foreground: '#f8fafc',
  card: '#1e293b',
  cardForeground: '#f8fafc',
  popover: '#1e293b',
  popoverForeground: '#f8fafc',
  primary: colors.primary[400],
  primaryForeground: '#0f172a',
  secondary: colors.secondary[400],
  secondaryForeground: '#0f172a',
  muted: colors.gray[800],
  mutedForeground: colors.gray[400],
  accent: colors.accent[400],
  accentForeground: '#0f172a',
  destructive: colors.error[400],
  destructiveForeground: '#0f172a',
  border: colors.gray[700],
  input: colors.gray[700],
  ring: colors.primary[400],
  chart: colors.primary[400],
  chart2: colors.secondary[400],
  chart3: colors.accent[400],
  chart4: colors.success[400],
  chart5: colors.warning[400],
};

// ===== TIPOGRAFIA =====
export const typography = {
  fontFamily: {
    sans: [
      'Inter',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'Noto Sans',
      'sans-serif',
    ],
    serif: [
      'ui-serif',
      'Georgia',
      'Cambria',
      'Times New Roman',
      'Times',
      'serif',
    ],
    mono: [
      'Fira Code',
      'ui-monospace',
      'SFMono-Regular',
      'Menlo',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
    '8xl': ['6rem', { lineHeight: '1' }],
    '9xl': ['8rem', { lineHeight: '1' }],
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
};

// ===== ESPAÇAMENTOS =====
export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

// ===== BREAKPOINTS =====
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ===== BORDER RADIUS =====
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

// ===== SHADOWS =====
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  medium:
    '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  strong:
    '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
  glow: '0 0 20px rgba(6, 182, 212, 0.3)',
};

// ===== ANIMAÇÕES =====
export const animations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    fadeOut: {
      '0%': { opacity: '1' },
      '100%': { opacity: '0' },
    },
    slideIn: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(0)' },
    },
    slideOut: {
      '0%': { transform: 'translateX(0)' },
      '100%': { transform: 'translateX(-100%)' },
    },
    bounceIn: {
      '0%': { transform: 'scale(0.3)', opacity: '0' },
      '50%': { transform: 'scale(1.05)' },
      '70%': { transform: 'scale(0.9)' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
    scaleIn: {
      '0%': { transform: 'scale(0.9)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '.5' },
    },
    spin: {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  },
};

// ===== GRADIENTS =====
export const gradients = {
  primary: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  secondary: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
  accent: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
  warm: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
  cool: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  success: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
  warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  info: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  dark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
  light: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
};

// ===== Z-INDEX =====
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// ===== UTILITÁRIOS =====
export const utils = {
  // Função para obter cor com opacidade
  colorWithOpacity: (color: string, opacity: number) => {
    return `${color}${Math.round(opacity * 255)
      .toString(16)
      .padStart(2, '0')}`;
  },

  // Função para obter breakpoint
  getBreakpoint: (size: keyof typeof breakpoints) => breakpoints[size],

  // Função para obter cor do tema
  getColor: (colorPath: string): string => {
    // Implementação simplificada para evitar problemas de tipo
    if (colorPath === 'primary.500') return colors.primary[500];
    if (colorPath === 'secondary.500') return colors.secondary[500];
    if (colorPath === 'accent.500') return colors.accent[500];
    if (colorPath === 'gray.500') return colors.gray[500];
    if (colorPath === 'success.500') return colors.success[500];
    if (colorPath === 'warning.500') return colors.warning[500];
    if (colorPath === 'error.500') return colors.error[500];
    if (colorPath === 'info.500') return colors.info[500];

    // console.warn(`Color path "${colorPath}" not found`);
    return colors.gray[500];
  },

  // Função para obter shadow
  getShadow: (shadow: keyof typeof shadows) => shadows[shadow],

  // Função para obter gradiente
  getGradient: (gradient: keyof typeof gradients) => gradients[gradient],

  // Função para obter tema baseado no modo
  getTheme: (mode: ThemeMode): ThemeColors => {
    if (mode === 'dark') return darkTheme;
    return lightTheme;
  },
};

// ===== TEMA COMPLETO =====
export const theme = {
  colors,
  lightTheme,
  darkTheme,
  typography,
  spacing,
  breakpoints,
  borderRadius,
  shadows,
  animations,
  gradients,
  zIndex,
  utils,
};

// ===== EXPORTS =====
export default theme;

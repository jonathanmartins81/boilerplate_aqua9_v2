'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// ===== TIPOS =====
type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  isDark: boolean;
}

// ===== CONTEXTO =====
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ===== PROVIDER =====
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
}

export function ThemeProvider({
  children,
  defaultMode = 'dark',
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [mounted, setMounted] = useState(false);

  // ===== DETECÇÃO DO TEMA DO SISTEMA =====
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  // ===== CARREGAMENTO INICIAL =====
  useEffect(() => {
    setMounted(true);

    // Carregar tema do localStorage apenas no cliente
    if (typeof window !== 'undefined') {
      const savedMode = window.localStorage.getItem('theme-mode') as ThemeMode;
      if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
        setMode(savedMode);
      }
    }
  }, []);

  // ===== PERSISTÊNCIA =====
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    window.localStorage.setItem('theme-mode', mode);
  }, [mode, mounted]);

  // ===== APLICAÇÃO DO TEMA =====
  useEffect(() => {
    if (!mounted) return;

    const getCurrentTheme = () => {
      const actualMode = mode === 'system' ? getSystemTheme() : mode;

      return actualMode === 'dark'
        ? {
          'primary-color': '#4F8CFF',
          'secondary-color': '#A5B4FC',
          'accent-color': '#FFC145',
          'background-color': '#181920',
          'text-color': '#FAFAFA',
          'border-color': '#222327',
          'card-color': '#23242BF6',
        }
        : {
          'primary-color': '#0070f3',
          'secondary-color': '#5856D6',
          'accent-color': '#FFAD05',
          'background-color': '#FAFAFA',
          'text-color': '#1A1A1A',
          'border-color': '#E5E5E5',
          'card-color': '#FFFFFFF6',
        };
    };

    const currentTheme = getCurrentTheme();
    const root = document.documentElement;

    // Aplicar classes CSS com transição suave
    root.classList.remove('light', 'dark');
    const currentMode = mode === 'system' ? getSystemTheme() : mode;
    root.classList.add(currentMode);

    // Aplicar variáveis CSS customizadas com transição
    Object.entries(currentTheme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Aplicar atributo data-theme
    root.setAttribute('data-theme', currentMode);

    // Adicionar classe de transição temporária
    root.classList.add('theme-transitioning');
    setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 300);
  }, [mode, mounted]);

  // ===== FUNÇÕES DE CONTROLE =====

  const toggleMode = () => {
    setMode(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  const value: ThemeContextType = {
    mode,
    setMode,
    toggleMode,
    isDark: mode === 'system' ? getSystemTheme() === 'dark' : mode === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// ===== HOOK =====
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
}

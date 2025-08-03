'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// ===== TIPOS =====
type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
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
  defaultMode = 'system',
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ===== DETECÇÃO DE TEMA DO SISTEMA =====
  const getSystemTheme = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // ===== APLICAÇÃO DO TEMA =====
  const applyTheme = (themeMode: ThemeMode) => {
    const root = document.documentElement;
    const isDarkMode =
      themeMode === 'dark' || (themeMode === 'system' && getSystemTheme());

    setIsDark(isDarkMode);

    if (isDarkMode) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  };

  // ===== CARREGAMENTO INICIAL =====
  useEffect(() => {
    setMounted(true);

    // Carregar tema do localStorage
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    if (savedMode) {
      setMode(savedMode);
    }

    // Aplicar tema inicial
    applyTheme(savedMode || defaultMode);
  }, [defaultMode]);

  // ===== PERSISTÊNCIA =====
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem('theme-mode', mode);
    applyTheme(mode);
  }, [mode, mounted]);

  // ===== LISTENER PARA MUDANÇAS DO SISTEMA =====
  useEffect(() => {
    if (!mounted || mode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyTheme('system');

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mode, mounted]);

  // ===== FUNÇÕES DE CONTROLE =====
  const handleSetMode = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  // ===== VALOR DO CONTEXTO =====
  const value: ThemeContextType = {
    mode,
    isDark,
    setMode: handleSetMode,
    toggleTheme,
  };

  // ===== RENDERIZAÇÃO CONDICIONAL =====
  if (!mounted) {
    return <div className='min-h-screen bg-white dark:bg-gray-900' />;
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// ===== HOOK =====
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
}

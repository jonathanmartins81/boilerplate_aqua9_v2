import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import Main from './index';

// Mock do ThemeContext
const mockUseTheme = {
  isDark: false,
  mounted: true,
  mode: 'light' as const,
  setMode: vi.fn(),
  toggleTheme: vi.fn(),
};

vi.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => mockUseTheme,
}));

// Mock do Next.js Image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => {
    return <img src={src} alt={alt} {...props} />;
  },
}));

describe('Main Component', () => {
  it('renders with default props', () => {
    render(<Main />);

    expect(screen.getByText('Boilerplate Aqua9')).toBeInTheDocument();
    expect(screen.getByText('Template Next.js profissional com TypeScript e SEO otimizado')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    const customProps = {
      title: 'Custom Title',
      description: 'Custom Description',
      technologies: ['Vue.js', 'Angular', 'Svelte'],
    };

    render(<Main {...customProps} />);

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Description')).toBeInTheDocument();
    expect(screen.getByText('Vue.js')).toBeInTheDocument();
    expect(screen.getByText('Angular')).toBeInTheDocument();
    expect(screen.getByText('Svelte')).toBeInTheDocument();
  });

  it('renders logo with correct src based on theme', () => {
    render(<Main />);

    const logo = screen.getByAltText('Aqua9 Logo');
    expect(logo).toHaveAttribute('src', '/img/logo-light.svg');
  });

  it('renders logo with dark theme', () => {
    mockUseTheme.isDark = true;
    render(<Main />);

    const logo = screen.getByAltText('Aqua9 Logo');
    expect(logo).toHaveAttribute('src', '/img/logo-dark.svg');
  });

  it('renders illustration', () => {
    render(<Main />);

    const illustration = screen.getByAltText('Hero Illustration');
    expect(illustration).toHaveAttribute('src', '/img/illustration.svg');
  });

  it('renders additional information', () => {
    render(<Main />);

    expect(screen.getByText('✨ Sistema de tema claro/escuro integrado')).toBeInTheDocument();
    expect(screen.getByText('🎨 Design system profissional')).toBeInTheDocument();
    expect(screen.getByText('⚡ Performance otimizada')).toBeInTheDocument();
  });
});

// Componente de teste para verificar a renderização
const TestMain = ({
  title = 'Aqua9 Boilerplate',
  description = 'Template profissional para projetos Next.js',
  technologies = ['React', 'TypeScript', 'Next.js'],
}: {
  title?: string;
  description?: string;
  technologies?: string[];
}) => (
  <Main
    title={title}
    description={description}
    technologies={technologies}
  />
);

describe('TestMain Component', () => {
  it('renders with test props', () => {
    render(<TestMain />);

    expect(screen.getByText('Aqua9 Boilerplate')).toBeInTheDocument();
    expect(screen.getByText('Template profissional para projetos Next.js')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });
});

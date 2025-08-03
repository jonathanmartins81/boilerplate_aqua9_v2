'use client';

import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';

interface MainProps {
  title?: string;
  description?: string;
  technologies?: string[];
}

export function Main({
  title = 'Boilerplate Aqua9',
  description = 'Template Next.js profissional com TypeScript e SEO otimizado',
  technologies = ['Next.js', 'React', 'TypeScript'],
}: MainProps) {
  const { isDark, mounted } = useTheme();

  // Selecionar logo baseado no tema (com fallback para evitar hidratação incorreta)
  const logoSrc = mounted && isDark ? '/img/logo-dark.svg' : '/img/logo-light.svg';

  return (
    <main className='relative flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8 text-center bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500'>
      {/* Logo com fallback */}
      <div className='mb-6 sm:mb-8 w-24 sm:w-28 lg:w-36 h-16 flex items-center justify-center'>
        <Image
          src={logoSrc}
          alt='Aqua9 Logo'
          width={120}
          height={64}
          className='w-full h-auto transition-all duration-300'
          priority
          onError={(e) => {
            // Fallback para logo padrão em caso de erro
            const target = e.target as HTMLImageElement;
            target.src = '/img/logo-light.svg';
          }}
        />
      </div>

      <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100 animate-fade-in transition-colors duration-300 leading-tight'>
        {title}
      </h1>

      <p className='text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-700 dark:text-gray-200 max-w-xs sm:max-w-md lg:max-w-2xl leading-relaxed animate-fade-in transition-colors duration-300 px-4'>
        {description}
      </p>

      <div className='flex flex-wrap gap-2 justify-center mb-8 sm:mb-12 animate-fade-in px-4'>
        {technologies.map((tech, index) => (
          <span
            key={`tech-${tech}-${index}`}
            className='bg-gray-100 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200 dark:border-gray-600/30 text-gray-800 dark:text-gray-200 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700/40 hover:scale-105'
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Ilustração com fallback */}
      <div className='w-48 sm:w-64 lg:w-80 h-32 flex items-center justify-center'>
        <Image
          src='/img/illustration.svg'
          alt='Hero Illustration'
          width={300}
          height={200}
          className='w-full h-auto opacity-80 dark:opacity-60 animate-bounce-in transition-all duration-300 filter dark:invert'
          priority
          onError={(e) => {
            // Fallback para uma div simples em caso de erro
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = '<div class="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20"></div>';
            }
          }}
        />
      </div>

      {/* Informações adicionais sobre o tema */}
      <div className='mt-6 sm:mt-8 text-xs sm:text-sm text-gray-600 dark:text-gray-400 animate-fade-in px-4'>
        <p className='mb-1'>✨ Sistema de tema claro/escuro integrado</p>
        <p className='mb-1'>🎨 Design system profissional</p>
        <p>⚡ Performance otimizada</p>
      </div>
    </main>
  );
}

// Exportação default para compatibilidade
export default Main;

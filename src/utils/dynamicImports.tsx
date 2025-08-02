import dynamic from 'next/dynamic';
import React, { ComponentType } from 'react';

/**
 * Utilitários para code splitting dinâmico
 */

// Loading component padrão
const DefaultLoading = () => (
  <div className='flex items-center justify-center p-8'>
    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600'></div>
    <span className='ml-2 text-gray-600'>Carregando...</span>
  </div>
);

// Error component padrão
const DefaultError = ({ error }: { error: Error }) => (
  <div className='flex items-center justify-center p-8 text-red-600'>
    <div className='text-center'>
      <div className='text-2xl mb-2'>⚠️</div>
      <div className='text-sm'>Erro ao carregar componente</div>
      {process.env.NODE_ENV === 'development' && (
        <div className='text-xs text-gray-500 mt-1'>{error.message}</div>
      )}
    </div>
  </div>
);

/**
 * Cria um componente dinâmico com loading e error states
 *
 * @example
 * ```tsx
 * const DynamicChart = createDynamicComponent(() => import('./Chart'), {
 *   loading: <div>Carregando gráfico...</div>,
 *   ssr: false
 * });
 * ```
 */
export function createDynamicComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options: {
    loading?: React.ComponentType;
    error?: React.ComponentType<{ error: Error }>;
    ssr?: boolean;
    loadingDelay?: number;
  } = {}
) {
  const {
    loading = DefaultLoading,
    error = DefaultError,
    ssr = true,
    loadingDelay = 200,
  } = options;

  return dynamic(importFunc, {
    loading,
    ssr,
    loadingDelay,
    onError: error => {
      console.error('Dynamic import error:', error);
    },
  });
}

/**
 * Componentes dinâmicos pré-configurados
 */

// Dashboard components
export const DynamicDashboard = createDynamicComponent(
  () => import('../app/dashboard/page'),
  { ssr: false }
);

export const DynamicAdmin = createDynamicComponent(
  () => import('../app/admin/page'),
  { ssr: false }
);

// Chart components
export const DynamicChart = createDynamicComponent(
  () => import('../components/Chart'),
  {
    ssr: false,
    loading: () => (
      <div className='flex items-center justify-center h-64 bg-gray-50 rounded-lg'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2'></div>
          <div className='text-sm text-gray-600'>Carregando gráfico...</div>
        </div>
      </div>
    ),
  }
);

// Heavy components
export const DynamicDataTable = createDynamicComponent(
  () => import('../components/DataTable'),
  {
    ssr: false,
    loading: () => (
      <div className='space-y-3'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className='h-12 bg-gray-200 animate-pulse rounded'></div>
        ))}
      </div>
    ),
  }
);

export const DynamicMap = createDynamicComponent(
  () => import('../components/Map'),
  {
    ssr: false,
    loading: () => (
      <div className='flex items-center justify-center h-64 bg-gray-50 rounded-lg'>
        <div className='text-center'>
          <div className='text-2xl mb-2'>🗺️</div>
          <div className='text-sm text-gray-600'>Carregando mapa...</div>
        </div>
      </div>
    ),
  }
);

// Form components
export const DynamicFormBuilder = createDynamicComponent(
  () => import('../components/FormBuilder'),
  {
    ssr: false,
    loading: () => (
      <div className='space-y-4'>
        <div className='h-8 bg-gray-200 animate-pulse rounded'></div>
        <div className='h-12 bg-gray-200 animate-pulse rounded'></div>
        <div className='h-12 bg-gray-200 animate-pulse rounded'></div>
        <div className='h-8 bg-gray-200 animate-pulse rounded w-1/3'></div>
      </div>
    ),
  }
);

// Editor components
export const DynamicCodeEditor = createDynamicComponent(
  () => import('../components/CodeEditor'),
  {
    ssr: false,
    loading: () => (
      <div className='flex items-center justify-center h-64 bg-gray-900 rounded-lg'>
        <div className='text-center text-white'>
          <div className='text-2xl mb-2'>💻</div>
          <div className='text-sm'>Carregando editor...</div>
        </div>
      </div>
    ),
  }
);

// Media components
export const DynamicVideoPlayer = createDynamicComponent(
  () => import('../components/VideoPlayer'),
  {
    ssr: false,
    loading: () => (
      <div className='flex items-center justify-center h-64 bg-gray-900 rounded-lg'>
        <div className='text-center text-white'>
          <div className='text-2xl mb-2'>🎥</div>
          <div className='text-sm'>Carregando vídeo...</div>
        </div>
      </div>
    ),
  }
);

export const DynamicImageGallery = createDynamicComponent(
  () => import('../components/ImageGallery'),
  {
    ssr: false,
    loading: () => (
      <div className='grid grid-cols-3 gap-4'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className='aspect-square bg-gray-200 animate-pulse rounded'
          ></div>
        ))}
      </div>
    ),
  }
);

/**
 * Hook para lazy loading com intersection observer
 */
export function useLazyLoad<T>(
  importFunc: () => Promise<T>,
  options: {
    threshold?: number;
    rootMargin?: string;
  } = {}
) {
  const [module, setModule] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      async entries => {
        const [entry] = entries;
        if (entry.isIntersecting && !module && !loading) {
          setLoading(true);
          try {
            const result = await importFunc();
            setModule(result);
          } catch (err) {
            setError(err as Error);
          } finally {
            setLoading(false);
          }
          observer.unobserve(element);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '50px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [importFunc, module, loading, options.threshold, options.rootMargin]);

  return { ref, module, loading, error };
}

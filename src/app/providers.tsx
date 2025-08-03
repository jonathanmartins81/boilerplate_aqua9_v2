import { ThemeProvider } from '@/contexts/ThemeContext';
import { PropsWithChildren } from 'react';

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultMode='dark'>
      {children}
    </ThemeProvider>
  );
}

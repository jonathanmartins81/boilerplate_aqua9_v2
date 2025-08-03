import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn:
    process.env.NEXT_PUBLIC_SENTRY_DSN ||
    'https://your-dsn@sentry.io/your-project',

  // Performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Session replay
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.01 : 0.1,
  replaysOnErrorSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Environment
  environment: process.env.NODE_ENV || 'development',

  // Release version
  release: process.env.NEXT_PUBLIC_APP_VERSION || '2.0.0',

  // Debug mode
  debug: process.env.NODE_ENV === 'development',

  // Before send function to filter events
  beforeSend(event, hint) {
    // Filter out certain errors in development
    if (process.env.NODE_ENV === 'development') {
      // Don't send console errors in development
      if (event.exception?.values?.[0]) {
        const exception = event.exception.values[0];
        if (exception.value?.includes('console.error')) {
          return null;
        }
      }

      // Don't send React hydration errors in development
      if (event.exception?.values?.[0]) {
        const exception = event.exception.values[0];
        if (exception.value?.includes('Hydration')) {
          return null;
        }
      }
    }

    // Filter out certain errors in production
    if (event.exception?.values?.[0]) {
      const exception = event.exception.values[0];

      // Don't send network errors
      if (
        exception.value &&
        (exception.value.includes('fetch') ||
          exception.value.includes('NetworkError') ||
          exception.value.includes('Failed to fetch'))
      ) {
        return null;
      }

      // Don't send 404 errors
      if (exception.value?.includes('NEXT_NOT_FOUND')) {
        return null;
      }
    }

    return event;
  },

  // Integrations
  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
    Sentry.browserTracingIntegration(),
  ],

  // Ignore patterns
  ignoreErrors: [
    // Ignore specific error patterns
    /^Network request failed$/,
    /^Failed to fetch$/,
    /^ResizeObserver loop limit exceeded$/,
    /^Non-Error promise rejection captured$/,
  ],

  // Performance monitoring
  attachStacktrace: true,
  normalizeDepth: 3,
});

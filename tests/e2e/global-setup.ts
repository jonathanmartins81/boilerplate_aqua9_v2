import { FullConfig } from '@playwright/test';

async function globalSetup(_config: FullConfig) {
  // Setup global simples - sem inicializar navegador
  console.log('🚀 Setup global dos testes E2E iniciado');
}

export default globalSetup;

import { FullConfig } from '@playwright/test';

async function globalTeardown(_config: FullConfig) {
  // Teardown global simples
  console.log('🧹 Teardown global dos testes E2E concluído');
}

export default globalTeardown;

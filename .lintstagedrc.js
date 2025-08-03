/**
 * Configuração do Lint Staged
 *
 * Este arquivo define quais comandos executar em arquivos alterados
 * antes de cada commit, garantindo qualidade do código.
 */

export default {
  // ===== ARQUIVOS TYPESCRIPT E JAVASCRIPT =====
  '*.{js,jsx,ts,tsx}': files => {
    const e2eFiles = files.filter(file => !file.includes('tests/e2e'));
    if (e2eFiles.length === 0) return [];

    return [
      // Formatar código com Prettier
      'prettier --write',
      // Lintar e corrigir automaticamente
      'eslint --fix',
      // Executar testes relacionados aos arquivos alterados (apenas unitários, excluindo e2e)
      'vitest run --bail --findRelatedTests --passWithNoTests --exclude="tests/e2e/**"',
    ];
  },

  // ===== ARQUIVOS DE CONFIGURAÇÃO =====
  '*.{json,md,yml,yaml}': [
    // Formatar arquivos de configuração
    'prettier --write',
  ],

  // ===== ARQUIVOS DE ESTILO =====
  '*.{css,scss}': [
    // Formatar estilos
    'prettier --write',
  ],

  // ===== ARQUIVOS DE DOCUMENTAÇÃO =====
  '*.{md,mdx}': [
    // Formatar documentação
    'prettier --write',
  ],

  // ===== ARQUIVOS DE CONFIGURAÇÃO ESPECÍFICOS =====
  '*.{config.js,config.ts}': [
    // Formatar arquivos de configuração
    'prettier --write',
  ],

  // ===== ARQUIVOS DE TESTE =====
  '*.{test.ts,test.tsx,spec.ts,spec.tsx}': [
    // Formatar arquivos de teste
    'prettier --write',
    // Lintar arquivos de teste
    'eslint --fix',
  ],

  // ===== ARQUIVOS DO STORYBOOK =====
  '*.stories.{ts,tsx}': [
    // Formatar arquivos do Storybook
    'prettier --write',
    // Lintar arquivos do Storybook
    'eslint --fix',
  ],

  // ===== VERIFICAÇÕES GLOBAIS =====
  '*': [
    // Verificar se não há erros de TypeScript
    () => 'npm run type-check',
    // Verificar dependências não utilizadas (opcional)
    () => 'npm run deps:check',
  ],
};

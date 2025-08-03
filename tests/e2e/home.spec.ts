import { expect, test } from '@playwright/test';

test.describe('Página Inicial', () => {
  test('deve carregar a página inicial corretamente', async ({ page }) => {
    // Navegar para a página inicial
    await page.goto('/');

    // Verificar se a página carregou
    await expect(page).toHaveTitle(/Boilerplate Aqua9/);

    // Verificar se o conteúdo principal está presente
    await expect(page.locator('h1')).toContainText('Boilerplate Aqua9');

    // Verificar se as tecnologias estão listadas (usando seletores mais específicos)
    await expect(page.locator('span:has-text("Next.js")')).toBeVisible();
    await expect(page.locator('span:has-text("React")')).toBeVisible();
    await expect(page.locator('span:has-text("TypeScript")')).toBeVisible();
  });

  test('deve ter tema escuro ativo por padrão', async ({ page }) => {
    await page.goto('/');

    // Verificar se o tema escuro está ativo (classe dark no html)
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('deve ter imagens carregadas corretamente', async ({ page }) => {
    await page.goto('/');

    // Verificar se as imagens estão presentes
    await expect(page.locator('img[alt="Aqua9 Logo"]')).toBeVisible();
    await expect(page.locator('img[alt="Hero Illustration"]')).toBeVisible();
  });

  test('deve ser responsivo', async ({ page }) => {
    await page.goto('/');

    // Testar em diferentes tamanhos de tela
    const viewports = [
      { width: 375, height: 667 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);

      // Verificar se o conteúdo ainda está visível (usando seletores mais específicos)
      await expect(page.locator('h1')).toBeVisible();
      await expect(
        page.locator('p:has-text("Template Next.js")')
      ).toBeVisible();

      // Aguardar um pouco para verificar se não há quebras
      await page.waitForTimeout(500);
    }
  });
});

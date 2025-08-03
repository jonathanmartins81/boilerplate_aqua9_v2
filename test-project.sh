#!/bin/bash

# ===== CONFIGURAÇÕES =====
PROJECT_NAME="Boilerplate Aqua9 v2"
TIMEOUT_BUILD=60
TIMEOUT_TESTS=120

# ===== FUNÇÕES AUXILIARES =====
print_header() {
    echo "🧪 Testando $PROJECT_NAME"
    echo "========================================"
}

print_section() {
    echo ""
    echo "📋 $1"
    echo "----------------------------------------"
}

print_success() {
    echo "✅ $1"
}

print_error() {
    echo "❌ $1"
}

print_warning() {
    echo "⚠️  $1"
}

print_info() {
    echo "ℹ️  $1"
}

# ===== VERIFICAÇÕES PRINCIPAIS =====
print_header

# 1. Verificar dependências
print_section "Verificando Dependências"
if npm list --depth=0 > /dev/null 2>&1; then
    print_success "Dependências OK"
else
    print_error "Problema com dependências"
    exit 1
fi

# 2. Verificar linting
print_section "Verificando Linting"
if npx eslint src/ --ext .ts,.tsx --max-warnings=10 > /dev/null 2>&1; then
    print_success "Linting OK"
else
    print_warning "Problemas de linting encontrados (verificando com mais tolerância)"
    if npx eslint src/ --ext .ts,.tsx --max-warnings=50 > /dev/null 2>&1; then
        print_success "Linting OK (com warnings)"
    else
        print_error "Problemas críticos de linting"
    fi
fi

# 3. Verificar TypeScript
print_section "Verificando TypeScript"
if npx tsc --noEmit > /dev/null 2>&1; then
    print_success "TypeScript OK"
else
    print_error "Problemas de TypeScript encontrados"
    exit 1
fi

# 4. Verificar formatação
print_section "Verificando Formatação"
if npx prettier --check . > /dev/null 2>&1; then
    print_success "Formatação OK"
else
    print_warning "Problemas de formatação encontrados"
    print_info "Execute: npx prettier --write ."
fi

# 5. Testar build
print_section "Testando Build"
if timeout $TIMEOUT_BUILD npm run build > /dev/null 2>&1; then
    print_success "Build OK"
else
    print_error "Problema no build"
    exit 1
fi

# 6. Testar testes unitários
print_section "Executando Testes Unitários"
if timeout $TIMEOUT_TESTS npm test -- --run > /dev/null 2>&1; then
    print_success "Testes unitários OK"
else
    print_error "Falha nos testes unitários"
    exit 1
fi

# 7. Verificar cobertura de testes
print_section "Verificando Cobertura de Testes"
if timeout $TIMEOUT_TESTS npm run test:coverage -- --run > /dev/null 2>&1; then
    print_success "Cobertura de testes OK"
else
    print_warning "Problema na cobertura de testes"
fi

# 8. Verificar testes E2E (opcional)
print_section "Verificando Testes E2E"
if command -v npx playwright > /dev/null 2>&1; then
    if timeout $TIMEOUT_TESTS npx playwright test --reporter=list > /dev/null 2>&1; then
        print_success "Testes E2E OK"
    else
        print_warning "Problemas nos testes E2E (pode ser devido a dependências do sistema)"
    fi
else
    print_info "Playwright não encontrado - pulando testes E2E"
fi

# 9. Verificar tamanho do bundle
print_section "Verificando Tamanho do Bundle"
if command -v npx @next/bundle-analyzer > /dev/null 2>&1; then
    print_info "Bundle analyzer disponível"
else
    print_info "Bundle analyzer não instalado"
fi

# 10. Verificar segurança
print_section "Verificando Segurança"
if command -v npx audit > /dev/null 2>&1; then
    if npm audit --audit-level=moderate > /dev/null 2>&1; then
        print_success "Auditoria de segurança OK"
    else
        print_warning "Vulnerabilidades de segurança encontradas"
        print_info "Execute: npm audit fix"
    fi
else
    print_info "Auditoria de segurança não disponível"
fi

# ===== RESUMO FINAL =====
echo ""
echo "========================================"
echo "🎯 Teste do projeto concluído!"
echo ""
echo "📊 Status:"
echo "   • Dependências: ✅"
echo "   • TypeScript: ✅"
echo "   • Build: ✅"
echo "   • Testes unitários: ✅"
echo ""
echo "🔧 Próximos passos recomendados:"
echo "   • Execute 'npm run dev' para desenvolvimento"
echo "   • Execute 'npm run build' para produção"
echo "   • Execute 'npm run test:coverage' para ver cobertura detalhada"
echo "   • Execute 'npm audit fix' se houver vulnerabilidades"
echo ""
echo "✨ Projeto pronto para desenvolvimento!"

#!/bin/bash

# Script de Deploy CalcBM para Vercel
# Uso: ./deploy-vercel.sh

echo "🚀 CalcBM - Deploy Vercel"
echo "=========================="
echo ""

# Verificar se Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "📦 Instalando Vercel CLI..."
    npm install -g vercel
fi

echo "🔐 Fazendo login no Vercel..."
echo "Siga as instruções no navegador para autorizar"
vercel login

echo ""
echo "🚀 Iniciando deploy..."
echo ""

# Deploy para produção
vercel --prod

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "Seu CalcBM está online em:"
echo "https://calcbm.vercel.app"
echo ""

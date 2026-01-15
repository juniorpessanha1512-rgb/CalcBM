# 🚀 Guia de Deploy - CalcBM no Vercel

## Passo 1: Preparar o Repositório GitHub

1. Acesse [GitHub.com](https://github.com) e faça login
2. Clique em **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha os dados:
   - **Repository name**: `CalcBM`
   - **Description**: `Calculadora de Patrões - BM Tripeiro Pro 2026`
   - **Public** (recomendado para Vercel)
   - Clique em **"Create repository"**

## Passo 2: Fazer Push do Código para GitHub

Execute os seguintes comandos no terminal (na pasta do projeto):

```bash
cd /home/ubuntu/boss_calculator

# Remover remote antigo
git remote remove origin

# Adicionar novo remote (substitua SEU_USUARIO e SEU_TOKEN)
git remote add origin https://SEU_USUARIO:SEU_TOKEN@github.com/SEU_USUARIO/CalcBM.git

# Fazer push
git branch -M main
git push -u origin main
```

**Onde:**
- `SEU_USUARIO`: Seu nome de usuário no GitHub
- `SEU_TOKEN`: Token de acesso pessoal do GitHub (gere em Settings > Developer settings > Personal access tokens)

## Passo 3: Conectar ao Vercel

1. Acesse [Vercel.com](https://vercel.com)
2. Clique em **"Sign Up"** ou faça login
3. Selecione **"Continue with GitHub"**
4. Autorize o Vercel a acessar suas contas
5. Clique em **"Import Project"**
6. Cole a URL do seu repositório GitHub:
   ```
   https://github.com/SEU_USUARIO/CalcBM
   ```

## Passo 4: Configurar o Projeto no Vercel

1. **Project Name**: `CalcBM`
2. **Framework**: Selecione **"Vite"**
3. **Root Directory**: `.` (raiz)
4. **Build Command**: `pnpm build`
5. **Install Command**: `pnpm install`
6. **Output Directory**: `dist`
7. Clique em **"Deploy"**

## Passo 5: Configurar Domínio Customizado (Opcional)

Após o deploy ser concluído:

1. Vá para **Settings** > **Domains**
2. Clique em **"Add Domain"**
3. Digite seu domínio (ex: `calcbm.com`)
4. Siga as instruções para configurar os registros DNS

## Passo 6: Acessar seu Site

Após o deploy:
- URL padrão: `https://calcbm.vercel.app`
- Ou seu domínio customizado se configurado

---

## ⚠️ Troubleshooting

### Erro: "Build failed"
- Verifique se o `package.json` está correto
- Certifique-se de que `pnpm` está instalado
- Verifique os logs de build no Vercel

### Erro: "Cannot find module"
- Limpe o cache: `pnpm install --force`
- Faça push novamente para o GitHub

### Site não carrega corretamente
- Verifique se as variáveis de ambiente estão configuradas
- Limpe o cache do navegador (Ctrl+Shift+Delete)

---

## 📝 Notas Importantes

- O arquivo `vercel.json` já está configurado no projeto
- O build está otimizado para produção
- Todos os dados são salvos localmente no navegador (localStorage)
- Não há necessidade de banco de dados ou variáveis de ambiente

---

**Pronto! Seu CalcBM estará online em poucos minutos! 🎉**

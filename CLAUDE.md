# luccapontes.com — Instruções Completas do Projeto

> Este documento contém tudo que você precisa para construir o site luccapontes.com do zero.
> Leia integralmente antes de iniciar o desenvolvimento.

---

## 1. Visão Geral

Site pessoal com portfólio, blog e página de apresentação.

**Domínio:** luccapontes.com
**Tecnologia:** Astro + Markdown
**Hospedagem:** Vercel (deploy automático via GitHub)

**Objetivo:** comunicar a trajetória de desenvolvedor que migrou para representante comercial na mesma software house, servindo como vitrine profissional e canal de conteúdo.

**Seções do site:**
- Homepage com prévia de blog, projetos e leituras
- Sobre (bio + trajetória + habilidades + certificados + cursos + leituras)
- Projetos (portfólio técnico)
- Blog (artigos com categorias e filtro)
- Contato (formulário + redes sociais)

---

## 2. Estrutura de Navegação

O header tem apenas 4 itens para manter a interface limpa:

```
lucca pontes    sobre  |  projetos  |  blog  |  contato
```

- O nome **lucca pontes** é link para a homepage (`/`)
- Leituras e certificados ficam **dentro da página Sobre** (em scroll), não no header

---

## 3. Estrutura de Pastas

Criar exatamente esta estrutura:

```
src/
├── content/
│   ├── blog/           ← artigos em .md
│   └── projetos/       ← projetos em .md
├── data/
│   ├── leituras.json
│   ├── certificados.json
│   ├── cursos.json
│   └── timeline.json
├── pages/
│   ├── index.astro     ← homepage
│   ├── sobre.astro
│   ├── projetos.astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── contato.astro
├── components/
│   ├── Nav.astro
│   ├── Footer.astro
│   ├── BlogRow.astro
│   ├── ProjectCard.astro
│   ├── BookCard.astro
│   └── CertCard.astro
├── layouts/
│   └── Base.astro      ← layout com header + footer + meta tags
└── styles/
    └── global.css
public/
└── images/
    └── avatar.jpg      ← foto de perfil
astro.config.mjs
package.json
```

---

## 4. Inicialização do Projeto

```bash
npm create astro@latest . -- --template minimal --typescript strict --git false
npm install
```

Adicionar integração de conteúdo (para Markdown):

```bash
npx astro add mdx
```

Configurar `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  site: 'https://luccapontes.com',
});
```

---

## 5. Variáveis CSS Globais

Criar `src/styles/global.css` com exatamente estas variáveis:

```css
:root {
  /* backgrounds */
  --bg: #0F0F0F;
  --bg-card: #141414;
  --bg-hover: #1A1A1A;

  /* borders */
  --border: #2A2A2A;
  --border-hover: #3A3A3A;
  --border-inner: #1E1E1E;

  /* texto */
  --text-primary: #E8E8E4;
  --text-body: #C8C8C4;
  --text-muted: #888780;
  --text-hint: #5F5E5A;
  --text-ghost: #444441;

  /* accent verde (dev, lido) */
  --green: #1D9E75;
  --green-dark: #0F6E56;
  --green-bg: #0D1F1A;

  /* accent âmbar (mix, quero ler) */
  --amber: #BA7517;
  --amber-dark: #854F0B;
  --amber-bg: #1A1000;

  /* accent azul (lendo agora) */
  --blue: #378ADD;
  --blue-dark: #185FA5;
  --blue-bg: #0D1420;

  /* botão primário */
  --btn-bg: #E8E8E4;
  --btn-text: #0F0F0F;

  /* layout */
  --max-width: 740px;
  --pad: 32px;
  --pad-mobile: 18px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 20px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  background: var(--bg);
  color: var(--text-primary);
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 16px;
  line-height: 1.7;
}

body {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--pad);
}

a {
  color: inherit;
  text-decoration: none;
}

@media (max-width: 560px) {
  body {
    padding: 0 var(--pad-mobile);
  }
}
```

---

## 6. Guia Visual Completo

### 6.1 Tipografia

| Elemento         | Tamanho | Peso | Cor               |
|------------------|---------|------|-------------------|
| Hero title       | 40px    | 500  | `--text-primary`  |
| Page title       | 28px    | 500  | `--text-primary`  |
| Card title       | 14–15px | 500  | `--text-primary`  |
| Body             | 14px    | 400  | `--text-muted`    |
| Meta / small     | 12px    | 400  | `--text-hint`     |
| Label uppercase  | 11px    | 400  | `--text-hint`     |
| Números de lista | 12px    | 400  | `--text-ghost`    |

Labels de seção devem ser em `text-transform: uppercase` com `letter-spacing: 0.08em`.

### 6.2 Cards

```css
.card {
  background: var(--bg-card);
  border: 0.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 18px 20px;
  transition: border-color 0.15s;
}
.card:hover {
  border-color: var(--border-hover);
}
```

### 6.3 Badges / Tags

```css
/* badge dev (verde) */
.badge-dev {
  background: var(--green-bg);
  color: var(--green);
  border: 0.5px solid var(--green-dark);
}

/* badge mix comercial+tech (âmbar) */
.badge-mix {
  background: var(--amber-bg);
  color: var(--amber);
  border: 0.5px solid var(--amber-dark);
}

/* badge lendo (azul) */
.badge-lendo {
  background: var(--blue-bg);
  color: var(--blue);
  border: 0.5px solid var(--blue-dark);
}

/* regras comuns a todos os badges */
.badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  display: inline-block;
}
```

### 6.4 Pills de contexto (hero)

```css
.pill {
  font-size: 12px;
  padding: 5px 13px;
  border-radius: var(--radius-pill);
  border: 0.5px solid var(--border);
  color: var(--text-hint);
}
```

### 6.5 Botões

```css
/* botão primário: inscrever, enviar */
.btn-primary {
  background: var(--btn-bg);
  color: var(--btn-text);
  border: none;
  border-radius: var(--radius-md);
  padding: 9px 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

/* botão secundário: ver todos, links de projeto */
.btn-secondary {
  background: transparent;
  color: var(--text-hint);
  border: 0.5px solid var(--border);
  border-radius: var(--radius-md);
  padding: 7px 14px;
  font-size: 13px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}
.btn-secondary:hover {
  color: var(--text-primary);
  border-color: var(--border-hover);
}
```

### 6.6 Inputs de formulário

```css
.input {
  background: var(--bg-card);
  border: 0.5px solid var(--border);
  border-radius: var(--radius-md);
  padding: 10px 14px;
  font-size: 13px;
  color: var(--text-primary);
  font-family: inherit;
  width: 100%;
  outline: none;
  transition: border-color 0.15s;
}
.input:focus {
  border-color: #444444;
}
.input::placeholder {
  color: var(--text-hint);
}
```

### 6.7 Navbar

```css
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
  border-bottom: 0.5px solid var(--border);
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 10;
}
.nav-brand {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
}
.nav-links {
  display: flex;
  gap: 28px;
}
.nav-link {
  font-size: 13px;
  color: var(--text-muted);
  padding: 4px 0;
  border-bottom: 1px solid transparent;
  transition: color 0.15s;
}
.nav-link:hover,
.nav-link.active {
  color: var(--text-primary);
}
.nav-link.active {
  border-bottom: 1px solid #444444;
}
```

### 6.8 Lista de posts do blog

```css
.blog-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 0;
  border-bottom: 0.5px solid var(--border-inner);
  cursor: pointer;
  transition: color 0.15s;
}
.blog-row:last-child {
  border-bottom: none;
}
.blog-num {
  font-size: 12px;
  color: var(--text-ghost);
  width: 22px;
  flex-shrink: 0;
}
.blog-title {
  font-size: 14px;
  color: var(--text-body);
  transition: color 0.15s;
}
.blog-row:hover .blog-title {
  color: #ffffff;
}
.blog-date {
  font-size: 12px;
  color: var(--text-ghost);
  min-width: 60px;
  text-align: right;
}
```

### 6.9 Barra de progresso (leitura atual)

```css
.progress-bar {
  height: 3px;
  background: var(--border-inner);
  border-radius: 2px;
  width: 180px;
  margin-top: 8px;
}
.progress-fill {
  height: 100%;
  background: var(--blue);
  border-radius: 2px;
}
```

### 6.10 Estrelas de avaliação

```css
.stars {
  font-size: 12px;
  color: var(--amber);
  letter-spacing: 1px;
}
.stars.empty {
  color: var(--border);
}
```

### 6.11 Responsividade — breakpoints

```css
/* Desktop: > 768px — padrão */

/* Mobile: < 560px */
@media (max-width: 560px) {
  .about-grid    { grid-template-columns: 1fr; }
  .skills-grid   { grid-template-columns: 1fr; }
  .contact-grid  { grid-template-columns: 1fr; }
  .proj-grid     { grid-template-columns: 1fr; }
  .nav-links     { gap: 14px; }
}
```

---

## 7. Páginas — Especificações

### 7.1 Homepage (`/`)

Seções em ordem:

1. **Hero**
   - Tag: `DESENVOLVEDOR & REPRESENTANTE COMERCIAL` (uppercase, 11px, `--text-hint`)
   - Título H1: `olá, sou lucca pontes.` (40px, weight 500)
   - Descrição: 2–3 linhas sobre a trajetória (14px, `--text-muted`, max-width 500px)
   - Pills: `software house` · `desenvolvimento web` · `vendas b2b` · `luccapontes.com`

2. **Blog — últimas publicações**
   - Label de seção: `BLOG — ÚLTIMAS PUBLICAÇÕES`
   - Listar os 3 posts mais recentes onde `featured: true`
   - Botão "ver todos os posts" → `/blog`

3. **Projetos selecionados**
   - Label: `PROJETOS SELECIONADOS`
   - Grid 3 colunas com os projetos onde `featured: true`
   - Cada card: nome, descrição curta, tags de tecnologia

4. **Leituras recentes**
   - Label: `LEITURAS RECENTES`
   - Linha com 3 livros com `status: "lido"` mais recentes + 1 card "próxima leitura" (estilo dashed, opacidade 0.45)

5. **Footer**
   - `luccapontes.com` à esquerda
   - Links: `github` · `linkedin` · `email` à direita

### 7.2 Sobre (`/sobre`)

Seções em scroll, com `<hr>` divisor entre cada uma:

1. **Avatar + bio** — foto/iniciais, cargo, 3 parágrafos, pills
2. **Trajetória** — linha do tempo vertical com `timeline.json`
3. **Habilidades** — grid 2 colunas: Desenvolvimento | Comercial
4. **Certificados** — grid de cards com `certificados.json`
5. **Cursos que recomendo** — lista com `cursos.json`
6. **Leituras** — banner "lendo agora" + filtro + grid de livros

### 7.3 Projetos (`/projetos`)

- Título: `projetos`
- Subtítulo: `trabalhos técnicos e soluções que construí — com a visão de dev e de quem entende o problema do cliente.`
- Grid responsivo com **todos** os projetos de `src/content/projetos/`
- Cada card: nome, ano, badge de tipo, descrição, stack, links

### 7.4 Blog (`/blog`)

- Título: `blog`
- Subtítulo descritivo
- Filtros de categoria (JavaScript client-side): `todos` · `carreira` · `vendas` · `tech` · `produtividade`
- Lista numerada de todos os posts ordenados por data (mais recente primeiro)
- Bloco de inscrição por e-mail no final

### 7.5 Artigo individual (`/blog/[slug]`)

- Título do artigo (H1)
- Data + categoria
- Conteúdo do Markdown renderizado
- Link "← voltar para o blog"

### 7.6 Contato (`/contato`)

- Grid 2 colunas (desktop) / 1 coluna (mobile)
- Esquerda: formulário (nome, e-mail, assunto, mensagem, botão enviar)
- Direita: e-mail, localização, disponibilidade + botões LinkedIn / GitHub / Twitter

---

## 8. Schemas de Conteúdo

### 8.1 Blog — frontmatter

Cada arquivo em `src/content/blog/nome-do-post.md`:

```yaml
---
title: "Título do artigo"
date: 2025-05-10
category: carreira
description: "Resumo curto que aparece na listagem do blog"
featured: true
draft: false
---

Conteúdo do artigo em Markdown começa aqui.
```

**Categorias válidas:** `carreira` | `vendas` | `tech` | `produtividade`

**Regras:**
- `featured: true` → aparece na homepage (máximo 3)
- `draft: true` → não aparece no site, apenas em desenvolvimento
- O nome do arquivo vira a URL: `como-experiencia-dev.md` → `/blog/como-experiencia-dev`

---

### 8.2 Projetos — frontmatter

Cada arquivo em `src/content/projetos/nome-do-projeto.md`:

```yaml
---
title: "Nome do Projeto"
year: 2024
type: dev
description: "Descrição curta que aparece no card"
tech: ["react", "node.js", "postgresql"]
demo: "https://link-da-demo.com"
github: "https://github.com/luccapontes/nome-repo"
featured: true
---

Descrição mais longa do projeto (opcional, aparece na página do projeto).
```

**Tipos válidos:** `dev` | `mix`
- `dev` → badge verde (projeto técnico)
- `mix` → badge âmbar (comercial + tech)
- `featured: true` → aparece na homepage (máximo 3)
- `demo` e `github` são opcionais

---

### 8.3 Leituras — `src/data/leituras.json`

```json
[
  {
    "title": "The Mom Test",
    "author": "Rob Fitzpatrick",
    "status": "lido",
    "rating": 5,
    "review": "Essencial pra quem vende. Aprendi a fazer as perguntas certas.",
    "progress": null
  },
  {
    "title": "Never Split the Difference",
    "author": "Chris Voss",
    "status": "lendo",
    "rating": null,
    "review": "Técnicas de negociação do FBI aplicadas a vendas.",
    "progress": 42
  },
  {
    "title": "Spin Selling",
    "author": "Neil Rackham",
    "status": "quero",
    "rating": null,
    "review": "Metodologia de vendas consultivas. Muito indicado.",
    "progress": null
  }
]
```

**Status válidos:** `lido` | `lendo` | `quero`
- `rating`: número de 1 a 5 (apenas quando `status: "lido"`)
- `progress`: percentual de 0 a 100 (apenas quando `status: "lendo"`)
- `review`: frase curta de 1–2 linhas

---

### 8.4 Certificados — `src/data/certificados.json`

```json
[
  {
    "name": "AWS Certified Developer",
    "issuer": "Amazon Web Services",
    "date": "jan 2024",
    "type": "tech"
  },
  {
    "name": "Inbound Sales Certification",
    "issuer": "HubSpot Academy",
    "date": "mai 2024",
    "type": "biz"
  }
]
```

**Tipos válidos:** `tech` | `biz`

---

### 8.5 Cursos — `src/data/cursos.json`

```json
[
  {
    "name": "The Odin Project — Full Stack",
    "platform": "The Odin Project",
    "free": true,
    "recommended": true
  },
  {
    "name": "CS50 — Harvard",
    "platform": "edX",
    "free": true,
    "recommended": true
  },
  {
    "name": "Spin Selling",
    "platform": "Coursera",
    "free": false,
    "recommended": true
  }
]
```

---

### 8.6 Linha do tempo — `src/data/timeline.json`

```json
[
  {
    "year": "2019",
    "title": "Primeiros passos como dev",
    "description": "Projetos pessoais e freelas, aprendendo na prática."
  },
  {
    "year": "2021",
    "title": "Dev júnior na software house",
    "description": "Projetos web para clientes de diferentes segmentos."
  },
  {
    "year": "2024",
    "title": "Virada: representante comercial",
    "description": "Transição para vendas. Hoje vendo com a visão de quem construiu cada solução."
  },
  {
    "year": "hoje",
    "title": "Construindo em público",
    "description": "Escrevendo sobre tech e vendas, compartilhando projetos e aprendizados."
  }
]
```

---

## 9. Como Adicionar Conteúdo

### ✍️ Escrever um artigo no blog

1. Criar arquivo em `src/content/blog/`
2. O nome do arquivo deve ser em kebab-case sem acentos: `meu-artigo.md`
3. Preencher o frontmatter com os campos obrigatórios
4. Escrever o conteúdo abaixo do `---` em Markdown
5. Para rascunho: `draft: true`
6. Para aparecer na homepage: `featured: true` (máximo 3 posts com featured)

**Exemplo completo:**

```markdown
---
title: "O que aprendi vendendo software que eu mesmo construí"
date: 2025-04-15
category: vendas
description: "Ter sido dev muda completamente como você apresenta um produto para um cliente."
featured: true
draft: false
---

## Introdução

Quando comecei a trabalhar como representante comercial...
```

---

### 📚 Adicionar review de um livro lido

1. Abrir `src/data/leituras.json`
2. Adicionar novo objeto no array
3. Usar `status: "lido"`, preencher `rating` (1–5) e `review`

```json
{
  "title": "Clean Code",
  "author": "Robert Martin",
  "status": "lido",
  "rating": 4,
  "review": "Mudou como eu escrevo código. Princípios que uso até hoje.",
  "progress": null
}
```

---

### 📖 Adicionar livro à lista de próximas leituras

1. Abrir `src/data/leituras.json`
2. Adicionar novo objeto com `status: "quero"`
3. Deixar `rating` e `progress` como `null`

```json
{
  "title": "Zero to One",
  "author": "Peter Thiel",
  "status": "quero",
  "rating": null,
  "review": "Sobre como criar empresas que constroem o futuro.",
  "progress": null
}
```

---

### 📖 Atualizar livro que está lendo

1. Abrir `src/data/leituras.json`
2. Encontrar o livro e mudar `status` para `"lendo"`
3. Preencher `progress` com o percentual atual (0–100)

```json
{
  "title": "Never Split the Difference",
  "author": "Chris Voss",
  "status": "lendo",
  "rating": null,
  "review": "Técnicas de negociação do FBI aplicadas a vendas.",
  "progress": 42
}
```

---

### 🗂 Adicionar um projeto ao portfólio

1. Criar arquivo em `src/content/projetos/nome-do-projeto.md`
2. Preencher frontmatter com todos os campos
3. Usar `type: "dev"` para projetos técnicos ou `type: "mix"` para projetos que unem tech e vendas
4. Para aparecer na homepage: `featured: true` (máximo 3)

**Exemplo:**

```markdown
---
title: "CRM Interno"
year: 2024
type: mix
description: "Sistema de gestão de leads construído para a equipe comercial."
tech: ["react", "node.js", "postgresql", "tailwind"]
demo: "https://crm-demo.luccapontes.com"
github: "https://github.com/luccapontes/crm-interno"
featured: true
---

## Sobre o projeto

O CRM foi criado para resolver um problema real da equipe de vendas...
```

---

### 🏅 Adicionar um certificado

1. Abrir `src/data/certificados.json`
2. Adicionar novo objeto ao array
3. Usar `type: "tech"` para certificações técnicas ou `type: "biz"` para negócios/vendas

```json
{
  "name": "React Developer Certification",
  "issuer": "Meta / Coursera",
  "date": "ago 2023",
  "type": "tech"
}
```

---

### 📋 Adicionar um curso recomendado

1. Abrir `src/data/cursos.json`
2. Adicionar novo objeto ao array

```json
{
  "name": "AWS Cloud Practitioner Essentials",
  "platform": "AWS Training",
  "free": true,
  "recommended": true
}
```

---

## 10. Deploy

### Conectar Vercel ao GitHub

1. Acessar [vercel.com](https://vercel.com) e criar conta
2. Clicar em "Add New Project"
3. Importar o repositório do GitHub
4. Framework preset: **Astro** (detectado automaticamente)
5. Clicar em Deploy

### Conectar domínio luccapontes.com

1. No painel do projeto na Vercel, ir em **Settings → Domains**
2. Adicionar `luccapontes.com`
3. Copiar os registros DNS fornecidos
4. No painel do seu registrador de domínio, apontar os registros
5. SSL/HTTPS é gerado automaticamente

### Fluxo de atualização

```bash
# Escrever novo post, adicionar livro, etc.
git add .
git commit -m "novo post: titulo-do-artigo"
git push
# → Vercel detecta o push e faz deploy em ~30 segundos
```

---

## 11. Checklist de Desenvolvimento

### Fase 1 — Base

- [ ] Inicializar projeto Astro
- [ ] Criar `src/styles/global.css` com todas as variáveis
- [ ] Criar layout base `src/layouts/Base.astro` com Nav e Footer
- [ ] Criar componente `Nav.astro`
- [ ] Criar componente `Footer.astro`

### Fase 2 — Páginas

- [ ] Homepage `index.astro`
- [ ] Sobre `sobre.astro`
- [ ] Projetos `projetos.astro`
- [ ] Blog listagem `blog/index.astro`
- [ ] Blog artigo `blog/[slug].astro`
- [ ] Contato `contato.astro`

### Fase 3 — Componentes

- [ ] `BlogRow.astro` — linha de post
- [ ] `ProjectCard.astro` — card de projeto
- [ ] `BookCard.astro` — card de livro
- [ ] `CertCard.astro` — card de certificado

### Fase 4 — Conteúdo real

- [ ] Preencher `timeline.json` com dados reais
- [ ] Preencher `leituras.json`
- [ ] Preencher `certificados.json`
- [ ] Preencher `cursos.json`
- [ ] Criar primeiros 3 artigos do blog
- [ ] Criar projetos reais no portfólio
- [ ] Adicionar foto de perfil em `public/images/avatar.jpg`

### Fase 5 — Deploy

- [ ] Conectar repositório ao Vercel
- [ ] Configurar domínio luccapontes.com
- [ ] Testar em mobile
- [ ] Publicar


---

## 12. Internacionalização (i18n) — PT / EN

### Visão geral

O site detecta automaticamente o idioma do usuário pelo navegador/localização. A preferência manual fica salva no `localStorage`. O conteúdo da interface (menus, labels, botões) e o conteúdo editorial (blog, projetos) são ambos traduzidos.

**Lógica de detecção:**
1. Verificar `localStorage.getItem('lang')` — se existir, usar esse valor
2. Se não existir, verificar `navigator.language` — se começar com `pt`, usar `pt`; qualquer outro valor, usar `en`
3. Salvar a preferência detectada no `localStorage`

**Alternância manual:** botão no header (`PT | EN`) que troca o idioma e salva no `localStorage`.

---

### 12.1 Estrutura de pastas para i18n

```
src/
├── content/
│   ├── blog/
│   │   ├── pt/          ← artigos em português
│   │   │   └── meu-post.md
│   │   └── en/          ← artigos em inglês
│   │       └── my-post.md
│   └── projetos/
│       ├── pt/
│       │   └── crm-interno.md
│       └── en/
│           └── crm-internal.md
├── i18n/
│   ├── pt.json          ← traduções da interface em português
│   └── en.json          ← traduções da interface em inglês
```

---

### 12.2 Arquivo de traduções da interface

**`src/i18n/pt.json`:**

```json
{
  "nav": {
    "sobre": "sobre",
    "projetos": "projetos",
    "blog": "blog",
    "contato": "contato"
  },
  "hero": {
    "tag": "desenvolvedor & representante comercial",
    "greeting": "olá, sou lucca pontes.",
    "description": "trabalho na interseção entre tecnologia e vendas. fui desenvolvedor por anos e hoje represento a mesma software house onde comecei — entendendo os dois lados do produto."
  },
  "sections": {
    "blog_latest": "blog — últimas publicações",
    "projects_selected": "projetos selecionados",
    "recent_reads": "leituras recentes",
    "next_read": "próxima leitura",
    "see_all_posts": "ver todos os posts",
    "trajectory": "trajetória",
    "skills": "habilidades",
    "certificates": "certificados",
    "recommended_courses": "cursos que recomendo",
    "reads": "leituras",
    "reading_now": "lendo agora",
    "complete": "concluído"
  },
  "skills_groups": {
    "dev": "desenvolvimento",
    "biz": "comercial"
  },
  "blog": {
    "title": "blog",
    "subtitle": "pensamentos sobre tecnologia, vendas e construir uma carreira na interseção dos dois.",
    "filter_all": "todos",
    "filter_career": "carreira",
    "filter_sales": "vendas",
    "filter_tech": "tech",
    "filter_productivity": "produtividade",
    "subscribe_label": "receber novos posts por email",
    "subscribe_btn": "inscrever",
    "subscribe_placeholder": "seu@email.com",
    "back": "← voltar para o blog"
  },
  "projects": {
    "title": "projetos",
    "subtitle": "trabalhos técnicos e soluções que construí — com a visão de dev e de quem entende o problema do cliente.",
    "demo": "ver demo",
    "github": "github",
    "type_dev": "desenvolvimento",
    "type_mix": "comercial + tech"
  },
  "books": {
    "status_read": "lido",
    "status_reading": "lendo",
    "status_want": "quero ler",
    "filter_all": "todos",
    "filter_read": "lidos",
    "filter_reading": "lendo",
    "filter_want": "quero ler"
  },
  "certs": {
    "type_tech": "tech",
    "type_biz": "negócios",
    "free": "gratuito",
    "paid": "pago",
    "recommended": "recomendo"
  },
  "contact": {
    "title": "contato",
    "subtitle": "para projetos, parcerias ou só trocar uma ideia sobre tech e vendas.",
    "name": "nome",
    "email": "email",
    "subject": "assunto",
    "message": "mensagem",
    "name_placeholder": "seu nome",
    "subject_placeholder": "sobre o que é?",
    "message_placeholder": "me conta mais...",
    "send": "enviar mensagem",
    "location_label": "localização",
    "location_value": "brasil",
    "availability_label": "disponibilidade",
    "availability_value": "aberto a projetos freelance e parcerias",
    "networks": "redes"
  },
  "footer": {
    "rights": "luccapontes.com"
  }
}
```

**`src/i18n/en.json`:**

```json
{
  "nav": {
    "sobre": "about",
    "projetos": "projects",
    "blog": "blog",
    "contato": "contact"
  },
  "hero": {
    "tag": "developer & sales representative",
    "greeting": "hi, i'm lucca pontes.",
    "description": "i work at the intersection of technology and sales. i spent years as a developer and now i represent the same software house where i started — understanding both sides of the product."
  },
  "sections": {
    "blog_latest": "blog — latest posts",
    "projects_selected": "selected projects",
    "recent_reads": "recent reads",
    "next_read": "next read",
    "see_all_posts": "see all posts",
    "trajectory": "trajectory",
    "skills": "skills",
    "certificates": "certificates",
    "recommended_courses": "recommended courses",
    "reads": "reads",
    "reading_now": "reading now",
    "complete": "complete"
  },
  "skills_groups": {
    "dev": "development",
    "biz": "business"
  },
  "blog": {
    "title": "blog",
    "subtitle": "thoughts on technology, sales, and building a career at the intersection of both.",
    "filter_all": "all",
    "filter_career": "career",
    "filter_sales": "sales",
    "filter_tech": "tech",
    "filter_productivity": "productivity",
    "subscribe_label": "get new posts by email",
    "subscribe_btn": "subscribe",
    "subscribe_placeholder": "your@email.com",
    "back": "← back to blog"
  },
  "projects": {
    "title": "projects",
    "subtitle": "technical work and solutions i built — with the perspective of a dev who understands the client's problem.",
    "demo": "live demo",
    "github": "github",
    "type_dev": "development",
    "type_mix": "business + tech"
  },
  "books": {
    "status_read": "read",
    "status_reading": "reading",
    "status_want": "want to read",
    "filter_all": "all",
    "filter_read": "read",
    "filter_reading": "reading",
    "filter_want": "want to read"
  },
  "certs": {
    "type_tech": "tech",
    "type_biz": "business",
    "free": "free",
    "paid": "paid",
    "recommended": "recommended"
  },
  "contact": {
    "title": "contact",
    "subtitle": "for projects, partnerships, or just a chat about tech and sales.",
    "name": "name",
    "email": "email",
    "subject": "subject",
    "message": "message",
    "name_placeholder": "your name",
    "subject_placeholder": "what's it about?",
    "message_placeholder": "tell me more...",
    "send": "send message",
    "location_label": "location",
    "location_value": "brazil",
    "availability_label": "availability",
    "availability_value": "open to freelance projects and partnerships",
    "networks": "networks"
  },
  "footer": {
    "rights": "luccapontes.com"
  }
}
```

---

### 12.3 Utilitário de i18n

Criar `src/i18n/utils.ts`:

```typescript
import pt from './pt.json';
import en from './en.json';

export type Lang = 'pt' | 'en';

const translations = { pt, en };

export function getLang(): Lang {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('lang') as Lang;
    if (saved === 'pt' || saved === 'en') return saved;
  }
  if (typeof navigator !== 'undefined') {
    const lang = navigator.language?.toLowerCase();
    return lang?.startsWith('pt') ? 'pt' : 'en';
  }
  return 'pt';
}

export function setLang(lang: Lang) {
  localStorage.setItem('lang', lang);
  window.location.reload();
}

export function t(key: string, lang: Lang): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value ?? key;
}
```

---

### 12.4 Frontmatter de blog com i18n

Cada artigo tem um arquivo por idioma. O slug deve ser o mesmo nos dois para vincular as versões:

**`src/content/blog/pt/como-experiencia-dev.md`:**

```yaml
---
title: "Como a experiência dev mudou minha abordagem comercial"
date: 2025-05-10
category: carreira
description: "O que aprendi ao migrar de desenvolvedor para representante comercial."
featured: true
draft: false
lang: pt
slug: como-experiencia-dev
---
```

**`src/content/blog/en/how-dev-experience.md`:**

```yaml
---
title: "How my dev experience changed my sales approach"
date: 2025-05-10
category: career
description: "What I learned when moving from developer to sales representative."
featured: true
draft: false
lang: en
slug: como-experiencia-dev
---
```

O campo `slug` igual nos dois idiomas permite alternar entre versões do mesmo artigo.

**Categorias em inglês:** `career` | `sales` | `tech` | `productivity`

---

### 12.5 Frontmatter de projetos com i18n

**`src/content/projetos/pt/crm-interno.md`:**

```yaml
---
title: "CRM Interno"
year: 2024
type: mix
description: "Sistema de gestão de leads construído para a equipe comercial."
tech: ["react", "node.js", "postgresql"]
demo: "https://demo.luccapontes.com"
github: "https://github.com/luccapontes/crm"
featured: true
lang: pt
slug: crm-interno
---
```

**`src/content/projetos/en/internal-crm.md`:**

```yaml
---
title: "Internal CRM"
year: 2024
type: mix
description: "Lead management system built for the sales team."
tech: ["react", "node.js", "postgresql"]
demo: "https://demo.luccapontes.com"
github: "https://github.com/luccapontes/crm"
featured: true
lang: en
slug: crm-interno
---
```

---

### 12.6 Botão de idioma no header

Adicionar no `Nav.astro` ao lado do toggle de tema:

```html
<div class="lang-toggle">
  <button id="btn-pt" class="lang-btn">PT</button>
  <span class="lang-sep">|</span>
  <button id="btn-en" class="lang-btn">EN</button>
</div>
```

```css
.lang-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
}
.lang-btn {
  font-size: 12px;
  color: var(--text-hint);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px 0;
  font-family: inherit;
  transition: color 0.15s;
}
.lang-btn.active {
  color: var(--text-primary);
  font-weight: 500;
}
.lang-btn:hover {
  color: var(--text-primary);
}
.lang-sep {
  font-size: 12px;
  color: var(--border-hover);
}
```

```javascript
import { getLang, setLang } from '../i18n/utils';
const lang = getLang();
document.getElementById('btn-pt')?.classList.toggle('active', lang === 'pt');
document.getElementById('btn-en')?.classList.toggle('active', lang === 'en');
document.getElementById('btn-pt')?.addEventListener('click', () => setLang('pt'));
document.getElementById('btn-en')?.addEventListener('click', () => setLang('en'));
```

---

### 12.7 Como adicionar conteúdo bilíngue

**Novo artigo do blog:**
1. Criar `src/content/blog/pt/nome-do-post.md` com `lang: pt`
2. Criar `src/content/blog/en/post-name.md` com `lang: en`
3. Usar o **mesmo valor** em `slug:` nos dois arquivos
4. Escrever o conteúdo em cada idioma após o frontmatter

**Novo projeto:**
1. Criar `src/content/projetos/pt/nome.md` com `lang: pt`
2. Criar `src/content/projetos/en/name.md` com `lang: en`
3. Usar o **mesmo valor** em `slug:` nos dois arquivos

**Traduzir textos da interface:**
- Editar `src/i18n/pt.json` e `src/i18n/en.json` simultaneamente
- Manter as mesmas chaves nos dois arquivos

---

## 13. Tema Claro e Escuro

### Visão geral

O tema segue a preferência do sistema operacional do usuário (`prefers-color-scheme`). O usuário pode trocar manualmente com um botão no header, e a preferência fica salva no `localStorage`.

**Lógica de detecção:**
1. Verificar `localStorage.getItem('theme')` — se existir, usar esse valor
2. Se não existir, verificar `window.matchMedia('(prefers-color-scheme: dark)')` — se for dark, usar `dark`; se for light, usar `light`
3. Aplicar a classe `dark` ou `light` no elemento `<html>`

---

### 13.1 Paleta do tema claro

Adicionar ao `global.css` as variáveis para tema claro:

```css
:root {
  /* tema escuro — padrão */
  --bg: #0F0F0F;
  --bg-card: #141414;
  --bg-hover: #1A1A1A;
  --border: #2A2A2A;
  --border-hover: #3A3A3A;
  --border-inner: #1E1E1E;
  --text-primary: #E8E8E4;
  --text-body: #C8C8C4;
  --text-muted: #888780;
  --text-hint: #5F5E5A;
  --text-ghost: #444441;
  --btn-bg: #E8E8E4;
  --btn-text: #0F0F0F;

  /* accent verde */
  --green: #1D9E75;
  --green-dark: #0F6E56;
  --green-bg: #0D1F1A;

  /* accent âmbar */
  --amber: #BA7517;
  --amber-dark: #854F0B;
  --amber-bg: #1A1000;

  /* accent azul */
  --blue: #378ADD;
  --blue-dark: #185FA5;
  --blue-bg: #0D1420;
}

:root.light {
  /* tema claro */
  --bg: #FAFAF8;
  --bg-card: #FFFFFF;
  --bg-hover: #F4F4F1;
  --border: #E0DED8;
  --border-hover: #C8C6C0;
  --border-inner: #EBEBЕ8;
  --text-primary: #111110;
  --text-body: #2C2C2A;
  --text-muted: #6B6965;
  --text-hint: #8A8884;
  --text-ghost: #AEACAA;
  --btn-bg: #111110;
  --btn-text: #FAFAF8;

  /* accent verde — ajustado para fundo claro */
  --green: #0D7A5A;
  --green-dark: #085C42;
  --green-bg: #E8F5EF;

  /* accent âmbar — ajustado para fundo claro */
  --amber: #8F5A0A;
  --amber-dark: #6B4207;
  --amber-bg: #FDF3E3;

  /* accent azul — ajustado para fundo claro */
  --blue: #1A5FA5;
  --blue-dark: #0E4278;
  --blue-bg: #E8F1FB;
}
```

---

### 13.2 Script de tema (sem flash)

Inserir este script **inline** no `<head>` do layout base, **antes de qualquer CSS**, para evitar flash de tema errado:

```html
<script is:inline>
  (function() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
    if (!saved) localStorage.setItem('theme', theme);
  })();
</script>
```

O atributo `is:inline` é específico do Astro e garante que o script não seja processado, executando imediatamente no carregamento.

---

### 13.3 Botão de tema no header

Adicionar no `Nav.astro` ao lado do toggle de idioma:

```html
<button id="theme-toggle" class="theme-btn" aria-label="Alternar tema">
  <span class="icon-dark">☾</span>
  <span class="icon-light">○</span>
</button>
```

```css
.theme-btn {
  background: transparent;
  border: 0.5px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 4px 10px;
  cursor: pointer;
  font-size: 13px;
  color: var(--text-hint);
  display: flex;
  align-items: center;
  gap: 4px;
  transition: border-color 0.15s, color 0.15s;
}
.theme-btn:hover {
  border-color: var(--border-hover);
  color: var(--text-primary);
}

/* mostrar ícone correto por tema */
:root.dark  .icon-light { display: none; }
:root.dark  .icon-dark  { display: inline; }
:root.light .icon-dark  { display: none; }
:root.light .icon-light { display: inline; }
```

```javascript
const btn = document.getElementById('theme-toggle');
btn?.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  const next = isDark ? 'light' : 'dark';
  document.documentElement.classList.remove('dark', 'light');
  document.documentElement.classList.add(next);
  localStorage.setItem('theme', next);
});
```

---

### 13.4 Posição dos controles no header

O header deve ter 3 áreas:

```
lucca pontes    sobre · projetos · blog · contato    [PT|EN]  [tema]
```

```css
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}
```

---

### 13.5 Checklist de i18n e tema

- [ ] Criar `src/i18n/pt.json` com todas as chaves
- [ ] Criar `src/i18n/en.json` com todas as chaves traduzidas
- [ ] Criar `src/i18n/utils.ts` com `getLang`, `setLang` e `t`
- [ ] Criar estrutura `src/content/blog/pt/` e `src/content/blog/en/`
- [ ] Criar estrutura `src/content/projetos/pt/` e `src/content/projetos/en/`
- [ ] Adicionar botão PT|EN no header com lógica de localStorage
- [ ] Adicionar script anti-flash no `<head>` do layout base
- [ ] Adicionar variáveis de tema claro (`:root.light`) no global.css
- [ ] Adicionar botão de tema no header
- [ ] Testar detecção automática de idioma
- [ ] Testar persistência de preferências após fechar o navegador
- [ ] Testar tema nos dois modos sem flash no carregamento
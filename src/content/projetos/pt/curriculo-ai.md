---
title: "Currículo AI"
year: 2026
type: mix
description: "Plataforma web que automatiza a triagem de currículos de LinkedIn com IA — times de RH cadastram vagas, sobem PDFs e recebem avaliações geradas pelo Claude direto na interface."
tech: ["next.js", "typescript", "firebase", "python", "anthropic", "cloud run"]
github: "https://github.com/luccapontes/curriculo_ai"
featured: true
lang: pt
---

## Sobre o projeto

SaaS interno para times de RH que recebem dezenas de currículos por vaga via LinkedIn. A plataforma elimina a triagem manual: o recrutador cadastra a vaga com critérios, faz upload dos PDFs, e a IA devolve avaliações estruturadas com nota e justificativa para cada candidato.

## Arquitetura

- **Frontend + API:** Next.js 14 (App Router) com TypeScript e Tailwind
- **Auth + Banco + Storage:** Firebase (Authentication, Firestore e Cloud Storage)
- **Fila de processamento:** Cloud Tasks (até 5 tentativas por currículo)
- **Worker de extração:** Python + Flask + pdfplumber, isolado em outro serviço
- **IA:** Anthropic API com `claude-sonnet-4` e prompt caching para reduzir custo por currículo
- **Infra:** Cloud Run (scale-to-zero) + Cloud Build em push para `main`

## Decisões técnicas

- **Worker separado** do Next.js porque PDF parsing é CPU-bound e precisa de mais memória — escalar independente
- **Prompt caching** da Anthropic para reaproveitar a descrição da vaga entre vários currículos da mesma posição
- **Hash SHA-256** do PDF antes do parsing para deduplicar candidatos que enviam o mesmo arquivo em vagas diferentes
- **Schema validation** da resposta da IA antes de gravar no Firestore — falha controlada se o modelo retornar JSON inválido

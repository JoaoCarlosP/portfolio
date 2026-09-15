# Portfólio — João Carlos Pereira

Site pessoal bilíngue (PT/EN) construído com Next.js App Router, TypeScript e Tailwind CSS.

🔗 **Produção:** _(preencher após o deploy)_

## Stack

- **Next.js 16** (App Router, páginas estáticas)
- **TypeScript** em modo estrito
- **Tailwind CSS v4** com tokens de tema em CSS custom properties
- **lucide-react** para ícones
- **next/font** (Inter + JetBrains Mono, self-hosted)

## Decisões de arquitetura

**i18n sem dependência.** O idioma é um segmento de rota (`/pt`, `/en`), então cada versão é pré-renderizada como HTML estático com o `lang`, `canonical` e `hreflang` corretos. O `src/proxy.ts` detecta o `Accept-Language` na primeira visita e redireciona. Todo o texto vive em `src/content/dictionary.ts`.

**Tema sem flash.** Um script inline no `<head>` aplica a classe `dark` antes da primeira pintura, lendo o `localStorage` ou a preferência do sistema. O `ThemeToggle` lê esse estado via `useSyncExternalStore` observando o `<html>`, o que evita `setState` dentro de `useEffect`.

**Animação dirigida pelo scroll, nativa.** As seções aparecem via `animation-timeline: view()` e a barra de progresso do header via `animation-timeline: scroll()` — sem JavaScript no caminho crítico. O `Reveal` só instancia um `IntersectionObserver` quando o browser não suporta essas APIs, e tudo é desligado sob `prefers-reduced-motion`.

**Vidro sobre gradiente.** Os painéis usam `backdrop-filter` com saturação e um brilho especular na borda superior. O campo de aurora fixo atrás da página é o que dá ao vidro algo para refratar — sem ele, glass vira cinza translúcido. Há fallback opaco para browsers sem `backdrop-filter`.

**Sem biblioteca de componentes.** Fora os ícones, os componentes e tokens são próprios — o site é a amostra do trabalho.

## Estrutura

```
src/
├── app/[locale]/     # layout raiz (html/body) + página
├── components/       # seções e UI
├── content/          # textos PT/EN, projetos, dados de contato
├── lib/i18n.ts       # locales e helpers
└── proxy.ts          # redirect por Accept-Language
```

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Antes do deploy

- [ ] Atualizar `site.url` em `src/content/site.ts` com o domínio final (alimenta canonical e Open Graph)
- [ ] Adicionar uma imagem Open Graph em `src/app/opengraph-image.png`

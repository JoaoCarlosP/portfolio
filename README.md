# Portfólio — João Carlos Pereira

Site pessoal bilíngue (PT/EN) construído com Next.js App Router, TypeScript e Tailwind CSS.

🔗 **Produção:** _(preencher após o deploy)_

## Stack

- **Next.js 16** (App Router, páginas estáticas)
- **TypeScript** em modo estrito
- **Tailwind CSS v4** com tokens de tema em CSS custom properties
- **lucide-react** para ícones de interface
- **next/font** (Inter + JetBrains Mono, self-hosted)

## Decisões de arquitetura

**i18n sem dependência.** O idioma é um segmento de rota (`/pt`, `/en`), então cada versão é pré-renderizada como HTML estático com o `lang`, `canonical` e `hreflang` corretos. O `src/proxy.ts` detecta o `Accept-Language` na primeira visita e redireciona. Todo o texto vive em `src/content/dictionary.ts`.

**Tema sem flash.** Um script inline no `<head>` aplica a classe `dark` antes da primeira pintura, lendo o `localStorage` ou a preferência do sistema. O `ThemeToggle` lê esse estado via `useSyncExternalStore` observando o `<html>`, o que evita `setState` dentro de `useEffect`.

**Animação dirigida pelo scroll, nativa.** As seções aparecem via `animation-timeline: view()` e a barra de progresso do header via `animation-timeline: scroll()` — sem JavaScript no caminho crítico. O `Reveal` só instancia um `IntersectionObserver` quando o browser não suporta essas APIs, e tudo é desligado sob `prefers-reduced-motion`.

**Vidro sobre gradiente.** Os painéis usam `backdrop-filter` com saturação e um brilho especular na borda superior. O campo de aurora fixo atrás da página é o que dá ao vidro algo para refratar — sem ele, glass vira cinza translúcido. Há fallback opaco para browsers sem `backdrop-filter`.

**Constelações sem custo por frame.** O campo de estrelas tem posições e arestas precomputadas (`starfield-data.ts`, gerado com PRNG semeado para servidor e cliente baterem) e as três camadas de parallax se movem por transform em CSS — nada de canvas nem `requestAnimationFrame` competindo com a aurora, o marquee e o blur de vidro.

**Preloader à prova de falha.** A tela de abertura é renderizada no servidor e dispensada por uma animação CSS, não por JavaScript — se o script falhar, o overlay sai do caminho sozinho em vez de trancar o site. O componente só remove o nó depois e devolve o scroll que travou; como quem trava é o mesmo código que destrava, uma página sem JS nunca fica presa. Sob `prefers-reduced-motion` a abertura é pulada.

**PWA instalável.** Manifest gerado por `app/manifest.ts`, service worker próprio em `public/sw.js` (network-first para páginas, cache-first para o build hasheado) e um banner de instalação que se adapta à plataforma: Android e desktop usam `beforeinstallprompt`; iOS, que não tem essa API, recebe as instruções da Share sheet. A meta legada `apple-mobile-web-app-capable` é adicionada à mão porque o Next 16 emite apenas a versão padronizada, e iOS anterior ao 16.4 ainda depende dela.

**Marcas de tecnologia sem dependência em runtime.** Os paths vêm do `simple-icons`, extraídos para `src/components/tech-icons.ts` em tempo de autoria. Marcas quase pretas caem para `currentColor`, que de outra forma sumiriam no tema escuro.

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

## Testando o PWA

O service worker só é registrado em produção, para não brigar com o hot reload:

```bash
npm run build && npm run start
```

Instalação aparece no Chrome desktop e no Android. No iPhone, é manual: Compartilhar → Adicionar à Tela de Início.

## Antes do deploy

- [ ] Atualizar `site.url` em `src/content/site.ts` com o domínio final (alimenta canonical e Open Graph)
- [ ] Adicionar uma imagem Open Graph em `src/app/opengraph-image.png`

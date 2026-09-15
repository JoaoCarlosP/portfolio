# Portfólio — João Carlos Pereira

Site pessoal bilíngue (PT/EN) construído com Next.js App Router, TypeScript e Tailwind CSS.

🔗 **Produção:** https://portfolio-psi-nine-owivwh6xx5.vercel.app

## Stack

- **Next.js 16** (App Router, páginas estáticas)
- **TypeScript** em modo estrito
- **Tailwind CSS v4** com tokens de tema em CSS custom properties
- **lucide-react** para ícones de interface
- **next/font** — Sora (títulos), Plus Jakarta Sans (corpo), JetBrains Mono, todas self-hosted

## Decisões de arquitetura

**i18n sem dependência.** O idioma é um segmento de rota (`/pt`, `/en`), então cada versão é pré-renderizada como HTML estático com `lang`, `canonical` e `hreflang` corretos. O `src/proxy.ts` detecta o `Accept-Language` na primeira visita e redireciona. Todo o texto vive em `src/content/dictionary.ts`.

**Tema sem flash.** Um script inline no `<head>` roda antes da primeira pintura: marca `js` no `<html>` e aplica a classe `dark` a partir do `localStorage` ou da preferência do sistema. O `ThemeToggle` lê esse estado via `useSyncExternalStore` observando o `<html>`, evitando `setState` dentro de `useEffect`.

**Nada se esconde sem que o script possa trazer de volta.** Todo estado "começa invisível" é condicionado à classe `js`. Sem JavaScript a classe nunca é adicionada e a página renderiza inteira — cards, textos e seções — em vez de ficar esperando um reveal que não vem.

**Cards que se montam.** O reveal usa `IntersectionObserver` de disparo único, não `animation-timeline: view()`. O motivo é o efeito: o conteúdo do card entra em stagger por tempo, e uma timeline ligada ao scroll colapsa a sequência inteira em um frame quando o usuário rola rápido. O painel de vidro chega primeiro e os filhos caem no lugar em cascata (`--n` por `nth-child`), mantendo sua caixa de layout enquanto ocultos — a altura do card nunca muda no meio da animação. O scroll nativo ficou só onde é de fato melhor: a barra de progresso do header, via `animation-timeline: scroll()`.

**Reveals acima da dobra esperam a abertura.** Sem isso eles animam atrás do overlay de intro e o usuário só vê o resultado. `src/lib/intro.ts` centraliza esse tempo para os dois componentes não saírem de sincronia.

**Preloader à prova de falha.** A tela de abertura é renderizada no servidor e dispensada por animação CSS, não por JavaScript — se o script falhar, o overlay sai do caminho sozinho em vez de trancar o site. O componente só remove o nó depois e devolve o scroll que travou; como quem trava é o mesmo código que destrava, uma página sem JS nunca fica presa. A trava é liberada exatamente quando o overlay para de interceptar cliques: soltá-la mais tarde deixaria uma janela em que um clique no menu é aceito mas o scroll resultante é engolido.

**Vidro sobre gradiente.** Os painéis usam `backdrop-filter` com saturação e brilho especular na borda superior. O campo de aurora fixo atrás da página é o que dá ao vidro algo para refratar — sem ele, glass vira cinza translúcido. Há fallback opaco para browsers sem `backdrop-filter`.

**A borda de vidro muda de natureza entre os temas.** No escuro ela é branca e funciona como brilho especular; sobre fundo claro esse mesmo branco desaparece e o card fica sem contorno, então no tema claro a borda vira uma linha escura sutil e o brilho migra inteiramente para a sombra interna. A aurora também roda com cerca de metade da intensidade no claro, onde os mesmos valores leriam como tingimento em vez de profundidade.

**Constelações sem custo por frame.** Posições e arestas são precomputadas em `starfield-data.ts` (PRNG semeado, para servidor e cliente baterem) e as três camadas de parallax se movem por transform em CSS — nada de canvas ou `requestAnimationFrame` competindo com a aurora, o marquee e o blur de vidro.

**Hero em grid areas, não em dois ramos de markup.** A foto é um nó só — uma imagem, uma dica de prioridade — que muda de posição entre os breakpoints: no celular divide a linha com o selo de disponibilidade, no desktop ocupa a coluna da direita.

**PWA instalável.** Manifest gerado por `app/manifest.ts`, service worker próprio em `public/sw.js` (network-first para páginas, cache-first para o build hasheado) e um banner de instalação que se adapta à plataforma: Android e desktop usam `beforeinstallprompt`; iOS, que não tem essa API, recebe as instruções da Share sheet. A meta legada `apple-mobile-web-app-capable` é adicionada à mão porque o Next 16 emite apenas a versão padronizada, e iOS anterior ao 16.4 ainda depende dela. O ícone maskable ocupa 86% da zona segura do Android.

**Marcas de tecnologia sem dependência em runtime.** Os paths vêm do `simple-icons`, extraídos para `src/components/tech-icons.ts` em tempo de autoria. Marcas quase pretas caem para `currentColor`, que de outra forma sumiriam no tema escuro. AWS não está no conjunto: a Amazon pediu a remoção dos ícones dela do `simple-icons`.

**Movimento é opcional.** `prefers-reduced-motion` desliga aurora, gradiente animado, marquee, constelações, tilt da foto e a montagem dos cards, e pula a tela de abertura.

**Sem biblioteca de componentes.** Fora os ícones, os componentes e tokens são próprios — o site é a amostra do trabalho.

## Estrutura

```
src/
├── app/
│   ├── [locale]/     # layout raiz (html/body) + página
│   ├── globals.css   # tokens de tema e todas as animações
│   ├── manifest.ts   # web app manifest
│   └── icon.svg      # favicon <JC />
├── components/       # seções e UI
├── content/          # textos PT/EN, projetos, dados de contato
├── lib/
│   ├── i18n.ts       # locales e helpers
│   └── intro.ts      # tempo da abertura, compartilhado
└── proxy.ts          # redirect por Accept-Language
```

Conteúdo editável sem tocar em componente: `content/dictionary.ts` (textos), `content/projects.ts` (projetos) e `content/site.ts` (links e domínio).

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

O convite para instalar aparece no Chrome desktop e no Android. No iPhone é manual: Compartilhar → Adicionar à Tela de Início.

## Pendências

- [ ] Imagem Open Graph em `src/app/opengraph-image.png` — sem ela o link compartilhado sai sem preview
- [ ] Ao registrar um domínio próprio, atualizar `site.url` em `src/content/site.ts`, que alimenta canonical, `hreflang` e Open Graph

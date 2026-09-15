import type { Locale } from "@/lib/i18n";

export type Dictionary = (typeof dictionaries)[Locale];

export const dictionaries = {
  pt: {
    meta: {
      title: "João Carlos Pereira — Desenvolvedor Fullstack com foco em Front-end",
      description:
        "Desenvolvedor fullstack com foco em front-end e 4 anos construindo produtos no mercado financeiro. React, TypeScript e arquitetura de front-end.",
    },
    nav: {
      about: "Sobre",
      work: "Experiência",
      projects: "Projetos",
      skills: "Stack",
      contact: "Contato",
      menu: "Menu",
      toggleTheme: "Alternar tema",
    },
    hero: {
      available: "Aberto a novas oportunidades",
      role: "Desenvolvedor Fullstack com foco em Front‑end",
      headline: "Construo interfaces que aguentam produto de verdade.",
      lead: "Foram 4 anos desenvolvendo software para o mercado financeiro — SaaS e soluções para correspondentes bancários. React e TypeScript são meu terreno principal; Node.js entra quando o problema pede.",
      ctaProjects: "Ver projetos",
      ctaContact: "Falar comigo",
    },
    metrics: {
      title: "Coisas que já foram para produção",
      items: [
        { value: "6k+", unit: "usuários/mês", label: "PWA de notificações em tempo real" },
        { value: "~1k", unit: "downloads", label: "Aplicativo React Native na Play Store" },
        { value: "1.500+", unit: "operadores", label: "CRM SaaS do mercado financeiro" },
        { value: "12", unit: "repositórios", label: "Design System que saiu do front e escalou" },
      ],
    },
    about: {
      title: "Sobre",
      lead: "Curioso por natureza. Desenvolvedor por escolha.",
      paragraphs: [
        "Trabalho com produto, não com tela isolada. Nos últimos 4 anos construí SaaS e ferramentas para o mercado financeiro, onde erro de interface vira erro de operação — isso me ensinou a tratar front-end como engenharia, não como acabamento.",
        "Gosto de transformar solução individual em padrão que o time inteiro consegue seguir. Foi assim que um Design System que começou no front acabou adotado em 12 repositórios.",
        "Também circulo pelo resto do stack quando preciso: APIs, queries em SQL e MongoDB, autenticação e storage na AWS. Não por querer ser especialista em tudo, mas para não deixar uma feature parada esperando outra pessoa.",
      ],
      pillars: [
        {
          title: "Arquitetura de front-end",
          body: "Estrutura de pastas, camada de dados, limites de componente e padrões que sobrevivem ao time crescer.",
        },
        {
          title: "Design Systems",
          body: "Componentes reaproveitáveis, tokens e documentação — o que faz produto parecer um produto só.",
        },
        {
          title: "Qualidade e processo",
          body: "Code review, mentoria, CI/CD e padrões de lint que pegam o problema antes do usuário.",
        },
        {
          title: "Ownership",
          body: "Assumo o problema de ponta a ponta e explico o porquê, não só entrego a resposta.",
        },
      ],
    },
    work: {
      title: "Experiência",
      subtitle: "Mercado financeiro · 4 anos",
      role: "Desenvolvedor Fullstack com foco em Front‑end",
      period: "2022 — 2026",
      summary:
        "Desenvolvi produtos SaaS e soluções para correspondentes bancários, do primeiro componente até o deploy.",
      bullets: [
        "Construí e mantive aplicações React + TypeScript em produção, com Redux Toolkit na camada de estado.",
        "Estruturei um Design System e padrões de qualidade que partiram do front-end e foram adotados em 12 repositórios.",
        "Entreguei um PWA de notificações em tempo real que atende mais de 6 mil usuários por mês.",
        "Publiquei aplicativo em React Native na Play Store, com cerca de mil downloads.",
        "Atuei em code review, mentoria e integração de novos desenvolvedores no time.",
      ],
      note: "Nomes de clientes e repositórios omitidos por confidencialidade.",
    },
    projects: {
      title: "Projetos",
      lead: "Projetos pessoais e acadêmicos públicos. O trabalho de produção não aparece aqui por confidencialidade.",
      viewCode: "Código",
      viewDemo: "Ver ao vivo",
      status: { live: "No ar", wip: "Em desenvolvimento", code: "Código aberto" },
      kind: { personal: "Pessoal", study: "Estudo", academic: "Acadêmico", challenge: "Teste técnico" },
      highlightsLabel: "Destaques",
      filterAll: "Todos",
      filterLabel: "Filtrar por tecnologia",
      filterEmpty: "Nenhum projeto com essa tecnologia.",
      countOne: "projeto",
      countMany: "projetos",
    },
    skills: {
      title: "Stack",
      lead: "Ferramentas que uso com frequência — não uma lista de tudo que já toquei.",
      groups: [
        { title: "Front-end", items: ["React", "TypeScript", "Next.js", "Redux Toolkit", "Tailwind CSS", "Vite", "Sass", "Ant Design"] },
        { title: "Back-end", items: ["Node.js", "Express", "Fastify", "MongoDB", "PostgreSQL", "Supabase"] },
        { title: "Engenharia", items: ["Git", "CI/CD", "Turborepo", "ESLint", "Prettier", "AWS", "Design Systems"] },
        { title: "Estudando agora", items: ["Frontend Architecture", "Fullstack Architecture", "Node.js avançado", "AI-assisted Development"] },
      ],
    },
    contact: {
      title: "Contato",
      lead: "Aberto a oportunidades como desenvolvedor fullstack ou front-end. Respondo mais rápido por e-mail ou LinkedIn.",
      emailLabel: "E-mail",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      locationLabel: "Localização",
      copy: "Copiar",
      copied: "Copiado",
    },
    marquee: {
      label: "Tecnologias que uso",
    },
    pwa: {
      title: "Instalar este portfólio",
      body: "Adicione à tela de início para abrir rápido, inclusive offline.",
      install: "Instalar",
      iosTitle: "Instalar no iPhone ou iPad",
      iosBody: "Toque em Compartilhar e escolha \"Adicionar à Tela de Início\".",
      dismiss: "Fechar",
    },
    footer: {
      built: "Construído com Next.js, TypeScript e Tailwind CSS.",
      source: "Código deste site",
      rights: "Todos os direitos reservados.",
    },
  },

  en: {
    meta: {
      title: "João Carlos Pereira — Fullstack Developer, front-end focused",
      description:
        "Fullstack developer with a front-end focus and 4 years building products for the financial sector. React, TypeScript and front-end architecture.",
    },
    nav: {
      about: "About",
      work: "Experience",
      projects: "Projects",
      skills: "Stack",
      contact: "Contact",
      menu: "Menu",
      toggleTheme: "Toggle theme",
    },
    hero: {
      available: "Open to new opportunities",
      role: "Fullstack Developer, front‑end focused",
      headline: "I build interfaces that hold up under real product weight.",
      lead: "Four years building software for the financial sector — SaaS platforms and tools for banking correspondents. React and TypeScript are my home ground; Node.js comes in when the problem calls for it.",
      ctaProjects: "See projects",
      ctaContact: "Get in touch",
    },
    metrics: {
      title: "Shipped to production",
      items: [
        { value: "6k+", unit: "users/month", label: "Real-time notification PWA" },
        { value: "~1k", unit: "downloads", label: "React Native app on the Play Store" },
        { value: "1,500+", unit: "operators", label: "Financial-sector SaaS CRM" },
        { value: "12", unit: "repositories", label: "Design System that scaled beyond the front-end" },
      ],
    },
    about: {
      title: "About",
      lead: "Curious by nature. Developer by choice.",
      paragraphs: [
        "I work on products, not isolated screens. For the past four years I've built SaaS and tooling for the financial sector, where an interface mistake becomes an operational one — that taught me to treat front-end as engineering, not decoration.",
        "I like turning one-off solutions into patterns a whole team can follow. That's how a Design System that started in the front-end ended up adopted across 12 repositories.",
        "I also move through the rest of the stack when needed: APIs, SQL and MongoDB queries, auth and storage on AWS. Not to be an expert at everything, but so a feature never stalls waiting on someone else.",
      ],
      pillars: [
        {
          title: "Front-end architecture",
          body: "Folder structure, data layer, component boundaries and patterns that survive a growing team.",
        },
        {
          title: "Design Systems",
          body: "Reusable components, tokens and documentation — what makes a product feel like one product.",
        },
        {
          title: "Quality and process",
          body: "Code review, mentoring, CI/CD and lint rules that catch problems before users do.",
        },
        {
          title: "Ownership",
          body: "I take the problem end to end and explain the why, not just hand over the answer.",
        },
      ],
    },
    work: {
      title: "Experience",
      subtitle: "Financial sector · 4 years",
      role: "Fullstack Developer, front‑end focused",
      period: "2022 — 2026",
      summary:
        "Built SaaS products and tools for banking correspondents, from the first component to deployment.",
      bullets: [
        "Built and maintained production React + TypeScript applications, with Redux Toolkit in the state layer.",
        "Established a Design System and quality standards that started in the front-end and were adopted across 12 repositories.",
        "Shipped a real-time notification PWA serving over 6,000 users a month.",
        "Published a React Native app on the Play Store with roughly a thousand downloads.",
        "Ran code reviews, mentored teammates and onboarded new developers.",
      ],
      note: "Client and repository names omitted for confidentiality.",
    },
    projects: {
      title: "Projects",
      lead: "Public personal and academic projects. Production work isn't shown here for confidentiality reasons.",
      viewCode: "Code",
      viewDemo: "Live demo",
      status: { live: "Live", wip: "In progress", code: "Open source" },
      kind: { personal: "Personal", study: "Study", academic: "Academic", challenge: "Take-home test" },
      highlightsLabel: "Highlights",
      filterAll: "All",
      filterLabel: "Filter by technology",
      filterEmpty: "No project uses that technology.",
      countOne: "project",
      countMany: "projects",
    },
    skills: {
      title: "Stack",
      lead: "Tools I reach for regularly — not a list of everything I've touched.",
      groups: [
        { title: "Front-end", items: ["React", "TypeScript", "Next.js", "Redux Toolkit", "Tailwind CSS", "Vite", "Sass", "Ant Design"] },
        { title: "Back-end", items: ["Node.js", "Express", "Fastify", "MongoDB", "PostgreSQL", "Supabase"] },
        { title: "Engineering", items: ["Git", "CI/CD", "Turborepo", "ESLint", "Prettier", "AWS", "Design Systems"] },
        { title: "Currently learning", items: ["Frontend Architecture", "Fullstack Architecture", "Advanced Node.js", "AI-assisted Development"] },
      ],
    },
    contact: {
      title: "Contact",
      lead: "Open to fullstack and front-end roles. Email or LinkedIn get the fastest reply.",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      locationLabel: "Location",
      copy: "Copy",
      copied: "Copied",
    },
    marquee: {
      label: "Technologies I work with",
    },
    pwa: {
      title: "Install this portfolio",
      body: "Add it to your home screen to open it fast, even offline.",
      install: "Install",
      iosTitle: "Install on iPhone or iPad",
      iosBody: "Tap Share and choose \"Add to Home Screen\".",
      dismiss: "Dismiss",
    },
    footer: {
      built: "Built with Next.js, TypeScript and Tailwind CSS.",
      source: "Source of this site",
      rights: "All rights reserved.",
    },
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

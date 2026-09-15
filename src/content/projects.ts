import type { Locale } from "@/lib/i18n";

export type ProjectStatus = "live" | "wip" | "code";
export type ProjectKind = "personal" | "study" | "academic";

type LocalizedCopy = {
  tagline: string;
  description: string;
  highlights: string[];
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  status: ProjectStatus;
  kind: ProjectKind;
  stack: string[];
  repo?: string;
  demo?: string;
  copy: Record<Locale, LocalizedCopy>;
};

export const projects: Project[] = [
  {
    slug: "image-aggregator",
    title: "Image Aggregator",
    year: "2025",
    status: "live",
    kind: "personal",
    stack: ["React 18", "TypeScript", "Tailwind CSS", "Vite", "Supabase"],
    repo: "https://github.com/JoaoCarlosP/image-aggregator",
    demo: "https://image-aggregator.vercel.app",
    copy: {
      pt: {
        tagline: "Busca unificada de imagens em três APIs",
        description:
          "Aplicação que consulta Pexels, Unsplash e Pixabay ao mesmo tempo e devolve tudo numa interface única, com layout masonry e filtros combinados.",
        highlights: [
          "Agregação simultânea de três APIs externas com normalização de respostas",
          "Layout masonry responsivo com carregamento progressivo",
          "Filtros por estilo, orientação, cor e fonte",
        ],
      },
      en: {
        tagline: "Unified image search across three APIs",
        description:
          "An app that queries Pexels, Unsplash and Pixabay at once and returns everything in a single interface, with a masonry layout and combinable filters.",
        highlights: [
          "Simultaneous aggregation of three external APIs with response normalization",
          "Responsive masonry layout with progressive loading",
          "Filters by style, orientation, color and source",
        ],
      },
    },
  },
  {
    slug: "cyberchase-front",
    title: "CyberChase",
    year: "2024",
    status: "code",
    kind: "academic",
    stack: ["React", "TypeScript", "Vite", "Ant Design", "Sass", "React Router"],
    repo: "https://github.com/JoaoCarlosP/cyberchase-front",
    copy: {
      pt: {
        tagline: "Front-end do trabalho de graduação",
        description:
          "Interface completa desenvolvida como trabalho de graduação na FATEC Sorocaba, com rotas protegidas, consumo de API e componentes de formulário reaproveitáveis.",
        highlights: [
          "Arquitetura de rotas com React Router e controle de acesso",
          "Camada de serviços isolada com Axios e tipagem de contratos",
          "Design system baseado em Ant Design com tema customizado em Sass",
        ],
      },
      en: {
        tagline: "Front-end of my capstone project",
        description:
          "A complete interface built as my capstone project at FATEC Sorocaba, with protected routes, API consumption and reusable form components.",
        highlights: [
          "Routing architecture with React Router and access control",
          "Isolated service layer with Axios and typed contracts",
          "Ant Design–based design system with a custom Sass theme",
        ],
      },
    },
  },
  {
    slug: "gym-analytics",
    title: "Gym Analytics",
    year: "2026",
    status: "wip",
    kind: "personal",
    stack: ["Turborepo", "pnpm workspaces", "TypeScript", "Supabase", "React Native"],
    copy: {
      pt: {
        tagline: "Monorepo de acompanhamento de treinos",
        description:
          "Projeto pessoal em desenvolvimento: um monorepo com app mobile e API compartilhando pacotes internos, tipagem ponta a ponta e Supabase como backend.",
        highlights: [
          "Monorepo com Turborepo e pnpm workspaces, com pacotes compartilhados",
          "Tipagem ponta a ponta entre banco, API e cliente",
          "Padrões de qualidade automatizados com ESLint e Prettier",
        ],
      },
      en: {
        tagline: "Workout-tracking monorepo",
        description:
          "A personal work in progress: a monorepo where a mobile app and an API share internal packages, with end-to-end typing and Supabase as the backend.",
        highlights: [
          "Monorepo with Turborepo and pnpm workspaces sharing internal packages",
          "End-to-end typing across database, API and client",
          "Automated quality gates with ESLint and Prettier",
        ],
      },
    },
  },
  {
    slug: "move-it",
    title: "Move.it",
    year: "2024",
    status: "live",
    kind: "study",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    repo: "https://github.com/JoaoCarlosP/Move-It",
    demo: "https://move-it-my-project.vercel.app",
    copy: {
      pt: {
        tagline: "Pomodoro gamificado — estudo de Next.js",
        description:
          "Projeto de estudo focado em App Router, persistência de estado no cliente e composição de componentes. Mantido no ar porque ainda serve como referência de fundamentos.",
        highlights: [
          "Ciclo de pomodoro com desafios e progressão de nível",
          "Estado persistido em cookies entre sessões",
          "Layout responsivo construído do zero com Tailwind",
        ],
      },
      en: {
        tagline: "Gamified pomodoro — a Next.js study",
        description:
          "A study project focused on the App Router, client-side state persistence and component composition. Still deployed because it remains a clean fundamentals reference.",
        highlights: [
          "Pomodoro cycle with challenges and level progression",
          "State persisted in cookies across sessions",
          "Responsive layout built from scratch with Tailwind",
        ],
      },
    },
  },
];

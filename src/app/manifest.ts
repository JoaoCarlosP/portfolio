import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Desenvolvedor Fullstack com foco em Front-end`,
    short_name: site.shortName,
    description:
      "Portfólio de João Carlos Pereira, desenvolvedor fullstack com foco em front-end e 4 anos construindo produtos no mercado financeiro.",
    // Root, so the proxy can still pick the visitor's language on launch.
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a0d13",
    theme_color: "#0a0d13",
    lang: "pt-BR",
    dir: "ltr",
    categories: ["portfolio", "business"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

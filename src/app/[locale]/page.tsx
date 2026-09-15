import { notFound } from "next/navigation";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { Projects } from "@/components/Projects";
import { InstallPrompt } from "@/components/InstallPrompt";
import { ServiceWorker } from "@/components/ServiceWorker";
import { Skills } from "@/components/Skills";
import { Splash } from "@/components/Splash";
import { TechMarquee } from "@/components/TechMarquee";
import { Work } from "@/components/Work";
import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { isLocale } from "@/lib/i18n";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: t.hero.role,
    email: `mailto:${site.email}`,
    url: site.url,
    image: site.avatar,
    address: { "@type": "PostalAddress", addressLocality: "Sorocaba", addressRegion: "SP", addressCountry: "BR" },
    sameAs: [site.github, site.linkedin],
  };

  return (
    <div className="relative overflow-x-clip">
      {/* Colour field the glass panels refract. */}
      <div className="aurora" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <Splash />

      <Header t={t} locale={locale} />
      <main className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        <Hero t={t} />
        <Metrics t={t} />
        <TechMarquee label={t.marquee.label} />
        <About t={t} />
        <Work t={t} />
        <Projects t={t} locale={locale} />
        <Skills t={t} />
        <Contact t={t} />
        <Footer t={t} />
      </main>
      <ServiceWorker />
      <InstallPrompt t={t} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </div>
  );
}

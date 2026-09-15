import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { JetBrains_Mono, Plus_Jakarta_Sans, Sora } from "next/font/google";
import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import "../globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--ff-sans",
  display: "swap",
});
const display = Sora({ subsets: ["latin"], variable: "--ff-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--ff-mono", display: "swap" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  // cover keeps the layout under the notch on installed iOS devices
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0d13" },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: site.shortName,
    alternates: {
      canonical: `/${locale}`,
      languages: { pt: "/pt", en: "/en" },
    },
    // iOS ignores the manifest for home-screen installs and reads these.
    appleWebApp: {
      capable: true,
      title: site.shortName,
      statusBarStyle: "black",
    },
    openGraph: {
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      url: `/${locale}`,
      title: t.meta.title,
      description: t.meta.description,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
  };
}

/**
 * Runs before first paint: marks that scripting is available and applies
 * the stored theme, so the page never flashes the wrong palette.
 */
const bootScript = `
(function () {
  var root = document.documentElement;
  // Gates every "starts hidden" style. Without scripting the page must
  // render fully visible rather than wait for a reveal that never comes.
  root.classList.add("js");
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) root.classList.add("dark");
  } catch (e) {}
})();
`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale as Locale} suppressHydrationWarning>
      <head>
        {/*
          Next emits only the standardised `mobile-web-app-capable`. iOS
          before 16.4 does not read the manifest, so it still needs
          Apple's legacy flag to launch standalone.
        */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import { Helmet } from "react-helmet-async";

type SEOProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};
const SEO_DATA: SEOProps = {
  title:
    "Neeraj Sharma | Staff Frontend Engineer · UI Platforms, Performance, Web & Desktop",
  description:
    "Staff Frontend Engineer with experience building high-performance web and desktop platforms at scale. Specialized in frontend architecture, performance optimization, and design systems.",
  url: "https://neeraj.dev",
  image: "https://neeraj.dev/og-image.png",
};

const { title, description, url, image } = SEO_DATA;

export function SEO() {
  return (
    <article>
      <title>Neeraj Sharma</title>

      {/* favicon */}
      <link rel="icon" type="image/png" href="/favicon.png" />

      <meta name="description" content={description} />
      <meta name="author" content="Neeraj Sharma" />
      <meta name="robots" content="index, follow" />

      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Theme */}
      <meta name="theme-color" content="#0B0F1A" />
      <meta name="color-scheme" content="dark light" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Neeraj Sharma",
          jobTitle: "Staff Frontend Engineer",
          url,
          sameAs: [
            "https://www.linkedin.com/in/nsharma1396/",
            "https://github.com/nsharma1396/",
          ],
        })}
      </script>
    </article>
  );
}

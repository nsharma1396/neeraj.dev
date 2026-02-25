type SEOProps = {
  title?: string;
  author?: string;
  jobTitle?: string;
  description?: string;
  url?: string;
  image?: string;
  twitterUsername?: string;
};
const SEO_DATA: SEOProps = {
  title: "Neeraj Sharma",
  author: "Neeraj Sharma",
  jobTitle: "Staff Frontend Engineer",
  description:
    "Staff Frontend Engineer with experience building high-performance web and desktop platforms at scale. Specialized in frontend architecture, performance optimization, and design systems.",
  url: "https://neeraj.dev",
  image: "https://neeraj.dev/og-image.png",
  twitterUsername: "nsharma1396",
};

const { title, author, jobTitle, description, url, image, twitterUsername } =
  SEO_DATA;

export function SEO() {
  return (
    <article>
      <title>{title}</title>

      {/* favicon */}
      <link rel="icon" type="image/png" href="/favicon.png" />

      <meta name="description" content={description} />
      <meta name="author" content={author} />
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
      <meta name="twitter:site" content={`@${twitterUsername}`} />
      <meta name="twitter:creator" content={`@${twitterUsername}`} />

      {/* Theme */}
      <meta name="theme-color" content="#0B0F1A" />
      <meta name="color-scheme" content="dark light" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: author,
          jobTitle: jobTitle,
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

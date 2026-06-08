import { Helmet } from 'react-helmet-async';

interface HeaderProps {
  title: string;
  shortDescription: string;
  longDescription: string;
}

export default function Header({
  title,
  shortDescription,
  longDescription,
}: HeaderProps) {
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={shortDescription} />
      <meta
        name="keywords"
        content="3d printing, laser cutting, custom products, industrial machines, spare parts, accessories"
      />

      {/* Open Graph (social sharing) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={longDescription} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={longDescription} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
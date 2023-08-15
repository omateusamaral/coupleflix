import { MetadataRoute } from "next";

export default function siteMap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://coupleflix.com.br/",
      lastModified: new Date(),
    },

    {
      url: "http://coupleflix.com.br",
      lastModified: new Date(),
    },
  ];
}

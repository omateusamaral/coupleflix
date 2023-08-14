import { MetadataRoute } from "next";

export default function siteMap(): MetadataRoute.Sitemap {
  return [
    {
      url: "http://localhost:3000/",
      lastModified: new Date(),
    },

    {
      url: "http://coupleflix.com.br",
      lastModified: new Date(),
    },
  ];
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://ciachu.site",
  generateRobotsTxt: true,
  changefreq: "monthly",
  // generateIndexSitemap: false,
};

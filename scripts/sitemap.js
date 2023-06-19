/* eslint-disable */
(async () => {
  const fs = await import('fs');
  const prettier = await import('prettier');
  const { globbySync } = await import('globby')
  
  const modDate = new Date().toISOString()

  const pages = globbySync([
    // includes
    '../pages/**/*.tsx',
    '../pages/*.tsx',
    // excludes
    '!../pages/_app.tsx',
    '!../pages/_document.tsx',
    '!../pages/404.tsx',
    '!../pages/500.tsx',
    '!../pages/news/**/*.tsx',
    '!../pages/news/*.tsx',
    '!../pages/playground/*.tsx',
    '!../pages/client/**/*.tsx',
    '!../pages/client/*.tsx',
    '!../pages/carrier/**/*.tsx',
    '!../pages/carrier/*.tsx',
  ])

  const pagesSitemap = pages.map((page) => {
    const path = page
      .replace('../pages/', '')
      .replace('.tsx', '')
      .replace(/\/index/g, '')
    const routePath = path === 'index' ? '' : path
    return `
      <url>
        <loc>https://www.tmapfreight.com/${routePath}</loc>
        <lastmod>${modDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `
  }).join('')

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${pagesSitemap}
    </urlset>
  `
  const formattedSitemap = prettier.format(generatedSitemap, { parser: 'html' })

  fs.writeFileSync('../public/sitemap.xml', formattedSitemap, 'utf-8')
})();

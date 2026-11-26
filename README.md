# iwaspromisedcookies.com

Random life stories and curiosities. Built with [Eleventy](https://www.11ty.dev).

```
npm install
npm start       # local dev server with live reload
npm run build   # build the site into docs/ (served by GitHub Pages)
```

- `contents/articles/<slug>/index.md` — posts (frontmatter: `title`, `date`), with their images alongside
- `contents/index.njk`, `archive.njk`, `feed.njk` — paginated home page, archive, RSS feed
- `templates/` — layouts and the footer blurb (`about.md`)
- `data/site.json` — site name, URL, owner and description

# Tahani Cherif — portfolio

Next.js 16 + Tailwind CSS 4. English and French, switchable from the header.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Change the content

All text lives in **`data/profile.ts`**, in both languages:

- `profile`: name, links (GitHub, LinkedIn, e-mail), roles shown by the typewriter, tagline, "About" text.
- `skills`: skill groups. A skill that appears in a project's `stack` becomes clickable and filters the projects.
- `projects`: one entry per project. `url` adds the "Live" badge and "Visit the website" link; `featured: true` makes the card wider.
- `jobs`: the experience timeline. Each job lists its projects by `id`.
- `education`, and `ui` for the interface labels.

## Files

- `public/photo.jpeg`: profile photo.
- `public/cv-en.pdf`, `public/cv-fr.pdf`: the CVs behind the "Download my CV" button (English and French). Replace them with your latest compiled CVs, keeping these names.

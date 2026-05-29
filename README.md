# Sivah Tech Enterprise CMS

Next.js 15+/React/TypeScript web application with a MySQL-backed admin CMS. The public frontend preserves the validated Sivah Tech static design while adding dynamic page overrides, lead capture, blog publishing, media management, SEO settings, and admin workflows.

## Pages

- `index.html`
- `about.html`
- `services.html`
- `work.html`
- `process.html`
- `features.html`
- `pricing.html`
- `blog.html`
- `contact.html`
- `faq.html`
- `testimonials.html`
- `terms.html`
- `privacy.html`

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

## Build

```bash
npm run typecheck
npm run build
```

## Database

Import:

```bash
mysql "$DATABASE_URL" < database/schema.sql
```

Tables include:

- users
- pages
- services
- blogs
- blog_categories
- faq
- testimonials
- team_members
- case_studies
- media
- leads
- settings
- seo
- menus
- newsletter_subscribers

## Admin

Create the first admin:

```bash
ADMIN_EMAIL=info@sivahtech.com ADMIN_PASSWORD='StrongPasswordHere' npm run admin:create
```

Login at:

```text
/admin/login
```

## Deployment

See `DEPLOYMENT.md` for Hostinger Web Apps hosting instructions.

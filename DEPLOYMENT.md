# Hostinger Web Apps Deployment Guide

## 1. Prepare MySQL

1. Create a MySQL database in Hostinger.
2. Import `database/schema.sql`.
3. Save the database credentials.

## 2. Configure environment

Copy `.env.example` to `.env` and update:

- `DATABASE_URL` or `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET`
- SMTP values for `info@sivahtech.com`
- `NEXT_PUBLIC_SITE_URL=https://sivahtech.com`

## 3. Install and build

```bash
npm install
npm run build
```

## 4. Create admin user

```bash
ADMIN_EMAIL=info@sivahtech.com ADMIN_PASSWORD='StrongPasswordHere' npm run admin:create
```

## 5. Start on Hostinger

Set the web app start command:

```bash
npm run start
```

The app runs with Next.js App Router and Node.js API routes.

## Admin URLs

- Login: `/admin/login`
- Dashboard: `/admin`
- Resource managers: `/admin/pages`, `/admin/blogs`, `/admin/leads`, `/admin/media`, etc.

## Notes

- Uploaded media is stored in `public/uploads`.
- For persistent uploads on Hostinger, ensure `public/uploads` remains writable.
- All frontend styling is preserved from the validated static implementation.

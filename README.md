# Shivabakthi — Spiritual Reports

A personalized spiritual guidance and astrology reports platform built with Next.js. Users receive 1-year, 3-year, and 5-year personalized reports with insights into career, relationships, finances, and personal growth — delivered through the grace of Lord Shiva.

---

## Features

- **Personalized Reports** — 1-year, 3-year, and 5-year astrology reports
- **Secure Authentication** — User sign-up and sign-in via [Clerk](https://clerk.dev)
- **Online Payments** — Integrated with [Cashfree Payments](https://cashfree.com)
- **Admin Panel** — Manage services, reports, and users
- **Blog** — Spiritual articles and insights
- **Email Notifications** — Automated emails via Nodemailer
- **File Storage** — Report PDFs stored with [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- **Dark Spiritual UI** — Tailwind CSS v4 with a custom gold-on-deep-purple theme

---

## Tech Stack

| Layer         | Technology                                      |
|---------------|--------------------------------------------------|
| Framework     | [Next.js 16](https://nextjs.org) (App Router)   |
| Language      | TypeScript                                       |
| Styling       | Tailwind CSS v4, `tw-animate-css`                |
| UI Components | Radix UI, Lucide React, Shadcn/UI                |
| Auth          | [Clerk](https://clerk.dev)                       |
| Database      | [Neon](https://neon.tech) (PostgreSQL serverless)|
| ORM           | [Drizzle ORM](https://orm.drizzle.team)          |
| Payments      | [Cashfree Payments](https://cashfree.com)        |
| Storage       | [Vercel Blob](https://vercel.com/docs/storage)   |
| Email         | [Nodemailer](https://nodemailer.com)             |
| Deployment    | [Vercel](https://vercel.com)                     |

---

## Project Structure

```
Spiritual-Reports/
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/            # App Router pages and API routes
│   │   │   ├── about/
│   │   │   ├── admin/
│   │   │   ├── api/
│   │   │   ├── blog/
│   │   │   ├── contact/
│   │   │   ├── ig/         # Spiritual guidance (report intake)
│   │   │   ├── payment/
│   │   │   ├── services/
│   │   │   └── ...
│   │   ├── components/     # Reusable React components
│   │   ├── db/             # Drizzle schema and database client
│   │   └── lib/            # Utility functions
│   ├── drizzle/            # Database migrations
│   ├── public/             # Static assets (images, videos)
│   ├── drizzle.config.ts
│   ├── next.config.ts
│   └── package.json
├── LICENSE
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v20+
- [npm](https://npmjs.com) or [bun](https://bun.sh)
- A [Neon](https://neon.tech) PostgreSQL database
- A [Clerk](https://clerk.dev) application
- A [Cashfree](https://cashfree.com) merchant account
- A [Vercel](https://vercel.com) account (for Blob storage)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shinobiwanshin/Spiritual-Reports.git
   cd Spiritual-Reports/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example file and fill in your credentials:

   ```bash
   cp env.example .env.local
   ```

   See the [Environment Variables](#environment-variables) section below.

4. **Run database migrations**

   ```bash
   npx drizzle-kit migrate
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file inside the `frontend/` directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# Cashfree Payments
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
NEXT_PUBLIC_CASHFREE_ENV=SANDBOX   # or PRODUCTION

# Vercel Blob (for storing report PDFs)
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

---

## Available Scripts

Run these from inside the `frontend/` directory:

| Command            | Description                          |
|--------------------|--------------------------------------|
| `npm run dev`      | Start development server             |
| `npm run build`    | Build for production                 |
| `npm run start`    | Start production server              |
| `npm run lint`     | Lint source files with ESLint        |

### Database commands (Drizzle Kit)

| Command                        | Description                                          |
|--------------------------------|------------------------------------------------------|
| `npx drizzle-kit generate`     | Generate a new migration from schema changes         |
| `npx drizzle-kit migrate`      | Apply pending migrations to the database             |
| `npx drizzle-kit push`         | Push schema directly to DB (development shortcut)    |
| `npx drizzle-kit studio`       | Open Drizzle Studio (DB GUI)                         |

---

## Deployment

The easiest way to deploy is with [Vercel](https://vercel.com):

1. Push your code to GitHub.
2. Import the repository in the Vercel dashboard.
3. Set the **Root Directory** to `frontend`.
4. Add all environment variables from `.env.local` in the Vercel project settings.
5. Deploy — Vercel will automatically build and serve the app.

---

## License

This project is licensed under the terms of the [LICENSE](./LICENSE) file.

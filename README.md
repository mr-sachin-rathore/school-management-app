# School Management Dashboard

## Getting Started

Add env variables by creating .env file
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# db from neon postgress

https://console.neon.tech/app/projects/broad-paper-19461376?database=neondb

# get from clerk

https://dashboard.clerk.com/apps/app_2zOwqArz99NH7qdtLdCweS81HIk/instances/ins_2zOwqFAUvKgT8b5npsH7BQAyaYi/user-authentication/email-phone-username

# prisma setup Generate Prisma Client

npx prisma generate

# Push schema changes to database (for development)

npx prisma db push

# Run pending migrations (for production)

npx prisma migrate deploy

# Reset database and run all migrations

npx prisma migrate reset

# Create a new migration

npx prisma migrate dev --name your_migration_name

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js](https://nextjs.org/learn)

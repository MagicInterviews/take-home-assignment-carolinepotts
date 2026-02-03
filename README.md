# MagicDash Take-Home

Welcome! This is a time-boxed take-home designed to simulate the kind of work you would do at MagicSchool. You will work in a partially built full-stack app called MagicDash that helps organizations manage admins, teachers, and tools. Some things are broken, some are missing, and your job is to improve it.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Language**: TypeScript
- **Package Manager**: pnpm

## Time Expectation

- Please aim to spend around 3 hours on this work. We value your time!

## Tasks Expectation

Complete the tasks in **[TASKS.md](./TASKS.md)**.
- We do not expect 100% completion, but we value high completion rates.
- We do not value quantity at the expense of quality.

## AI Usage Expectations

AI tools are allowed, so please ensure that:

- Your solution works.
- You can both understand and thoroughly explain what you submit.
- You avoid large amounts of unedited or low-quality generated code.

## Setup

1. Install PNPM: <https://pnpm.io/installation>
2. Install Docker Desktop: <https://www.docker.com/products/docker-desktop/>
3. Install Supabase CLI: <https://supabase.com/docs/guides/cli/getting-started>
4. Install dependencies: `pnpm i`
5. Run the db: `pnpm db:start`
6. Run the app: `pnpm dev`
7. Verify setup:
   - Database should be running (check Supabase Studio at <http://localhost:58323>)
   - App should be accessible at <http://localhost:9000>
   - You should see a login page

> Note: you can reset the DB with `pnpm db:reset`.

### Test Users

Admins:

- `admin1@north-ridge.edu`
- `admin2@north-ridge.edu`
- `admin1@blue-valley.edu`
- `admin2@blue-valley.edu`

Teachers:

- `teacher1@north-ridge.edu` ... `teacher6@north-ridge.edu`
- `teacher1@blue-valley.edu` ... `teacher6@blue-valley.edu`

Password (for all users): `testtest`

## Quick Start

After completing setup:
1. Login with any test user (password: `testtest`)
2. **As Admin**: Try `admin1@north-ridge.edu` → view teachers at `/admin`
3. **As Teacher**: Try `teacher3@north-ridge.edu` → view tools at `/tools`

## Submission

**Create a pull request** with your changes:
1. Create a new branch from `main`
2. Commit your changes with clear commit messages
3. Push to your branch
4. Open a PR against `main`

Include a short description in your PR describing:

1. What changes you made and how to test them.
2. One thing you intentionally did not do (and why).
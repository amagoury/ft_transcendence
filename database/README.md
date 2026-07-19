# Database

Prisma schema and migrations live here once Phase 2 starts.

Planned setup:
- `schema.prisma` — Users table: id, email, password, username, avatar, created_at
- `npx prisma migrate dev --name init` for the first migration
- `DATABASE_URL` is read from the root `.env` (see `.env.example`)

*This project has been created as part of the 42 curriculum by \<login1\>, \<login2\>, \<login3\>, \<login4\>.*

> Replace the logins above with your real 42 intra logins — this exact wording is a
> README requirement in the subject.

# ft_transcendence

Multiplayer Pong with AI, tournaments, and remote play.

## Structure

- `frontend/` — React + Tailwind CSS app (Eman)
- `backend/` — Express API + Socket.io (Tameem, Igor)
- `database/` — Prisma schema & migrations (Aisha)
- `docker-compose.yml` — runs all 3 containers
- `.env.example` — copy to `.env` and fill in real values (never commit `.env`)

## Modules (target: 16 points, 2-point buffer above the 14 minimum)

| Module | Type | Pts | Who |
|---|---|---|---|
| Frameworks (React frontend + Express backend) | Major | 2 | Eman + Tameem |
| Standard user management & auth | Major | 2 | Tameem |
| Web-based game (Pong) | Major | 2 | Eman + Igor |
| Remote players (WebSockets) | Major | 2 | Tameem + Igor |
| AI Opponent | Major | 2 | Igor |
| ORM (Prisma) | Minor | 1 | Aisha |
| OAuth login (Google/GitHub) | Minor | 1 | Tameem |
| Tournament system | Minor | 1 | Eman + Igor |
| Game customization options | Minor | 1 | Igor |
| Game stats & match history | Minor | 1 | Aisha + Tameem |
| 2FA for users | Minor | 1 | Tameem |
| **Total** | | **16** | |

If any one module fails evaluation you still clear the 14-point minimum.

## Getting started

1. `cp .env.example .env` and fill in values
2. `docker-compose up --build`
3. Frontend: http://localhost:3000
4. Backend health check: http://localhost:3001/health

## Team

| Person | Role(s) |
|---|---|
| Eman | Product Owner + Frontend Dev |
| Tameem | Backend Dev |
| Igor | Tech Lead + Game Logic Dev |
| Aisha | Project Manager + DevOps + Database Dev |

# BlackTree.TV — PERN Stack (TypeScript)

Full-stack movie streaming platform with **PostgreSQL · Express · React 18 · Node.js** — all in **TypeScript**.

```
blacktree-tv/
├── client/   React 18 + Vite + Tailwind + TypeScript
└── server/   Express + Prisma + PostgreSQL + TypeScript
```

## Quick Start

### 1 — Backend
```bash
cd server
npm install
cp .env.example .env          # then edit DATABASE_URL
npx prisma migrate dev --name init
npm run seed                   # populate sample data
npm run dev                    # http://localhost:5000
```

### 2 — Frontend (new terminal)
```bash
cd client
npm install
npm run dev                    # http://localhost:5173
```

See **`SETUP_GUIDE.md`** for the full step-by-step instructions.

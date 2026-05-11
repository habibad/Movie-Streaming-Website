# BlackTree.TV — TypeScript PERN Stack Setup Guide

Complete step-by-step instructions for running this project from scratch.

---

## ✅ Prerequisites

| Tool | Min Version | Link |
|---|---|---|
| Node.js | 18 LTS | https://nodejs.org |
| npm | 9+ | bundled with Node |
| PostgreSQL | 14+ | https://postgresql.org/download |
| Git | any | https://git-scm.com |

Verify:
```bash
node -v       # v18.x or higher
npm -v        # 9.x or higher
psql --version
```

---

## 📁 Project Structure

```
blacktree-tv/
│
├── client/                          ← React + Vite + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Logo.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── MainLayout.tsx
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.tsx         ← Live player + chat sidebar
│   │   │   │   ├── ScheduleSection.tsx     ← Now Playing / Up Next / Requests
│   │   │   │   ├── FeaturedActors.tsx      ← Actor portrait carousel
│   │   │   │   ├── MovieCarousel.tsx       ← Reusable movie poster carousel
│   │   │   │   ├── ExclusiveInterview.tsx  ← Full-width interview banner
│   │   │   │   └── AetherProSection.tsx    ← Premium upsell + price card
│   │   │   └── ui/
│   │   │       ├── Carousel.tsx            ← Generic scroll carousel
│   │   │       ├── LiveBadge.tsx
│   │   │       └── ProgressBar.tsx
│   │   ├── hooks/
│   │   │   ├── useCarousel.ts
│   │   │   └── useMediaQuery.ts
│   │   ├── pages/
│   │   │   └── Home.tsx
│   │   ├── types/
│   │   │   └── index.ts                    ← All shared TypeScript interfaces
│   │   ├── utils/
│   │   │   ├── mockData.ts                 ← Typed demo data (replace with API)
│   │   │   ├── api.ts                      ← Typed axios instance
│   │   │   ├── cn.ts                       ← Class-name helper
│   │   │   └── formatTime.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
└── server/                          ← Express + Prisma + TypeScript backend
    ├── src/
    │   ├── config/
    │   │   └── db.ts                       ← Prisma singleton
    │   ├── controllers/
    │   │   ├── authController.ts
    │   │   ├── movieController.ts
    │   │   ├── actorController.ts
    │   │   ├── episodeController.ts
    │   │   └── interviewController.ts
    │   ├── middleware/
    │   │   ├── auth.ts                     ← JWT requireAuth guard
    │   │   └── errorHandler.ts
    │   ├── routes/
    │   │   ├── authRoutes.ts
    │   │   ├── movieRoutes.ts
    │   │   ├── actorRoutes.ts
    │   │   ├── episodeRoutes.ts
    │   │   └── interviewRoutes.ts
    │   ├── types/
    │   │   └── index.ts                    ← Server-side TypeScript types
    │   └── index.ts                        ← Express app entry
    ├── prisma/
    │   ├── schema.prisma                   ← Database schema
    │   └── seed.ts                         ← Typed seed script
    ├── tsconfig.json
    └── package.json
```

---

## 🐘 Step 1 — PostgreSQL Setup

### Option A — Local (recommended for development)

**macOS (with Homebrew):**
```bash
brew install postgresql@16
brew services start postgresql@16
psql -U postgres
```

**Ubuntu / Debian:**
```bash
sudo apt update && sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres psql
```

**Windows:**
Download and run the installer from https://www.postgresql.org/download/windows/
Then open SQL Shell (psql).

**Create the database inside psql:**
```sql
CREATE DATABASE blacktree;
-- Optionally create a dedicated user:
CREATE USER blacktree_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE blacktree TO blacktree_user;
\q
```

Your `DATABASE_URL`:
```
postgresql://postgres:YOUR_POSTGRES_PASSWORD@localhost:5432/blacktree?schema=public
```

### Option B — Cloud Database (zero local setup)

| Provider | Free tier | URL |
|---|---|---|
| Neon | ✅ | https://neon.tech |
| Supabase | ✅ | https://supabase.com |
| Railway | ✅ | https://railway.app |

Sign up, create a project, copy the connection string — it works exactly the same.

---

## 🖥 Step 2 — Backend Setup

```bash
cd server

# 1. Install all TypeScript dependencies
npm install

# 2. Create your environment file
cp .env.example .env       # macOS/Linux
copy .env.example .env     # Windows CMD
```

Edit `server/.env`:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/blacktree?schema=public"
PORT=5000
NODE_ENV=development
JWT_SECRET=replace-with-a-very-long-random-string-like-this-one-here-32chars
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

```bash
# 3. Generate Prisma client (TypeScript types from your schema)
npx prisma generate

# 4. Run the first migration — creates all tables in PostgreSQL
npx prisma migrate dev --name init

# 5. Seed sample data (movies, actors, episodes, users, interviews)
npm run seed

# 6. Start the dev server with hot-reload
npm run dev
```

**Expected output:**
```
✅  BlackTree.TV API  →  http://localhost:5000
   ENV: development
```

**Test the API:**
```bash
curl http://localhost:5000/api/health
# → {"ok":true,"env":"development","ts":"..."}

curl http://localhost:5000/api/movies
# → {"success":true,"data":[...movies...]}

curl http://localhost:5000/api/actors
# → {"success":true,"data":[...actors...]}
```

---

## 💻 Step 3 — Frontend Setup

Open a **new terminal** (keep the backend running):

```bash
cd client

# 1. Install dependencies
npm install

# 2. (Optional) environment — the default points to localhost:5000
cp .env.example .env

# 3. Start Vite dev server
npm run dev
```

Open **http://localhost:5173** — you should see the full homepage matching your Figma design.

**Type-check without running:**
```bash
npm run type-check
```

---

## 📱 Mobile Testing

The site is fully responsive (mobile-first). To test on your phone:

1. Find your local IP:
   - macOS/Linux: `ifconfig | grep "inet "`
   - Windows: `ipconfig`

2. Connect your phone to the same WiFi.

3. Open `http://YOUR_LOCAL_IP:5173` on the phone browser.

Vite's `host: true` in `vite.config.ts` is already set to allow this.

---

## 🔌 Step 4 — Connecting Frontend to Backend (Replace Mock Data)

The homepage currently uses `client/src/utils/mockData.ts` so it works immediately without the API. When your backend is running, swap each section to fetch live data.

### Example — Featured Movies from real API

**Before** (`Home.tsx`):
```tsx
import { vodContent, featuredMovies } from '@/utils/mockData';

<MovieCarousel title="VOD Content" movies={vodContent} />
```

**After** (`Home.tsx`):
```tsx
import { useState, useEffect } from 'react';
import { get } from '@/utils/api';
import type { Movie } from '@/types';

function Home(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get<{ success: boolean; data: Movie[] }>('/movies?category=vod')
      .then(res => setMovies(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="skeleton h-64 rounded-xl" />;

  return <MovieCarousel title="VOD Content" movies={movies} />;
}
```

All endpoints follow the same pattern: `get<ResponseShape>('/route')`.

### Available API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login → returns JWT |
| POST | `/api/auth/logout` | Clear cookie |
| GET | `/api/auth/me` | Get current user (auth required) |
| GET | `/api/movies` | List movies (query: `?category=vod&featured=true&page=1&limit=20`) |
| GET | `/api/movies/featured` | Featured movies only |
| GET | `/api/movies/:id` | Single movie |
| POST | `/api/movies` | Create movie |
| PATCH | `/api/movies/:id` | Update movie |
| DELETE | `/api/movies/:id` | Delete movie |
| GET | `/api/actors` | All actors |
| GET | `/api/actors/:id` | Single actor |
| POST | `/api/actors` | Create actor |
| GET | `/api/episodes` | All episodes |
| GET | `/api/episodes/now-playing` | Currently live episode |
| GET | `/api/episodes/upcoming` | Scheduled episodes |
| POST | `/api/episodes` | Create episode |
| GET | `/api/interviews` | All interviews |
| GET | `/api/interviews/active` | Current active interview |

---

## 🛠 Useful Commands

### Backend
```bash
npm run dev              # Start with ts-node-dev (hot-reload)
npm run build            # Compile TypeScript → dist/
npm start                # Run compiled dist/index.js
npm run type-check       # TypeScript check without compiling
npm run seed             # Re-seed the database

npx prisma studio        # Visual database browser → http://localhost:5555
npx prisma migrate dev   # Create + run a new migration
npx prisma migrate reset # Wipe DB and re-run all migrations (dev only!)
npx prisma generate      # Regenerate Prisma client after schema changes
```

### Frontend
```bash
npm run dev              # Vite dev server with HMR
npm run build            # Production build → dist/
npm run preview          # Preview production build locally
npm run type-check       # TypeScript check without compiling
npm run lint             # ESLint
```

---

## 🎨 Customising the Design

### Change brand color
Edit `client/tailwind.config.ts`:
```ts
brand: {
  DEFAULT: '#E50914',   // ← change this hex
  light:   '#FF1F2D',
  dark:    '#B0060F',
},
```

### Change fonts
Swap the Google Fonts URL in `client/index.html`, then update `tailwind.config.ts`:
```ts
fontFamily: {
  sans:    ['YourBodyFont', 'sans-serif'],
  display: ['YourDisplayFont', 'sans-serif'],
},
```

### Add a new page
1. Create `client/src/pages/Movies.tsx`
2. Add the route in `App.tsx`:
   ```tsx
   <Route path="/movies" element={<Movies />} />
   ```
3. The Navbar already links to `/movies`.

---

## 🐛 Troubleshooting

| Problem | Solution |
|---|---|
| `Cannot find module '@/...'` | Make sure `baseUrl` and `paths` are correct in `tsconfig.json` — they are pre-set |
| `prisma: command not found` | Always use `npx prisma ...` |
| `ECONNREFUSED 5432` | PostgreSQL service isn't running — start it |
| `password authentication failed` | Wrong password in `DATABASE_URL` |
| `CORS error in browser` | `CLIENT_URL` in server `.env` must match your Vite port exactly |
| `Type error: ... is not assignable` | Check `client/src/types/index.ts` — all interfaces live there |
| `Cannot find name 'JSX'` | Make sure `"jsx": "react-jsx"` is in `client/tsconfig.json` |
| Tailwind not applying | Restart `npm run dev` after editing `tailwind.config.ts` |
| Images not loading | Check internet connection — images served from Unsplash + TMDB CDN |

---

## 🚀 Next Steps / Roadmap

1. **More pages** — `/movies`, `/actors/:id`, `/live`, `/interviews` — share the Figma files and I'll build them
2. **Auth UI** — Login / Register modal or page wired to `/api/auth`
3. **Real video playback** — integrate `hls.js` for HLS streams or `video.js`
4. **WebSocket live chat** — replace the static chat with `socket.io`
5. **Search** — full-text search using Postgres `tsvector` and the search bar
6. **Admin dashboard** — CRUD panel for movies, actors, episodes
7. **Deployment**
   - Frontend → **Vercel** or **Netlify** (`npm run build` → deploy `dist/`)
   - Backend → **Railway**, **Render**, or **Fly.io**
   - Database → **Neon** or **Supabase** (already cloud-ready)

---

## 🔐 Default Seed Credentials

After running `npm run seed`:

| Email | Password | Role |
|---|---|---|
| `jamal@blacktree.tv` | `password123` | Premium user |
| `guest@blacktree.tv` | `password123` | Free user |
| `admin@blacktree.tv` | `password123` | Admin (premium) |

# 🖥️ PC Builder — DIY Delight

A full-stack PC configurator app. Choose your CPU, GPU, RAM, storage, case color, cooling, and PSU — see a live preview and dynamic pricing, then save your build.

## Project Structure

```
pc-builder/
├── server/                  # Express + PostgreSQL backend
│   ├── config/
│   │   ├── database.js      # DB connection pool
│   │   └── reset.js         # Create & seed tables
│   ├── controllers/
│   │   └── buildsController.js
│   ├── routes/
│   │   └── buildsRouter.js
│   ├── server.js
│   ├── .env                 # ← fill this in with your Render DB creds
│   └── package.json
└── client/                  # React + Vite frontend
    ├── src/
    │   ├── components/
    │   │   ├── PCPreview.jsx   # SVG live preview
    │   │   └── BuildCard.jsx   # Build list card
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── BuildPage.jsx   # Create & Edit
    │   │   └── MyBuildsPage.jsx
    │   ├── services/
    │   │   └── buildsAPI.js    # API fetch calls
    │   ├── utilities/
    │   │   ├── options.js      # Component options & prices
    │   │   └── calcPrice.js    # Pricing + validation logic
    │   └── App.jsx
    └── package.json
```

## Setup

### 1. Install dependencies

```bash
# In server/
cd server && npm install

# In client/
cd client && npm install
```

### 2. Connect your Render database

Fill in `server/.env` with your Render Postgres credentials:

```
PGUSER="your_user"
PGPASSWORD="your_password"
PGHOST="your_host.oregon-postgres.render.com"
PGPORT=5432
PGDATABASE="your_db_name"
PORT=3000
```

### 3. Create the database tables

```bash
cd server && node config/reset.js
```

This creates the `saved_builds` table and seeds 3 example builds.

### 4. Run the app

**Terminal 1 — Backend:**
```bash
cd server && npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client && npm run dev
```

Open http://localhost:5173

## API Routes

| Method | Route             | Description         |
|--------|-------------------|---------------------|
| GET    | /api/builds       | All saved builds    |
| GET    | /api/builds/:id   | Single build        |
| POST   | /api/builds       | Create new build    |
| PUT    | /api/builds/:id   | Update build        |
| DELETE | /api/builds/:id   | Delete build        |

## Features

- **Live SVG preview** — case color, GPU brand indicator, and cooling type update visually as you configure
- **Dynamic pricing** — total cost updates instantly with every selection
- **Compatibility validation** — catches DDR4/DDR5 mismatches and underpowered PSUs
- **CRUD** — create, view list, edit, and delete builds
- **Responsive** — works on mobile too

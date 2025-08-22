# SEN Platform – React + Vite POC (Frontend Only)

This project is a **proof-of-concept UI** for the Techrobotica **SEN Platform**.  
It includes:
- Banner with notifications and user menu
- Suite cards (Meridian, Kinetic, Mystic, Nexus) → expand to show apps
- Tables for favorites and recents
- Quick Links with fuzzy search, tabs, and view toggle

---

## Setup

### 1. Install
```bash
npm install
````

### 2. Run Dev Server

```bash
npm run dev
# open http://localhost:5173
```

### 3. Build for Production

```bash
npm run build
npm run preview
```

---

## 📊 Data Sources

You can use **either** of these:

### Option A – Static JS/JSON (default)

* Data lives in `src/data/*.js`
* Imported directly into components (`SUITES`, `FAVORITES`, `RECENTS`, `BLOG`)

### Option B – Excel (runtime parsing)

* Place `sen-data.xlsx` inside `/public`
* Install:

  ```bash
  npm i xlsx
  ```
* Enable `ExcelProvider` (`src/data/ExcelProvider.jsx`) to parse and load Excel data at runtime.

---

## Tech Stack

* React 18 (Vite scaffold)
* TailwindCSS
* Lucide Icons
* Fuse.js (fuzzy search)
* XLSX (optional, for Excel parsing)

